// Server Component by default
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import React from "react";

// Optional: map HTML tags to styled components
const components = {
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props} className="underline decoration-dotted hover:decoration-solid" />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // Tailwind Typography already makes images responsive; keep max width safe
    <img {...props} className="mx-auto h-auto max-w-full" />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code {...props} className="whitespace-pre-wrap" />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre {...props} className="overflow-x-auto whitespace-pre" />
  ),
};

type BlogPostProps = {
  post: {
    title: string;
    content: string; // MD/MDX from your database
    // ...anything else you store
  };
};

export default async function BlogPost({ post }: BlogPostProps) {
  // Compile MDX from a *string* (from your DB) on the server
  const { content } = await compileMDX({
    source: post.content,
    components,
    options: {
      // MDX options
      mdxOptions: {
        // Keep behavior consistent with your old ReactMarkdown setup
        remarkPlugins: [remarkGfm, remarkBreaks],
        // add rehype plugins here if needed (e.g., syntax highlighting)
      },
      // parseFrontmatter: true, // enable if you embed frontmatter in the DB string
    },
  });

  return (
    <article className="markdown prose prose-invert max-w-full w-full break-words
      prose-a:break-words prose-img:mx-auto prose-img:max-w-full prose-img:h-auto
      prose-pre:overflow-x-auto prose-pre:whitespace-pre
      prose-table:block prose-table:w-full prose-table:overflow-x-auto">
      <h1>{post.title}</h1>
      {content}
    </article>
  );
}
