import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Blog",
  description: "Technical articles and insights about modern web development, security, and TypeScript engineering.",
  openGraph: {
    title: "Blog | BlueDot",
    description: "Technical articles and insights about modern web development, security, and TypeScript engineering.",
    url: "https://bluedot.it.com/blog",
  },
  twitter: {
    title: "Blog | BlueDot",
    description: "Technical articles and insights about modern web development, security, and TypeScript engineering.",
  },
};

export default async function Blog() {
  // Fail-fast: if DB is slow/unavailable, return empty list so page still loads
  const posts = await Promise.race([
    prisma.post.findMany({ orderBy: { createdAt: "desc" } }),
    new Promise<any[]>((resolve) => setTimeout(() => resolve([]), 3000)),
  ]).catch(() => [] as any[]);

  return (
    <div className="py-16">
      <Section title="Blog" subtitle="Notes, essays, and updates">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="rounded-lg border border-neutral-800/70 bg-neutral-950/70 p-8 max-w-md mx-auto">
              <h2 className="text-2xl font-semibold mb-3">No posts yet</h2>
              <p className="text-neutral-400 mb-6">Check back soon for new articles.</p>
              <Link href="/" className="inline-block px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500">Back to Home</Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <div className="rounded-lg border border-neutral-800/70 bg-neutral-950/70 p-6 hover:border-bluedot-500/50 transition-colors h-full">
                  <h2 className="text-xl font-semibold text-cyan-400 mb-2 line-clamp-2">{post.title}</h2>
                  <p className="text-sm text-neutral-400 line-clamp-3 mb-4">{post.excerpt}</p>
                  <div className="text-xs text-neutral-500">{new Date(post.createdAt).toLocaleDateString()}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}