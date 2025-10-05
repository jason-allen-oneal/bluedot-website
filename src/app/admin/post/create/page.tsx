"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  FileText,
  Wand2,
  Save,
} from "lucide-react";

export default function CreatePostPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
  });

  const [errors, setErrors] = useState({ title: "", slug: "", content: "" });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  if (!session) {
    router.push("/login");
    return null;
  }

  const validateField = (name: string, value: string) => {
    let error = "";
    if (!value) error = `${name} is required`;
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const generateSlug = () => {
    const slug = form.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    setForm((prev) => ({ ...prev, slug }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) router.push("/admin");
      else alert("Failed to create post");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-12 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Create New Post</h1>
          <p className="text-muted-foreground">
            Write and publish a new blog article.
          </p>
        </div>
        <Button
          onClick={() => router.push("/admin")}
          variant="outline"
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Button>
      </div>

      {/* Form Card */}
      <Card className="bg-gray-950/60 backdrop-blur-md border border-white/90">
        <CardHeader>
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <div>
              <CardTitle className="text-white">Post Details</CardTitle>
              <CardDescription>
                Fill out the form to publish your new post.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title + Slug */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="title">Title</Label>
                <input
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter post title"
                  className="w-full p-3 mt-1 rounded-md border border-white/30 bg-gray-900/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <Label htmlFor="slug">Slug</Label>
                <div className="flex gap-2 mt-1">
                  <input
                    id="slug"
                    name="slug"
                    value={form.slug}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="auto-generated slug"
                    className="flex-1 p-3 rounded-md border border-white/30 bg-gray-900/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button
                    type="button"
                    onClick={generateSlug}
                    variant="outline"
                    className="gap-2"
                  >
                    <Wand2 className="h-4 w-4" /> Generate
                  </Button>
                </div>
                {errors.slug && (
                  <p className="text-red-500 text-sm mt-1">{errors.slug}</p>
                )}
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <Label htmlFor="excerpt">Excerpt</Label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={form.excerpt}
                onChange={handleChange}
                placeholder="Short summary of your post..."
                rows={3}
                className="w-full p-3 mt-1 rounded-md border border-white/30 bg-gray-900/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Content */}
            <div>
              <Label htmlFor="content">Content</Label>
              <textarea
                id="content"
                name="content"
                value={form.content}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Write your post here..."
                rows={10}
                className="w-full p-3 mt-1 rounded-md border border-white/30 bg-gray-900/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">{errors.content}</p>
              )}
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading} className="gap-2">
                <Save className="h-4 w-4" />
                {isLoading ? "Publishing..." : "Publish Post"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
