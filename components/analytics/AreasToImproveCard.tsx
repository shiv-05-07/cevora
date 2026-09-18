'use client';

import * as React from 'react';
import { AreaToImproveItem } from '@/features/analytics/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EmptyState } from './EmptyState';
import { AlertCircle, ArrowRight, CheckCircle2, Target } from 'lucide-react';
import Link from 'next/link';

interface AreasToImproveCardProps {
  areas: AreaToImproveItem[];
}

export function AreasToImproveCard({ areas }: AreasToImproveCardProps) {
  return (
    <Card className="border border-border/60 shadow-sm">
      <CardHeader className="pb-4 border-b border-border/40">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <span>Areas to Improve</span>
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              Evidence-based priority topics requiring targeted practice
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {areas.length === 0 ? (
          <EmptyState
            icon={CheckCircle2}
            title="No weak areas identified yet"
            description="Complete diagnostics or practice questions to receive personalized topic recommendations."
            actionLabel="Start Practice"
            actionHref="/oa-practice"
            className="border-none shadow-none"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {areas.map((area) => (
              <div
                key={area.id}
                className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 dark:bg-amber-500/10 flex flex-col justify-between space-y-4 transition-all duration-200 hover:border-amber-500/40"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-foreground">
                      {area.topicName}
                    </h4>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300">
                      {area.observedPerformancePct}% score
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {area.recommendedAction}
                  </p>
                </div>

                <div className="pt-2 border-t border-amber-500/15 flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <Target className="w-3 h-3 text-muted-foreground/70" />
                    {area.attempts > 0 ? `${area.attempts} attempts` : 'Diagnostic flag'}
                  </span>

                  <Link href={area.ctaHref}>
                    <Button size="sm" variant="default" className="text-xs h-7 gap-1 font-medium bg-amber-600 hover:bg-amber-700 text-white border-none shadow-xs group">
                      <span>{area.ctaText}</span>
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
