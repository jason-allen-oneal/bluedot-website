'use client';

import { useEffect } from 'react';
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
    <div className="fixed inset-0 w-full h-full select-none overflow-hidden text-base-content/80">
      {/* Clean gradient background matching desktop */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/40 via-base-300/80 to-base-200/90" />
      
      {/* Single subtle accent */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-3xl" />
      
      {/* Error content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="rounded-lg border border-accent/70 bg-secondary/80 shadow-xl p-8 w-full max-w-md text-center">
          <div className="mb-6">
            <div className="text-6xl mb-4">😵</div>
            <h1 className="text-2xl font-bold mb-2 text-accent">Something went wrong!</h1>
            <p className="text-base-content/70 mb-6">
              An unexpected error occurred. Please try again or contact support if the problem persists.
            </p>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={reset}
              className="w-full p-3 bg-accent text-secondary rounded-md hover:bg-primary transition-colors"
            >
              Try again
            </button>
            <Link
              href="/"
              className="block w-full p-3 border border-accent/60 rounded-md hover:bg-secondary/40 transition-colors"
            >
              Go back home
            </Link>
          </div>
          
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-6 text-left">
              <summary className="cursor-pointer text-sm text-base-content/70 hover:text-secondary">
                Error details (development only)
              </summary>
              <pre className="mt-2 p-3 bg-secondary/60 border border-accent/50 rounded text-xs overflow-auto text-secondary">
                {error.message}
              </pre>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}
