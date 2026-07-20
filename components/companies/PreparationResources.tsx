import * as React from 'react';
import { FileText, Map, Code, Code2 } from 'lucide-react';
import { QuickActionCard } from '@/components/dashboard/QuickActionCard';

export function PreparationResources() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <QuickActionCard 
        icon={FileText}
        title="Resume Tips"
        description="Tailor your resume for this specific company"
        actionText="View Tips"
      />
      <QuickActionCard 
        icon={Map}
        title="Company Roadmap"
        description="Structured preparation path from start to finish"
        actionText="Start Roadmap"
      />
      <QuickActionCard 
        icon={Code}
        title="Interview Questions"
        description="Most frequently asked behavioral and technical questions"
        actionText="Practice Now"
      />
      <QuickActionCard 
        icon={Code2}
        title="OA Sheet"
        description="Specific coding challenges previously asked in OAs"
        actionText="Solve Sheet"
      />
    </div>
  );
}
