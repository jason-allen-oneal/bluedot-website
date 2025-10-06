import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Post ID required" }, { status: 400 });
    }

    const postId = Number(id);

    // 1️⃣ Remove post-tag relationships first
    await prisma.postTag.deleteMany({
      where: { postId },
    });

    // 2️⃣ Remove associated comments (optional, but safe to be explicit)
    await prisma.comment.deleteMany({
      where: { postId },
    });

    // 3️⃣ Now safely delete the post
    await prisma.post.delete({
      where: { id: postId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
