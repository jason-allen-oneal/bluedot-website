import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { id, title, slug, excerpt, content, categoryId, tagIds } = await req.json();

    if (!id || !title || !slug || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Clear existing tag relations first, then reattach
    await prisma.postTag.deleteMany({ where: { postId: Number(id) } });

    const updated = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        title,
        slug,
        excerpt,
        content,
        categoryId: categoryId ? Number(categoryId) : null,
        tags: {
          create: tagIds?.map((tagId: number) => ({
            tag: { connect: { id: Number(tagId) } },
          })) || [],
        },
      },
      include: { category: true, tags: { include: { tag: true } } },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error editing post:", error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}
