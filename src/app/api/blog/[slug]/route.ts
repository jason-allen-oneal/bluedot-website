import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ slug: string }> }
) {
	try {
		const { slug } = await params;

		const post = await prisma.post.findUnique({
			where: { slug },
			select: {
				id: true,
				title: true,
				slug: true,
				excerpt: true,
				content: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		if (!post) {
			return NextResponse.json({ error: "Post not found" }, { status: 404 });
		}

		return NextResponse.json(post);
	} catch (error) {
		console.error("Failed to fetch blog post:", error);
		return NextResponse.json(
			{ error: "Failed to fetch blog post" },
			{ status: 500 }
		);
	}
}
