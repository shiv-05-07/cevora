'use client';

import * as React from 'react';
import { Building2, ChevronDown } from 'lucide-react';
import { useWorkspace } from '@/providers/WorkspaceProvider';
import { cn } from '@/lib/utils';

export function WorkspaceCard({ className }: { className?: string }) {
  const { currentWorkspace } = useWorkspace();

  return (
    <div
      className={cn(
        'w-full flex items-center justify-between gap-2.5 rounded-lg border border-border/80 bg-background/50 p-2 text-left text-sm cursor-default select-none dark:border-input/50 dark:bg-input/10',
        className
      )}
    >
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
          <Building2 className="w-4 h-4" />
        </div>
        <div className="leading-tight truncate">
          <p className="font-bold text-foreground text-xs truncate max-w-[120px]">{currentWorkspace.name}</p>
          <p className="text-[10px] text-muted-foreground font-semibold capitalize">{currentWorkspace.role}</p>
        </div>
      </div>
      <ChevronDown className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0" />
    </div>
  );
}
