'use client';

import React, { useEffect, useState } from 'react';
import { useMission } from '@/features/mission/hooks/useMission';
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
  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/missions/today')
      .then(res => res.json())
      .then(data => {
        setInitialData(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const { state, currentStage, advanceStage, completeMission } = useMission(initialData);

  if (loading || !state) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <MissionSkeleton />
      </div>
    );
  }

  const { mission, lessons, practices } = state;

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
