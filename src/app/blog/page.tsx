import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const dynamic = "force-dynamic"

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      createdAt: true,
    },
  })

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      {/* Header */}
      <div className="text-center mb-16 space-y-3">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Blog
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Thoughts on technology, cybersecurity, and creative problem-solving
        </p>
      </div>

      {/* Posts */}
      {posts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any) => (
            <Card
              key={post.id}
              className="bg-gray-950/60 backdrop-blur-md border border-white/90 transition-all duration-300 hover:border-blue-400/80 hover:-translate-y-1"
            >
              <CardHeader>
                <time className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </CardHeader>
              <CardContent>
                <h2 className="text-xl font-bold text-white hover:text-blue-400 transition-colors mb-3">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                {post.excerpt && (
                  <p className="text-gray-300 leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                )}
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                >
                  Read more →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-gray-950/60 backdrop-blur-md border border-white/90 p-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">No posts yet</h2>
          <p className="text-gray-400 mb-6">
            I'm working on some interesting content. Check back soon!
          </p>
        </Card>
      )}

      {/* CTA */}
      <Card className="mt-16 bg-gray-950/60 backdrop-blur-md border border-white/90 p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Stay Updated</h2>
        <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
          Follow my blog for insights on cybersecurity, development, and
          creative projects. I share practical tips and behind-the-scenes looks
          at my work.
        </p>
        <Button
          asChild
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
        >
          <Link href="/contact">Subscribe to Updates</Link>
        </Button>
      </Card>
    </div>
  )
}
