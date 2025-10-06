"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, FileText } from "lucide-react";

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const { data: session } = useSession();

  const postId = params.id as string;

  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    categoryId: "",
    tagIds: [] as number[],
  });

  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [tags, setTags] = useState<{ id: number; name: string }[]>([]);
  const [errors, setErrors] = useState({ title: "", slug: "", content: "" });

  useEffect(() => {
    setIsMounted(true);
    if (session) fetchData();
  }, [session]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [postRes, catRes, tagRes] = await Promise.all([
        fetch(`/api/admin/posts/${postId}`),
        fetch("/api/categories"),
        fetch("/api/tags"),
      ]);

      if (postRes.ok) {
        const post = await postRes.json();
        setForm({
          title: post.title || "",
          slug: post.slug || "",
          excerpt: post.excerpt || "",
          content: post.content || "",
          categoryId: post.categoryId?.toString() || "",
          tagIds: post.tags?.map((t: any) => t.tag.id) || [],
        });
      }

      if (catRes.ok) setCategories(await catRes.json());
      if (tagRes.ok) setTags(await tagRes.json());
    } catch (err) {
      console.error("Failed to load post data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) return null;
  if (!session) {
    router.push("/login");
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagToggle = (tagId: number) => {
    setForm((prev) => {
      const exists = prev.tagIds.includes(tagId);
      const tagIds = exists
        ? prev.tagIds.filter((id) => id !== tagId)
        : [...prev.tagIds, tagId];
      return { ...prev, tagIds };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
        const res = await fetch("/api/admin/posts/edit", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: postId, ...form }),
        });
      if (res.ok) {
        router.push("/admin");
      } else {
        alert("Failed to update post");
      }
    } catch (err) {
      console.error("Error saving post:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container py-12 space-y-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Edit Post</h1>
          <p className="text-muted-foreground">Update and manage your blog post.</p>
        </div>
        <Button
          onClick={() => router.push("/admin")}
          variant="outline"
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Button>
      </div>

      <Card className="bg-gray-950/60 backdrop-blur-md border border-white/90">
        <CardHeader>
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <div>
              <CardTitle className="text-white">Post Details</CardTitle>
              <CardDescription>Edit the fields and save your changes.</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <p className="text-white">Loading post...</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <Label htmlFor="title">Title</Label>
                <input
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full p-3 mt-1 rounded-md border border-white/30 bg-gray-900/50 text-white"
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
              </div>

              {/* Slug */}
              <div>
                <Label htmlFor="slug">Slug</Label>
                <input
                  id="slug"
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  className="w-full p-3 mt-1 rounded-md border border-white/30 bg-gray-900/50 text-white"
                />
                {errors.slug && <p className="text-red-500 text-sm">{errors.slug}</p>}
              </div>

              {/* Category */}
              <div>
                <Label htmlFor="categoryId">Category</Label>
                <select
                  id="categoryId"
                  name="categoryId"
                  value={form.categoryId}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 rounded-md border border-white/30 bg-gray-900/50 text-white"
                >
                  <option value="">Select category...</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div>
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-3 mt-2">
                  {tags.map((tag) => (
                    <label key={tag.id} className="flex items-center gap-2 text-white">
                      <input
                        type="checkbox"
                        checked={form.tagIds.includes(tag.id)}
                        onChange={() => handleTagToggle(tag.id)}
                      />
                      {tag.name}
                    </label>
                  ))}
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
                  rows={3}
                  className="w-full p-3 mt-1 rounded-md border border-white/30 bg-gray-900/50 text-white"
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
                  rows={10}
                  className="w-full p-3 mt-1 rounded-md border border-white/30 bg-gray-900/50 text-white"
                />
                {errors.content && (
                  <p className="text-red-500 text-sm mt-1">{errors.content}</p>
                )}
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={isSaving} className="gap-2">
                  <Save className="h-4 w-4" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
