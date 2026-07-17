import { 
  AnalyticsDashboardData, TimeFilter, KPI, TrendDataPoint, ActivityDay, AnalyticsMilestone,
  AICareerInsight, CompanyReadiness, SkillGap, LearningPathNode, RecommendedLearningPath,
  AIBrief, ActionRecommendation, WeeklyPlan, PlacementForecast, UnlockMilestone, Achievement, SimulatorOption
} from '@/types/analytics';

// Simple seeded random to ensure SSR and Client generate the same mock data
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// Heatmap generator
const generateHeatmap = (days: number, maxIntensity: number = 4, baseActivity: number = 1): ActivityDay[] => {
  const heatmap: ActivityDay[] = [];
  
  const referenceDate = new Date('2024-10-01T12:00:00Z');
  
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(referenceDate);
    d.setUTCDate(d.getUTCDate() - i);
    
    const isWeekend = d.getUTCDay() === 0 || d.getUTCDay() === 6;
    
    const seed = parseInt(d.toISOString().replace(/\D/g, '').substring(0, 8), 10);
    const randomSeed = seededRandom(seed);
    
    let intensity: 0 | 1 | 2 | 3 | 4 = 0;
    if (randomSeed > 0.8) intensity = (Math.min(4, baseActivity + 2)) as any;
    else if (randomSeed > 0.5) intensity = (Math.min(4, baseActivity + 1)) as any;
    else if (randomSeed > 0.3) intensity = baseActivity as any;
    else if (randomSeed > 0.1 || isWeekend) intensity = Math.max(0, baseActivity - 1) as any;
    
    intensity = Math.min(intensity, maxIntensity) as any;
    
    heatmap.push({
      date: d.toISOString().split('T')[0],
      intensity,
      summary: {
        problems: intensity * Math.floor(seededRandom(seed + 1) * 3),
        studyHours: Number((intensity * 1.5 * seededRandom(seed + 2)).toFixed(1)),
        interviews: intensity >= 3 && seededRandom(seed + 3) > 0.8 ? 1 : 0,
        resume: intensity >= 3 && seededRandom(seed + 4) > 0.9 ? 1 : 0,
      }
    });
  }
  return heatmap;
};

// Generate Company Readiness
const generateCompanies = (multiplier: number): CompanyReadiness[] => {
  return [
    {
      id: 'c1', name: 'Amazon', logo: 'amazon',
      overallReadiness: Math.min(100, Math.max(0, 84 * multiplier)),
      status: multiplier > 0.9 ? 'Almost Ready' : multiplier > 0.7 ? 'Needs Improvement' : 'Needs Improvement',
      requiredSkills: ['System Design', 'DSA', 'Behavioral'],
      missingSkills: ['System Design'],
      breakdown: { resume: 88, interview: 75, coding: 92, projects: 85, behavioral: 70 },
      estimatedPrepTime: '3 Weeks',
      nextAction: { label: 'Practice OA', href: '/oa-practice' }
    },
    {
      id: 'c2', name: 'Google', logo: 'google',
      overallReadiness: Math.min(100, Math.max(0, 71 * multiplier)),
      status: 'Needs Improvement',
      requiredSkills: ['Advanced DSA', 'System Design', 'Communication'],
      missingSkills: ['Advanced DSA', 'System Design'],
      breakdown: { resume: 85, interview: 68, coding: 82, projects: 80, behavioral: 75 },
      estimatedPrepTime: '2 Months',
      nextAction: { label: 'Study Assistant', href: '/study-assistant' }
    },
    {
      id: 'c3', name: 'Microsoft', logo: 'microsoft',
      overallReadiness: Math.min(100, Math.max(0, 89 * multiplier)),
      status: multiplier > 0.9 ? 'Ready' : 'Almost Ready',
      requiredSkills: ['DSA', 'OOP', 'System Design'],
      missingSkills: [],
      breakdown: { resume: 92, interview: 88, coding: 90, projects: 89, behavioral: 85 },
      estimatedPrepTime: '1 Week',
      nextAction: { label: 'Mock Interview', href: '/interview/session' }
    }
  ];
};

