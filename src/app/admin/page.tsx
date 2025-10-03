"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
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
  LogOut, 
  Eye, 
  Edit, 
  Trash2, 
  Calendar,
  User,
  BarChart3
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
    if (session) {
      fetchPosts();
    }
  }, [session]);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/admin/posts");
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (postId: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    
    setIsDeleting(postId);
    try {
      const response = await fetch(`/api/admin/posts/${postId}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        setPosts(posts.filter(post => post.id !== postId));
      } else {
        alert("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    } finally {
      setIsDeleting(null);
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen">
        <Background />
        <Nav />
        <div className="flex items-center justify-center min-h-screen pt-14">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <User className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-2xl">Admin Access Required</CardTitle>
              <CardDescription>
                Please sign in to access the admin dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => router.push("/login")} 
                className="w-full"
                size="lg"
              >
                <User className="mr-2 h-4 w-4" />
                Sign in
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
                Welcome back! Here&apos;s what&apos;s happening with your blog.
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
                onClick={() => signOut()}
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
                {posts.filter(post => new Date(post.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length} added this month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Posts</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {posts.filter(post => new Date(post.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
              </div>
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
              <div className="text-2xl font-bold">-</div>
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
              <div className="text-2xl font-bold">-</div>
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
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
                <p className="text-muted-foreground">Loading posts...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
                <p className="text-muted-foreground mb-6 text-center max-w-sm">
                  Get started by creating your first blog post
                </p>
                <Button
                  onClick={() => router.push("/admin/post/create")}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Create Your First Post
                </Button>
              </div>
            ) : (
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
                        onClick={() => router.push(`/blog/${post.slug}`)}
                        className="gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => router.push(`/admin/post/edit/${post.id}`)}
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
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}