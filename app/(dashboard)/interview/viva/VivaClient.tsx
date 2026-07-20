'use client';

import * as React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { InterviewConfig, InterviewMessage, InterviewFeedback, InterviewRole, InterviewLevel, InterviewType, InputMode } from '@/components/ai-interview/types';
import { SharedSession } from '@/components/ai-interview/SharedSession';
import { InterviewResult } from '@/components/ai-interview/InterviewResult';

export function VivaClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [phase, setPhase] = React.useState<'session' | 'result'>('session');
  const [history, setHistory] = React.useState<InterviewMessage[]>([]);
  const [feedback, setFeedback] = React.useState<InterviewFeedback | null>(null);

  // Construct config from URL params
  const config = React.useMemo<InterviewConfig>(() => ({
    role: (searchParams.get('role') as InterviewRole) || 'Other',
    level: (searchParams.get('level') as InterviewLevel) || 'Beginner',
    company: searchParams.get('company') || 'University',
    type: (searchParams.get('type') as InterviewType) || 'Technical',
    inputMode: (searchParams.get('inputMode') as InputMode) || 'text',
    sessionMode: 'viva',
  }), [searchParams]);

  const handleEnd = (finalHistory: InterviewMessage[]) => {
    setHistory(finalHistory);
    setPhase('result');
    
    // Mock Feedback Generation
    setTimeout(() => {
      setFeedback({
        score: 78,
        strengths: [
          "Good theoretical understanding",
          "Maintained composure during questioning"
        ],
        weaknesses: [
          "Needs deeper practical examples",
          "Sometimes gave overly brief answers"
        ],
        improvements: [
          "Expand answers with 'Why' and 'How'",
          "Review core textbook definitions"
        ],
        recommendedTopics: [
          "Foundational Theory",
          "Real-world application"
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
            <h1 className="text-2xl font-bold tracking-tight">Active Session: Viva Preparation</h1>
            <p className="text-sm text-muted-foreground">Subject: {config.company} | Mode: {config.inputMode.toUpperCase()}</p>
          </div>
          <SharedSession config={config} onEnd={handleEnd} />
        </div>
      ) : (
        <InterviewResult feedback={feedback} onRestart={handleRestart} />
      )}
    </div>
  );
}
