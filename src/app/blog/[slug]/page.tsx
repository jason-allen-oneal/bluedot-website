import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Section from "@/components/Section";
import SocialShare from "@/components/SocialShare";
import Comments from "@/components/Comments";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import remarkBreaks from "remark-breaks";
import rehypeStringify from "rehype-stringify";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeRaw from "rehype-raw";
import type { Metadata } from "next";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  
  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt || `Read ${post.title} on BlueDot`,
    openGraph: {
      title: post.title,
      description: post.excerpt || `Read ${post.title} on BlueDot`,
      url: `https://bluedot.it.com/blog/${slug}`,
      type: 'article',
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: ['Jason O\'Neal'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || `Read ${post.title} on BlueDot`,
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = params;
  
  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) return notFound();
  console.log("raw",post.content);

  // Normalize content: remove shared leading indentation to avoid accidental full-page code blocks
  const stripSharedIndent = (text: string): string => {
    const lines = text.replace(/\t/g, "    ").split("\n");
    const nonEmpty = lines.filter((l) => l.trim().length > 0);
    if (nonEmpty.length === 0) return text;
    const indentSizes = nonEmpty.map((l) => (l.match(/^ +/g)?.[0]?.length ?? 0));
    const minIndent = Math.min(...indentSizes);
    if (!isFinite(minIndent) || minIndent === 0) return text;
    return lines
      .map((l) => (l.startsWith(" ".repeat(minIndent)) ? l.slice(minIndent) : l))
      .join("\n");
  };

  const normalizedContent = stripSharedIndent(post.content || "");

  // Parse markdown → HTML and sanitize with a strict schema
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

  const file = await processor.process(normalizedContent);
  const sanitizedHtml = String(file);

  // Format date in a friendly way
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date));
  };

  return (
    <div className="py-16">
      <Section title="Blog" subtitle="Notes, essays, and updates">
        <article className="rounded-lg border border-neutral-800/70 bg-neutral-950/70 p-6 md:p-10">
          {/* Header Section */}
          <header className="mb-8 text-center">
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-primary bg-primary/10 border border-primary/20 rounded-full">
                Blog Post
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-cyan-400">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-xl md:text-2xl text-muted mb-6 max-w-3xl mx-auto leading-relaxed">
                {post.excerpt}
              </p>
            )}
            <div className="flex items-center justify-center gap-4 text-sm text-muted">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Published on {formatDate(post.createdAt)}</span>
              </div>
              <div className="w-1 h-1 bg-muted rounded-full"></div>
              <div className="flex items-center gap-2">
                <span>Reading time: ~{Math.ceil(post.content.split(' ').length / 200)} min</span>
              </div>
            </div>
          </header>
          
          {/* Content Section */}
          <div className="relative">
            {/* Decorative line */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            
            <div 
              className="prose prose-lg prose-invert prose-tech max-w-none w-full mt-8"
              dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
            />
            
            {/* Bottom decorative line */}
            <div className="mt-12 pt-8 border-t border-border/50">
              <div className="text-center text-sm text-muted">
                <p>Thanks for reading! 📚</p>
              </div>
              <SocialShare 
                title={post.title}
                url={`https://bluedot.it.com/blog/${slug}`}
                description={post.excerpt || undefined}
              />
            </div>
          </div>
        </article>
        <div className="mt-8">
          <Comments postId={post.id} />
        </div>
      </Section>
    </div>
  );
}