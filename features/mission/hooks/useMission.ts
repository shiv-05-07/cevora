import { useState, useEffect, useCallback } from 'react';
import { MissionState, MissionStage, CompletionPayload } from '../types';

export function useMission(initialState: MissionState | null) {
  const [state, setState] = useState<MissionState | null>(initialState);
  const [currentStage, setCurrentStage] = useState<MissionStage>('LEARN');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialState) {
      setState(initialState);
      if (initialState.mission?.status === 'COMPLETED') {
        setCurrentStage('COMPLETED');
      } else if (initialState.progress?.currentStage) {
        const rawStage = initialState.progress.currentStage;
        if (rawStage === 'LESSON') setCurrentStage('LEARN');
        else if (rawStage === 'REFLECTION') setCurrentStage('REVIEW');
        else setCurrentStage(rawStage as MissionStage);
      }
    }
  }, [initialState]);

  const advanceStage = useCallback(
    async (
      nextStage: MissionStage,
      extra?: { practiceAnswerId?: string; isCorrect?: boolean }
    ) => {
      if (!state) return;
      // Optimistically update UI immediately so user navigation is instant (0ms delay)
      setCurrentStage(nextStage);
      setIsLoading(false);
      setError(null);
      
      try {
        fetch('/api/missions/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            missionId: state.mission.id,
            stage: nextStage,
            ...extra,
          }),
        }).catch((err) => {
          console.error('Asynchronous mission progress sync error:', err);
        });
      } catch (err: any) {
        console.error('Error advancing mission stage:', err);
      }
    },
    [state]
  );

  const completeMission = useCallback(
    async (payload: CompletionPayload) => {
      if (!state) return;
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/missions/complete`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            missionId: state.mission.id,
            ...payload,
          }),
        });
        if (!res.ok) throw new Error('Failed to complete mission');

        setCurrentStage('COMPLETED');
      } catch (err: any) {
        console.error('Error completing mission:', err);
        setError(err.message || 'Failed to complete mission');
      } finally {
        setIsLoading(false);
      }
    },
    [state]
  );

  return {
    state,
    currentStage,
    setCurrentStage,
    isLoading,
    error,
    advanceStage,
    completeMission,
  };
}
