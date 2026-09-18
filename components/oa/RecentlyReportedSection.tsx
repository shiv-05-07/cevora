import * as React from 'react';
import { ExternalLink, Flame, Building2, Tag, Calendar } from 'lucide-react';
import { DSAProblem } from '@/lib/oa-practice/types';
import { PRIMARY_COMPANIES } from '@/lib/oa-practice/data/companies';
import { PRIMARY_TOPICS } from '@/lib/oa-practice/data/topics';
import { SectionCard } from '@/components/dashboard/SectionCard';

export interface RecentlyReportedSectionProps {
  problems: DSAProblem[];
}

function getCompanyName(slug: string): string {
  const company = PRIMARY_COMPANIES.find((c) => c.slug === slug);
  return company ? company.name : slug;
}

function getTopicName(slug: string): string {
  const topic = PRIMARY_TOPICS.find((t) => t.slug === slug);
  return topic ? topic.name : slug;
}

export function RecentlyReportedSection({ problems }: RecentlyReportedSectionProps) {
  // Take top 5 most recently reported problems
  const recentProblems = [...problems]
    .sort((a, b) => (a.recencyDays ?? 999) - (b.recencyDays ?? 999))
    .slice(0, 5);

  return (
    <SectionCard
      title="Recently Reported Interview Questions"
      actions={
        <div className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
          <Flame className="w-3.5 h-3.5 text-amber-500" />
          <span>Interview Data Stream</span>
        </div>
      }
    >
      <div className="divide-y divide-border/60">
        {recentProblems.map((problem) => (
          <div
            key={problem.id}
            className="py-3 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-muted/20 transition-colors rounded-lg px-2"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <a
                  href={problem.leetcodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-sm text-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  {problem.leetcodeId ? `#${problem.leetcodeId} ${problem.title}` : problem.title}
                </a>

                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                    problem.difficulty === 'Easy'
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400'
                      : problem.difficulty === 'Medium'
                      ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400'
                      : 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400'
                  }`}
                >
                  {problem.difficulty}
                </span>
              </div>

              <div className="flex items-center gap-2 flex-wrap text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-muted-foreground/70" />
                  <span>{problem.companies.map(getCompanyName).join(', ')}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Tag className="w-3 h-3 text-muted-foreground/70" />
                  <span>{problem.topics.map(getTopicName).join(', ')}</span>
                </div>
                {problem.lastReportedAt && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-1 text-[11px]">
                      <Calendar className="w-3 h-3 text-muted-foreground/60" />
                      <span>{problem.recencyDays !== undefined && problem.recencyDays <= 30 ? 'Last 30 days' : problem.lastReportedAt}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <a
              href={problem.leetcodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 shrink-0 self-start sm:self-center"
            >
              <span>Solve on LeetCode</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
