import { UserProfile } from '@/store/useProfileStore';
import { DashboardInsights } from '@/store/useKnowledgeStore';
import { getSubjectCurriculum, getPrimarySubject } from '@/lib/learning/curriculum/subjectCurriculum';
import { SubjectKey } from '@/lib/learning/curriculum/types';
import { topicMatches } from '@/lib/mission/roadmapTemplates';

export type SkillLevel = 'Strong' | 'Developing' | 'Needs work' | 'Not assessed';

export interface SkillItem {
  id: string;
  name: string;
  status: SkillLevel;
  category: string;
}

export interface SubjectSkillGroup {
  subject: string;
  skills: SkillItem[];
}

export type MissionActivityType = 'learn' | 'practice' | 'review' | 'interview';

export interface MissionActivity {
  id: string;
  type: MissionActivityType;
  title: string;
  description: string;
  completed: boolean;
  href: string;
}

export interface TodaysMissionData {
  subjectKey?: SubjectKey;
  title: string;
  topic: string;
  estimatedMinutes: number;
  activityCount: number;
  whyThisMission: string;
  reasonTag: string;
  activities: MissionActivity[];
  progressPercent: number;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  currentStage: string;
  primaryAction: {
    label: string;
    href: string;
  };
}

export interface RoadmapStep {
  id: string;
  title: string;
  status: 'completed' | 'current' | 'upcoming';
  isFocus: boolean;
}

export interface RoadmapFocusData {
  goal: string;
  trackTitle: string;
  currentModule: string;
  nextModule: string;
  steps: RoadmapStep[];
  subjectKey?: string | null;
  personalizedRoadmapHref: string;
}

export interface CareerMilestoneItem {
  id: string;
  title: string;
  statusText: string;
  statusVariant: 'success' | 'warning' | 'info' | 'neutral';
  detail: string;
  href: string;
}

export interface LearningInsightData {
  observation: string;
  recommendedStep: string;
  actionText: string;
  actionHref: string;
}

/**
 * Derives qualitative skill state from subject curriculum and real user concept evidence.
 * CRITICAL RULE: Unassessed skills are NEVER represented as 0%; they are marked 'Not assessed'.
 */
export function deriveSkillStateMap(
  preferredSubjects: string[] = [],
  skillScores: Array<{ category: string; currentScore: number }> = [],
  weakConcepts: Array<{ conceptName?: string; concept?: { name: string; category?: string }; masteryScore?: number }> = [],
  hasCompletedPractice: boolean = false,
  completedTopic?: string
): SubjectSkillGroup[] {
  const curriculum = getSubjectCurriculum(preferredSubjects);

  if (!curriculum) {
    return [
      {
        subject: 'Current Skills',
        skills: [
          { id: 'sk-1', name: 'Select a subject during onboarding', status: 'Not assessed', category: 'Setup' }
        ]
      }
    ];
  }

  const weakConceptNames = new Set(
    weakConcepts.map((w) => (w.concept?.name || w.conceptName || '').toLowerCase()).filter(Boolean)
  );

  const scoreMap = new Map<string, number>();
  skillScores.forEach((s) => {
    if (s.category && typeof s.currentScore === 'number') {
      scoreMap.set(s.category.toUpperCase(), s.currentScore);
    }
  });

  const categoryScore = scoreMap.get(curriculum.key.toUpperCase()) || scoreMap.get(curriculum.label.toUpperCase());

  const skills: SkillItem[] = curriculum.roadmapSteps.map((step: any, idx: number) => {
    const topicLower = step.title.toLowerCase();
    const isExplicitlyWeak = Array.from(weakConceptNames).some((w) => topicLower.includes(w) || w.includes(topicLower));

    let status: SkillLevel = 'Not assessed';

    if (isExplicitlyWeak) {
      status = 'Needs work';
    } else if (hasCompletedPractice && completedTopic && topicLower.includes(completedTopic.toLowerCase())) {
      status = 'Developing';
    } else if (categoryScore !== undefined && categoryScore > 0) {
      if (categoryScore >= 80) {
        status = idx <= 2 ? 'Strong' : idx === 3 ? 'Developing' : 'Not assessed';
      } else if (categoryScore >= 50) {
        status = idx <= 1 ? 'Strong' : idx <= 3 ? 'Developing' : 'Not assessed';
      } else {
        status = idx === 0 ? 'Developing' : 'Not assessed';
      }
    }

    return {
      id: `${curriculum.key}-${idx}`,
      name: step.title,
      status,
      category: curriculum.label,
    };
  });

  return [{ subject: curriculum.label, skills }];
}

