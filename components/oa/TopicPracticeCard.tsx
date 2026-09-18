import * as React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code2, ArrowRight } from 'lucide-react';
import { TopicInfo } from '@/lib/oa-practice/types';
import { StatisticsBreakdown } from '@/lib/oa-practice/filterEngine';

export interface TopicPracticeCardProps {
  topic: TopicInfo;
  stats: StatisticsBreakdown;
}

export function TopicPracticeCard({ topic, stats }: TopicPracticeCardProps) {
  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/40 bg-card flex flex-col justify-between">
      <CardContent className="p-4 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Code2 className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold truncate text-foreground group-hover:text-primary transition-colors">
              {topic.name}
            </h4>
          </div>

          <p className="text-xs text-muted-foreground line-clamp-2 mb-3 min-h-[32px]">
            {topic.description}
          </p>

          <div className="flex flex-wrap items-center gap-1.5 mb-4">
            <span className="text-[11px] font-semibold text-foreground/80 bg-muted/60 px-2 py-0.5 rounded border border-border/40">
              {stats.total} problems
            </span>
            <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-200/50">
              {stats.easy} Easy
            </span>
            <span className="text-[10px] font-medium text-amber-700 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400 px-1.5 py-0.5 rounded border border-amber-200/50">
              {stats.medium} Med
            </span>
            <span className="text-[10px] font-medium text-rose-700 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-400 px-1.5 py-0.5 rounded border border-rose-200/50">
              {stats.hard} Hard
            </span>
          </div>
        </div>

        <Link href={`/oa-practice/topic/${topic.slug}`} className="w-full">
          <Button
            variant="ghost"
            size="sm"
            className="w-full h-8 text-xs font-semibold justify-between text-primary hover:text-primary hover:bg-primary/10 group/btn transition-colors"
          >
            <span>Practice Topic</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
