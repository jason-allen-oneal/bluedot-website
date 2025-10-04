
// src/components/BlogPostServer.tsx
import BlogPost from "./BlogPost";

// This file is a server component (no "use client")
export default function BlogPostServer({ post }: { post: any }) {
  return <BlogPost post={post} />;
}
