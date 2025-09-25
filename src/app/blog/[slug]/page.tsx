"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = { params: { slug: string } };

export default function BlogPostRedirect({ params }: Props) {
  const router = useRouter();
  const { slug } = params;

  useEffect(() => {
    // Redirect to the main page with a hash to indicate which blog post to open
    router.push(`/#blog-post-${slug}`);
  }, [slug, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto mb-4"></div>
        <p className="text-neutral-400">Redirecting to blog post...</p>
      </div>
    </div>
  );
}