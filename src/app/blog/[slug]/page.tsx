import { serialize } from "next-mdx-remote/serialize"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import MDXContent from "@/components/MDXContent"
import CommentForm from "@/components/CommentForm"
import { Card, CardHeader, CardContent } from "@/components/ui/Card"
import { Separator } from "@/components/ui/Separator"

export const dynamic = "force-dynamic"

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await prisma.post.findUnique({
    where: { slug },
    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
      createdAt: true,
    },
  })

  if (!post) notFound()

  const mdxSource = await serialize(post.content)
  const comments = await prisma.comment.findMany({
    where: { postId: post.id },
    orderBy: { createdAt: "desc" },
    select: { id: true, content: true, author: true, createdAt: true },
  })

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 space-y-12">
      <Card className="p-8">
        <CardHeader>
          <h1 className="text-3xl font-bold text-secondary">{post.title}</h1>
          <p className="text-sm text-neutral-content">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </CardHeader>
        <CardContent className="prose max-w-none prose-headings:text-secondary prose-p:text-secondary-content prose-strong:text-secondary prose-code:text-primary">
          <MDXContent source={mdxSource} />
        </CardContent>
      </Card>

      {/* Comments */}
      <Card className="p-8">
        <CardHeader>
          <h2 className="text-xl font-semibold text-secondary">Comments</h2>
        </CardHeader>
        <CardContent className="space-y-6">
          <CommentForm postId={post.id} />
          <Separator className="bg-accent/40" />
          <ul className="space-y-4">
            {comments.map((comment: any) => (
              <li
                key={comment.id}
                className="rounded-xl border border-accent/50 p-4"
              >
                <div className="text-sm text-base-400">
                  {comment.author} •{" "}
                  {new Date(comment.createdAt).toLocaleString()}
                </div>
                <p className="mt-1 text-secondary-content whitespace-pre-wrap">
                  {comment.content}
                </p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
