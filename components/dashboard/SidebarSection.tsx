'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface SidebarSectionProps {
  title?: string;
  isExpanded: boolean;
  children: React.ReactNode;
  className?: string;
}

export function SidebarSection({ title, isExpanded, children, className }: SidebarSectionProps) {
  return (
    <div className={cn('space-y-1', className)}>
      {title && isExpanded && (
        <p className="text-[10px] font-bold text-muted-foreground/60 px-2.5 py-1.5 uppercase tracking-wider select-none">
          {title}
        </p>
      )}
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}
