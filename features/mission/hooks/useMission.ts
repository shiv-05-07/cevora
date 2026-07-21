import { useState, useEffect, useCallback } from 'react';
import { MissionState, MissionStage, CompletionPayload } from '../types';

export function useMission(initialState: MissionState | null) {
  const [state, setState] = useState<MissionState | null>(initialState);
  const [currentStage, setCurrentStage] = useState<MissionStage>('LESSON');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialState) {
      setState(initialState);
      if (initialState.progress?.currentStage) {
        setCurrentStage(initialState.progress.currentStage as MissionStage);
      }
    }
  }, [initialState]);

  const advanceStage = useCallback(async (nextStage: MissionStage) => {
    if (!state) return;
    setIsLoading(true);
    setError(null);
    try {
      // In a real app, you would make an API call here to update the state machine
      // await fetch(`/api/missions/${state.mission.id}/progress`, { method: 'POST', body: JSON.stringify({ nextStage }) });
      setCurrentStage(nextStage);
    } catch (err: any) {
      setError(err.message || 'Failed to advance stage');
    } finally {
      setIsLoading(false);
    }
  }, [state]);

  const completeMission = useCallback(async (payload: CompletionPayload) => {
    if (!state) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/missions/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          missionId: state.mission.id,
          ...payload
        })
      });
      if (!res.ok) throw new Error('Failed to complete mission');
      
      setCurrentStage('COMPLETED');
    } catch (err: any) {
      setError(err.message || 'Failed to complete mission');
    } finally {
      setIsLoading(false);
    }
  }, [state]);

  return {
    state,
    currentStage,
    isLoading,
    error,
    advanceStage,
    completeMission
  };
}
