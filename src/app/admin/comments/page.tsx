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
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  MessageSquare,
  Check,
  Trash2,
  Clock,
  Mail,
  User,
  Calendar,
} from "lucide-react";

interface Comment {
  id: number;
  content: string;
  author: string;
  email: string;
  createdAt: string;
  approved: boolean;
  post: { title: string; slug: string };
}

export default function CommentsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session) fetchComments();
  }, [session]);

  const fetchComments = async () => {
    try {
      const res = await fetch("/api/admin/comments");
      if (res.ok) setComments(await res.json());
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (id: number) => {
    await fetch(`/api/admin/comments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approved: true }),
    });
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, approved: true } : c))
    );
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this comment?")) return;
    await fetch(`/api/admin/comments/${id}`, { method: "DELETE" });
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="container py-12 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            Comments Management
          </h1>
          <p className="text-muted-foreground">
            Review, approve, or delete user comments.
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

      {/* Comments List */}
      <Card className="bg-gray-950/60 backdrop-blur-md border border-white/90">
        <CardHeader>
          <div className="flex items-center gap-3">
            <MessageSquare className="h-5 w-5 text-muted-foreground" />
            <div>
              <CardTitle className="text-white">All Comments</CardTitle>
              <CardDescription className="text-gray-400">
                {comments.length
                  ? `${comments.length} total • ${
                      comments.filter((c) => !c.approved).length
                    } pending`
                  : "No comments yet"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4" />
              <p className="text-muted-foreground">Loading comments...</p>
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-16">
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                No comments yet
              </h3>
              <p className="text-gray-400">
                Comments will appear here for review.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/10">
              {comments.map((c) => (
                <div
                  key={c.id}
                  className="p-6 hover:bg-muted/40 transition-colors flex flex-col gap-3"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{c.author}</span>
                    <span className="flex items-center gap-1 text-sm text-gray-400">
                      <Mail className="h-3 w-3" /> {c.email}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-gray-400">
                      <Calendar className="h-3 w-3" />{" "}
                      {new Date(c.createdAt).toLocaleDateString()}
                    </span>
                    {c.approved ? (
                      <Badge variant="default" className="gap-1">
                        <Check className="h-3 w-3" /> Approved
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="gap-1">
                        <Clock className="h-3 w-3" /> Pending
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-200 leading-relaxed">{c.content}</p>
                  <p className="text-sm text-muted-foreground">
                    On post: <span className="font-medium">{c.post.title}</span>
                  </p>
                  <div className="flex gap-2 justify-end">
                    {!c.approved && (
                      <Button size="sm" onClick={() => handleApprove(c.id)}>
                        <Check className="h-4 w-4 mr-1" /> Approve
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(c.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
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