/**
 * Derives Today's Mission from subject curriculum and active database mission.
 * Handles empty subject states explicitly without defaulting to DSA.
 */
export function deriveTodaysMission(
  profile: Partial<UserProfile> = {},
  weakConcepts: Array<any> = [],
  insights?: DashboardInsights | null,
  activeMission?: any | null
): TodaysMissionData {
  const curriculum = getSubjectCurriculum(profile.preferredSubjects);

  // Requirement 18: Empty Subject State
  if (!curriculum) {
    return {
      title: 'Choose a learning subject to build your learning path.',
      topic: 'No Subject Selected',
      estimatedMinutes: 0,
      activityCount: 0,
      whyThisMission: 'Select a subject from your onboarding preferences to activate your subject-specific roadmap, missions, and diagnostics.',
      reasonTag: 'Setup Required',
      activities: [],
      progressPercent: 0,
      status: 'PENDING',
      currentStage: 'SETUP',
      primaryAction: {
        label: 'Select Subject',
        href: '/onboarding/subjects',
      },
    };
  }

  let missionTopic = curriculum.roadmapSteps[0].title;
  let missionTitle = curriculum.missions[0]?.title || curriculum.roadmapSteps[0].title;
  let whyText = curriculum.missions[0]?.description || curriculum.roadmapDescription;
  let reasonTag = `${curriculum.label} Track`;
  let status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' = 'PENDING';
  let currentStage = 'LEARN';

  if (activeMission) {
    status = activeMission.status || 'IN_PROGRESS';
    currentStage = activeMission.missionProgress?.currentStage || (status === 'COMPLETED' ? 'COMPLETED' : 'LEARN');
    if (currentStage === 'LESSON') currentStage = 'LEARN';
    if (currentStage === 'REFLECTION') currentStage = 'REVIEW';

    const rawTopic = (activeMission.content as any)?.topic || activeMission.title;
    if (rawTopic) {
      const matchedMission = curriculum.missions.find(
        (m: any) => topicMatches(m.title, rawTopic) || topicMatches(m.topicKey, rawTopic)
      );

      if (matchedMission) {
        missionTopic = matchedMission.title;
        missionTitle = activeMission.title || matchedMission.title;
        whyText = activeMission.description || matchedMission.description;
      } else {
        missionTopic = rawTopic;
        missionTitle = activeMission.title || rawTopic;
        whyText = activeMission.description || `Master ${rawTopic} for your ${curriculum.label} placement track.`;
      }
      reasonTag = `${curriculum.label} Track`;
    }
  } else {
    const defaultMission = curriculum.missions[0];
    if (defaultMission) {
      missionTopic = defaultMission.title;
      missionTitle = defaultMission.title;
      whyText = defaultMission.description;
      reasonTag = `${curriculum.label} Track`;
    }
  }

  const isCompleted = status === 'COMPLETED' || currentStage === 'COMPLETED';

  const isLearnDone = isCompleted || (currentStage !== 'LEARN' && status !== 'PENDING');
  const isPracticeDone = isCompleted || ['REVIEW', 'INTERVIEW', 'COMPLETED'].includes(currentStage);
  const isReviewDone = isCompleted || ['INTERVIEW', 'COMPLETED'].includes(currentStage);
  const isInterviewDone = isCompleted;

  const activities: MissionActivity[] = [
    {
      id: 'act-1',
      type: 'learn',
      title: `Concept Deep Dive: ${missionTopic}`,
      description: 'Review structural representation, key concepts, and core algorithms.',
      completed: isLearnDone,
      href: '/mission?step=learn',
    },
    {
      id: 'act-2',
      type: 'practice',
      title: `Targeted Practice: ${missionTopic}`,
      description: 'Solve topic questions and analyze trade-offs.',
      completed: isPracticeDone,
      href: '/mission?step=practice',
    },
    {
      id: 'act-3',
      type: 'review',
      title: 'Analyze Common Pitfalls & Edge Cases',
      description: 'Review common pitfalls and boundary conditions to prevent bugs.',
      completed: isReviewDone,
      href: '/mission?step=review',
    },
    {
      id: 'act-4',
      type: 'interview',
      title: 'Explain Trade-offs in a Technical Viva',
      description: 'Articulate concepts and trade-offs to an interviewer.',
      completed: isInterviewDone,
      href: '/mission?step=interview',
    },
  ];

  const completedCount = activities.filter((a) => a.completed).length;
  const progressPercent = isCompleted ? 100 : Math.round((completedCount / activities.length) * 100);

  let primaryAction = {
    label: 'Start Mission',
    href: '/mission?step=learn',
  };

  if (isCompleted) {
    primaryAction = {
      label: 'Mission Completed ✓',
      href: '/mission',
    };
  } else if (currentStage === 'PRACTICE') {
    primaryAction = {
      label: 'Continue Mission (Practice)',
      href: '/mission?step=practice',
    };
  } else if (currentStage === 'REVIEW') {
    primaryAction = {
      label: 'Continue Mission (Review)',
      href: '/mission?step=review',
    };
  } else if (currentStage === 'INTERVIEW') {
    primaryAction = {
      label: 'Continue Mission (Interview)',
      href: '/mission?step=interview',
    };
  } else if (status === 'IN_PROGRESS') {
    primaryAction = {
      label: 'Continue Mission',
      href: '/mission?step=learn',
    };
  }

  return {
    subjectKey: curriculum.key,
    title: missionTitle,
    topic: missionTopic,
    estimatedMinutes: 45,
    activityCount: activities.length,
    whyThisMission: whyText,
    reasonTag,
    activities,
    progressPercent,
    status,
    currentStage,
    primaryAction,
  };
}

