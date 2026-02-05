'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-deep-obsidian flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <AlertTriangle size={80} className="text-red-400/30 mx-auto mb-6" strokeWidth={1.5} />

        <h1 className="text-8xl font-unbounded font-bold text-red-400 mb-4">500</h1>

        <h2 className="text-3xl font-unbounded font-bold text-cloud-dancer mb-4">
          Something Went Wrong
        </h2>

        <p className="text-cloud-dancer/60 font-hanken text-lg mb-8 max-w-md mx-auto">
          We encountered an unexpected error. Our team has been notified and we're working to fix it.
        </p>

        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-left">
            <p className="text-red-400 font-mono text-sm break-words">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" onClick={reset}>
            Try Again
          </Button>
          <Button variant="secondary" onClick={() => window.location.href = '/'}>
            Back to Home
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-ui/30">
          <p className="text-cloud-dancer/40 text-sm font-hanken">
            Error ID: {error.digest || 'Unknown'}
          </p>
        </div>
      </div>
    </div>
  );
}
