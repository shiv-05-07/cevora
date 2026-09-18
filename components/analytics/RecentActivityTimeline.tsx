'use client';

import * as React from 'react';
import { RecentActivityItem } from '@/features/analytics/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EmptyState } from './EmptyState';
import { Activity, Code2, MapPin, Video, FileText, Layers, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface RecentActivityTimelineProps {
  activities: RecentActivityItem[];
}

const ICON_MAP: Record<RecentActivityItem['type'], React.ElementType> = {
  coding: Code2,
  roadmap: MapPin,
  interview: Video,
  resume: FileText,
  diagnostic: Layers,
  concept: Layers,
};

export function RecentActivityTimeline({ activities }: RecentActivityTimelineProps) {
  return (
    <Card className="border border-border/60 shadow-sm h-full flex flex-col justify-between">
      <div>
        <CardHeader className="pb-4 border-b border-border/40">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            <span>Recent Activity</span>
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground mt-0.5">
            Chronological audit stream of your learning and practice events
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          {activities.length === 0 ? (
            <EmptyState
              icon={Activity}
              title="No recent activity recorded yet"
              description="Start solving practice problems or analyzing your resume to see your activity timeline."
              actionLabel="Explore Practice"
              actionHref="/oa-practice"
              className="border-none shadow-none"
            />
          ) : (
            <div className="relative pl-4 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-border/60">
              {activities.map((item) => {
                const IconComp = ICON_MAP[item.type] || Code2;
                const formattedDate = formatRelative(item.timestamp);

                return (
                  <div key={item.id} className="relative group flex items-start justify-between gap-4 pl-4">
                    {/* Node Dot Icon */}
                    <div className="absolute -left-[17px] top-0.5 p-1 rounded-full bg-background border border-border/80 group-hover:border-primary transition-colors">
                      <IconComp className="w-3 h-3 text-primary" />
                    </div>

                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h5 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                          {item.title}
                        </h5>
                        <span className="text-[10px] font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                          {item.source}
                        </span>
                      </div>

                      {item.description && (
                        <p className="text-xs text-muted-foreground truncate max-w-md">
                          {item.description}
                        </p>
                      )}

                      <span className="text-[11px] text-muted-foreground/70 block pt-0.5">
                        {formattedDate}
                      </span>
                    </div>

                    {item.href && (
                      <Link href={item.href} className="shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground opacity-70 group-hover:opacity-100"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
}

function formatRelative(isoStr: string): string {
  try {
    const d = new Date(isoStr);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays}d ago`;
  } catch {
    return isoStr;
  }
}
