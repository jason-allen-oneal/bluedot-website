'use client';

import { useEffect } from 'react';
import Background from '@/components/Background';
import Nav from '@/components/Nav';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen">
      <Background />
      <Nav />
      <div className="flex items-center justify-center min-h-screen pt-14">
        <div className="card p-8 w-full max-w-md text-center">
          <div className="mb-6">
            <div className="text-6xl mb-4">😵</div>
            <h1 className="text-2xl font-bold mb-2">Something went wrong!</h1>
            <p className="text-muted mb-6">
              An unexpected error occurred. Please try again or contact support if the problem persists.
            </p>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={reset}
              className="w-full p-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Try again
            </button>
            <Link
              href="/"
              className="block w-full p-3 border border-border rounded-md hover:bg-surface transition-colors"
            >
              Go back home
            </Link>
          </div>
          
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-6 text-left">
              <summary className="cursor-pointer text-sm text-muted hover:text-foreground">
                Error details (development only)
              </summary>
              <pre className="mt-2 p-3 bg-surface rounded text-xs overflow-auto">
                {error.message}
              </pre>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}