export const buildAnalytics = (filter: TimeFilter = '30d'): AnalyticsDashboardData => {
  
  if (filter === '7d') {
    return {
      timeFilter: '7d',
      hero: { readinessScore: 84, careerLevel: 'SDE 1 / Junior Engineer', trend: 2, focus: 'System Design', confidence: 'High', eligibleCompanies: 42, recommendation: 'Complete 2 mock interviews before applying.', },
      brief: { placementReadinessTrend: '+2.1%', biggestImprovement: 'System Design (+5)', primaryBlocker: 'Behavioral Interviews', newlyUnlockedCompanies: ['Spotify', 'Twilio'], todaysFocus: 'Mock Interview', expectedWeeklyGain: '+1.5%' },
      actionCenter: {
        highestRoi: { id: 'a1', title: 'Complete Behavioral Mock Interview', gain: '+3.8%', time: '35 min', href: '/interview/viva', whyThisMatters: 'Behavioral interviews currently reduce your Amazon readiness by 11%.' },
        alternatives: [
          { id: 'a2', title: 'Review System Design Concepts', gain: '+1.4%', time: '20 min', href: '/roadmaps', whyThisMatters: 'Key requirement for mid-level roles.' },
          { id: 'a3', title: 'Solve 2 Graph Problems', gain: '+2.1%', time: '45 min', href: '/oa-practice', whyThisMatters: 'Frequent topic in upcoming OAs.' }
        ]
      },
      weeklyPlan: {
        tasks: [
          { id: 't1', title: 'Solve 3 Graph Problems', difficulty: 'Hard', time: '1h 30m', gain: '+2.5%', module: 'OA Practice', priority: 'High', status: 'Completed' },
          { id: 't2', title: 'Behavioral Mock', difficulty: 'Medium', time: '45m', gain: '+3.8%', module: 'Interview', priority: 'High', status: 'In Progress' },
          { id: 't3', title: 'Revise DBMS', difficulty: 'Easy', time: '30m', gain: '+1.2%', module: 'Study Assistant', priority: 'Medium', status: 'Planned' }
        ]
      },
      forecast: {
        timeline: [
          { label: 'Today', value: 84 },
          { label: '30 Days', value: 86 },
          { label: '60 Days', value: 89 },
          { label: 'Ready', value: 92 }
        ],
        expectedInterviewCalls: '3-5',
        placementProbability: 86,
        currentRanking: 'Top 22%',
        confidence: 'High'
      },
      unlockTimeline: [
        { id: 'u1', tier: 'Mid-size Tech', currentProgress: 100, remainingSkills: [], expectedDate: 'Unlocked' },
        { id: 'u2', tier: 'Adobe / Microsoft', currentProgress: 88, remainingSkills: ['Behavioral'], expectedDate: '2 Weeks' },
        { id: 'u3', tier: 'Amazon / Meta', currentProgress: 75, remainingSkills: ['System Design'], expectedDate: '5 Weeks' }
      ],
      achievements: [
        { id: 'ac1', title: '100 Problems Solved', status: 'Unlocked', unlockDate: '2 days ago', progress: 100, rarity: 'Common' },
        { id: 'ac2', title: 'Amazon Ready', status: 'In Progress', progress: 84, rarity: 'Epic' },
        { id: 'ac3', title: 'System Design Master', status: 'Locked', progress: 45, rarity: 'Legendary' }
      ],
      simulatorOptions: [
        { id: 's1', label: '+15 Graph Problems', impactReadiness: 1.5, impactAmazon: 0, impactInterview: 2 },
        { id: 's2', label: 'Complete Mock Interview', impactReadiness: 3.5, impactAmazon: 4, impactInterview: 8 },
        { id: 's3', label: 'Finish System Design', impactReadiness: 4.0, impactAmazon: 8, impactInterview: 1 }
      ],
      insights: [
        { id: 'i1', title: 'Resume ATS Improved', priority: 'Medium', confidence: 95, explanation: 'Your resume ATS score increased by 9% after adding cloud keywords.', affectedModules: ['Resume Analyzer'], estimatedImpact: '+4% Interview Rate', action: { label: 'View Resume', href: '/resume' } },
        { id: 'i2', title: 'System Design Bottleneck', priority: 'High', confidence: 88, explanation: 'System Design is holding back your Amazon readiness.', affectedModules: ['Roadmaps', 'AI Mentor'], estimatedImpact: '+12% Readiness', action: { label: 'Open Roadmap', href: '/roadmaps' } }
      ],
      companyReadiness: generateCompanies(1),
      skillGaps: [
        { id: 'g1', skill: 'System Design', currentScore: 65, requiredScore: 80, gap: 15, priority: 'High', whyItMatters: 'Crucial for SDE roles', companiesAffected: ['Amazon', 'Google', 'Microsoft'], recommendedModule: { name: 'Roadmap', href: '/roadmaps' }, estimatedImprovementTime: '3 Weeks' },
        { id: 'g2', skill: 'Behavioral', currentScore: 71, requiredScore: 85, gap: 14, priority: 'Medium', whyItMatters: 'Amazon Leadership Principles', companiesAffected: ['Amazon'], recommendedModule: { name: 'AI Interview', href: '/interview/viva' }, estimatedImprovementTime: '1 Week' }
      ],
      learningPath: { nodes: [], estimatedPlacementGain: 0 },
      kpis: [
        { title: 'Resume ATS', value: 84, trend: '+2', isPositive: true, insight: 'Minor keyword improvements', iconName: 'file-text' },
        { title: 'Problems Solved', value: 124, trend: '+14', isPositive: true, insight: 'Consistent practice', iconName: 'code-2' },
        { title: 'Interview Readiness', value: '78%', trend: '+1%', isPositive: true, insight: 'Ready for initial rounds', iconName: 'users' },
        { title: 'Learning Streak', value: '6 Days', trend: '+6', isPositive: true, insight: 'Excellent momentum', iconName: 'flame' },
        { title: 'Roadmaps Completed', value: 5, trend: '0', isPositive: true, insight: 'Focusing on System Design', iconName: 'map' },
        { title: 'Companies Saved', value: 12, trend: '+2', isPositive: true, insight: '42 eligible based on CGPA', iconName: 'building-2' },
      ],
      readiness: { overall: 84, coding: 92, resume: 84, projects: 88, behavioral: 79, communication: 71, systemDesign: 67 },
      skills: [
        { subject: 'Frontend', score: 81, fullMark: 100 }, { subject: 'Backend', score: 72, fullMark: 100 },
        { subject: 'DSA', score: 88, fullMark: 100 }, { subject: 'System Design', score: 65, fullMark: 100 },
        { subject: 'Communication', score: 71, fullMark: 100 }, { subject: 'Projects', score: 88, fullMark: 100 },
      ],
      performanceTrend: [
        { date: 'Mon', placement: 82, coding: 88, resume: 82, interview: 76 }, { date: 'Tue', placement: 82, coding: 89, resume: 82, interview: 76 },
        { date: 'Wed', placement: 83, coding: 90, resume: 83, interview: 77 }, { date: 'Thu', placement: 83, coding: 90, resume: 84, interview: 77 },
        { date: 'Fri', placement: 84, coding: 91, resume: 84, interview: 77 }, { date: 'Sat', placement: 84, coding: 92, resume: 84, interview: 78 },
        { date: 'Sun', placement: 84, coding: 92, resume: 84, interview: 78 },
      ],
      heatmap: generateHeatmap(7, 4, 2),
      milestones: [
        { id: 'm1', title: 'Solved 120th Problem', date: '2 days ago', category: 'coding', description: 'Completed Hard level Graph problem.' },
        { id: 'm2', title: 'Resume improved to 84', date: '4 days ago', category: 'resume', description: 'Added system design keywords.' },
      ]
    };
  }
  
  if (filter === '30d') {
    return {
      timeFilter: '30d',
      hero: { readinessScore: 82, careerLevel: 'SDE 1 / Junior Engineer', trend: 6, focus: 'DSA & Interviews', confidence: 'High', eligibleCompanies: 38, recommendation: 'Improve System Design for Amazon roles.', },
      brief: { placementReadinessTrend: '+6.0%', biggestImprovement: 'DSA (+12)', primaryBlocker: 'System Design', newlyUnlockedCompanies: ['Atlassian', 'Stripe'], todaysFocus: 'System Design Architecture', expectedWeeklyGain: '+2.1%' },
      actionCenter: {
        highestRoi: { id: 'a1', title: 'Complete System Design Roadmap', gain: '+6.2%', time: '2 hours', href: '/roadmaps', whyThisMatters: 'System Design is the primary blocker for Amazon roles.' },
        alternatives: [
          { id: 'a2', title: 'Mock Interview (System Design)', gain: '+4.1%', time: '45 min', href: '/interview/viva', whyThisMatters: 'Apply your theoretical knowledge.' },
          { id: 'a3', title: 'Update Resume with AWS', gain: '+1.5%', time: '20 min', href: '/resume', whyThisMatters: 'Increase ATS match for Cloud roles.' }
        ]
      },
      weeklyPlan: {
        tasks: [
          { id: 't1', title: 'Finish Backend Roadmap', difficulty: 'Medium', time: '2h', gain: '+4.0%', module: 'Roadmaps', priority: 'High', status: 'Completed' },
          { id: 't2', title: 'System Design Basics', difficulty: 'Easy', time: '1h', gain: '+2.1%', module: 'Roadmaps', priority: 'High', status: 'In Progress' },
          { id: 't3', title: 'Mock Interview', difficulty: 'Hard', time: '1h', gain: '+4.5%', module: 'Interview', priority: 'High', status: 'Planned' }
        ]
      },
      forecast: {
        timeline: [
          { label: 'Today', value: 82 },
          { label: '30 Days', value: 87 },
          { label: '60 Days', value: 91 },
          { label: 'Ready', value: 95 }
        ],
        expectedInterviewCalls: '2-4',
        placementProbability: 91,
        currentRanking: 'Top 18%',
        confidence: 'High'
      },
      unlockTimeline: [
        { id: 'u1', tier: 'Startups', currentProgress: 100, remainingSkills: [], expectedDate: 'Unlocked' },
        { id: 'u2', tier: 'Adobe', currentProgress: 95, remainingSkills: ['Behavioral'], expectedDate: '1 Week' },
        { id: 'u3', tier: 'Amazon', currentProgress: 82, remainingSkills: ['System Design'], expectedDate: '4 Weeks' },
        { id: 'u4', tier: 'Google', currentProgress: 71, remainingSkills: ['Advanced DSA', 'System Design'], expectedDate: '8 Weeks' }
      ],
      achievements: [
        { id: 'ac1', title: 'ATS Expert', status: 'Unlocked', unlockDate: '10 days ago', progress: 100, rarity: 'Common' },
        { id: 'ac2', title: 'DSA Champion', status: 'Unlocked', unlockDate: '1 week ago', progress: 100, rarity: 'Rare' },
        { id: 'ac3', title: 'Amazon Ready', status: 'In Progress', progress: 82, rarity: 'Epic' },
        { id: 'ac4', title: 'Google Elite', status: 'Locked', progress: 71, rarity: 'Legendary' }
      ],
      simulatorOptions: [
        { id: 's1', label: '+20 Advanced DSA', impactReadiness: 2.0, impactAmazon: 1, impactInterview: 0 },
        { id: 's2', label: 'Complete System Design', impactReadiness: 6.0, impactAmazon: 10, impactInterview: 4 },
        { id: 's3', label: 'STAR Method Mock', impactReadiness: 1.5, impactAmazon: 5, impactInterview: 6 }
      ],
      insights: [
        { id: 'i1', title: 'DSA Consistency', priority: 'High', confidence: 92, explanation: 'You solved 45 problems this month. Great progress!', affectedModules: ['OA Practice'], estimatedImpact: '+8% OA Pass Rate', action: { label: 'Practice More', href: '/oa-practice' } },
        { id: 'i2', title: 'Behavioral Gap', priority: 'Medium', confidence: 80, explanation: 'Your behavioral answers lack STAR format structure.', affectedModules: ['AI Interview'], estimatedImpact: '+5% Confidence', action: { label: 'Start Mock', href: '/interview/viva' } }
      ],
      companyReadiness: generateCompanies(0.95),
      skillGaps: [
        { id: 'g1', skill: 'System Design', currentScore: 60, requiredScore: 80, gap: 20, priority: 'High', whyItMatters: 'Scalability rounds', companiesAffected: ['Amazon', 'Google'], recommendedModule: { name: 'Roadmap', href: '/roadmaps' }, estimatedImprovementTime: '4 Weeks' },
        { id: 'g2', skill: 'Behavioral', currentScore: 68, requiredScore: 85, gap: 17, priority: 'High', whyItMatters: 'Leadership principles', companiesAffected: ['Amazon', 'Microsoft'], recommendedModule: { name: 'AI Interview', href: '/interview/viva' }, estimatedImprovementTime: '2 Weeks' }
      ],
      learningPath: { nodes: [], estimatedPlacementGain: 0 },
      kpis: [
        { title: 'Resume ATS', value: 82, trend: '+5', isPositive: true, insight: 'Passed initial ATS screens', iconName: 'file-text' },
        { title: 'Problems Solved', value: 312, trend: '+45', isPositive: true, insight: 'Top 15% of cohort', iconName: 'code-2' },
        { title: 'Interview Readiness', value: '75%', trend: '+4%', isPositive: true, insight: 'Improving behavioral responses', iconName: 'users' },
        { title: 'Learning Streak', value: '12 Days', trend: '-2', isPositive: false, insight: 'Personal best: 14 days', iconName: 'flame' },
        { title: 'Roadmaps Completed', value: 4, trend: '+1', isPositive: true, insight: 'Completed Backend module', iconName: 'map' },
        { title: 'Companies Saved', value: 24, trend: '+8', isPositive: true, insight: 'Actively tracking applications', iconName: 'building-2' },
      ],
      readiness: { overall: 82, coding: 90, resume: 82, projects: 85, behavioral: 75, communication: 68, systemDesign: 60 },
      skills: [
        { subject: 'Frontend', score: 84, fullMark: 100 }, { subject: 'Backend', score: 75, fullMark: 100 },
        { subject: 'DSA', score: 90, fullMark: 100 }, { subject: 'System Design', score: 60, fullMark: 100 },
        { subject: 'Communication', score: 68, fullMark: 100 }, { subject: 'Projects', score: 85, fullMark: 100 },
      ],
      performanceTrend: Array.from({ length: 30 }).map((_, i) => ({
        date: `${i + 1}`, placement: Math.round(76 + (i * 0.2)), coding: Math.round(80 + (i * 0.3)), resume: Math.round(75 + (i * 0.25)), interview: Math.round(70 + (i * 0.15)),
      })),
      heatmap: generateHeatmap(30, 4, 1),
      milestones: [
        { id: 'm1', title: 'Reached 300 problems', date: '1 week ago', category: 'coding', description: 'Major milestone achieved.' },
        { id: 'm2', title: 'Finished Backend Roadmap', date: '2 weeks ago', category: 'roadmap', description: 'Built a scalable Node.js API.' },
        { id: 'm3', title: 'First Mock Interview', date: '3 weeks ago', category: 'interview', description: 'Scored 72% overall.' },
      ]
    };
  }

  // Fallback to exactly match 30d logic but lower scores for 3m, 6m, 1y for brevity, 
  // I am utilizing the 30d baseline pattern. (In a real app, logic would scale similarly)
  // For the sake of the exercise, returning the '30d' extended payload directly for all other filters 
  // to ensure TS compliance, but with modified scores to simulate history.
  
  const multiplier = filter === '3m' ? 0.85 : filter === '6m' ? 0.75 : 0.6;
  const baseScore = Math.floor(82 * multiplier);
  
  return {
    timeFilter: filter,
    hero: { readinessScore: baseScore, careerLevel: 'Junior / Intern', trend: 12, focus: 'Core Fundamentals', confidence: 'Medium', eligibleCompanies: Math.floor(38 * multiplier), recommendation: 'Focus heavily on building projects and DSA.' },
    brief: { placementReadinessTrend: `+${12 * multiplier}%`, biggestImprovement: 'Projects', primaryBlocker: 'Data Structures', newlyUnlockedCompanies: ['Local Startups'], todaysFocus: 'DSA Arrays', expectedWeeklyGain: '+4.0%' },
    actionCenter: {
      highestRoi: { id: 'a1', title: 'Solve 5 Array Problems', gain: '+2.5%', time: '1 hour', href: '/oa-practice', whyThisMatters: 'Arrays are the foundation for all technical interviews.' },
      alternatives: [
        { id: 'a2', title: 'Watch Roadmap Video', gain: '+1.0%', time: '30 min', href: '/roadmaps', whyThisMatters: 'Understand the bigger picture.' }
      ]
    },
    weeklyPlan: {
      tasks: [
        { id: 't1', title: 'Learn Big O Notation', difficulty: 'Easy', time: '1h', gain: '+2.0%', module: 'Roadmaps', priority: 'High', status: 'Planned' },
        { id: 't2', title: 'Create Resume', difficulty: 'Medium', time: '2h', gain: '+5.0%', module: 'Resume', priority: 'High', status: 'In Progress' }
      ]
    },
    forecast: {
      timeline: [
        { label: 'Today', value: baseScore },
        { label: '3 Months', value: baseScore + 10 },
        { label: '6 Months', value: baseScore + 20 },
        { label: 'Ready', value: 90 }
      ],
      expectedInterviewCalls: '0-1',
      placementProbability: baseScore + 5,
      currentRanking: 'Top 50%',
      confidence: 'Medium'
    },
    unlockTimeline: [
      { id: 'u1', tier: 'Startups', currentProgress: baseScore, remainingSkills: ['Projects'], expectedDate: '2 Weeks' },
      { id: 'u2', tier: 'Mid-size', currentProgress: baseScore - 10, remainingSkills: ['DSA', 'Behavioral'], expectedDate: '3 Months' },
      { id: 'u3', tier: 'Big Tech', currentProgress: baseScore - 30, remainingSkills: ['Advanced DSA', 'System Design'], expectedDate: '6 Months' }
    ],
    achievements: [
      { id: 'ac1', title: 'First Project', status: 'Unlocked', unlockDate: '2 months ago', progress: 100, rarity: 'Common' },
      { id: 'ac2', title: 'DSA Champion', status: 'In Progress', progress: 40, rarity: 'Rare' },
      { id: 'ac3', title: 'Amazon Ready', status: 'Locked', progress: 15, rarity: 'Epic' }
    ],
    simulatorOptions: [
      { id: 's1', label: '+50 DSA Problems', impactReadiness: 5.0, impactAmazon: 0, impactInterview: 0 },
      { id: 's2', label: 'Finish Fullstack Project', impactReadiness: 8.0, impactAmazon: 2, impactInterview: 4 }
    ],
    insights: [
      { id: 'i1', title: 'Consistent Growth', priority: 'High', confidence: 90, explanation: 'You have made significant progress over this period.', affectedModules: ['All'], estimatedImpact: '+20% Readiness', action: { label: 'Keep Going', href: '/dashboard' } }
    ],
    companyReadiness: generateCompanies(multiplier),
    skillGaps: [
      { id: 'g1', skill: 'DSA', currentScore: baseScore - 10, requiredScore: 80, gap: 80 - (baseScore - 10), priority: 'High', whyItMatters: 'Core foundation', companiesAffected: ['All'], recommendedModule: { name: 'OA Practice', href: '/oa-practice' }, estimatedImprovementTime: '3 Months' }
    ],
    learningPath: { nodes: [], estimatedPlacementGain: 0 },
    kpis: [
      { title: 'Resume ATS', value: baseScore, trend: '+15', isPositive: true, insight: 'Needs improvement', iconName: 'file-text' },
      { title: 'Problems Solved', value: Math.floor(100 * multiplier), trend: '+50', isPositive: true, insight: 'Building basics', iconName: 'code-2' },
      { title: 'Interview Readiness', value: `${baseScore - 10}%`, trend: '+10%', isPositive: true, insight: 'Start practicing soon', iconName: 'users' },
      { title: 'Learning Streak', value: '2 Days', trend: '0', isPositive: true, insight: 'Try to build a habit', iconName: 'flame' },
      { title: 'Roadmaps Completed', value: 1, trend: '+1', isPositive: true, insight: 'Finished Web Dev 101', iconName: 'map' },
      { title: 'Companies Saved', value: 15, trend: '+5', isPositive: true, insight: 'Exploring roles', iconName: 'building-2' },
    ],
    readiness: { overall: baseScore, coding: baseScore + 5, resume: baseScore, projects: baseScore + 10, behavioral: baseScore - 5, communication: baseScore - 10, systemDesign: baseScore - 20 },
    skills: [
      { subject: 'Frontend', score: baseScore + 5, fullMark: 100 }, { subject: 'Backend', score: baseScore - 5, fullMark: 100 },
      { subject: 'DSA', score: baseScore, fullMark: 100 }, { subject: 'System Design', score: baseScore - 20, fullMark: 100 },
      { subject: 'Communication', score: baseScore - 10, fullMark: 100 }, { subject: 'Projects', score: baseScore + 10, fullMark: 100 },
    ],
    performanceTrend: Array.from({ length: 6 }).map((_, i) => ({
      date: `P${i + 1}`, placement: Math.round((baseScore - 15) + (i * 3)), coding: Math.round((baseScore - 20) + (i * 4)), resume: Math.round((baseScore - 10) + (i * 2)), interview: Math.round((baseScore - 25) + (i * 3)),
    })),
    heatmap: generateHeatmap(filter === '3m' ? 90 : filter === '6m' ? 180 : 365, 4, 1),
    milestones: [
      { id: 'm1', title: 'Joined Platform', date: 'Some time ago', category: 'general', description: 'Started the journey.' }
    ]
  };
};
