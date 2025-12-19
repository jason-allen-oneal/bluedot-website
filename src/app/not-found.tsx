import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you\'re looking for doesn\'t exist or has been moved.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="fixed inset-0 w-full h-full select-none overflow-hidden text-secondary-content">
      {/* Clean gradient background matching desktop */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/40 via-base-300/80 to-base-200/90" />
      
      {/* Single subtle accent */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-3xl" />
      
      {/* Not found content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="rounded-lg border border-accent/70 bg-secondary/80 shadow-xl p-8 w-full max-w-md text-center">
          <div className="mb-6">
            <div className="text-6xl mb-4">🔍</div>
            <h1 className="text-2xl font-bold mb-2 text-accent">Page not found</h1>
            <p className="text-base-400 mb-6">
              The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
            </p>
          </div>
          
          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full p-3 bg-accent text-secondary rounded-md hover:bg-primary transition-colors"
            >
              Go back home
            </Link>
            <Link
              href="/blog"
              className="block w-full p-3 border border-accent/60 rounded-md hover:bg-secondary/40 transition-colors"
            >
              Browse blog posts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
