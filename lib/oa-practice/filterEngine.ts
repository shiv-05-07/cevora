import { DSAProblem, ProblemFilterState, CompanyInfo, TopicInfo, Difficulty } from './types';
import { SEED_PROBLEMS } from './data/problems';
import { PRIMARY_COMPANIES } from './data/companies';
import { PRIMARY_TOPICS } from './data/topics';

const DIFFICULTY_ORDER: Record<Difficulty, number> = {
  Easy: 1,
  Medium: 2,
  Hard: 3,
};

export function filterAndSortProblems(
  problems: DSAProblem[] = SEED_PROBLEMS,
  filters: ProblemFilterState
): DSAProblem[] {
  let result = [...problems];

  // 1. Company filter
  if (filters.companySlug && filters.companySlug !== 'all') {
    result = result.filter((p) => p.companies.includes(filters.companySlug!));
  }

  // 2. Topic filter
  if (filters.topicSlug && filters.topicSlug !== 'all') {
    result = result.filter((p) => p.topics.includes(filters.topicSlug!));
  }

  // 3. Difficulty filter
  if (filters.difficulty && filters.difficulty !== 'all') {
    result = result.filter((p) => p.difficulty === filters.difficulty);
  }

  // 4. Recency filter
  if (filters.recency && filters.recency !== 'all') {
    const maxDaysMap: Record<string, number> = {
      '30d': 30,
      '90d': 90,
      '180d': 180,
      '365d': 365,
    };
    const maxDays = maxDaysMap[filters.recency];
    if (maxDays) {
      result = result.filter((p) => p.recencyDays !== undefined && p.recencyDays <= maxDays);
    }
  }

  // 5. Search query filter
  if (filters.searchQuery && filters.searchQuery.trim() !== '') {
    const query = filters.searchQuery.toLowerCase().trim();
    result = result.filter((p) => {
      const matchTitle = p.title.toLowerCase().includes(query);
      const matchTopic = p.topics.some((t) => t.toLowerCase().includes(query));
      const matchCompany = p.companies.some((c) => c.toLowerCase().includes(query));
      return matchTitle || matchTopic || matchCompany;
    });
  }

  // 6. Sorting
  result.sort((a, b) => {
    switch (filters.sortBy) {
      case 'frequency-desc':
        return (b.reportCount || 0) - (a.reportCount || 0);
      case 'recency-desc':
        return (a.recencyDays ?? 999) - (b.recencyDays ?? 999);
      case 'difficulty-asc':
        return DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty];
      case 'difficulty-desc':
        return DIFFICULTY_ORDER[b.difficulty] - DIFFICULTY_ORDER[a.difficulty];
      case 'title-asc':
      default:
        return a.title.localeCompare(b.title);
    }
  });

  return result;
}

export interface StatisticsBreakdown {
  total: number;
  easy: number;
  medium: number;
  hard: number;
}

export function getCompanyStats(companySlug: string, problems: DSAProblem[] = SEED_PROBLEMS): StatisticsBreakdown {
  const companyProblems = problems.filter((p) => p.companies.includes(companySlug));
  return {
    total: companyProblems.length,
    easy: companyProblems.filter((p) => p.difficulty === 'Easy').length,
    medium: companyProblems.filter((p) => p.difficulty === 'Medium').length,
    hard: companyProblems.filter((p) => p.difficulty === 'Hard').length,
  };
}

export function getTopicStats(topicSlug: string, problems: DSAProblem[] = SEED_PROBLEMS): StatisticsBreakdown {
  const topicProblems = problems.filter((p) => p.topics.includes(topicSlug));
  return {
    total: topicProblems.length,
    easy: topicProblems.filter((p) => p.difficulty === 'Easy').length,
    medium: topicProblems.filter((p) => p.difficulty === 'Medium').length,
    hard: topicProblems.filter((p) => p.difficulty === 'Hard').length,
  };
}

export function getCompanyBySlug(slug: string): CompanyInfo | undefined {
  return PRIMARY_COMPANIES.find((c) => c.slug === slug);
}

export function getTopicBySlug(slug: string): TopicInfo | undefined {
  return PRIMARY_TOPICS.find((t) => t.slug === slug);
}
