"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import Textarea from "./ui/Textarea";

export default function CommentForm({ postId }: { postId: number }) {
    const { data: session, status } = useSession();
    const [body, setBody] = useState("");
    const [ok, setOk] = useState<string | null>(null);

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        const res = await fetch("/api/comments", {
            method: "POST",
            body: JSON.stringify({ postId, body }),
        });
        setOk(res.ok ? "Comment submitted for review." : "Failed to post comment.");
        if (res.ok) setBody("");
    }

    if (status === "loading") return <div className="animate-pulse h-24 bg-white/5 rounded-xl" />;

    if (!session) {
        return (
            <div className="rounded-xl border border-dashed border-white/20 p-8 text-center bg-white/[0.02]">
                <p className="text-sm text-base-content/60 mb-4 font-medium">
                    Authentication required to participate in the discussion.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <button 
                        onClick={() => signIn()}
                        className="px-6 py-2 bg-primary text-black text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={submit} className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                    {session.user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <span className="text-xs font-bold text-white uppercase tracking-widest opacity-60">
                    Posting as {session.user?.name}
                </span>
            </div>
            <Textarea
                rows={4}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Share your thoughts..."
                className="bg-black/20 border-white/10 focus:border-primary/50"
            />
            <div className="flex justify-between items-center">
                <p className="text-[10px] text-base-content/40 uppercase tracking-widest font-bold italic">
                    Comments are moderated.
                </p>
                <button 
                    type="submit"
                    className="px-8 py-2 bg-white text-black font-bold uppercase tracking-widest text-[10px] hover:bg-primary transition-colors"
                >
                    Post Comment
                </button>
            </div>
            {ok && <div className="text-xs font-bold uppercase tracking-widest text-primary mt-2">{ok}</div>}
        </form>
    );
}
