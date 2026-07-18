'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AggregatedProfile } from '@/types/profile';
import { Button } from '@/components/ui/button';
import { Settings, Eye, Settings2, Shield, Layout, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface PersonalPreferencesProps {
  profile: AggregatedProfile;
  recruiterMode: boolean;
}

export function PersonalPreferences({ profile, recruiterMode }: PersonalPreferencesProps) {
  const { settings } = profile;

  if (recruiterMode) return null; // Hide in recruiter mode

  const preferenceItems = [
    { label: 'Theme Preference', value: settings.appearance.theme, icon: Layout },
    { label: 'AI Assistance', value: settings.ai.responseStyle + ' Output', icon: Sparkles },
    { label: 'Interview Difficulty', value: settings.ai.interviewDifficulty, icon: Settings2 },
    { label: 'Learning Style', value: settings.ai.studyPlan, icon: Settings }
  ];

  return (
    <Card className="bg-card border-border/50 shadow-sm transition-all duration-200 hover:-translate-y-[2px] hover:border-border/60 hover:shadow-md">
      <CardHeader className="border-b border-border/40 pb-4 flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <Settings className="w-5 h-5 text-primary" />
          Personal Preferences
        </CardTitle>
        <Link href="/settings">
          <Button variant="outline" size="sm" className="h-8 text-xs">
            Manage Settings
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {preferenceItems.map((pref, index) => {
            const Icon = pref.icon;
            return (
              <div 
                key={index}
                className="p-4 border border-border/50 bg-muted/10 rounded-xl space-y-1.5"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] text-muted-foreground block font-medium uppercase tracking-wider">{pref.label}</span>
                  <span className="text-xs font-bold text-foreground block">{pref.value}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
