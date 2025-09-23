import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Background from "@/components/Background";
import Nav from "@/components/Nav";
import type { Metadata } from "next";

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
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen">
      <Background />
      <Nav />
      <section id="content" className="relative mx-auto max-w-[1100px] px-6 pt-28 pb-10 md:pt-36 md:pb-20">

        <h1 className="text-4xl font-bold mb-6">Blog</h1>
        
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="card p-8 max-w-md mx-auto">
              <h2 className="text-2xl font-semibold mb-4">No posts yet</h2>
              <p className="text-muted mb-6">
                Check back soon for new articles and updates.
              </p>
              <Link 
                href="/"
                className="inline-block px-6 py-3 bg-accent text-white rounded-md hover:opacity-90 transition-colors font-medium"
                style={{ backgroundColor: 'var(--accent)' }}
              >
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: any) => (
              <div key={post.id} className="card p-6 hover:shadow-md transition-shadow">
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-xl font-semibold hover:text-primary transition-colors mb-3">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-muted mb-4">{post.excerpt}</p>
                <div className="text-sm text-muted">
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}