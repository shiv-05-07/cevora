'use client';

import * as React from 'react';
import { OverviewMetric } from '@/features/analytics/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code2, Target, MapPin, Video, ArrowUpRight, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface OverviewMetricsGridProps {
  metrics: OverviewMetric[];
}

const ICON_MAP: Record<string, React.ElementType> = {
  Code2,
  Target,
  MapPin,
  Video,
};

const ACCENT_STYLES: Record<OverviewMetric['accentColor'], { border: string; bg: string; iconBg: string; text: string }> = {
  blue: {
    border: 'border-blue-500/20 dark:border-blue-400/20',
    bg: 'from-blue-500/5 to-transparent',
    iconBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    text: 'text-blue-600 dark:text-blue-400',
  },
  emerald: {
    border: 'border-emerald-500/20 dark:border-emerald-400/20',
    bg: 'from-emerald-500/5 to-transparent',
    iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    text: 'text-emerald-600 dark:text-emerald-400',
  },
  purple: {
    border: 'border-purple-500/20 dark:border-purple-400/20',
    bg: 'from-purple-500/5 to-transparent',
    iconBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    text: 'text-purple-600 dark:text-purple-400',
  },
  amber: {
    border: 'border-amber-500/20 dark:border-amber-400/20',
    bg: 'from-amber-500/5 to-transparent',
    iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    text: 'text-amber-600 dark:text-amber-400',
  },
};

export function OverviewMetricsGrid({ metrics }: OverviewMetricsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => {
        const IconComponent = ICON_MAP[metric.iconName] || Code2;
        const style = ACCENT_STYLES[metric.accentColor] || ACCENT_STYLES.blue;

        return (
          <Card
            key={metric.id}
            className={cn(
              "relative group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border bg-gradient-to-br overflow-hidden",
              style.border,
              style.bg
            )}
          >
            <CardContent className="p-5 flex flex-col justify-between h-full space-y-4">
              <div className="flex items-start justify-between">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {metric.title}
                </span>
                <div className={cn("p-2 rounded-xl transition-transform duration-200 group-hover:scale-110", style.iconBg)}>
                  <IconComponent className="w-4 h-4" />
                </div>
              </div>

              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black tracking-tight text-foreground">
                    {metric.value}
                  </span>
                  {metric.changeText && (
                    <span
                      className={cn(
                        "inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-full",
                        metric.changeIsPositive
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                      )}
                    >
                      {metric.changeIsPositive ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {metric.changeText}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                  {metric.label}
                </p>
              </div>

              <div className="pt-2 border-t border-border/40 flex items-center justify-between">
                <Link href={metric.ctaHref} className="w-full">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full h-8 justify-between text-xs font-medium text-muted-foreground hover:text-foreground group/btn p-0"
                  >
                    <span>{metric.ctaText}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
