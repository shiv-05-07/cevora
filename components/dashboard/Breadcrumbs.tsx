'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

const ROUTE_MAP: Record<string, string> = {
  dashboard: 'Dashboard',
  companies: 'Companies',
  roadmaps: 'Roadmaps',
  resume: 'Resume Analyzer',
  'oa-practice': 'OA Practice',
  interview: 'AI Interview',
  mentor: 'AI Mentor',
  analytics: 'Analytics',
  settings: 'Settings',
};

export function Breadcrumbs() {
  const pathname = usePathname();

  // Split pathname into segments, filter out empty ones
  const segments = pathname ? pathname.split('/').filter(Boolean) : [];

  // Ignore group router names like (dashboard) if Next.js includes them
  const visibleSegments = segments.filter(seg => !seg.startsWith('(') && !seg.endsWith(')'));

  return (
    <nav className="flex items-center space-x-1.5 text-xs text-muted-foreground select-none" aria-label="Breadcrumb">
      <Link
        href="/dashboard"
        className="flex items-center hover:text-foreground transition-colors duration-150 py-0.5 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        <Home className="w-3.5 h-3.5" />
        <span className="sr-only">Home</span>
      </Link>

      {visibleSegments.map((segment, index) => {
        const isLast = index === visibleSegments.length - 1;
        const displayLabel = ROUTE_MAP[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
        const path = `/${visibleSegments.slice(0, index + 1).join('/')}`;

        return (
          <React.Fragment key={path}>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0" />
            {isLast ? (
              <span className="font-semibold text-foreground truncate max-w-[120px] sm:max-w-none">
                {displayLabel}
              </span>
            ) : (
              <Link
                href={path}
                className="hover:text-foreground transition-colors duration-150 truncate max-w-[120px] sm:max-w-none rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                {displayLabel}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
