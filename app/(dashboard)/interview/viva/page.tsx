import * as React from 'react';
import { Suspense } from 'react';
import { VivaClient } from './VivaClient';
import { Loader2 } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Viva Session | Cevora',
  description: 'Participate in an AI-driven mock viva session.',
};

export default function VivaSessionPage() {
  return (
    <Suspense 
      fallback={
        <div className="w-full flex items-center justify-center p-8 min-h-[50vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      }
    >
      <VivaClient />
    </Suspense>
  );
}
