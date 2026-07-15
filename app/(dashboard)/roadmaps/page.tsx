'use client';

import * as React from 'react';
import { Map } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { EmptyState } from '@/components/ui/empty-state';

export default function RoadmapsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Placement Roadmaps"
        description="Follow structured preparation tracks mapped to target corporate timelines."
      />

      <EmptyState
        icon={Map}
        title="No Active Roadmaps"
        description="Select a target company role or technical track to compile a custom preparation path."
        actionText="Compile Roadmap"
        onActionClick={() => alert('Compiling a preparation plan...')}
      />
    </div>
  );
}
