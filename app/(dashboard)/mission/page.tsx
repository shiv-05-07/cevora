'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMission } from '@/features/mission/hooks/useMission';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { 
  MissionSkeleton, 
  MissionHeroCard, 
  MissionReasonCard, 
  LessonCard, 
  PracticeCard, 
  ReflectionCard, 
  CompletionDialog 
} from '@/features/mission/components/MissionComponents';

export default function MissionPage() {
  const router = useRouter();
  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/missions/today')
      .then(res => res.json())
      .then(data => {
        // Support response structures: data.data || data
        setInitialData(data?.data || data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching today mission:', err);
        setLoading(false);
      });
  }, []);

  const { state, currentStage, advanceStage, completeMission } = useMission(initialData);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6">
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
            You have completed all scheduled learning missions for today! Check back tomorrow or launch an interactive AI practice session.
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

  return (
    <div className="max-w-3xl mx-auto p-6">
      <MissionHeroCard mission={mission} />
      
      {mission.description && (
        <MissionReasonCard reason={mission.description} />
      )}

      {currentStage === 'LESSON' && lessons.length > 0 && (
        <LessonCard 
          lesson={lessons[0]} 
          onComplete={() => advanceStage('PRACTICE')} 
        />
      )}

      {currentStage === 'PRACTICE' && practices.length > 0 && (
        <PracticeCard 
          practice={practices[0]} 
          onComplete={() => advanceStage('REFLECTION')} 
        />
      )}

      {currentStage === 'REFLECTION' && (
        <ReflectionCard 
          onSubmit={(data) => completeMission(data)} 
        />
      )}

      {currentStage === 'COMPLETED' && (
        <CompletionDialog xp={mission.xpAwarded || 50} />
      )}
    </div>
  );
}
