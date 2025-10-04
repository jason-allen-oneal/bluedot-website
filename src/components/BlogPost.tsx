"use client";

import { useEffect, useState } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogPostProps {
  slug: string;
}

export default function BlogPost({ slug }: BlogPostProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [processedContent, setProcessedContent] = useState<string>("");

  const processMarkdown = async (content: string) => {
    try {
      const processor = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkBreaks)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeSanitize, {
          ...defaultSchema,
          tagNames: [
            ...(defaultSchema.tagNames || []),
            'figure', 'figcaption', 'caption', 'details', 'summary', 'input'
          ],
          attributes: {
            ...(defaultSchema.attributes || {}),
            a: [
              ...(defaultSchema.attributes?.a || []),
              ['target', 'string'],
              ['rel', 'space-separated']
            ],
            img: [
              ...(defaultSchema.attributes?.img || []),
              ['loading', 'string'], ['decoding', 'string'],
              ['width', 'number'], ['height', 'number']
            ],
            input: [
              ['type', 'checkbox'], ['checked', 'checked'], ['disabled', 'disabled']
            ],
            code: [
              ...(defaultSchema.attributes?.code || []),
              ['className', 'token list']
            ]
          }
        })
        .use(rehypeStringify);

      const file = await processor.process(content);
      return String(file);
    } catch (error) {
      console.error('Error processing markdown:', error);
      return content;
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog/${slug}`);
        if (response.ok) {
          const data = await response.json();
          console.log("fetched post", data);
          setPost(data);
          const processed = await processMarkdown(data.content);
          setProcessedContent(processed);
        }
      } catch (error) {
        console.error('Failed to fetch post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="p-6 h-full overflow-y-auto">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto mb-4"></div>
            <p className="text-neutral-400">Loading post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="p-6 h-full overflow-y-auto">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-neutral-400">Post not found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto p-6 text-slate-100">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-cyan-200">{post.title}</h1>
          <div className="text-slate-400 mb-6">
            {new Date(post.createdAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </header>

        <div
          className="max-w-none"
          dangerouslySetInnerHTML={{ __html: processedContent }}
        />
      </div>
    </div>
  );
}
