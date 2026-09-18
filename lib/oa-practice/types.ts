export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type FrequencyLevel =
  | 'Frequently reported'
  | 'Commonly reported'
  | 'Reported'
  | 'Less frequently reported';

export interface ProblemProvenance {
  sourceName: string;
  sourceUrl?: string;
  evidenceType: 'user_report' | 'company_tag' | 'public_dataset' | 'curated_list';
  verificationDate?: string;
  dataPeriod?: string;
}

export interface DSAProblem {
  id: string;
  leetcodeId?: number;
  title: string;
  slug: string;
  leetcodeUrl: string;
  difficulty: Difficulty;
  topics: string[]; // topic slugs e.g. 'arrays-hashing'
  companies: string[]; // company slugs e.g. 'amazon'
  
  // Optional reporting metadata (handled explicitly when missing)
  frequency?: FrequencyLevel;
  reportCount?: number;
  firstReportedAt?: string; // e.g. '2026-01-15'
  lastReportedAt?: string; // e.g. '2026-08-30' or 'Last 30 days'
  recencyDays?: number; // numeric days ago if calculated
  
  // Provenance list
  provenanceList?: ProblemProvenance[];
  
  isMockData?: boolean;
}

export interface CompanyInfo {
  id: string;
  name: string;
  slug: string;
  logoLetter: string;
  logoGradient: string;
  description: string;
  dataPeriod?: string;
  lastUpdated?: string;
}

export interface TopicInfo {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export type SortOption =
  | 'frequency-desc'
  | 'recency-desc'
  | 'difficulty-asc'
  | 'difficulty-desc'
  | 'title-asc';

export interface ProblemFilterState {
  searchQuery: string;
  companySlug?: string;
  topicSlug?: string;
  difficulty?: 'all' | Difficulty;
  recency?: 'all' | '30d' | '90d' | '180d' | '365d';
  sortBy: SortOption;
}
