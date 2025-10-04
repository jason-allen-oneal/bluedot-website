"use client";

/**
 * Minimal Markdown renderer (no rehype).
 * - remarkGfm + remarkBreaks only.
 * - Styles applied to a wrapper div to avoid TS prop issues.
 * - Horizontal overflow contained to code/tables; modal never scrolls sideways.
 */

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { decodeHtmlEntities } from "@/lib/utils";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export default function BlogPost({ slug }: { slug: string }) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [decodedContent, setDecodedContent] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/blog/${slug}`);
        if (!res.ok) return;
        const data = await res.json();
        setPost(data);
        // Decode HTML entities before rendering
        setDecodedContent(decodeHtmlEntities(data.content));
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if (loading) {
    return (
      <div className="p-6 h-full overflow-y-auto overflow-x-hidden">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto mb-4" />
            <p className="text-neutral-400">Loading post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="p-6 h-full overflow-y-auto overflow-x-hidden">
        <div className="flex items-center justify-center h-full">
          <p className="text-neutral-400">Post not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto overflow-x-hidden p-6 text-slate-100">
      <div className="mx-auto w-full max-w-3xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-cyan-200">{post.title}</h1>
          <div className="text-slate-400 mb-6">
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </header>

        {/* Wrapper gets all styling; ReactMarkdown stays prop-simple */}
        <div
          className="
            markdown
            prose prose-invert
            max-w-full w-full
            break-words
            prose-a:break-words
            prose-img:mx-auto prose-img:max-w-full prose-img:h-auto
            prose-pre:overflow-x-auto prose-pre:whitespace-pre
            prose-table:block prose-table:w-full prose-table:overflow-x-auto
          "
        >
          <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
            {decodedContent}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

/* OPTIONAL (globals.css)
.markdown * { max-width: 100%; min-width: 0; }
.markdown iframe, .markdown video { width: 100%; height: auto; }
*/
