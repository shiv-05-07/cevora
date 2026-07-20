'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { AggregatedProfile } from '@/types/profile';
import { Sparkles, ArrowRight, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface AICareerSummaryProps {
  profile: AggregatedProfile;
}

export function AICareerSummary({ profile }: AICareerSummaryProps) {
  const { aiSummary } = profile;

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20 shadow-sm transition-all duration-200 hover:-translate-y-[2px] hover:border-primary/30 hover:shadow-md">
      {/* Background visual elements */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-primary/10 rounded-full blur-xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />

      <CardHeader className="border-b border-primary/10 pb-4">
        <div className="flex justify-between items-center gap-4">
          <CardTitle className="text-lg flex items-center gap-2 text-foreground font-bold">
            <Sparkles className="w-5 h-5 text-primary fill-primary/10" />
            AI Career Recommendation
          </CardTitle>
          <div className="flex items-center gap-1.5">
            <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-wider">
              Priority: {aiSummary.priority}
            </Badge>
            <Badge variant="outline" className="text-[10px] border-primary/20 text-primary bg-primary/5">
              {aiSummary.confidence}% Confidence
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        <p className="text-sm text-foreground/80 leading-relaxed font-medium">
          {aiSummary.text}
        </p>

        <div className="flex items-center justify-between gap-4 flex-wrap p-3 rounded-xl border border-primary/15 bg-primary/5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground block font-medium">Estimated Impact</span>
              <span className="text-xs font-bold text-foreground">+5% Placement Readiness</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-muted-foreground block font-medium">Estimated Time</span>
            <span className="text-xs font-bold text-foreground">3 Days</span>
          </div>
          <Link
            href={aiSummary.suggestedActionHref}
            className={buttonVariants({ variant: 'default', size: 'sm' }) + ' h-8 text-xs shrink-0 inline-flex items-center'}
          >
            {aiSummary.suggestedAction}
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
