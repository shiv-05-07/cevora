import * as React from 'react';
import { Suspense } from 'react';
import { SessionClient } from './SessionClient';
import { Loader2 } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Interview Session | Cevora',
  description: 'Participate in an AI-driven mock interview.',
};

export default function AIInterviewSessionPage() {
  return (
    <Suspense 
      fallback={
        <div className="w-full flex items-center justify-center p-8 min-h-[50vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      }
    >
      <SessionClient />
    </Suspense>
  );
}
