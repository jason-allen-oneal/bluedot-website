"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Background from "@/components/Background";
import Nav from "@/components/Nav";

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
        <div className="relative mx-auto max-w-[1100px] px-6 pt-28 pb-10 md:pt-36 md:pb-20">
          <div>Loading comments...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Background />
      <Nav />
      <div className="relative mx-auto max-w-[1100px] px-6 pt-28 pb-10 md:pt-36 md:pb-20">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Comments Management</h1>
            <p className="text-muted mt-2">Manage and moderate comments</p>
          </div>
          <button
            onClick={() => router.push("/admin")}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>

        {comments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted">No comments found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="card p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="font-medium">{comment.author}</span>
                      <span className="text-sm text-muted">{comment.email}</span>
                      <span className="text-sm text-muted">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                      {!comment.approved && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                          Pending
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted mb-2">
                      On: <a href={`/blog/${comment.post.slug}`} className="text-primary hover:underline">
                        {comment.post.title}
                      </a>
                    </p>
                    <p className="text-muted">{comment.content}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {!comment.approved && (
                      <button
                        onClick={() => handleApprove(comment.id)}
                        className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors"
                      >
                        Approve
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
