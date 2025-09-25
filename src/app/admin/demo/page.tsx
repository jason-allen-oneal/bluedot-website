"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Background from "@/components/Background";
import Nav from "@/components/Nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  MessageSquare, 
  FileText, 
  Settings, 
  LogOut, 
  Eye, 
  Edit, 
  Trash2, 
  Calendar,
  User,
  BarChart3,
  Search,
  Filter
} from "lucide-react";

// Mock data for demo
const mockPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js and TypeScript",
    slug: "getting-started-nextjs-typescript",
    excerpt: "Learn how to set up a modern web application with Next.js, TypeScript, and Tailwind CSS for optimal developer experience.",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    id: 2,
    title: "Modern React Patterns and Best Practices",
    slug: "modern-react-patterns",
    excerpt: "Explore advanced React patterns including hooks, context, and state management techniques for scalable applications.",
    createdAt: "2024-01-10T15:30:00Z",
    updatedAt: "2024-01-12T09:15:00Z"
  },
  {
    id: 3,
    title: "Building RESTful APIs with Prisma and Next.js",
    slug: "restful-apis-prisma-nextjs",
    excerpt: "Complete guide to creating robust and type-safe APIs using Prisma ORM with Next.js API routes.",
    createdAt: "2024-01-05T12:45:00Z",
    updatedAt: "2024-01-06T16:20:00Z"
  }
];

export default function AdminDemoPage() {
  const router = useRouter();
  const [posts] = useState(mockPosts);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const handleDelete = async (postId: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    
    setIsDeleting(postId);
    // Simulate deletion
    setTimeout(() => {
      setIsDeleting(null);
      alert("Post deleted successfully!");
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      <Background />
      <Nav />
      <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-10 md:pt-36 md:pb-20">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Welcome back! Here's what's happening with your blog.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => router.push("/admin/post/create")}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                New Post
              </Button>
              <Button
                onClick={() => router.push("/admin/comments")}
                variant="outline"
                className="gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                Comments
              </Button>
              <Button
                onClick={() => alert("Sign out clicked")}
                variant="outline"
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{posts.length}</div>
              <p className="text-xs text-muted-foreground">
                2 added this month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Posts</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                Posts from last 7 days
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Comments</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">
                Awaiting moderation
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Analytics</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.2k</div>
              <p className="text-xs text-muted-foreground">
                Monthly views
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Posts Management Section */}
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle className="text-xl">Blog Posts</CardTitle>
                <CardDescription>
                  Manage and organize your blog content
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => router.push("/admin/post/create")}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Create Post
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {posts.map((post, index) => (
                <div key={post.id} className={`flex items-center justify-between p-4 hover:bg-muted/50 transition-colors ${index !== posts.length - 1 ? 'border-b' : ''}`}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold truncate">{post.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        Published
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {post.excerpt || 'No excerpt available'}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
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
                      onClick={() => alert(`View post: ${post.title}`)}
                      className="gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => alert(`Edit post: ${post.title}`)}
                      className="gap-2"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(post.id)}
                      disabled={isDeleting === post.id}
                      className="gap-2 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      {isDeleting === post.id ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}