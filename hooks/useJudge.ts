import { useState, useCallback } from 'react';
import { ConsoleLog, JudgeStatus, RunResult, SubmitResult } from '@/types/judge';
import { TestCase } from '@/components/oa/solve/mockProblems';
import { MockJudge } from '@/lib/mockJudge';

export function useJudge() {
  const [status, setStatus] = useState<JudgeStatus>('Idle');
  const [lastAction, setLastAction] = useState<'run' | 'submit' | null>(null);
  const [logs, setLogs] = useState<ConsoleLog[]>([]);
  const [runResult, setRunResult] = useState<RunResult | null>(null);
  const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null);
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(null);

  const addLog = useCallback((message: string) => {
    setLogs(prev => [...prev, { id: Math.random().toString(), timestamp: new Date(), message }]);
  }, []);

  const reset = useCallback(() => {
    setStatus('Idle');
    setLastAction(null);
    setLogs([]);
    setRunResult(null);
    setSubmitResult(null);
    setProgress(null);
  }, []);

  const executeRun = useCallback(async (testCases: TestCase[]) => {
    setStatus('Running');
    setLastAction('run');
    setLogs([]);
    setRunResult(null);
    setProgress({ current: 0, total: testCases.filter(t => !t.isHidden).length });

    try {
      const result = await MockJudge.simulateRun(
        testCases, 
        addLog,
        (current, total) => setProgress({ current, total })
      );
      setRunResult(result);
      setStatus('Completed');
    } catch (e) {
      addLog('Error: Execution failed');
      setStatus('Idle');
    }
  }, [addLog]);

  const executeSubmit = useCallback(async (language: string) => {
    setStatus('Submitting');
    setLastAction('submit');
    setLogs([]);
    setSubmitResult(null);
    setProgress(null);

    try {
      const result = await MockJudge.simulateSubmit(language, addLog);
      setSubmitResult(result);
      setStatus('Completed');
    } catch (e) {
      addLog('Error: Submission failed');
      setStatus('Idle');
    }
  }, [addLog]);

  return {
    status,
    lastAction,
    logs,
    runResult,
    submitResult,
    progress,
    executeRun,
    executeSubmit,
    reset
  };
}
