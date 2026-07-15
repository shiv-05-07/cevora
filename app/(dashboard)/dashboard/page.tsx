'use client';

import * as React from 'react';
import { LayoutDashboard } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { EmptyState } from '@/components/ui/empty-state';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Review your placement preparation statistics, milestones, and active tasks."
      />

      <EmptyState
        icon={LayoutDashboard}
        title="Welcome to your Dashboard"
        description="Your placement companion workspace is ready. Active preparation status and progress metrics will render here."
        actionText="Get Started"
        onActionClick={() => alert('Initializing dashboard walkthrough...')}
      />
    </div>
  );
}
