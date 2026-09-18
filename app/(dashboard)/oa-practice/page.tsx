'use client';

import * as React from 'react';
import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { SectionCard } from '@/components/dashboard/SectionCard';
import { CompanyPracticeCard } from '@/components/oa/CompanyPracticeCard';
import { TopicPracticeCard } from '@/components/oa/TopicPracticeCard';
import { ProblemFilterToolbar } from '@/components/oa/ProblemFilterToolbar';
import { ProblemTable } from '@/components/oa/ProblemTable';
import { RecentlyReportedSection } from '@/components/oa/RecentlyReportedSection';
import { DataSourceFooter } from '@/components/oa/DataSourceFooter';

import { PRIMARY_COMPANIES } from '@/lib/oa-practice/data/companies';
import { PRIMARY_TOPICS } from '@/lib/oa-practice/data/topics';
import { SEED_PROBLEMS } from '@/lib/oa-practice/data/problems';
import {
  filterAndSortProblems,
  getCompanyStats,
  getTopicStats,
} from '@/lib/oa-practice/filterEngine';
import { ProblemFilterState } from '@/lib/oa-practice/types';

function OAPracticeLandingContent() {
  const searchParams = useSearchParams();
  const initialTopic = searchParams.get('topic') || '';

  const [filterState, setFilterState] = React.useState<ProblemFilterState>({
    searchQuery: initialTopic,
    companySlug: 'all',
    topicSlug: 'all',
    difficulty: 'all',
    recency: 'all',
    sortBy: 'frequency-desc',
  });

  const handleFilterChange = (updated: Partial<ProblemFilterState>) => {
    setFilterState((prev) => ({ ...prev, ...updated }));
  };

  const handleClearFilters = () => {
    setFilterState({
      searchQuery: '',
      companySlug: 'all',
      topicSlug: 'all',
      difficulty: 'all',
      recency: 'all',
      sortBy: 'frequency-desc',
    });
  };

  // Compute filtered problems for global search
  const filteredProblems = filterAndSortProblems(SEED_PROBLEMS, filterState);
  const isFilteredView = Boolean(
    filterState.searchQuery ||
      (filterState.companySlug && filterState.companySlug !== 'all') ||
      (filterState.topicSlug && filterState.topicSlug !== 'all') ||
      (filterState.difficulty && filterState.difficulty !== 'all') ||
      (filterState.recency && filterState.recency !== 'all')
  );

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Hero Header */}
      <PageHeader
        title="OA & DSA Practice Hub"
        description="Practice smarter for your target company. Discover interview-reported DSA questions by company, topic, difficulty and recency — then solve them directly on LeetCode."
      />

      {/* 2. Global Search & Filter Toolbar */}
      <ProblemFilterToolbar
        filters={filterState}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        resultCount={filteredProblems.length}
      />

      {/* Filtered View Results (shown when active search/filter is present) */}
      {isFilteredView ? (
        <SectionCard
          title="Matching Problems"
          description="Direct LeetCode problem links based on your active filters."
        >
          <ProblemTable
            problems={filteredProblems}
            onClearFilters={handleClearFilters}
            showCompanyColumn={true}
            showTopicColumn={true}
          />
        </SectionCard>
      ) : (
        <>
          {/* 3. Company Practice Section */}
          <SectionCard
            title="Company-wise Practice"
            description="Explore interview-reported DSA questions organized by top hiring companies."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PRIMARY_COMPANIES.map((company) => {
                const stats = getCompanyStats(company.slug, SEED_PROBLEMS);
                return (
                  <CompanyPracticeCard
                    key={company.id}
                    company={company}
                    stats={stats}
                  />
                );
              })}
            </div>
          </SectionCard>

          {/* 4. Topic Practice Section */}
          <SectionCard
            title="Topic-wise Practice"
            description="Master key data structure and algorithm concepts with company-tagged problems."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PRIMARY_TOPICS.map((topic) => {
                const stats = getTopicStats(topic.slug, SEED_PROBLEMS);
                return (
                  <TopicPracticeCard
                    key={topic.id}
                    topic={topic}
                    stats={stats}
                  />
                );
              })}
            </div>
          </SectionCard>

          {/* 5. Recently Reported Problems Section */}
          <RecentlyReportedSection problems={SEED_PROBLEMS} />
        </>
      )}

      {/* 6. Data Source Footer */}
      <DataSourceFooter isMockData={true} />
    </div>
  );
}

export default function OAPracticePage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-[calc(100vh-4rem)] items-center justify-center text-sm font-medium text-muted-foreground">
          Loading Practice Hub...
        </div>
      }
    >
      <OAPracticeLandingContent />
    </Suspense>
  );
}
