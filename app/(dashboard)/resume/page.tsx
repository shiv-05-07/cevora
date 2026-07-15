'use client';

import * as React from 'react';
import { FileText } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { EmptyState } from '@/components/ui/empty-state';

export default function ResumePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Resume Analyzer"
        description="Verify layout guidelines, audit key resume content sections, and test ATS screening index scores."
      />

      <EmptyState
        icon={FileText}
        title="Upload Your Resume"
        description="Submit your PDF resume draft to scan formatting issues, flag section weaknesses, and calculate target role compatibility."
        actionText="Upload PDF"
        onActionClick={() => alert('Launching file selector...')}
      />
    </div>
  );
}
