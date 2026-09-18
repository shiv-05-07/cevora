import prisma from '@/lib/prisma';
import {
  AnalyticsDataPayload,
  PeriodFilter,
  OverviewMetric,
  PerformanceTrendPoint,
  SkillPerformanceItem,
  PreparationStatusItem,
  AreaToImproveItem,
  RecentActivityItem,
  DataCoverageItem,
} from '../types';

function getPeriodStartDate(period: PeriodFilter): Date | null {
  const now = new Date();
  switch (period) {
    case '7d':
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    case '30d':
      return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    case '90d':
      return new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    case 'all':
    default:
      return null;
  }
}

function getPrevPeriodStartDate(period: PeriodFilter): Date | null {
  const now = new Date();
  switch (period) {
    case '7d':
      return new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    case '30d':
      return new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
    case '90d':
      return new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
    case 'all':
    default:
      return null;
  }
}

export class AnalyticsService {
  static async getAnalyticsData(
    userId: string,
    period: PeriodFilter = '30d'
  ): Promise<AnalyticsDataPayload> {
    const periodStart = getPeriodStartDate(period);
    const prevPeriodStart = getPrevPeriodStartDate(period);

    const periodDateFilter = periodStart ? { gte: periodStart } : undefined;

    // Parallel Database Queries across authentic feature tables
    const [
      acceptedCurrent,
      acceptedPrev,
      totalCurrent,
      userProgresses,
      interviewCountCurrent,
      snapshots,
      practiceAttempts,
      skillScores,
      conceptMasteries,
      latestResumeAnalysis,
      latestInterviewActivity,
      weakConcepts,
      userActivities,
      learningEvents,
      recentResumes,
    ] = await Promise.all([
      // 1. Practice accepted attempts in current period
      prisma.practiceAttempt.count({
        where: { userId, status: 'Accepted', createdAt: periodDateFilter },
      }),
      // 2. Practice accepted attempts in previous period
      prevPeriodStart && periodStart
        ? prisma.practiceAttempt.count({
            where: {
              userId,
              status: 'Accepted',
              createdAt: { gte: prevPeriodStart, lt: periodStart },
            },
          })
        : Promise.resolve(null),
      // 3. Total attempts in current period
      prisma.practiceAttempt.count({
        where: { userId, createdAt: periodDateFilter },
      }),
      // 4. User progress on roadmaps
      prisma.userProgress.findMany({
        where: { userId },
        include: { roadmap: { select: { title: true } } },
      }),
      // 5. Completed interviews (audit log in UserActivity)
      prisma.userActivity.count({
        where: { userId, type: 'INTERVIEW', createdAt: periodDateFilter },
      }),
      // 6. KnowledgeSnapshots for historical trend
      prisma.knowledgeSnapshot.findMany({
        where: { userId, snapshotDate: periodDateFilter },
        orderBy: { snapshotDate: 'asc' },
      }),
      // 7. Practice attempts for trend and overall stats
      prisma.practiceAttempt.findMany({
        where: { userId, createdAt: periodDateFilter },
        select: { createdAt: true, status: true, problemId: true },
        orderBy: { createdAt: 'asc' },
      }),
      // 8. Skill scores
      prisma.skillScore.findMany({
        where: { userId },
        orderBy: { currentScore: 'desc' },
      }),
      // 9. Concept masteries
      prisma.conceptMastery.findMany({
        where: { userId },
        include: { concept: true },
        orderBy: { masteryScore: 'desc' },
      }),
      // 10. Latest resume analysis
      prisma.resumeAnalysis.findFirst({
        where: { userId, status: 'COMPLETED' },
        orderBy: { createdAt: 'desc' },
      }),
      // 11. Latest interview activity
      prisma.userActivity.findFirst({
        where: { userId, type: 'INTERVIEW' },
        orderBy: { createdAt: 'desc' },
      }),
      // 12. Weak concepts
      prisma.weakConcept.findMany({
        where: { userId },
        include: { concept: true },
        orderBy: { masteryScore: 'asc' },
        take: 5,
      }),
      // 13. User activities for activity stream
      prisma.userActivity.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 10,
      }),
      // 14. Learning events for activity stream
      prisma.learningEvent.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 10,
      }),
      // 15. Recent resume analyses for activity stream
      prisma.resumeAnalysis.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
    ]);

    // ----------------------------------------------------
    // OVERVIEW METRICS (4 Modular Cards)
    // ----------------------------------------------------
    const overallTotalAttempts = await prisma.practiceAttempt.count({ where: { userId } });
    const overallAcceptedAttempts = await prisma.practiceAttempt.count({
      where: { userId, status: 'Accepted' },
    });

    const accuracyPct =
      totalCurrent > 0
        ? Math.round((acceptedCurrent / totalCurrent) * 100)
        : overallTotalAttempts > 0
        ? Math.round((overallAcceptedAttempts / overallTotalAttempts) * 100)
        : null;

    let solvedDeltaText: string | undefined = undefined;
    let solvedDeltaIsPositive: boolean | undefined = undefined;
    if (acceptedPrev !== null) {
      const delta = acceptedCurrent - acceptedPrev;
      solvedDeltaText = delta >= 0 ? `+${delta} this period` : `${delta} this period`;
      solvedDeltaIsPositive = delta >= 0;
    }

    const roadmapCount = userProgresses.length;
    const avgRoadmapProgress =
      roadmapCount > 0
        ? Math.round(
            userProgresses.reduce((acc, p) => acc + (p.progress || 0), 0) / roadmapCount
          )
        : null;

    const overviewMetrics: OverviewMetric[] = [
      {
        id: 'questions-solved',
        title: 'Questions Solved',
        value: acceptedCurrent,
        label: period === 'all' ? 'Total problems solved' : `Solved in selected period`,
        changeText: solvedDeltaText,
        changeIsPositive: solvedDeltaIsPositive,
        ctaText: 'OA Practice',
        ctaHref: '/oa-practice',
        iconName: 'Code2',
        accentColor: 'blue',
      },
      {
        id: 'practice-accuracy',
        title: 'Practice Accuracy',
        value: accuracyPct !== null ? `${accuracyPct}%` : 'N/A',
        label:
          accuracyPct !== null
            ? `Based on ${totalCurrent > 0 ? totalCurrent : overallTotalAttempts} evaluated attempts`
            : 'No practice attempts recorded',
        ctaText: 'Practice Coding',
        ctaHref: '/oa-practice',
        iconName: 'Target',
        accentColor: 'emerald',
      },
      {
        id: 'roadmap-progress',
        title: 'Roadmap Progress',
        value: avgRoadmapProgress !== null ? `${avgRoadmapProgress}%` : 'Not enrolled',
        label:
          roadmapCount > 0
            ? `${roadmapCount} active track${roadmapCount === 1 ? '' : 's'}`
            : 'Enroll in a learning roadmap',
        ctaText: 'View Roadmaps',
        ctaHref: '/roadmaps',
        iconName: 'MapPin',
        accentColor: 'purple',
      },
      {
        id: 'interviews-completed',
        title: 'Interviews Completed',
        value: interviewCountCurrent,
        label:
          interviewCountCurrent === 0
            ? 'No interview sessions yet'
            : `${interviewCountCurrent} session${interviewCountCurrent === 1 ? '' : 's'} completed`,
        ctaText: 'Practice Interview',
        ctaHref: '/interview',
        iconName: 'Video',
        accentColor: 'amber',
      },
    ];

    // ----------------------------------------------------
    // PERFORMANCE OVER TIME (Real Time Series)
    // ----------------------------------------------------
    const dailyMap = new Map<string, { solved: number; total: number; mastery?: number }>();

    // Map snapshots into daily buckets
    snapshots.forEach((snap) => {
      const dayKey = snap.snapshotDate.toISOString().split('T')[0];
      const existing = dailyMap.get(dayKey) || { solved: 0, total: 0 };
      existing.mastery = snap.overallMastery;
      dailyMap.set(dayKey, existing);
    });

    // Map practice attempts into daily buckets
    practiceAttempts.forEach((att) => {
      const dayKey = att.createdAt.toISOString().split('T')[0];
      const existing = dailyMap.get(dayKey) || { solved: 0, total: 0 };
      existing.total += 1;
      if (att.status === 'Accepted') {
        existing.solved += 1;
      }
      dailyMap.set(dayKey, existing);
    });

    const sortedDays = Array.from(dailyMap.keys()).sort();
    const trendData: PerformanceTrendPoint[] = sortedDays.map((dayKey) => {
      const entry = dailyMap.get(dayKey)!;
      return {
        date: dayKey,
        questionsSolved: entry.solved,
        accuracyPct: entry.total > 0 ? Math.round((entry.solved / entry.total) * 100) : undefined,
        overallMastery: entry.mastery !== undefined ? Math.round(entry.mastery * 10) / 10 : undefined,
      };
    });

    // ----------------------------------------------------
    // SKILL PERFORMANCE (Horizontal Ranked List)
    // ----------------------------------------------------
    let skillPerformance: SkillPerformanceItem[] = [];

    if (skillScores.length > 0) {
      skillPerformance = skillScores.map((s) => ({
        id: s.id,
        name: s.category,
        category: s.category,
        score: Math.round(s.currentScore),
        accuracy: Math.round(s.accuracy),
        attempts: s.totalAttempts,
        lastPracticed: s.updatedAt.toISOString(),
      }));
    } else if (conceptMasteries.length > 0) {
      // Aggregate concept masteries by category
      const catGroupMap = new Map<string, { scoreSum: number; count: number; attempts: number; lastDate?: Date }>();
      conceptMasteries.forEach((cm) => {
        const catName = cm.concept.category || cm.concept.subjectKey.toUpperCase();
        const existing = catGroupMap.get(catName) || { scoreSum: 0, count: 0, attempts: 0 };
        existing.scoreSum += cm.masteryScore * 100;
        existing.count += 1;
        existing.attempts += cm.attempts;
        if (cm.lastPracticed && (!existing.lastDate || cm.lastPracticed > existing.lastDate)) {
          existing.lastDate = cm.lastPracticed;
        }
        catGroupMap.set(catName, existing);
      });

      skillPerformance = Array.from(catGroupMap.entries()).map(([catName, stats], idx) => ({
        id: `cm-cat-${idx}`,
        name: catName,
        category: catName,
        score: Math.round(stats.scoreSum / stats.count),
        accuracy: Math.round(stats.scoreSum / stats.count),
        attempts: stats.attempts,
        lastPracticed: stats.lastDate ? stats.lastDate.toISOString() : undefined,
      }));
    }

    // ----------------------------------------------------
    // PREPARATION STATUS (Cross-Feature Cards)
    // ----------------------------------------------------
    const prepStatus: PreparationStatusItem[] = [
      {
        id: 'resume',
        title: 'Resume Analyzer',
        hasData: Boolean(latestResumeAnalysis),
        statusText: latestResumeAnalysis
          ? `ATS Score ${latestResumeAnalysis.overallScore}/100`
          : 'No analysis performed',
        detailText: latestResumeAnalysis
          ? `Last analyzed ${formatRelativeTime(latestResumeAnalysis.createdAt)}`
          : 'Upload your resume to receive AI ATS breakdown and feedback.',
        ctaText: 'Improve Resume',
        ctaHref: '/resume',
      },
      {
        id: 'roadmap',
        title: 'Roadmaps',
        hasData: roadmapCount > 0,
        statusText:
          roadmapCount > 0 && userProgresses[0]
            ? `${userProgresses[0].roadmap.title} (${Math.round(userProgresses[0].progress)}%)`
            : 'No enrolled roadmap',
        detailText:
          roadmapCount > 0 && userProgresses[0]
            ? `${userProgresses[0].completedSteps} of ${userProgresses[0].totalSteps} steps completed`
            : 'Enroll in a structured path to systematically track progress.',
        ctaText: 'Continue Roadmap',
        ctaHref: '/roadmaps',
      },
      {
        id: 'practice',
        title: 'OA Practice',
        hasData: overallTotalAttempts > 0,
        statusText:
          overallTotalAttempts > 0
            ? `${overallAcceptedAttempts} solved (${accuracyPct ?? 0}% accuracy)`
            : 'No coding attempts yet',
        detailText:
          overallTotalAttempts > 0
            ? `${overallTotalAttempts} total problem submissions evaluated`
            : 'Start solving coding problems to build algorithmic readiness.',
        ctaText: 'Practice Coding',
        ctaHref: '/oa-practice',
      },
      {
        id: 'interview',
        title: 'AI Interview',
        hasData: Boolean(latestInterviewActivity),
        statusText: latestInterviewActivity
          ? `${interviewCountCurrent} sessions completed`
          : 'No interview sessions',
        detailText: latestInterviewActivity
          ? `Last session ${formatRelativeTime(latestInterviewActivity.createdAt)}`
          : 'Practice with AI mock interviewer to prepare for technical & viva calls.',
        ctaText: 'Practice Interview',
        ctaHref: '/interview',
      },
    ];

    // ----------------------------------------------------
    // AREAS TO IMPROVE (Evidence-Based Action Items)
    // ----------------------------------------------------
    let areasToImprove: AreaToImproveItem[] = [];

    if (weakConcepts.length > 0) {
      areasToImprove = weakConcepts.map((w) => ({
        id: w.id,
        topicName: w.concept.name,
        observedPerformancePct: Math.round(w.masteryScore * 100),
        attempts: 0,
        recommendedAction: w.recommendedAction || `Practice fundamental questions on ${w.concept.name}`,
        ctaText: `Practice ${w.concept.name}`,
        ctaHref: `/concepts`,
      }));
    } else {
      // Secondary fallback: lowest-scoring ConceptMastery records with at least 1 attempt
      const lowMasteries = conceptMasteries
        .filter((cm) => cm.attempts >= 1)
        .slice(-5)
        .reverse();

      areasToImprove = lowMasteries.map((cm) => ({
        id: cm.id,
        topicName: cm.concept.name,
        observedPerformancePct: Math.round(cm.masteryScore * 100),
        attempts: cm.attempts,
        recommendedAction: `Score is ${Math.round(cm.masteryScore * 100)}%. Solve additional practice problems to strengthen mastery.`,
        ctaText: `Practice ${cm.concept.name}`,
        ctaHref: `/concepts`,
      }));
    }

    // ----------------------------------------------------
    // RECENT ACTIVITY TIMELINE (Normalized & Deduplicated)
    // ----------------------------------------------------
    const rawActivities: RecentActivityItem[] = [];

    userActivities.forEach((act) => {
      rawActivities.push({
        id: act.id,
        type: mapActivityType(act.type),
        title: act.title,
        description: act.description || undefined,
        source: act.type,
        timestamp: act.createdAt.toISOString(),
        href: getActivityHref(act.type),
      });
    });

    learningEvents.forEach((evt) => {
      rawActivities.push({
        id: evt.id,
        type: 'concept',
        title: evt.title || evt.eventType.replace('_', ' '),
        description: `Source: ${evt.source || 'Curriculum'}`,
        source: 'LEARNING',
        timestamp: evt.createdAt.toISOString(),
        href: '/concepts',
      });
    });

    recentResumes.forEach((res) => {
      rawActivities.push({
        id: res.id,
        type: 'resume',
        title: `Completed Resume Analysis`,
        description: `ATS Score achieved: ${res.overallScore}/100`,
        source: 'RESUME',
        timestamp: res.createdAt.toISOString(),
        href: '/resume',
      });
    });

    // Deduplicate and sort by timestamp desc
    const seenTitles = new Set<string>();
    const recentActivities = rawActivities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .filter((item) => {
        const key = `${item.title}-${item.timestamp.slice(0, 16)}`;
        if (seenTitles.has(key)) return false;
        seenTitles.add(key);
        return true;
      })
      .slice(0, 10);

    // ----------------------------------------------------
    // DATA COVERAGE SUMMARY
    // ----------------------------------------------------
    const dataCoverage: DataCoverageItem[] = [
      { key: 'resume', label: 'Resume Analysis', isAvailable: Boolean(latestResumeAnalysis) },
      { key: 'practice', label: 'Practice Attempts', isAvailable: overallTotalAttempts > 0 },
      { key: 'roadmaps', label: 'Roadmap Tracks', isAvailable: roadmapCount > 0 },
      { key: 'interview', label: 'AI Interviews', isAvailable: Boolean(latestInterviewActivity) },
      { key: 'concepts', label: 'Concept Mastery', isAvailable: conceptMasteries.length > 0 || skillScores.length > 0 },
    ];

    return {
      lastUpdated: new Date().toISOString(),
      period,
      overviewMetrics,
      trendData,
      skillPerformance,
      prepStatus,
      areasToImprove,
      recentActivities,
      dataCoverage,
    };
  }
}

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min${diffMins === 1 ? '' : 's'} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  if (diffDays === 1) return 'Yesterday';
  return `${diffDays} days ago`;
}

function mapActivityType(type: string): RecentActivityItem['type'] {
  switch (type) {
    case 'ROADMAP':
      return 'roadmap';
    case 'RESUME':
      return 'resume';
    case 'INTERVIEW':
      return 'interview';
    case 'AI_CHAT':
      return 'diagnostic';
    default:
      return 'coding';
  }
}

function getActivityHref(type: string): string {
  switch (type) {
    case 'ROADMAP':
      return '/roadmaps';
    case 'RESUME':
      return '/resume';
    case 'INTERVIEW':
      return '/interview';
    default:
      return '/oa-practice';
  }
}
