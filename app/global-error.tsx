'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

/**
 * Global fallback error boundary.
 * Renders custom html/body because it catches errors occurring in the root layout.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Critical root-layout error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground font-sans flex flex-col items-center justify-center px-6 py-24 text-center antialiased">
        <div className="max-w-md w-full border border-border bg-card text-card-foreground p-8 rounded-lg shadow-sm">
          <div className="w-12 h-12 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">System Crash</h1>
          <p className="text-sm text-muted-foreground mb-6">
            A critical configuration or runtime crash prevented the page from rendering.
          </p>
          <Button onClick={() => reset()} className="w-full">
            Restart Application
          </Button>
        </div>
      </body>
    </html>
  );
}
