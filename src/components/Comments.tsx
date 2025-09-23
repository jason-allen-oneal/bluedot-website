'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';

interface Comment {
  id: number;
  content: string;
  author: string;
  createdAt: string;
}

interface CommentsProps {
  postId: number;
}

export default function Comments({ postId }: CommentsProps) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(`/api/comments?postId=${postId}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: newComment.content,
          postId
        }),
      });

      if (response.ok) {
        setNewComment({ content: '' });
        alert('Comment submitted! It will be visible after approval.');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to submit comment');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Failed to submit comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return <div className="mt-8">Loading comments...</div>;
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-6">Comments ({comments.length})</h3>
      
      {/* Comment Form - Only show if user is authenticated */}
      {session ? (
        <div className="card p-6 mb-8">
          <h4 className="text-lg font-medium mb-4">Leave a Comment</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-2">
                Comment
              </label>
              <textarea
                id="content"
                required
                rows={4}
                value={newComment.content}
                onChange={(e) => setNewComment({ content: e.target.value })}
                className="w-full p-3 border border-border rounded-md bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Share your thoughts..."
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Comment'}
            </button>
          </form>
        </div>
      ) : (
        <div className="card p-6 mb-8 text-center">
          <p className="text-muted mb-4">Sign in to leave a comment</p>
          <a
            href="/login"
            className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors inline-block"
          >
            Sign In
          </a>
        </div>
      )}

      {/* Comments List */}
      {comments.length === 0 ? (
        <div className="text-center py-8 text-muted">
          <p>No comments yet. {session ? 'Be the first to comment!' : 'Sign in to be the first to comment!'}</p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="card p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium">{comment.author}</span>
                <span className="text-sm text-muted">{formatDate(comment.createdAt)}</span>
              </div>
              <p className="text-muted">{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
