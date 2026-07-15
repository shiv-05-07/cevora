'use client';

import * as React from 'react';
import { Video } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { EmptyState } from '@/components/ui/empty-state';

export default function InterviewPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Interview Practice"
        description="Practice custom simulated interviews designed for Technical, HR, Behavioral, Viva, or Resume-specific checks."
      />

      <EmptyState
        icon={Video}
        title="Start Mock Interview Track"
        description="Pick a preparation category or target recruiter profile to launch a simulated interactive interviewer terminal."
        actionText="Select Track"
        onActionClick={() => alert('Opening interview selector...')}
      />
    </div>
  );
}
