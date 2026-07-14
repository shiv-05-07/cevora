import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Custom 404 Not Found route page.
 * Styled in accordance with DESIGN_SYSTEM.md guidelines for empty/error states.
 */
export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
      <div className="max-w-md w-full border border-border bg-card text-card-foreground p-8 rounded-lg shadow-sm">
        <div className="w-12 h-12 bg-muted text-muted-foreground rounded-full flex items-center justify-center mx-auto mb-4">
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
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        
        <h1 className="text-3xl font-extrabold tracking-tight mb-1">404</h1>
        <h2 className="text-lg font-semibold mb-3">Page Not Found</h2>
        <p className="text-sm text-muted-foreground mb-6">
          The page you are looking for doesn&apos;t exist or has been relocated.
        </p>
        
        <Link 
          href="/" 
          className={cn(buttonVariants({ variant: 'default' }), 'w-full sm:w-auto')}
        >
          Go back home
        </Link>
      </div>
    </main>
  );
}
