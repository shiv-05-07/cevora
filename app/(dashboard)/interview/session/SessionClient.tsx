'use client';

import * as React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { InterviewConfig, InterviewMessage, InterviewFeedback, InterviewRole, InterviewLevel, InterviewType, InputMode } from '@/components/ai-interview/types';
import { SharedSession } from '@/components/ai-interview/SharedSession';
import { InterviewResult } from '@/components/ai-interview/InterviewResult';

export function SessionClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [phase, setPhase] = React.useState<'session' | 'result'>('session');
  const [history, setHistory] = React.useState<InterviewMessage[]>([]);
  const [feedback, setFeedback] = React.useState<InterviewFeedback | null>(null);

  // Construct config from URL params
  const config = React.useMemo<InterviewConfig>(() => ({
    role: (searchParams.get('role') as InterviewRole) || 'SDE',
    level: (searchParams.get('level') as InterviewLevel) || 'Intermediate',
    company: searchParams.get('company') || 'Google',
    type: (searchParams.get('type') as InterviewType) || 'Technical',
    inputMode: (searchParams.get('inputMode') as InputMode) || 'text',
    sessionMode: 'interview',
  }), [searchParams]);

  const handleEnd = (finalHistory: InterviewMessage[]) => {
    setHistory(finalHistory);
    setPhase('result');
    
    // Mock Feedback Generation
    setTimeout(() => {
      setFeedback({
        score: 92,
        strengths: [
          "Excellent technical depth",
          "Clear and concise answers",
          "Confident communication"
        ],
        weaknesses: [
          "Could structure edge-cases better"
        ],
        improvements: [
          "Always state assumptions before solving"
        ],
        recommendedTopics: [
          "Scalability Patterns",
          "Database Sharding"
        ]
      });
    }, 2000);
  };

  const handleRestart = () => {
    router.push('/interview'); // Back to Hub
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      {phase === 'session' ? (
        <div className="space-y-4">
          <div className="mb-4">
            <h1 className="text-2xl font-bold tracking-tight">Active Session: {config.company} Interview</h1>
            <p className="text-sm text-muted-foreground">Mode: {config.inputMode.toUpperCase()}</p>
          </div>
          <SharedSession config={config} onEnd={handleEnd} />
        </div>
      ) : (
        <InterviewResult feedback={feedback} onRestart={handleRestart} />
      )}
    </div>
  );
}
