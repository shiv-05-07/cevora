import * as React from 'react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { SettingsClient } from '@/components/settings/SettingsClient';
import { mockSettings } from '@/data/mockSettings';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Configure active profile parameters, credentials, security credentials, and active workspaces."
      />

      <SettingsClient initialData={mockSettings} />
    </div>
  );
}
