'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{
        margin: 0,
        padding: 0,
        backgroundColor: '#0A0A0A',
        color: '#F0EEE9',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}>
        <div style={{ textAlign: 'center', padding: '2rem', maxWidth: '600px' }}>
          <AlertTriangle
            size={80}
            style={{
              color: 'rgba(239, 68, 68, 0.3)',
              margin: '0 auto 1.5rem',
            }}
          />

          <h1 style={{
            fontSize: '6rem',
            fontWeight: 'bold',
            color: '#ef4444',
            margin: '0 0 1rem',
          }}>
            Error
          </h1>

          <h2 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            margin: '0 0 1rem',
          }}>
            Critical Error
          </h2>

          <p style={{
            fontSize: '1.125rem',
            color: 'rgba(240, 238, 233, 0.6)',
            marginBottom: '2rem',
          }}>
            A critical error occurred. Please refresh the page or try again later.
          </p>

          <button
            onClick={reset}
            style={{
              backgroundColor: '#C9A46B',
              color: '#0A0A0A',
              fontWeight: 'bold',
              padding: '1rem 2rem',
              borderRadius: '0.375rem',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
