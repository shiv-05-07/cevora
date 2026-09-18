import * as React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CompanyInfo } from '@/lib/oa-practice/types';
import { StatisticsBreakdown } from '@/lib/oa-practice/filterEngine';

export interface CompanyPracticeCardProps {
  company: CompanyInfo;
  stats: StatisticsBreakdown;
}

export function CompanyPracticeCard({ company, stats }: CompanyPracticeCardProps) {
  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/40 bg-card">
      <CardContent className="p-5 flex flex-col justify-between h-full">
        <div>
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm select-none bg-gradient-to-br shrink-0',
                  company.logoGradient
                )}
                aria-hidden="true"
              >
                {company.logoLetter}
              </div>
              <div>
                <h3 className="font-bold text-base tracking-tight text-foreground group-hover:text-primary transition-colors">
                  {company.name}
                </h3>
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-medium mt-0.5">
                  <Sparkles className="w-3 h-3 text-primary/70 shrink-0" />
                  <span>{company.dataPeriod || 'Interview-reported'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-muted-foreground line-clamp-2 mb-4 min-h-[32px]">
            {company.description}
          </p>

          {/* Stats Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="text-xs font-semibold text-foreground/90 bg-muted/60 px-2.5 py-0.5 rounded-md border border-border/40">
              {stats.total} Problems
            </span>
            <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 px-2 py-0.5 rounded border border-emerald-200/50 dark:border-emerald-800/50">
              {stats.easy} Easy
            </span>
            <span className="text-[11px] font-medium text-amber-700 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400 px-2 py-0.5 rounded border border-amber-200/50 dark:border-amber-800/50">
              {stats.medium} Medium
            </span>
            <span className="text-[11px] font-medium text-rose-700 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-400 px-2 py-0.5 rounded border border-rose-200/50 dark:border-rose-800/50">
              {stats.hard} Hard
            </span>
          </div>
        </div>

        {/* CTA */}
        <Link href={`/oa-practice/company/${company.slug}`} className="w-full">
          <Button
            variant="outline"
            className="w-full h-9 text-xs font-semibold group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-200"
          >
            <span>Practice {company.name}</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
