"use client";

import { useState } from "react";
import Link from "next/link";
import Background from "@/components/Background";
import Nav from "@/components/Nav";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  createdAt: string;
}

interface BlogListClientProps {
  initialPosts: Post[];
}

export default function BlogListClient({ initialPosts }: BlogListClientProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = initialPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <Background />
      <Nav />
      <div className="relative mx-auto max-w-6xl px-6 pt-28 pb-10 md:pt-36 md:pb-20">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-muted-foreground text-lg">
            Articles on cybersecurity, programming, and technology
          </p>
        </header>

        <div className="mb-8">
          <input
            type="search"
            placeholder="Search articles..."
            className="w-full p-4 rounded-lg bg-surface border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            <p className="text-lg">No articles found.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="card p-6 hover:shadow-lg transition-shadow"
              >
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-2xl font-bold mb-3 hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                </Link>
                <time className="text-sm text-muted-foreground mb-3 block" dateTime={post.createdAt}>
                  {new Date(post.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </time>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-primary hover:underline"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
