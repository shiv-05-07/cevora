'use client';

import * as React from 'react';
import { PeriodFilter } from '@/features/analytics/types';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnalyticsHeaderProps {
  period: PeriodFilter;
  onPeriodChange: (newPeriod: PeriodFilter) => void;
  lastUpdated?: string;
  isRefreshing?: boolean;
}

const PERIOD_OPTIONS: { id: PeriodFilter; label: string }[] = [
  { id: '7d', label: '7D' },
  { id: '30d', label: '30D' },
  { id: '90d', label: '90D' },
  { id: 'all', label: 'ALL' },
];

export function AnalyticsHeader({
  period,
  onPeriodChange,
  lastUpdated,
  isRefreshing = false,
}: AnalyticsHeaderProps) {
  const formattedTime = React.useMemo(() => {
    if (!lastUpdated) return null;
    try {
      const d = new Date(lastUpdated);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return null;
    }
  }, [lastUpdated]);

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border/60 dark:border-border/40 mb-8">
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Analytics
          </h1>
          <span className="px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase bg-primary/10 text-primary border border-primary/20 rounded-full">
            Command Center
          </span>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
          Your learning and placement preparation progress, based on your activity across Cevora.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 shrink-0">
        {/* Server Last Updated Timestamp */}
        {formattedTime && (
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/40 px-3 py-1.5 rounded-lg border border-border/40">
            <Clock className={cn("w-3.5 h-3.5 text-muted-foreground/70", isRefreshing && "animate-spin")} />
            <span>Updated {formattedTime}</span>
          </div>
        )}

        {/* Period Selector Filter */}
        <div className="flex items-center bg-muted/60 p-1 rounded-xl border border-border/60">
          {PERIOD_OPTIONS.map((opt) => (
            <Button
              key={opt.id}
              variant={period === opt.id ? 'default' : 'ghost'}
              size="sm"
              className={cn(
                "h-8 px-3 text-xs font-semibold rounded-lg transition-all duration-200",
                period === opt.id
                  ? "bg-background text-foreground shadow-sm hover:bg-background"
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => onPeriodChange(opt.id)}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
