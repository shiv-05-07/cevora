'use client';

import * as React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StatusBadge } from '@/components/dashboard/StatusBadge';

export interface ActivityItem {
  id: string | number;
  title: string;
  description?: string;
  timestamp: string;
  icon?: LucideIcon;
  status?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  statusLabel?: string;
}

export interface ActivityFeedProps {
  items: ActivityItem[];
  className?: string;
}

export function ActivityFeed({ items, className }: ActivityFeedProps) {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground text-sm">
        No recent activity.
      </div>
    );
  }

  return (
    <div className={cn("space-y-0", className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const Icon = item.icon;

        return (
          <div key={item.id} className="relative pl-8 pb-6 sm:pb-8">
            {/* Timeline Line */}
            {!isLast && (
              <div className="absolute left-[11px] top-6 bottom-0 w-[2px] bg-border/60 dark:bg-border/30" />
            )}

            {/* Timeline Dot/Icon */}
            <div className={cn(
              "absolute left-0 top-1 flex items-center justify-center rounded-full ring-4 ring-background",
              Icon ? "w-6 h-6 bg-primary/10 text-primary -ml-1" : "w-3 h-3 bg-primary ml-[6px] mt-1"
            )}>
              {Icon && <Icon className="w-3.5 h-3.5" />}
            </div>

            {/* Content */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 pt-0.5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-foreground leading-none">{item.title}</h4>
                  {item.status && item.statusLabel && (
                    <StatusBadge status={item.status} className="px-1.5 py-0 text-[10px] h-4">
                      {item.statusLabel}
                    </StatusBadge>
                  )}
                </div>
                {item.description && (
                  <p className="text-xs text-muted-foreground mt-1 max-w-lg leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
              <span className="text-[10px] sm:text-xs font-medium text-muted-foreground whitespace-nowrap shrink-0">
                {item.timestamp}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
