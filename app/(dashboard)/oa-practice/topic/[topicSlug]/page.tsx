'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { SectionCard } from '@/components/dashboard/SectionCard';
import { ProblemFilterToolbar } from '@/components/oa/ProblemFilterToolbar';
import { ProblemTable } from '@/components/oa/ProblemTable';
import { DataSourceFooter } from '@/components/oa/DataSourceFooter';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Code2, Tag, AlertCircle } from 'lucide-react';

import { SEED_PROBLEMS } from '@/lib/oa-practice/data/problems';
import {
  filterAndSortProblems,
  getTopicBySlug,
  getTopicStats,
} from '@/lib/oa-practice/filterEngine';
import { ProblemFilterState } from '@/lib/oa-practice/types';

export default function TopicPracticePage() {
  const params = useParams();
  const topicSlug = params.topicSlug as string;

  const topic = getTopicBySlug(topicSlug);

  const [filterState, setFilterState] = React.useState<ProblemFilterState>({
    searchQuery: '',
    companySlug: 'all',
    topicSlug: topicSlug,
    difficulty: 'all',
    recency: 'all',
    sortBy: 'frequency-desc',
  });

  if (!topic) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 border border-border rounded-xl bg-card">
        <AlertCircle className="w-10 h-10 text-muted-foreground mb-3" />
        <h3 className="font-bold text-lg text-foreground mb-1">Topic Not Found</h3>
        <p className="text-xs text-muted-foreground max-w-sm mb-6">
          We couldn't find practice topic data for "{topicSlug}".
        </p>
        <Link href="/oa-practice">
          <Button variant="default" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to OA Practice</span>
          </Button>
        </Link>
      </div>
    );
  }

  const topicStats = getTopicStats(topic.slug, SEED_PROBLEMS);
  const topicProblems = SEED_PROBLEMS.filter((p) => p.topics.includes(topic.slug));
  const filteredProblems = filterAndSortProblems(topicProblems, filterState);

  const handleFilterChange = (updated: Partial<ProblemFilterState>) => {
    setFilterState((prev) => ({ ...prev, ...updated }));
  };

  const handleClearFilters = () => {
    setFilterState({
      searchQuery: '',
      companySlug: 'all',
      topicSlug: topic.slug,
      difficulty: 'all',
      recency: 'all',
      sortBy: 'frequency-desc',
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Back button */}
      <div>
        <Link href="/oa-practice">
          <Button variant="ghost" size="sm" className="h-8 text-xs font-semibold gap-1.5 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Topics List</span>
          </Button>
        </Link>
      </div>

      {/* Header Banner */}
      <div className="p-6 rounded-2xl border border-border/70 bg-gradient-to-r from-card via-card to-primary/5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">{topic.name}</h1>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full">
                  <Tag className="w-3 h-3 text-primary" />
                  Cross-Company Topic
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {topic.description}
              </p>
            </div>
          </div>

          {/* Quick Statistics Breakdown */}
          <div className="flex items-center gap-2 bg-background/80 border border-border/60 p-2.5 rounded-xl text-xs font-semibold shadow-inner">
            <div className="text-center px-3 border-r border-border/50">
              <span className="block text-base font-bold text-foreground">{topicStats.total}</span>
              <span className="text-[10px] text-muted-foreground uppercase font-medium">Problems</span>
            </div>
            <div className="text-center px-2.5">
              <span className="block text-sm font-bold text-emerald-600 dark:text-emerald-400">{topicStats.easy}</span>
              <span className="text-[10px] text-muted-foreground uppercase font-medium">Easy</span>
            </div>
            <div className="text-center px-2.5">
              <span className="block text-sm font-bold text-amber-600 dark:text-amber-400">{topicStats.medium}</span>
              <span className="text-[10px] text-muted-foreground uppercase font-medium">Med</span>
            </div>
            <div className="text-center px-2.5">
              <span className="block text-sm font-bold text-rose-600 dark:text-rose-400">{topicStats.hard}</span>
              <span className="text-[10px] text-muted-foreground uppercase font-medium">Hard</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar (with Company select enabled for cross-company discovery!) */}
      <ProblemFilterToolbar
        filters={filterState}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        showCompanySelect={true}
        showTopicSelect={false}
        resultCount={filteredProblems.length}
      />

      {/* Problem Discovery Table (with Company column explicitly visible!) */}
      <SectionCard
        title={`${topic.name} Problems across Companies`}
        description="Discover which companies report these problems in technical interview rounds."
      >
        <ProblemTable
          problems={filteredProblems}
          showCompanyColumn={true}
          showTopicColumn={false}
          onClearFilters={handleClearFilters}
        />
      </SectionCard>

      {/* Data Source Footer */}
      <DataSourceFooter isMockData={true} />
    </div>
  );
}
