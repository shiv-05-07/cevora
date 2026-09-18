'use client';

import * as React from 'react';
import Link from 'next/link';
import { Map, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { useProfileStore } from '@/store/useProfileStore';
import { useDiagnosticStore } from '@/store/useDiagnosticStore';
import { useKnowledgeStore } from '@/store/useKnowledgeStore';
import { PreBaselineDashboard } from '@/components/dashboard/PreBaselineDashboard';
import { TodaysMissionCard } from '@/components/dashboard/TodaysMissionCard';
import { SkillStateMap } from '@/components/dashboard/SkillStateMap';
import { RoadmapTrackCard } from '@/components/dashboard/RoadmapTrackCard';
import { CareerMilestoneCard } from '@/components/dashboard/CareerMilestoneCard';
import { LearningInsightCard } from '@/components/dashboard/LearningInsightCard';
import { SecondaryContentSection } from '@/components/dashboard/SecondaryContentSection';
import {
  deriveSkillStateMap,
  deriveTodaysMission,
  deriveRoadmapFocus,
  deriveCareerMilestones,
  deriveLearningInsight,
} from '@/lib/dashboard/dashboardAdapter';

export default function DashboardPage() {
  const { profile } = useProfileStore();
  const { status, fetchStatus } = useDiagnosticStore();
  const { dashboardInsights, fetchDashboardInsights, weakConcepts, fetchWeakConcepts } = useKnowledgeStore();
  const [activeMission, setActiveMission] = React.useState<any | null>(null);
  const [isInitializing, setIsInitializing] = React.useState(true);

  const fetchMission = React.useCallback(async () => {
    try {
      const res = await fetch('/api/missions/today');
      if (res.ok) {
        const data = await res.json();
        const payload = data?.data || data;
        if (payload?.mission) {
          setActiveMission({
            ...payload.mission,
            missionProgress: payload.progress || payload.mission?.missionProgress,
          });
        }
      }
    } catch (e) {
      console.error('Error fetching today mission in dashboard:', e);
    }
  }, []);

  React.useEffect(() => {
    let mounted = true;
    Promise.all([
      fetchStatus(),
      fetchDashboardInsights(),
      fetchWeakConcepts(),
      fetchMission(),
    ]).finally(() => {
      if (mounted) {
        setIsInitializing(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, [fetchStatus, fetchDashboardInsights, fetchWeakConcepts, fetchMission]);

  const firstName = profile.name ? profile.name.split(' ')[0] : 'Student';

  // Determine baseline completion using canonical diagnostic & knowledge sources of truth
  const isDiagnosticCompleted =
    status === 'LOCKED' ||
    status === 'COMPLETED' ||
    (dashboardInsights?.diagnosticCompleted ?? false);

  // Derivations for State B (Post-Baseline)
  const mission = deriveTodaysMission(profile, weakConcepts, dashboardInsights, activeMission);
  const isMissionCompleted = activeMission?.status === 'COMPLETED' || mission.status === 'COMPLETED';
  const roadmap = deriveRoadmapFocus(profile, mission.topic, isMissionCompleted);
  const skillGroups = deriveSkillStateMap(
    profile.preferredSubjects || [],
    dashboardInsights?.skillScores || [],
    weakConcepts,
    isMissionCompleted,
    mission.topic
  );
  const careerMilestones = deriveCareerMilestones(profile);
  const learningInsight = deriveLearningInsight(profile, weakConcepts, dashboardInsights, mission.topic);

  if (isInitializing && !dashboardInsights && status === 'PENDING') {
    return (
      <div className="space-y-6 pb-12 animate-pulse">
        <div className="h-14 bg-muted/30 rounded-2xl w-2/3" />
        <div className="h-64 bg-muted/20 rounded-3xl" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-80 bg-muted/20 rounded-3xl" />
          <div className="h-80 bg-muted/20 rounded-3xl" />
        </div>
      </div>
    );
  }

  // STATE A: Student has NOT completed the baseline assessment
  if (!isDiagnosticCompleted) {
    return (
      <div className="space-y-6 pb-12">
        <PreBaselineDashboard profile={profile} diagnosticStatus={status} />
      </div>
    );
  }

  // STATE B: Student HAS completed the baseline assessment (Daily Command Center)
  return (
    <div className="space-y-8 pb-12">
      {/* 1. Page Header */}
      <PageHeader
        title="Daily Command Center"
        description={`Welcome back, ${firstName}. Here is your targeted learning priority for today.`}
        actions={
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link href={roadmap.personalizedRoadmapHref} className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto font-bold text-xs h-9">
                <Map className="w-3.5 h-3.5 mr-1.5" />
                {roadmap.subjectKey ? 'Your Roadmap' : 'Select Subject'}
              </Button>
            </Link>
            <Link href={mission.primaryAction.href} className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto font-bold text-xs h-9 shadow-sm">
                {mission.primaryAction.label}
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        }
      />

      {/* 2. DOMINANT: Today's Mission (What & Why) */}
      <section aria-label="Today's Mission" className="w-full">
        <TodaysMissionCard mission={mission} />
      </section>

      {/* 3. Core Workflow Layout: Current State, Roadmap, Career, Learning Insights */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Column: Skill State Map & Linear Roadmap Track */}
        <div className="xl:col-span-7 space-y-6">
          <SkillStateMap skillGroups={skillGroups} />
          <RoadmapTrackCard roadmap={roadmap} />
        </div>

        {/* Right Column: Learning Insight & Career Placement Milestones */}
        <div className="xl:col-span-5 space-y-6">
          <LearningInsightCard insight={learningInsight} />
          <CareerMilestoneCard
            milestones={careerMilestones}
            targetGoal={roadmap.goal}
          />
        </div>
      </div>

      {/* 4. Secondary Information Hub (Curated practice, OA prep, quick tools) */}
      <SecondaryContentSection />
    </div>
  );
}
