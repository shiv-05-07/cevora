'use client';

import * as React from 'react';
import { CompanyPreferencesForm } from './CompanyPreferencesForm';
import { CompaniesClient } from '@/components/companies/CompaniesClient';

interface CompaniesOrchestratorProps {
  userId: string;
  profile: any;
  companies: any[];
}

export function CompaniesOrchestrator({ userId, profile, companies }: CompaniesOrchestratorProps) {
  const [showPreferences, setShowPreferences] = React.useState(false);

  // If the user doesn't have an opportunity type preference set, show the form
  React.useEffect(() => {
    if (!profile || !profile.opportunityTypePreference) {
      setShowPreferences(true);
    }
  }, [profile]);

  if (showPreferences) {
    return (
      <CompanyPreferencesForm 
        userId={userId} 
        initialProfile={profile} 
        onComplete={() => setShowPreferences(false)} 
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Match Summary */}
      <div className="bg-card border border-border/50 rounded-xl p-4 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-1">Your Opportunity Profile</h3>
          <p className="text-base font-medium">
            {profile.cgpa} CGPA &middot; {profile.branch || 'Any Branch'} &middot; {profile.graduationYear || 'Any Year'}
          </p>
          <p className="text-sm text-muted-foreground mt-1 truncate max-w-xl">
            {profile.skills?.length > 0 ? profile.skills.join(' • ') : 'No skills added'}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wider">
            {profile.opportunityTypePreference}
          </div>
          <button 
            onClick={() => setShowPreferences(true)}
            className="text-xs text-muted-foreground hover:text-primary transition-colors underline underline-offset-2"
          >
            Edit Preferences
          </button>
        </div>
      </div>

      <CompaniesClient initialCompanies={companies} userId={userId} />
    </div>
  );
}
