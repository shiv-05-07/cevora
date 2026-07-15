import * as React from 'react';
import { cn } from '@/lib/utils';

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted/60 dark:bg-muted/40', className)}
      {...props}
    />
  );
}

export function SkeletonSidebar() {
  return (
    <div className="w-64 h-screen border-r border-border/80 bg-card p-5 flex flex-col justify-between dark:border-border/40 select-none">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Skeleton className="w-8 h-8 rounded" />
          <Skeleton className="w-24 h-5" />
        </div>
        <Skeleton className="w-full h-9 rounded-lg" />
        <div className="space-y-3 pt-4">
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
        </div>
      </div>
      <div className="space-y-3">
        <Skeleton className="w-full h-8" />
        <div className="flex items-center gap-3 pt-2">
          <Skeleton className="w-8 h-8 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-14 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonHeader() {
  return (
    <div className="h-14 w-full border-b border-border/80 bg-background/70 backdrop-blur-md px-6 flex items-center justify-between dark:border-border/40 select-none">
      <div className="flex items-center gap-6">
        <Skeleton className="w-8 h-8 rounded-md md:hidden" />
        <Skeleton className="w-40 h-4" />
      </div>
      <Skeleton className="hidden md:block w-96 h-8 rounded-md" />
      <div className="flex items-center gap-4">
        <Skeleton className="w-7 h-7 rounded-full" />
        <Skeleton className="w-7 h-7 rounded-full" />
        <Skeleton className="w-8 h-8 rounded-full" />
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-6 space-y-4 dark:border-border/40">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-lg" />
        <div className="space-y-1.5 flex-1">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-14 h-3" />
        </div>
      </div>
      <div className="space-y-2 pt-2">
        <Skeleton className="w-full h-3" />
        <Skeleton className="w-full h-3" />
        <Skeleton className="w-2/3 h-3" />
      </div>
      <div className="flex justify-between items-center pt-4">
        <Skeleton className="w-16 h-3" />
        <Skeleton className="w-20 h-7 rounded-md" />
      </div>
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="border border-border/60 rounded-xl overflow-hidden bg-card dark:border-border/40 select-none">
      <div className="border-b border-border/60 bg-muted/30 px-6 py-4 flex items-center justify-between dark:border-border/40">
        <Skeleton className="w-32 h-4" />
        <Skeleton className="w-16 h-6" />
      </div>
      <div className="divide-y divide-border/60 dark:divide-border/40">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <Skeleton className="w-8 h-8 rounded-full shrink-0" />
              <div className="space-y-1.5 flex-1">
                <Skeleton className="w-1/3 h-4" />
                <Skeleton className="w-1/4 h-3" />
              </div>
            </div>
            <Skeleton className="w-20 h-4 shrink-0" />
            <Skeleton className="w-16 h-6 rounded shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
