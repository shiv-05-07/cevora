import * as React from 'react';
import { cn } from '@/lib/utils';

export function PageContainer({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex-1 flex flex-col gap-6 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto focus-visible:outline-none',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
