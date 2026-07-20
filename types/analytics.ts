export type TimeFilter = '7d' | '30d' | '3m' | '6m' | '1y';

export interface KPI {
  title: string;
  value: string | number;
  trend: string;
  isPositive: boolean;
  insight: string;
  iconName: string; // Name of Lucide icon to use
}

export interface PlacementReadiness {
  overall: number;
  coding: number;
  resume: number;
  projects: number;
  behavioral: number;
  communication: number;
  systemDesign: number;
}

export interface SkillMetric {
  subject: string;
  score: number;
  fullMark: number;
}

export interface TrendDataPoint {
  date: string;
  placement: number;
  resume: number;
  coding: number;
  interview: number;
}

export interface ActivityDay {
  date: string; // YYYY-MM-DD
  intensity: 0 | 1 | 2 | 3 | 4;
  summary: {
    problems: number;
    studyHours: number;
    interviews: number;
    resume: number;
  };
}

export interface AnalyticsMilestone {
  id: string;
  title: string;
  date: string;
  category: 'resume' | 'coding' | 'roadmap' | 'interview' | 'general';
  description: string;
}

export interface DashboardHero {
  readinessScore: number;
  careerLevel: string;
  trend: number;
  focus: string;
  confidence: 'High' | 'Medium' | 'Low';
  eligibleCompanies: number;
  recommendation: string;
}

export interface AICareerInsight {
  id: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  confidence: number; // e.g. 85 for 85%
  explanation: string;
  affectedModules: string[];
  estimatedImpact: string; // e.g. "+4%"
  action: {
    label: string;
    href: string;
  };
}

export interface CompanyReadiness {
  id: string;
  name: string;
  logo: string;
  overallReadiness: number;
  status: 'Ready' | 'Almost Ready' | 'Needs Improvement';
  requiredSkills: string[];
  missingSkills: string[];
  breakdown: {
    resume: number;
    interview: number;
    coding: number;
    projects: number;
    behavioral: number;
  };
  estimatedPrepTime: string;
  nextAction: {
    label: string;
    href: string;
  };
}

export interface SkillGap {
  id: string;
  skill: string;
  currentScore: number;
  requiredScore: number;
  gap: number;
  priority: 'High' | 'Medium' | 'Low';
  whyItMatters: string;
  companiesAffected: string[];
  recommendedModule: {
    name: string;
    href: string;
  };
  estimatedImprovementTime: string;
}

export interface LearningPathNode {
  id: string;
  title: string;
  durationMinutes: number;
  type: 'Roadmap' | 'DSA' | 'Interview' | 'Resume' | 'Mentor';
  href: string;
}

export interface RecommendedLearningPath {
  nodes: LearningPathNode[];
  estimatedPlacementGain: number;
}

export interface AIBrief {
  placementReadinessTrend: string;
  biggestImprovement: string;
  primaryBlocker: string;
  newlyUnlockedCompanies: string[];
  todaysFocus: string;
  expectedWeeklyGain: string;
}

export interface ActionRecommendationTask {
  id: string;
  title: string;
  gain: string;
  time: string;
  href: string;
  whyThisMatters: string;
}

export interface ActionRecommendation {
  highestRoi: ActionRecommendationTask;
  alternatives: ActionRecommendationTask[];
}

export interface KanbanTask {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  time: string;
  gain: string;
  module: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Planned' | 'In Progress' | 'Completed';
}

export interface WeeklyPlan {
  tasks: KanbanTask[];
}

export interface ForecastDataPoint {
  label: string; // e.g., 'Today', '30 Days', '60 Days'
  value: number; // e.g., 84, 89, 93
}

export interface PlacementForecast {
  timeline: ForecastDataPoint[];
  expectedInterviewCalls: string;
  placementProbability: number;
  currentRanking: string;
  confidence: 'High' | 'Medium' | 'Low';
}

export interface UnlockMilestone {
  id: string;
  tier: string; // e.g., 'Startup', 'Adobe'
  currentProgress: number;
  remainingSkills: string[];
  expectedDate: string;
}

export interface Achievement {
  id: string;
  title: string;
  status: 'Unlocked' | 'In Progress' | 'Locked';
  unlockDate?: string;
  progress: number;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
}

export interface SimulatorOption {
  id: string;
  label: string; // e.g., '+15 Problems'
  impactReadiness: number; // e.g., 2
  impactAmazon: number; // e.g., 3
  impactInterview: number; // e.g., 1
}

export interface AnalyticsDashboardData {
  timeFilter: TimeFilter;
  hero: DashboardHero;
  brief: AIBrief;
  actionCenter: ActionRecommendation;
  weeklyPlan: WeeklyPlan;
  insights: AICareerInsight[];
  companyReadiness: CompanyReadiness[];
  forecast: PlacementForecast;
  unlockTimeline: UnlockMilestone[];
  achievements: Achievement[];
  simulatorOptions: SimulatorOption[];
  skillGaps: SkillGap[];
  learningPath: RecommendedLearningPath;
  kpis: KPI[];
  readiness: PlacementReadiness;
  skills: SkillMetric[];
  performanceTrend: TrendDataPoint[];
  heatmap: ActivityDay[];
  milestones: AnalyticsMilestone[];
}
