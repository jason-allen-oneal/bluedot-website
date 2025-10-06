import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title, slug, excerpt, content, categoryId, tagIds } = await req.json();

    if (!title || !slug || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        categoryId: categoryId ? Number(categoryId) : null,
        tags: {
          create: tagIds?.map((id: number) => ({
            tag: { connect: { id: Number(id) } },
          })) || [],
        },
      },
      include: { category: true, tags: { include: { tag: true } } },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
