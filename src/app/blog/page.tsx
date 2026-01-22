import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Card, CardHeader, CardContent } from "@/components/ui/Card"
import Button from "@/components/ui/Button"
import Reveal from "@/components/Reveal"
import { Metadata } from "next"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on technology, cybersecurity, and creative problem-solving.  Insights from building AI-powered security tools and modern web applications.',
  openGraph: {
    title: 'Blog | BlueDot IT',
    description:  'Thoughts on technology, cybersecurity, and creative problem-solving',
    type: 'website',
  }
}

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
    <div className="page-shell space-y-12">
      <div className="text-center space-y-4">
        <span className="kicker">Bluedot journal</span>
        <h1 className="heading-accent text-4xl md:text-5xl font-bold">
          Notes from the lab and the field.
        </h1>
        <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
          Thoughts on technology, cybersecurity, and creative problem-solving
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {posts.map((post: any) => (
            <Reveal key={post.id} className="h-full">
              <Card
                className="transition-all duration-300 hover:-translate-y-1 h-full"
              >
                <CardHeader>
                  <time className="text-sm text-primary">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </CardHeader>
                <CardContent>
                  <h2 className="text-xl font-bold text-base-content hover:text-primary transition-colors mb-3">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  {post.excerpt && (
                    <p className="text-base-content/80 leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-primary hover:text-accent text-sm font-medium"
                  >
                    Read more →
                  </Link>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal>
          <Card className="p-12 text-center">
            <h2 className="text-2xl font-bold text-base-content mb-4">No posts yet</h2>
            <p className="text-base-content/80 mb-6">
              I&apos;m working on some interesting content. Check back soon!
            </p>
          </Card>
        </Reveal>
      )}

      <Reveal>
        <Card className="mt-4 p-8 text-center">
          <h2 className="text-2xl font-bold text-base-content mb-4">Stay Updated</h2>
          <p className="text-base-content/80 mb-6 max-w-2xl mx-auto">
            Follow my blog for insights on cybersecurity, development, and
            creative projects. I share practical tips and behind-the-scenes looks
            at my work.
          </p>
          <Button>
            <Link href="/contact">Subscribe to Updates</Link>
          </Button>
        </Card>
      </Reveal>
    </div>
  )
}
