import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { apiRateLimit } from "@/lib/rateLimit";

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
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
    const commentId = parseInt(params.id);
    const body = await request.json();
    const { approved } = body;

    const comment = await prisma.comment.update({
      where: { id: commentId },
      data: { approved },
    });
    return NextResponse.json(comment);
  } catch (error) {
    console.error("Error updating comment:", error);
    return NextResponse.json(
      { error: "Failed to update comment" },
      { status: 500 }
    );
  }
}

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
    const commentId = parseInt(params.id);

    await prisma.comment.delete({
      where: { id: commentId },
    });
    return NextResponse.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json(
      { error: "Failed to delete comment" },
      { status: 500 }
    );
  }
}
