'use client';

import * as React from 'react';
import Link from 'next/link';
import { Lightbulb, ArrowRight, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LearningInsightData } from '@/lib/dashboard/dashboardAdapter';

interface LearningInsightCardProps {
  insight: LearningInsightData;
}

export function LearningInsightCard({ insight }: LearningInsightCardProps) {
  return (
    <div className="border border-border/70 rounded-3xl bg-card shadow-sm p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-border/40 pb-3">
        <div className="flex items-center gap-2 text-xs font-black text-foreground uppercase tracking-wider">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
          Your Learning Insight
        </div>
        <span className="text-[10px] uppercase font-bold text-muted-foreground bg-muted/40 px-2 py-0.5 rounded-md border border-border/40">
          Adaptive Feedback
        </span>
      </div>

      <div className="space-y-2">
        <p className="text-xs sm:text-sm font-medium text-foreground/90 leading-relaxed">
          {insight.observation}
        </p>
        <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-xs text-muted-foreground space-y-1">
          <span className="font-bold text-primary block">Recommended Next Step:</span>
          <span>{insight.recommendedStep}</span>
        </div>
      </div>

      <div className="pt-1 flex justify-end">
        <Link href={insight.actionHref}>
          <Button variant="outline" size="sm" className="font-bold text-xs h-8">
            {insight.actionText} <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
