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
import Background from "@/components/Background";
import Nav from "@/components/Nav";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogPostClientProps {
  post: Post;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
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
              ['loading', 'string'],
              ['decoding', 'string']
            ],
          },
        })
        .use(rehypeStringify);

      const result = await processor.process(content);
      return String(result);
    } catch (error) {
      console.error("Error processing markdown:", error);
      return content;
    }
  };

  useEffect(() => {
    processMarkdown(post.content).then(setProcessedContent);
  }, [post.content]);

  return (
    <div className="min-h-screen">
      <Background />
      <Nav />
      <div className="relative mx-auto max-w-4xl px-6 pt-28 pb-10 md:pt-36 md:pb-20">
        <article>
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <time 
              className="text-muted-foreground" 
              dateTime={post.createdAt}
            >
              {new Date(post.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </time>
          </header>

          <div 
            className="prose prose-invert prose-tech max-w-none"
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />
        </article>
      </div>
    </div>
  );
}