/**
  * Derives linear roadmap progression customized to the user's selected subject.
  * Today's Mission topic is ALWAYS strictly synchronized with the Roadmap current focus.
  */
export function deriveRoadmapFocus(
  profile: Partial<UserProfile> = {},
  missionTopic: string = '',
  hasCompletedTopic: boolean = false
): RoadmapFocusData {
  const curriculum = getSubjectCurriculum(profile.preferredSubjects);

  if (!curriculum) {
    return {
      goal: profile.targetRole || 'Choose a learning subject to build your learning path.',
      trackTitle: 'Choose a learning subject to build your learning path.',
      currentModule: 'No Subject Selected',
      nextModule: 'Select Subject in Onboarding',
      steps: [
        {
          id: 'step-setup',
          title: 'Choose a learning subject in onboarding',
          status: 'current',
          isFocus: true,
        },
      ],
      subjectKey: null,
      personalizedRoadmapHref: '/onboarding/subjects',
    };
  }

  const targetGoal = profile.targetRole || profile.learningGoals?.[0] || `${curriculum.label} Track`;

  // Match current mission topic with roadmap steps via topicKey or title
  const matchedMission = curriculum.missions.find(
    (m: any) =>
      (missionTopic && (m.title === missionTopic || m.topicKey === missionTopic)) ||
      (missionTopic && topicMatches(m.title, missionTopic)) ||
      (missionTopic && topicMatches(m.topicKey, missionTopic))
  );

  const activeTopicKey = matchedMission?.topicKey;
  const activeTopic = missionTopic || curriculum.roadmapSteps[0].title;

  const matchedIndex = curriculum.roadmapSteps.findIndex(
    (s: any) =>
      (activeTopicKey && s.topicKey === activeTopicKey) ||
      topicMatches(s.title, activeTopic) ||
      topicMatches(s.topicKey, activeTopic)
  );
  const activeIdx = matchedIndex >= 0 ? matchedIndex : 0;

  const steps: RoadmapStep[] = curriculum.roadmapSteps.map((step: any, idx: number) => {
    let status: 'completed' | 'current' | 'upcoming';
    let isFocus = false;

    if (hasCompletedTopic) {
      if (idx <= activeIdx) {
        status = 'completed';
      } else if (idx === activeIdx + 1) {
        status = 'current';
        isFocus = true;
      } else {
        status = 'upcoming';
      }
    } else {
      if (idx < activeIdx) {
        status = 'completed';
      } else if (idx === activeIdx) {
        status = 'current';
        isFocus = true;
      } else {
        status = 'upcoming';
      }
    }

    return {
      id: step.id,
      title: step.title,
      status,
      isFocus,
    };
  });

  if (!steps.some((s) => s.isFocus)) {
    steps[steps.length - 1].isFocus = true;
  }

  const currentStep = steps.find((s) => s.isFocus) || steps[0];
  const nextStep = steps.find((s) => s.status === 'upcoming') || steps[steps.length - 1];

  return {
    goal: targetGoal,
    trackTitle: curriculum.roadmapTitle,
    currentModule: currentStep.title,
    nextModule: nextStep?.title || `${curriculum.label} Capstone`,
    steps,
    subjectKey: curriculum.key,
    personalizedRoadmapHref: `/roadmaps/${curriculum.key}`,
  };
}

