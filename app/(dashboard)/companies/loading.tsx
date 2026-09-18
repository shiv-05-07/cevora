import * as React from 'react';
import { PageContainer } from '@/components/dashboard/PageContainer';
import { Skeleton } from '@/components/ui/skeleton';

export default function CompaniesLoading() {
  return (
    <PageContainer>
      <div className="space-y-6 pb-12">
        {/* User profile bar skeleton */}
        <div className="bg-card border border-border/50 rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-5 w-64" />
            <Skeleton className="h-4 w-80" />
          </div>
          <Skeleton className="h-8 w-28 rounded-full" />
        </div>

        {/* Filter bar skeleton */}
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1 rounded-lg" />
          <Skeleton className="h-10 w-28 rounded-md" />
        </div>

        {/* Company grid skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-48" />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-6 border border-border/40 bg-card rounded-xl space-y-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="w-12 h-12 rounded-md" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
                <Skeleton className="h-2 w-full rounded" />
                <div className="space-y-2 pt-2">
                  <Skeleton className="h-3 w-5/6" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
                <div className="flex gap-2 pt-4">
                  <Skeleton className="h-9 flex-1 rounded-md" />
                  <Skeleton className="h-9 flex-1 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
