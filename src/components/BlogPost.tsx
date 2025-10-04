import { MDXRemote } from 'next-mdx-remote-client/rsc'
import React from "react";

// If you need interactive bits, put them in client components and
// reference those here by name; it's allowed for a server component
// to render client components.
function A(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a {...props} className="underline decoration-dotted hover:decoration-solid" />;
}

function Img(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  return <img {...props} className="mx-auto h-auto max-w-full" />;
}

function Code(props: React.HTMLAttributes<HTMLElement>) {
  return <code {...props} className="whitespace-pre-wrap" />;
}

function Pre(props: React.HTMLAttributes<HTMLPreElement>) {
  return <pre {...props} className="overflow-x-auto whitespace-pre" />;
}

type BlogPostProps = {
  post: {
    title: string;
    content: string; // MD/MDX from DB
  };
};


export default async function BlogPost({ post }: BlogPostProps) {

  const components = {
    a: A,
    img: Img,
    code: Code,
    pre: Pre,
    // Button: (await import("./ClientButton")).default // example pattern if needed
  };
  
  return (
    <article
      className="
        markdown prose prose-invert
        max-w-full w-full break-words
        prose-a:break-words
        prose-img:mx-auto prose-img:max-w-full prose-img:h-auto
        prose-pre:overflow-x-auto prose-pre:whitespace-pre
        prose-table:block prose-table:w-full prose-table:overflow-x-auto
      "
    >
      <MDXRemote
        source={post.content}
        components={components}
      />
    </article>
  );
}
