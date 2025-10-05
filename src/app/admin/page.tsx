"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  MessageSquare,
  FileText,
  LogOut,
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
  BarChart3,
} from "lucide-react";

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  useEffect(() => {
    if (session) fetchPosts();
  }, [session]);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/admin/posts");
      if (res.ok) {
        setPosts(await res.json());
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this post?")) return;
    setIsDeleting(id);
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
      if (res.ok) setPosts((prev) => prev.filter((p) => p.id !== id));
    } finally {
      setIsDeleting(null);
    }
  };

  if (!session) {
    return (
      <div className="container py-20 flex flex-col items-center justify-center">
        <Card className="w-full max-w-md bg-gray-950/60 backdrop-blur-md border border-white/90">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <User className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl text-white">
              Admin Access Required
            </CardTitle>
            <CardDescription className="text-gray-400">
              Please sign in to access the admin dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/login")} className="w-full">
              <User className="mr-2 h-4 w-4" /> Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Manage posts, comments, and analytics in one place.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 justify-center md:justify-end">
        <Button onClick={() => router.push("/admin/create")} className="gap-2">
          <Plus className="h-4 w-4" /> New Post
        </Button>
        <Button
          onClick={() => router.push("/admin/comments")}
          variant="outline"
          className="gap-2"
        >
          <MessageSquare className="h-4 w-4" /> Comments
        </Button>
        <Button
          onClick={() => signOut()}
          variant="outline"
          className="gap-2 text-destructive hover:text-destructive"
        >
          <LogOut className="h-4 w-4" /> Sign Out
        </Button>
      </div>

      {/* Stats Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Total Posts",
            icon: FileText,
            value: posts.length,
            detail: "All published posts",
          },
          {
            label: "Recent Posts",
            icon: Calendar,
            value: posts.filter(
              (p) =>
                new Date(p.createdAt) >
                new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            ).length,
            detail: "Added in last 7 days",
          },
          {
            label: "Comments",
            icon: MessageSquare,
            value: "-",
            detail: "Awaiting moderation",
          },
          {
            label: "Analytics",
            icon: BarChart3,
            value: "-",
            detail: "Monthly traffic",
          },
        ].map((item, idx) => (
          <Card
            key={idx}
            className="bg-gray-950/60 backdrop-blur-md border border-white/90"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">
                {item.label}
              </CardTitle>
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {item.value}
              </div>
              <p className="text-xs text-muted-foreground">{item.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Posts Management */}
      <Card className="bg-gray-950/60 backdrop-blur-md border border-white/90">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <CardTitle className="text-xl text-white">Blog Posts</CardTitle>
              <CardDescription className="text-gray-400">
                Manage and organize your blog content
              </CardDescription>
            </div>
            <Button
              onClick={() => router.push("/admin/create")}
              className="gap-2"
            >
              <Plus className="h-4 w-4" /> Create New
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4" />
              <p className="text-muted-foreground">Loading posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                No posts yet
              </h3>
              <p className="text-gray-400 mb-6 text-center max-w-sm">
                Create your first post to get started.
              </p>
              <Button onClick={() => router.push("/admin/create")}>
                <Plus className="h-4 w-4 mr-2" /> New Post
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-white/10">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-5 hover:bg-muted/40 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-white truncate">
                        {post.title}
                      </h3>
                      <Badge variant="secondary" className="text-xs">
                        Published
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-2 mb-2">
                      {post.excerpt || "No excerpt available"}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                      <span>/{post.slug}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => router.push(`/blog/${post.slug}`)}
                      className="gap-2 text-blue-400 hover:text-blue-300"
                    >
                      <Eye className="h-4 w-4" /> View
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => router.push(`/admin/edit/${post.id}`)}
                      className="gap-2 text-cyan-400 hover:text-cyan-300"
                    >
                      <Edit className="h-4 w-4" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(post.id)}
                      disabled={isDeleting === post.id}
                      className="gap-2 text-red-500 hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                      {isDeleting === post.id ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
