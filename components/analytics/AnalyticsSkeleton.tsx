import * as React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function AnalyticsSkeleton() {
  return (
    <div className="relative pb-24 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-9 w-64 rounded-lg" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_200px] gap-8">
        
        {/* Main Content Area */}
        <div className="space-y-16 min-w-0">
          
          {/* Chapter 1 */}
          <div className="space-y-8">
            <Skeleton className="h-4 w-32 mb-6" />
            <Skeleton className="h-[200px] w-full rounded-xl" />
            <Skeleton className="h-[120px] w-full rounded-xl" />
            <Skeleton className="h-[250px] w-full rounded-xl" />
          </div>

          {/* Chapter 2 */}
          <div className="space-y-8">
            <Skeleton className="h-4 w-24 mb-6" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Skeleton className="h-[120px] w-full rounded-xl" />
              <Skeleton className="h-[120px] w-full rounded-xl" />
              <Skeleton className="h-[120px] w-full rounded-xl" />
              <Skeleton className="h-[120px] w-full rounded-xl" />
            </div>
            <Skeleton className="h-[300px] w-full rounded-xl" />
          </div>

          {/* Chapter 3 */}
          <div className="space-y-8">
            <Skeleton className="h-4 w-32 mb-6" />
            <Skeleton className="h-[400px] w-full rounded-xl" />
            <Skeleton className="h-[300px] w-full rounded-xl" />
          </div>
          
        </div>

        {/* Floating Sidebar Skeleton */}
        <div className="hidden xl:block">
          <div className="sticky top-24 pl-4 border-l border-border/40 space-y-4">
            <Skeleton className="h-3 w-16 mb-4" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>

      </div>
    </div>
  );
}
