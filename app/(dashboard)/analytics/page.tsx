'use client';

import * as React from 'react';
import { BarChart3 } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { EmptyState } from '@/components/ui/empty-state';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Performance Analytics"
        description="Monitor solved questions, average screening test scores, mock interview grades, and compare progress against cohort trends."
      />

      <EmptyState
        icon={BarChart3}
        title="Oversight & Progress Indexes"
        description="Review comprehensive progress reports and diagnostic performance tracks mapped to active workspaces."
        actionText="Synthesize Analytics"
        onActionClick={() => alert('Synthesizing stats...')}
      />
    </div>
  );
}
