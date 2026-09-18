'use client';

import * as React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function AnalyticsSkeleton() {
  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border/60">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-10 w-48 rounded-xl" />
      </div>

      {/* Overview Metrics Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Skeleton className="h-36 rounded-xl" />
        <Skeleton className="h-36 rounded-xl" />
        <Skeleton className="h-36 rounded-xl" />
        <Skeleton className="h-36 rounded-xl" />
      </div>

      {/* Performance Trend Chart Skeleton */}
      <Skeleton className="h-80 w-full rounded-xl" />

      {/* Split Row 1 Skeleton */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-7">
          <Skeleton className="h-96 w-full rounded-xl" />
        </div>
        <div className="col-span-12 lg:col-span-5">
          <Skeleton className="h-96 w-full rounded-xl" />
        </div>
      </div>

      {/* Areas to Improve Skeleton */}
      <Skeleton className="h-64 w-full rounded-xl" />

      {/* Split Row 2 Skeleton */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-7">
          <Skeleton className="h-80 w-full rounded-xl" />
        </div>
        <div className="col-span-12 lg:col-span-5">
          <Skeleton className="h-80 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
