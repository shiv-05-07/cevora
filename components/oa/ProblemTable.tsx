import * as React from 'react';
import Link from 'next/link';
import { ExternalLink, Info, Building2, Tag, Calendar, AlertCircle } from 'lucide-react';
import { DSAProblem, Difficulty } from '@/lib/oa-practice/types';
import { PRIMARY_COMPANIES } from '@/lib/oa-practice/data/companies';
import { PRIMARY_TOPICS } from '@/lib/oa-practice/data/topics';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export interface ProblemTableProps {
  problems: DSAProblem[];
  showCompanyColumn?: boolean;
  showTopicColumn?: boolean;
  onClearFilters?: () => void;
}

function getDifficultyBadge(difficulty: Difficulty) {
  switch (difficulty) {
    case 'Easy':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
          Easy
        </span>
      );
    case 'Medium':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60">
          Medium
        </span>
      );
    case 'Hard':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200/60 dark:border-rose-800/60">
          Hard
        </span>
      );
  }
}

function getCompanyName(slug: string): string {
  const company = PRIMARY_COMPANIES.find((c) => c.slug === slug);
  return company ? company.name : slug;
}

function getTopicName(slug: string): string {
  const topic = PRIMARY_TOPICS.find((t) => t.slug === slug);
  return topic ? topic.name : slug;
}

function formatLastReported(dateStr?: string, daysAgo?: number): string {
  if (!dateStr && daysAgo === undefined) {
    return 'No report date available';
  }
  if (daysAgo !== undefined) {
    if (daysAgo <= 30) return 'Last 30 days';
    if (daysAgo <= 90) return 'Last 3 months';
    if (daysAgo <= 180) return 'Last 6 months';
    if (daysAgo <= 365) return 'Last 1 year';
  }
  return dateStr || 'Reported';
}

