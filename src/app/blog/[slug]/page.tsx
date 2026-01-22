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
    <div className="page-shell">
      <div className="mx-auto max-w-3xl space-y-12 py-12">
        <Card className="p-8">
          <CardHeader>
            <h1 className="text-3xl font-bold text-base-content">{post.title}</h1>
            <p className="text-sm text-base-content/70">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </CardHeader>
          <CardContent className="prose max-w-none prose-headings:text-base-content prose-p:text-base-content/85 prose-strong:text-primary prose-code:text-primary">
            <MDXContent source={mdxSource} />
          </CardContent>
        </Card>

        <Card className="p-8">
          <CardHeader>
            <h2 className="text-xl font-semibold text-base-content">Comments</h2>
          </CardHeader>
          <CardContent className="space-y-6">
            <CommentForm postId={post.id} />
            <Separator className="bg-white/10" />
            <ul className="space-y-4">
              {comments.map((comment: any) => (
                <li
                  key={comment.id}
                  className="rounded-xl border border-white/10 p-4"
                >
                  <div className="text-sm text-base-content/70">
                    {comment.author} •{" "}
                    {new Date(comment.createdAt).toLocaleString()}
                  </div>
                  <p className="mt-1 text-base-content/85 whitespace-pre-wrap">
                    {comment.content}
                  </p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
