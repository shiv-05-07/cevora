'use client';

import * as React from 'react';
import { DataCoverageItem } from '@/features/analytics/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Database, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DataCoverageSummaryProps {
  coverage: DataCoverageItem[];
}

export function DataCoverageSummary({ coverage }: DataCoverageSummaryProps) {
  return (
    <Card className="border border-border/60 shadow-sm h-full flex flex-col justify-between">
      <div>
        <CardHeader className="pb-4 border-b border-border/40">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Database className="w-4 h-4 text-muted-foreground" />
            <span>Data Coverage</span>
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground mt-0.5">
            Overview of feature domains sending telemetry to Analytics
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 space-y-3">
          {coverage.map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between p-2.5 rounded-lg border border-border/40 bg-muted/20"
            >
              <div className="flex items-center gap-2.5">
                {item.isAvailable ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-muted-foreground/40 shrink-0" />
                )}
                <span className="text-xs font-semibold text-foreground">
                  {item.label}
                </span>
              </div>

              <span
                className={cn(
                  "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                  item.isAvailable
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {item.isAvailable ? 'Available' : 'Not started'}
              </span>
            </div>
          ))}
        </CardContent>
      </div>
    </Card>
  );
}
