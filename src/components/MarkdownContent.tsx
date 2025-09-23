"use client";

import { marked } from "marked";
import { useState, useEffect } from "react";

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  const [sanitizedHtml, setSanitizedHtml] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    if (!content) {
      setSanitizedHtml("");
      return;
    }

    // Configure marked options
    marked.setOptions({
      breaks: true,
      gfm: true,
    });

    const processContent = async () => {
      try {
        const htmlContent = await marked(content);
        
        // Simple client-side sanitization (basic approach)
        // For production, consider using a more robust sanitization library
        const sanitized = String(htmlContent)
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
          .replace(/javascript:/gi, '')
          .replace(/on\w+\s*=/gi, '');

        setSanitizedHtml(sanitized);
      } catch (error) {
        console.error('Error processing markdown:', error);
        setSanitizedHtml("");
      }
    };

    processContent();
  }, [content]);

  if (!content) {
    return <div>No content provided</div>;
  }

  if (!isMounted) {
    return <div>Loading...</div>;
  }

  return (
    <div 
      className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-surface prose-pre:border prose-pre:border-border"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
