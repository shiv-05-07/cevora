import * as React from 'react';
import { AnalyticsMilestone } from '@/types/analytics';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ActivityFeed, ActivityItem } from '@/components/shared/ActivityFeed';
import { FileText, Code2, Map, Users, Star, History } from 'lucide-react';
import { EmptyState } from './EmptyState';

export function ProgressTimeline({ milestones }: { milestones: AnalyticsMilestone[] }) {
  if (!milestones || milestones.length === 0) {
    return (
      <EmptyState
        icon={History}
        title="No Timeline Activity"
        description="Your major achievements and milestones will appear here once you start taking action."
      />
    );
  }

  const mapCategoryToIcon = (category: AnalyticsMilestone['category']) => {
    switch (category) {
      case 'resume': return FileText;
      case 'coding': return Code2;
      case 'roadmap': return Map;
      case 'interview': return Users;
      default: return Star;
    }
  };

  const mapCategoryToStatus = (category: AnalyticsMilestone['category']): ActivityItem['status'] => {
    switch (category) {
      case 'resume': return 'info';
      case 'coding': return 'success';
      case 'roadmap': return 'warning';
      case 'interview': return 'neutral';
      default: return 'success';
    }
  };

  const activityItems: ActivityItem[] = milestones.map(m => ({
    id: m.id,
    title: m.title,
    description: m.description,
    timestamp: m.date,
    icon: mapCategoryToIcon(m.category),
    status: mapCategoryToStatus(m.category),
    statusLabel: m.category.toUpperCase()
  }));

  return (
    <Card className="bg-card border-border/50 shadow-sm transition-all duration-200 ease-out hover:border-border/60 hover:shadow-md hover:-translate-y-[2px]">
      <CardHeader>
        <CardTitle>Progress Timeline</CardTitle>
        <CardDescription>
          A historical record of your major milestones and achievements.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ActivityFeed items={activityItems} className="mt-4" />
      </CardContent>
    </Card>
  );
}
