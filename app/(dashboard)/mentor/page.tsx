'use client';

import * as React from 'react';
import { Bot } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { EmptyState } from '@/components/ui/empty-state';

export default function MentorPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Mentor Workspace"
        description="Interact with a dedicated study mentor to ask syntax queries, resolve algorithm logic gaps, and request code optimizations."
      />

      <EmptyState
        icon={Bot}
        title="Open Mentor Session"
        description="Initiate a dialogue session with the placement preparation mentor workspace to resolve coding bugs or explore concepts."
        actionText="Open Session"
        onActionClick={() => alert('Starting mentor console...')}
      />
    </div>
  );
}
