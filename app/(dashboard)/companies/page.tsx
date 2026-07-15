'use client';

import * as React from 'react';
import { Compass } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { EmptyState } from '@/components/ui/empty-state';

export default function CompaniesPage() {
  const handleAction = () => {
    alert('Exploring companies database...');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Companies Explorer"
        description="Browse company profiles, historical hiring timelines, and custom placement selection processes."
      />

      <EmptyState
        icon={Compass}
        title="No Target Companies Set"
        description="Explore the companies directory to select your targets and unlock customized preparation timelines."
        actionText="Search Directory"
        onActionClick={handleAction}
      />
    </div>
  );
}
