'use client';

import * as React from 'react';
import { BookOpen } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { EmptyState } from '@/components/ui/empty-state';

export default function StudyAssistantPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Study Assistant"
        description="Your AI-powered study companion to help you master concepts and prepare effectively."
      />

      <EmptyState
        icon={BookOpen}
        title="Study Assistant is Empty"
        description="The Study Assistant module is currently under development. Soon, you'll be able to generate study plans and ask questions here."
        actionText="Return to Dashboard"
        onActionClick={() => window.location.href = '/dashboard'}
      />
    </div>
  );
}
