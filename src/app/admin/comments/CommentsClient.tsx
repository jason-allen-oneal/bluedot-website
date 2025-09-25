"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Background from "@/components/Background";
import Nav from "@/components/Nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  MessageSquare, 
  Check, 
  Trash2, 
  Clock,
  Mail,
  User,
  Calendar
} from "lucide-react";

interface Comment {
  id: number;
  content: string;
  author: string;
  email: string;
  createdAt: string;
  approved: boolean;
  post: {
    title: string;
    slug: string;
  };
}

export default function CommentsClient() {
  const { data: session } = useSession();
  const router = useRouter();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (session) {
      fetchComments();
    }
  }, [session]);

  // Don't render anything until mounted to prevent SSR issues
  if (!isMounted) {
    return null;
  }

  const fetchComments = async () => {
    try {
      const response = await fetch("/api/admin/comments");
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (commentId: number) => {
    try {
      const response = await fetch(`/api/admin/comments/${commentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved: true }),
      });
      
      if (response.ok) {
        setComments(comments.map(comment => 
          comment.id === commentId ? { ...comment, approved: true } : comment
        ));
      }
    } catch (error) {
      console.error("Error approving comment:", error);
    }
  };

  const handleDelete = async (commentId: number) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;
    
    try {
      const response = await fetch(`/api/admin/comments/${commentId}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        setComments(comments.filter(comment => comment.id !== commentId));
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  if (!session) {
    router.push("/login");
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Background />
        <Nav />
        <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-10 md:pt-36 md:pb-20">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <p className="text-muted-foreground">Loading comments...</p>
          </div>
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
              <h1 className="text-3xl font-bold tracking-tight">Comments Management</h1>
              <p className="text-muted-foreground mt-2">
                Manage and moderate user comments on your blog posts
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

        {/* Comments List */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
              <div>
                <CardTitle>All Comments</CardTitle>
                <CardDescription>
                  {comments.length === 0 
                    ? "No comments found" 
                    : `${comments.length} comment${comments.length !== 1 ? 's' : ''} • ${comments.filter(c => !c.approved).length} pending approval`
                  }
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {comments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No comments yet</h3>
                <p className="text-muted-foreground text-center max-w-sm">
                  Comments from visitors will appear here for you to review and moderate.
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                {comments.map((comment, index) => (
                  <div key={comment.id} className={`p-6 hover:bg-muted/50 transition-colors ${index !== comments.length - 1 ? 'border-b' : ''}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{comment.author}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            <span>{comment.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                          </div>
                          {!comment.approved ? (
                            <Badge variant="secondary" className="gap-1">
                              <Clock className="h-3 w-3" />
                              Pending
                            </Badge>
                          ) : (
                            <Badge variant="default" className="gap-1">
                              <Check className="h-3 w-3" />
                              Approved
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-foreground mb-3 leading-relaxed">
                          {comment.content}
                        </p>
                        
                        <div className="text-sm text-muted-foreground">
                          On: <span className="font-medium">{comment.post.title}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {!comment.approved && (
                          <Button
                            size="sm"
                            onClick={() => handleApprove(comment.id)}
                            className="gap-2"
                          >
                            <Check className="h-4 w-4" />
                            Approve
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(comment.id)}
                          className="gap-2 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </Button>
                      </div>
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
