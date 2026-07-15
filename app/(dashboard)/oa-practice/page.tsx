'use client';

import * as React from 'react';
import { Code } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { EmptyState } from '@/components/ui/empty-state';

export default function OAPracticePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="OA Practice Platform"
        description="Familiarize yourself with typical corporate online screening assessments in a timed simulated environment."
      />

      <EmptyState
        icon={Code}
        title="No Practice Test Selected"
        description="Browse through topic directories including Arrays, Dynamic Programming, and SQL to start a mock assessment."
        actionText="Browse Assessments"
        onActionClick={() => alert('Browsing practice banks...')}
      />
    </div>
  );
}
