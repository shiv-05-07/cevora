'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMission } from '@/features/mission/hooks/useMission';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowLeft } from 'lucide-react';
import {
  MissionSkeleton,
  MissionStepper,
  MissionHeroCard,
  MissionReasonCard,
  LessonCard,
  PracticeCard,
  ReviewCard,
  InterviewCard,
  CompletionDialog
} from '@/features/mission/components/MissionComponents';
import { getTopicCurriculum } from '@/lib/mission/missionCurriculum';
import { MissionStage } from '@/features/mission/types';

export default function MissionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stepParam = searchParams.get('step')?.toUpperCase();

  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/missions/today')
      .then(res => res.json())
      .then(data => {
        const payload = data?.data || data;
        setInitialData(payload);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching today mission:', err);
        setLoading(false);
      });
  }, []);

  const { state, currentStage, setCurrentStage, advanceStage, completeMission } = useMission(initialData);

  // If user navigated directly to a specific step via URL (e.g. from Dashboard activity link), honor it
  useEffect(() => {
    if (stepParam && state) {
      if (stepParam === 'PRACTICE') setCurrentStage('PRACTICE');
      else if (stepParam === 'REVIEW') setCurrentStage('REVIEW');
      else if (stepParam === 'INTERVIEW') setCurrentStage('INTERVIEW');
      else if (stepParam === 'LEARN') setCurrentStage('LEARN');
    }
  }, [stepParam, state, setCurrentStage]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
        <MissionSkeleton />
      </div>
    );
  }

  const mission = state?.mission;
  const lessons = state?.lessons || [];
  const practices = state?.practices || [];

  if (!mission || !mission.title) {
    return (
      <div className="max-w-3xl mx-auto p-12 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto border border-primary/20">
          <Sparkles className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">No Mission Active</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            You have completed all scheduled learning missions for today! Check back tomorrow or launch an interactive practice session.
          </p>
        </div>
        <div className="flex justify-center gap-3 pt-2">
          <Button onClick={() => router.push('/dashboard')} variant="default" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // Resolve curriculum data for Review and Interview steps
  const curriculum = getTopicCurriculum((mission.content as any)?.topic || mission.title);
  const reviewData = (mission.content as any)?.review || curriculum.review;
  const interviewData = (mission.content as any)?.interview || curriculum.interview;

  const activeLesson = lessons[0] || {
    title: curriculum.learn.title,
    content: curriculum.learn.content,
    interactiveExample: curriculum.learn.interactiveExample,
  };

  const activePractice = practices[0] || {
    question: curriculum.practice.question,
    options: curriculum.practice.options,
    correctAnswer: { id: curriculum.practice.correctAnswerId },
    explanation: curriculum.practice.explanation,
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6 pb-16">
      {/* Header back link */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/dashboard')}
          className="gap-2 text-muted-foreground hover:text-foreground font-semibold text-xs -ml-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Command Center
        </Button>
      </div>

      {/* 4-Step Stepper */}
      <MissionStepper currentStage={currentStage} />

      {/* Hero Card */}
      <MissionHeroCard mission={mission} />

      {/* Reason Card */}
      {mission.description && (
        <MissionReasonCard reason={mission.description} />
      )}

      {/* Step 1: Learn */}
      {(currentStage === 'LEARN' || currentStage === 'LESSON') && (
        <LessonCard
          lesson={activeLesson}
          onComplete={() => advanceStage('PRACTICE')}
        />
      )}

      {/* Step 2: Practice */}
      {currentStage === 'PRACTICE' && (
        <PracticeCard
          practice={activePractice}
          onComplete={(extra) => advanceStage('REVIEW', extra)}
        />
      )}

      {/* Step 3: Review */}
      {(currentStage === 'REVIEW' || currentStage === 'REFLECTION') && (
        <ReviewCard
          reviewData={reviewData}
          onComplete={() => advanceStage('INTERVIEW')}
        />
      )}

      {/* Step 4: Interview */}
      {currentStage === 'INTERVIEW' && (
        <InterviewCard
          interviewData={interviewData}
          onSubmit={(notes) => completeMission({
            reflectionNotes: notes,
            confidenceRating: 5,
            timeSpentSeconds: 180,
          })}
        />
      )}

      {/* Step 5: Completed */}
      {currentStage === 'COMPLETED' && (
        <CompletionDialog xp={mission.xpAwarded || 50} />
      )}
    </div>
  );
}
