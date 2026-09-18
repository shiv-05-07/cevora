export type PeriodFilter = '7d' | '30d' | '90d' | 'all';

export interface OverviewMetric {
  id: string;
  title: string;
  value: string | number;
  label: string;
  changeText?: string;
  changeIsPositive?: boolean;
  ctaText: string;
  ctaHref: string;
  iconName: string;
  accentColor: 'blue' | 'emerald' | 'purple' | 'amber';
}

export interface PerformanceTrendPoint {
  date: string; // YYYY-MM-DD format
  questionsSolved?: number;
  accuracyPct?: number;
  overallMastery?: number;
}

export interface SkillPerformanceItem {
  id: string;
  name: string;
  category: string;
  score: number; // 0 - 100
  accuracy: number; // 0 - 100
  attempts: number;
  lastPracticed?: string;
}

export interface PreparationStatusItem {
  id: 'resume' | 'roadmap' | 'practice' | 'interview';
  title: string;
  hasData: boolean;
  statusText: string;
  detailText: string;
  ctaText: string;
  ctaHref: string;
}

export interface AreaToImproveItem {
  id: string;
  topicName: string;
  observedPerformancePct: number;
  attempts: number;
  recommendedAction: string;
  ctaText: string;
  ctaHref: string;
}

export interface RecentActivityItem {
  id: string;
  type: 'coding' | 'roadmap' | 'interview' | 'resume' | 'diagnostic' | 'concept';
  title: string;
  description?: string;
  source: string;
  timestamp: string;
  href?: string;
}

export interface DataCoverageItem {
  key: string;
  label: string;
  isAvailable: boolean;
}

export interface AnalyticsDataPayload {
  lastUpdated: string;
  period: PeriodFilter;
  overviewMetrics: OverviewMetric[];
  trendData: PerformanceTrendPoint[];
  skillPerformance: SkillPerformanceItem[];
  prepStatus: PreparationStatusItem[];
  areasToImprove: AreaToImproveItem[];
  recentActivities: RecentActivityItem[];
  dataCoverage: DataCoverageItem[];
}
