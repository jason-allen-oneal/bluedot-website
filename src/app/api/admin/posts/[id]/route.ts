import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { apiRateLimit } from "@/lib/rateLimit";

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    // Apply rate limiting
    const rateLimitResult = apiRateLimit(request);
    if (rateLimitResult) {
      return rateLimitResult;
    }

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const params = await context.params;
    const postId = parseInt(params.id);

    await prisma.post.delete({
      where: { id: postId },
    });

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
