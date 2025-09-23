import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Background from "@/components/Background";
import Nav from "@/components/Nav";
import SocialShare from "@/components/SocialShare";
import Comments from "@/components/Comments";
import { remark } from "remark";
import html from "remark-html";
import sanitizeHtml from "sanitize-html";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
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

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) return notFound();

  // Parse markdown to HTML on the server
  const processedContent = await remark()
    .use(html)
    .process(post.content);
  const contentHtml = processedContent.toString();

  // Sanitize the HTML content to prevent XSS
  const sanitizedHtml = sanitizeHtml(contentHtml, {
    allowedTags: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'strong', 'em', 'u', 's',
      'code', 'pre', 'blockquote',
      'ul', 'ol', 'li',
      'a', 'img',
      'table', 'thead', 'tbody', 'tr', 'th', 'td'
    ],
    allowedAttributes: {
      'a': ['href', 'title', 'target'],
      'img': ['src', 'alt', 'title']
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowProtocolRelative: false
  });

  // Format date in a friendly way
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date));
  };

  return (
    <div className="min-h-screen">
      <Background />
      <Nav />
                        <div className="relative mx-auto max-w-[1100px] px-6 pt-20 pb-10 md:pt-28 md:pb-20">
                    <article className="card p-8 md:p-12">
          {/* Header Section */}
          <header className="mb-8 text-center">
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-primary bg-primary/10 border border-primary/20 rounded-full">
                Blog Post
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
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
              className="prose prose-lg w-full mt-8"
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
        
        {/* Comments Section */}
        <Comments postId={post.id} />
      </div>
    </div>
  );
}