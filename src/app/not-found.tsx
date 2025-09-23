import Background from '@/components/Background';
import Nav from '@/components/Nav';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Background />
      <Nav />
      <div className="flex items-center justify-center min-h-screen pt-14">
        <div className="card p-8 w-full max-w-md text-center">
          <div className="mb-6">
            <div className="text-6xl mb-4">🔍</div>
            <h1 className="text-2xl font-bold mb-2">Page not found</h1>
            <p className="text-muted mb-6">
              The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
            </p>
          </div>
          
          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full p-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Go back home
            </Link>
            <Link
              href="/blog"
              className="block w-full p-3 border border-border rounded-md hover:bg-surface transition-colors"
            >
              Browse blog posts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