/**
  * Derives qualitative Career & Placement milestones without arbitrary fake percentages.
  */
export function deriveCareerMilestones(profile: Partial<UserProfile> = {}): CareerMilestoneItem[] {
  const primaryKey = getPrimarySubject(profile.preferredSubjects);
  const subjectLabel = primaryKey ? getSubjectCurriculum(profile.preferredSubjects)?.label : 'Subject';

  return [
    {
      id: 'm-1',
      title: 'Technical Fundamentals',
      statusText: 'Active Focus',
      statusVariant: 'warning',
      detail: `Complete ${subjectLabel} & System Fundamentals according to your roadmap`,
      href: '/oa-practice',
    },
    {
      id: 'm-2',
      title: 'Resume & ATS Score',
      statusText: 'Review Ready',
      statusVariant: 'info',
      detail: 'Analyze resume against Software Engineering standards',
      href: '/resume',
    },
    {
      id: 'm-3',
      title: 'Projects & Portfolio',
      statusText: 'In Progress',
      statusVariant: 'neutral',
      detail: 'Build 2 full-stack projects with live deployment URLs',
      href: '/roadmaps',
    },
    {
      id: 'm-4',
      title: 'Mock Interviews',
      statusText: 'Upcoming',
      statusVariant: 'neutral',
      detail: 'Complete technical viva and behavioral mock rounds',
      href: '/interview',
    },
    {
      id: 'm-5',
      title: 'Company Assessments (OA)',
      statusText: 'Scheduled',
      statusVariant: 'neutral',
      detail: 'Simulate Amazon & Google OA timed assessments',
      href: '/companies',
    },
  ];
}

/**
  * Derives a calm, subject-aware learning insight strictly grounded in the user's primary subject.
  */
export function deriveLearningInsight(
  profile: Partial<UserProfile> = {},
  weakConcepts: Array<any> = [],
  insights?: DashboardInsights | null,
  activeTopic?: string
): LearningInsightData {
  const curriculum = getSubjectCurriculum(profile.preferredSubjects);

  if (!curriculum) {
    return {
      observation: 'Choose a learning subject in onboarding to activate your personalized learning path.',
      recommendedStep: 'Select a primary subject to receive custom roadmaps, daily missions, and diagnostics.',
      actionText: 'Choose Subject',
      actionHref: '/onboarding/subjects',
    };
  }

  const topic = activeTopic || curriculum.roadmapSteps[0].title;

  return {
    observation: curriculum.learningInsight.overview,
    recommendedStep: `Complete today's targeted 4-step mission on ${topic} to record verified concept mastery.`,
    actionText: `Practice ${topic}`,
    actionHref: '/mission',
  };
}
