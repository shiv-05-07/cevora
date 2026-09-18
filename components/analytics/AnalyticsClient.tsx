'use client';

import * as React from 'react';
import { AnalyticsDataPayload, PeriodFilter } from '@/features/analytics/types';
import { AnalyticsHeader } from './AnalyticsHeader';
import { OverviewMetricsGrid } from './OverviewMetricsGrid';
import { PerformanceTrendChart } from './PerformanceTrendChart';
import { SkillPerformanceList } from './SkillPerformanceList';
import { PreparationStatusGrid } from './PreparationStatusGrid';
import { AreasToImproveCard } from './AreasToImproveCard';
import { RecentActivityTimeline } from './RecentActivityTimeline';
import { DataCoverageSummary } from './DataCoverageSummary';
import { AnalyticsSkeleton } from './AnalyticsSkeleton';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

export function AnalyticsClient() {
  const [period, setPeriod] = React.useState<PeriodFilter>('30d');
  const [data, setData] = React.useState<AnalyticsDataPayload | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);

  const fetchAnalytics = React.useCallback(async (selectedPeriod: PeriodFilter, isSilent = false) => {
    try {
      if (!isSilent) setLoading(true);
      else setRefreshing(true);
      setError(null);

      const res = await fetch(`/api/analytics?period=${selectedPeriod}`);
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || json.error || 'Failed to fetch analytics');
      }

      setData(json.data);
    } catch (err: any) {
      console.error('Analytics fetch error:', err);
      setError(err.message || 'Unable to load analytics right now.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  React.useEffect(() => {
    fetchAnalytics(period);
  }, [period, fetchAnalytics]);

  const handlePeriodChange = (newPeriod: PeriodFilter) => {
    setPeriod(newPeriod);
  };

  if (loading && !data) {
    return <AnalyticsSkeleton />;
  }

  if (error && !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 border border-destructive/20 bg-destructive/5 rounded-2xl">
        <AlertCircle className="w-10 h-10 text-destructive mb-3" />
        <h3 className="font-bold text-lg text-foreground mb-1">Unable to load analytics</h3>
        <p className="text-sm text-muted-foreground max-w-sm mb-6">{error}</p>
        <Button variant="default" onClick={() => fetchAnalytics(period)} className="gap-2">
          <RefreshCw className="w-4 h-4" />
          <span>Retry</span>
        </Button>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Command Center Header */}
      <AnalyticsHeader
        period={period}
        onPeriodChange={handlePeriodChange}
        lastUpdated={data.lastUpdated}
        isRefreshing={refreshing}
      />

      {/* 2. Overview Metrics Grid */}
      <OverviewMetricsGrid metrics={data.overviewMetrics} />

      {/* 3. Performance Over Time Chart */}
      <PerformanceTrendChart data={data.trendData} />

      {/* 4. Split Section: Skill Performance (~7 cols) & Prep Status (~5 cols) */}
      <div className="grid grid-cols-12 gap-6 items-stretch">
        <div className="col-span-12 lg:col-span-7">
          <SkillPerformanceList skills={data.skillPerformance} />
        </div>
        <div className="col-span-12 lg:col-span-5">
          <PreparationStatusGrid items={data.prepStatus} />
        </div>
      </div>

      {/* 5. Areas to Improve */}
      <AreasToImproveCard areas={data.areasToImprove} />

      {/* 6. Split Section: Recent Activity (~7 cols) & Data Coverage (~5 cols) */}
      <div className="grid grid-cols-12 gap-6 items-stretch">
        <div className="col-span-12 lg:col-span-7">
          <RecentActivityTimeline activities={data.recentActivities} />
        </div>
        <div className="col-span-12 lg:col-span-5">
          <DataCoverageSummary coverage={data.dataCoverage} />
        </div>
      </div>
    </div>
  );
}
