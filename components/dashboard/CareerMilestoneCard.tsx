'use client';

import * as React from 'react';
import Link from 'next/link';
import { Target, ArrowRight, CheckCircle2, ChevronRight, Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CareerMilestoneItem } from '@/lib/dashboard/dashboardAdapter';
import { cn } from '@/lib/utils';

interface CareerMilestoneCardProps {
  milestones: CareerMilestoneItem[];
  targetGoal: string;
}

export function CareerMilestoneCard({ milestones, targetGoal }: CareerMilestoneCardProps) {
  const getBadgeClass = (variant: CareerMilestoneItem['statusVariant']) => {
    switch (variant) {
      case 'warning':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'success':
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'info':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default:
        return 'bg-muted/20 text-muted-foreground border-border/40';
    }
  };

  return (
    <div className="border border-border/70 rounded-3xl bg-card shadow-sm p-6 space-y-5">
      <div className="flex items-center justify-between border-b border-border/40 pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 text-xs font-black text-foreground uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5 text-primary" />
            Career & Placement Milestone
          </div>
          <p className="text-xs text-muted-foreground font-medium">
            Progress toward: <strong className="text-foreground">{targetGoal}</strong>
          </p>
        </div>
        <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
          Phase 1: Foundations
        </span>
      </div>

      <div className="space-y-2.5">
        {milestones.map((item, i) => (
          <Link
            key={item.id}
            href={item.href}
            className="flex items-center justify-between p-3 rounded-xl border border-border/40 bg-muted/5 hover:bg-muted/15 hover:border-primary/40 transition-colors group text-xs"
          >
            <div className="space-y-0.5 min-w-0 pr-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </span>
                <Badge variant="outline" className={cn("text-[9px] px-1.5 py-0 uppercase font-black tracking-wider", getBadgeClass(item.statusVariant))}>
                  {item.statusText}
                </Badge>
              </div>
              <p className="text-muted-foreground text-[11px] font-medium truncate">
                {item.detail}
              </p>
            </div>

            <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
