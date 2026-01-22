"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

interface DeletePostModalProps {
  postId: number;
  title: string;
  onDeleted?: () => void;
  onClose?: () => void;
}

export function DeletePostModal({ postId, title, onDeleted, onClose }: DeletePostModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch("/api/admin/posts/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: postId }),
      });

      if (res.ok) {
        onDeleted?.();
      } else {
        alert("Failed to delete post");
      }
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to delete post");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    if (!isDeleting) {
      onClose?.();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div 
        className="bg-secondary/80 border border-accent/70 p-6 rounded-lg shadow-lg text-secondary max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-2">Confirm Deletion</h2>
        <p className="text-base-content/70 mb-6">
          Are you sure you want to permanently delete <span className="font-bold">{title}</span>?
        </p>
        <div className="flex justify-end gap-3">
          <Button style="outline" onClick={handleClose} behavior={isDeleting ? "disabled" : "default"}>
            Cancel
          </Button>
          <Button onClick={handleDelete} behavior={isDeleting ? "disabled" : "default"}>
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}
