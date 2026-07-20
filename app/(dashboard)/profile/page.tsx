import * as React from 'react';
import { ProfileClient } from '@/components/profile/ProfileClient';
import { buildProfile } from '@/data/profileAggregator';
import { mockSettings } from '@/data/mockSettings';
import { buildAnalytics } from '@/data/mockAnalytics';

export const metadata = {
  title: 'Profile Hub | Cevora',
  description: 'Your centralized living career identity and placement portfolio.',
};

export default function ProfilePage() {
  // Aggregate settings and analytics data (defaulting to 30d view)
  const analyticsData = buildAnalytics('30d');
  const aggregatedProfile = buildProfile({
    settings: mockSettings,
    analytics: analyticsData
  });

  return (
    <ProfileClient initialProfile={aggregatedProfile} />
  );
}