export function ProblemTable({
  problems,
  showCompanyColumn = true,
  showTopicColumn = true,
  onClearFilters,
}: ProblemTableProps) {
  if (problems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-border rounded-xl bg-card">
        <AlertCircle className="w-10 h-10 text-muted-foreground/60 mb-3" />
        <h3 className="font-bold text-base text-foreground mb-1">No problems match these filters</h3>
        <p className="text-xs text-muted-foreground max-w-sm mb-4">
          Try clearing your search query or broadening the selected topic, difficulty, or recency filters.
        </p>
        {onClearFilters && (
          <Button variant="outline" size="sm" onClick={onClearFilters} className="text-xs font-semibold">
            Clear all filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <TooltipProvider>
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto rounded-xl border border-border/70 bg-card shadow-sm">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border/70 bg-muted/40 text-muted-foreground font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4 w-[280px]">Problem</th>
                {showCompanyColumn && <th className="py-3 px-4 min-w-[160px]">Companies</th>}
                {showTopicColumn && <th className="py-3 px-4 min-w-[160px]">Topics</th>}
                <th className="py-3 px-4 w-[100px]">Difficulty</th>
                <th className="py-3 px-4 min-w-[150px]">Report Frequency</th>
                <th className="py-3 px-4 min-w-[130px]">Last Reported</th>
                <th className="py-3 px-4 text-right w-[150px]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-foreground">
              {problems.map((problem) => {
                const formattedRecency = formatLastReported(problem.lastReportedAt, problem.recencyDays);
                const hasProvenance = problem.provenanceList && problem.provenanceList.length > 0;

                return (
                  <tr key={problem.id} className="hover:bg-muted/30 transition-colors group">
                    {/* Problem Name */}
                    <td className="py-3.5 px-4 font-semibold text-sm">
                      <div className="flex items-center gap-2">
                        <a
                          href={problem.leetcodeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors flex items-center gap-1.5 font-bold tracking-tight text-foreground"
                        >
                          {problem.leetcodeId ? `#${problem.leetcodeId} ${problem.title}` : problem.title}
                        </a>
                        {hasProvenance && (
                          <Tooltip>
                            <TooltipTrigger
                              aria-label="View data provenance"
                              className="text-muted-foreground/60 hover:text-primary transition-colors p-0.5 inline-flex items-center justify-center cursor-pointer"
                            >
                              <Info className="w-3.5 h-3.5" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs text-xs p-3 space-y-1">
                              <p className="font-semibold text-foreground">Data Provenance:</p>
                              {problem.provenanceList?.map((prov, i) => (
                                <div key={i} className="text-[11px] text-muted-foreground border-t border-border/40 pt-1 mt-1">
                                  <span className="font-medium text-foreground/90">{prov.sourceName}</span>
                                  {prov.dataPeriod && <span> ({prov.dataPeriod})</span>}
                                  {prov.verificationDate && (
                                    <span className="block text-[10px]">Verified: {prov.verificationDate}</span>
                                  )}
                                </div>
                              ))}
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    </td>

                    {/* Companies Column */}
                    {showCompanyColumn && (
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap items-center gap-1">
                          {problem.companies.map((cSlug) => (
                            <Link
                              key={cSlug}
                              href={`/oa-practice/company/${cSlug}`}
                              className="inline-flex items-center gap-1 text-[11px] font-medium bg-muted/80 hover:bg-primary/10 hover:text-primary transition-colors px-2 py-0.5 rounded text-muted-foreground border border-border/40"
                            >
                              <Building2 className="w-3 h-3 text-muted-foreground/70" />
                              {getCompanyName(cSlug)}
                            </Link>
                          ))}
                        </div>
                      </td>
                    )}

                    {/* Topics Column */}
                    {showTopicColumn && (
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap items-center gap-1">
                          {problem.topics.map((tSlug) => (
                            <Link
                              key={tSlug}
                              href={`/oa-practice/topic/${tSlug}`}
                              className="inline-flex items-center gap-1 text-[11px] font-medium bg-muted/60 hover:bg-primary/10 hover:text-primary transition-colors px-2 py-0.5 rounded text-muted-foreground"
                            >
                              <Tag className="w-2.5 h-2.5 text-muted-foreground/70" />
                              {getTopicName(tSlug)}
                            </Link>
                          ))}
                        </div>
                      </td>
                    )}

                    {/* Difficulty */}
                    <td className="py-3.5 px-4">{getDifficultyBadge(problem.difficulty)}</td>

                    {/* Frequency */}
                    <td className="py-3.5 px-4">
                      {problem.frequency ? (
                        <div className="space-y-1">
                          <span className="text-xs font-semibold text-foreground/90">
                            {problem.frequency}
                          </span>
                          {problem.reportCount !== undefined && (
                            <span className="block text-[10px] text-muted-foreground">
                              {problem.reportCount} interview reports
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground/70 italic">No frequency data</span>
                      )}
                    </td>

                    {/* Last Reported */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0" />
                        <span>{formattedRecency}</span>
                      </div>
                    </td>

                    {/* LeetCode Link */}
                    <td className="py-3.5 px-4 text-right">
                      <a
                        href={problem.leetcodeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-end gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors py-1 px-2.5 rounded hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        <span>Open on LeetCode</span>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards View */}
        <div className="block md:hidden space-y-3">
          {problems.map((problem) => {
            const formattedRecency = formatLastReported(problem.lastReportedAt, problem.recencyDays);
            return (
              <div key={problem.id} className="p-4 rounded-xl border border-border/70 bg-card space-y-3 shadow-sm">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <a
                      href={problem.leetcodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-sm text-foreground hover:text-primary transition-colors block"
                    >
                      {problem.leetcodeId ? `#${problem.leetcodeId} ${problem.title}` : problem.title}
                    </a>
                    <div className="flex items-center gap-2 mt-1">
                      {getDifficultyBadge(problem.difficulty)}
                      <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formattedRecency}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Companies */}
                {showCompanyColumn && (
                  <div className="flex flex-wrap items-center gap-1">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold mr-1">Companies:</span>
                    {problem.companies.map((cSlug) => (
                      <Link
                        key={cSlug}
                        href={`/oa-practice/company/${cSlug}`}
                        className="text-[10px] font-medium bg-muted/80 px-2 py-0.5 rounded text-muted-foreground"
                      >
                        {getCompanyName(cSlug)}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Topics */}
                {showTopicColumn && (
                  <div className="flex flex-wrap items-center gap-1">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold mr-1">Topics:</span>
                    {problem.topics.map((tSlug) => (
                      <Link
                        key={tSlug}
                        href={`/oa-practice/topic/${tSlug}`}
                        className="text-[10px] font-medium bg-muted px-2 py-0.5 rounded text-muted-foreground"
                      >
                        {getTopicName(tSlug)}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Frequency & Action */}
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <span className="text-[11px] text-muted-foreground font-medium">
                    {problem.frequency || 'No frequency data'}
                  </span>
                  <a
                    href={problem.leetcodeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary"
                  >
                    <span>Open on LeetCode</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </TooltipProvider>
    </div>
  );
}
