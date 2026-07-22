'use client';

import * as React from 'react';
import { Building2, ChevronDown, Check, Users } from 'lucide-react';
import { useWorkspace } from '@/providers/WorkspaceProvider';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

export function WorkspaceCard({ className }: { className?: string }) {
  const { currentWorkspace, workspaces, switchWorkspace } = useWorkspace();
  const isMultiWorkspace = workspaces.length > 1;

  const triggerContent = (
    <div
      className={cn(
        'w-full flex items-center justify-between gap-2.5 rounded-lg border border-border/80 bg-background/50 p-2 text-left text-sm select-none dark:border-input/50 dark:bg-input/10 transition-colors',
        isMultiWorkspace && 'hover:bg-muted/50 cursor-pointer',
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
      {isMultiWorkspace && <ChevronDown className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0" />}
    </div>
  );

  if (!isMultiWorkspace) {
    return triggerContent;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full focus-visible:outline-none">
        {triggerContent}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          Managed Cohorts
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {workspaces.map((ws) => {
          const isSelected = ws.id === currentWorkspace.id;
          return (
            <DropdownMenuItem
              key={ws.id}
              onClick={() => switchWorkspace(ws.id)}
              className="flex items-center justify-between cursor-pointer py-2"
            >
              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-primary" />
                <div>
                  <p className="text-xs font-bold text-foreground">{ws.name}</p>
                  {ws.studentCount && (
                    <p className="text-[10px] text-muted-foreground">{ws.studentCount} Students</p>
                  )}
                </div>
              </div>
              {isSelected && <Check className="w-4 h-4 text-primary shrink-0" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
