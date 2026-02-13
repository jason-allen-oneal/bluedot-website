import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';


export async function POST(req: Request){
    const session = await auth();
    const { postId, body } = await req.json();

    if (!postId || !body) return new Response('Bad Request', { status: 400 });

    const comment = await prisma.comment.create({ data: {
        postId: Number(postId),
        content: String(body).slice(0, 4000),
        author: session?.user?.name || 'Anonymous',
        email: session?.user?.email || 'anonymous@example.com'
    }});

    return Response.json({ id: comment.id });
}