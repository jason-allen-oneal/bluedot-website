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
    <div className="fixed inset-0 w-full h-full select-none overflow-hidden text-slate-100">
      {/* Clean gradient background matching desktop */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-950" />
      
      {/* Single subtle accent */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl" />
      
      {/* Error content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="rounded-lg border border-neutral-800 bg-neutral-950/80 shadow-xl p-8 w-full max-w-md text-center">
          <div className="mb-6">
            <div className="text-6xl mb-4">😵</div>
            <h1 className="text-2xl font-bold mb-2 text-cyan-400">Something went wrong!</h1>
            <p className="text-slate-400 mb-6">
              An unexpected error occurred. Please try again or contact support if the problem persists.
            </p>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={reset}
              className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Try again
            </button>
            <Link
              href="/"
              className="block w-full p-3 border border-slate-700 rounded-md hover:bg-slate-800 transition-colors"
            >
              Go back home
            </Link>
          </div>
          
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-6 text-left">
              <summary className="cursor-pointer text-sm text-slate-400 hover:text-slate-300">
                Error details (development only)
              </summary>
              <pre className="mt-2 p-3 bg-slate-900 rounded text-xs overflow-auto text-slate-300">
                {error.message}
              </pre>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}
