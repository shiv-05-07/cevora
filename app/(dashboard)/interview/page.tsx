'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { SetupCard } from '@/components/ai-interview/SetupCard';
import { InterviewConfig } from '@/components/ai-interview/types';

export default function InterviewHubPage() {
  const router = useRouter();

  const handleStart = (config: InterviewConfig) => {
    // Serialize config to URL params
    const params = new URLSearchParams({
      role: config.role,
      level: config.level,
      company: config.company,
      type: config.type,
      inputMode: config.inputMode,
    });
    
    if (config.sessionMode === 'interview') {
      router.push(`/interview/session?${params.toString()}`);
    } else {
      router.push(`/interview/viva?${params.toString()}`);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-8">
      
      <div className="border-b pb-6">
        <h1 className="text-3xl font-bold tracking-tight">Interview & Viva Preparation</h1>
        <p className="text-muted-foreground mt-2">
          Select a mode below to launch an interactive session tailored to your needs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Section 1: AI Interview Simulator */}
        <section className="flex flex-col h-full">
          <SetupCard mode="interview" onStart={handleStart} />
        </section>

        {/* Section 2: Viva Preparation */}
        <section className="flex flex-col h-full">
          <SetupCard mode="viva" onStart={handleStart} />
        </section>

      </div>
      
    </div>
  );
}
