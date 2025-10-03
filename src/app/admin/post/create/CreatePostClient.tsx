"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Background from "@/components/Background";
import Nav from "@/components/Nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  FileText, 
  Wand2,
  Save
} from "lucide-react";

type Category = {
  id: number;
  name: string;
};

type Tag = {
  id: number;
  name: string;
};

export default function CreatePostClient() {
  const { data: session } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [errors, setErrors] = useState({ title: '', slug: '', content: '' });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    async function fetchCategoriesAndTags() {
      const categoriesResponse = await fetch('/api/categories');
      const tagsResponse = await fetch('/api/tags');
      const categoriesData = await categoriesResponse.json();
      const tagsData = await tagsResponse.json();
      setCategories(categoriesData);
      setTags(tagsData);
    }
    fetchCategoriesAndTags();
  }, []);

  // Don't render anything until mounted to prevent SSR issues
  if (!isMounted) {
    return null;
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  const validateField = (name: string, value: string) => {
    let error = '';
    if (!value) {
      error = `${name} is required`;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, categoryId: selectedCategory, tags: selectedTags }),
      });

      if (response.ok) {
        router.push("/admin");
      } else {
        const error = await response.json();
        alert(error.error || "Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post");
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = () => {
    const slug = form.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    setForm({ ...form, slug });
  };

  return (
    <div className="min-h-screen">
      <Background />
      <Nav />
      <div className="relative mx-auto max-w-4xl px-6 pt-28 pb-10 md:pt-36 md:pb-20">
        <div className="mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Create New Post</h1>
              <p className="text-muted-foreground mt-2">
                Write and publish a new blog post
              </p>
            </div>
            <Button
              onClick={() => router.push("/admin")}
              variant="outline"
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <div>
                <CardTitle>Blog Post Details</CardTitle>
                <CardDescription>
                  Fill out the form below to create your new blog post
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  className="w-full p-3 border border-border rounded-md bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter post title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  onBlur={handleBlur}
                  required
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
              </div>
              
              <div>
                <label htmlFor="slug" className="block text-sm font-medium mb-2">
                  Slug
                </label>
                <div className="flex gap-2">
                  <input
                    id="slug"
                    name="slug"
                    className="flex-1 p-3 border border-border rounded-md bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter post slug"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.slug && <p className="text-red-500 text-sm">{errors.slug}</p>}
                  <Button
                    type="button"
                    onClick={generateSlug}
                    variant="outline"
                    className="gap-2"
                  >
                    <Wand2 className="h-4 w-4" />
                    Generate
                  </Button>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium mb-2">
                Excerpt
              </label>
              <textarea
                id="excerpt"
                className="w-full p-3 border border-border rounded-md bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter post excerpt"
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                rows={3}
              />
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-2">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                className="w-full p-3 border border-border rounded-md bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter post content"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                onBlur={handleBlur}
                rows={10}
                required
              />
              {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-2">
                Category
              </label>
              <select
                id="category"
                className="w-full p-3 border border-border rounded-md bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium mb-2">
                Tags
              </label>
              <select
                id="tags"
                className="w-full p-3 border border-border rounded-md bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                multiple
                value={selectedTags}
                onChange={(e) => setSelectedTags(Array.from(e.target.selectedOptions, option => option.value))}
              >
                {tags.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-4 justify-end">
              <Button
                type="submit"
                disabled={isLoading}
                className="gap-2"
              >
                <Save className="h-4 w-4" />
                {isLoading ? "Creating..." : "Create Post"}
              </Button>
            </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
