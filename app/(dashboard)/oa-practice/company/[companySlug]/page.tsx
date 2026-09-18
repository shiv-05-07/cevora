'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { SectionCard } from '@/components/dashboard/SectionCard';
import { ProblemFilterToolbar } from '@/components/oa/ProblemFilterToolbar';
import { ProblemTable } from '@/components/oa/ProblemTable';
import { DataSourceFooter } from '@/components/oa/DataSourceFooter';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Building2, Sparkles, AlertCircle } from 'lucide-react';

import { SEED_PROBLEMS } from '@/lib/oa-practice/data/problems';
import {
  filterAndSortProblems,
  getCompanyBySlug,
  getCompanyStats,
} from '@/lib/oa-practice/filterEngine';
import { ProblemFilterState } from '@/lib/oa-practice/types';

export default function CompanyPracticePage() {
  const params = useParams();
  const router = useRouter();
  const companySlug = params.companySlug as string;

  const company = getCompanyBySlug(companySlug);

  const [filterState, setFilterState] = React.useState<ProblemFilterState>({
    searchQuery: '',
    companySlug: companySlug,
    topicSlug: 'all',
    difficulty: 'all',
    recency: 'all',
    sortBy: 'frequency-desc',
  });

  if (!company) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 border border-border rounded-xl bg-card">
        <AlertCircle className="w-10 h-10 text-muted-foreground mb-3" />
        <h3 className="font-bold text-lg text-foreground mb-1">Company Not Found</h3>
        <p className="text-xs text-muted-foreground max-w-sm mb-6">
          We couldn't find company practice data for "{companySlug}".
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

  const companyStats = getCompanyStats(company.slug, SEED_PROBLEMS);
  const companyProblems = SEED_PROBLEMS.filter((p) => p.companies.includes(company.slug));
  const filteredProblems = filterAndSortProblems(companyProblems, filterState);

  const handleFilterChange = (updated: Partial<ProblemFilterState>) => {
    setFilterState((prev) => ({ ...prev, ...updated }));
  };

  const handleClearFilters = () => {
    setFilterState({
      searchQuery: '',
      companySlug: company.slug,
      topicSlug: 'all',
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
            <span>Back to Company List</span>
          </Button>
        </Link>
      </div>

      {/* Header Banner */}
      <div className="p-6 rounded-2xl border border-border/70 bg-gradient-to-r from-card via-card to-primary/5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-md select-none bg-gradient-to-br ${company.logoGradient} shrink-0`}
            >
              {company.logoLetter}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">{company.name}</h1>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                  <Sparkles className="w-3 h-3" />
                  Interview-reported
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                DSA problems reported in {company.name} technical screenings & assessments.
              </p>
            </div>
          </div>

          {/* Quick Statistics Breakdown */}
          <div className="flex items-center gap-2 bg-background/80 border border-border/60 p-2.5 rounded-xl text-xs font-semibold shadow-inner">
            <div className="text-center px-3 border-r border-border/50">
              <span className="block text-base font-bold text-foreground">{companyStats.total}</span>
              <span className="text-[10px] text-muted-foreground uppercase font-medium">Problems</span>
            </div>
            <div className="text-center px-2.5">
              <span className="block text-sm font-bold text-emerald-600 dark:text-emerald-400">{companyStats.easy}</span>
              <span className="text-[10px] text-muted-foreground uppercase font-medium">Easy</span>
            </div>
            <div className="text-center px-2.5">
              <span className="block text-sm font-bold text-amber-600 dark:text-amber-400">{companyStats.medium}</span>
              <span className="text-[10px] text-muted-foreground uppercase font-medium">Med</span>
            </div>
            <div className="text-center px-2.5">
              <span className="block text-sm font-bold text-rose-600 dark:text-rose-400">{companyStats.hard}</span>
              <span className="text-[10px] text-muted-foreground uppercase font-medium">Hard</span>
            </div>
          </div>
        </div>

        {/* Provenance Metadata */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground pt-2 border-t border-border/40">
          <span>Data source: Candidate interview reports & LeetCode company tags</span>
          <span>•</span>
          <span>Period: {company.dataPeriod || 'Interview-reported'}</span>
          <span>•</span>
          <span>Last Updated: {company.lastUpdated || 'Sept 2026'}</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <ProblemFilterToolbar
        filters={filterState}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        showCompanySelect={false}
        showTopicSelect={true}
        resultCount={filteredProblems.length}
      />

      {/* Problem Discovery Table */}
      <SectionCard
        title={`${company.name} Interview Questions`}
        description="Select a problem to open directly on LeetCode for solving."
      >
        <ProblemTable
          problems={filteredProblems}
          showCompanyColumn={false}
          showTopicColumn={true}
          onClearFilters={handleClearFilters}
        />
      </SectionCard>

      {/* Data Source Footer */}
      <DataSourceFooter isMockData={true} />
    </div>
  );
}
