import * as React from 'react';
import { RoadmapsClient } from '@/components/roadmaps/RoadmapsClient';

export const metadata = {
  title: 'Roadmaps | Cevora',
  description: 'Explore structured learning paths for top tech companies and roles.',
};

export default function RoadmapsPage() {
  return (
    <div className="flex-1 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Roadmaps Explorer</h1>
          <p className="text-muted-foreground font-medium mt-1">
            Browse premium learning paths for your dream role.
          </p>
        </div>
      </div>
      
      <RoadmapsClient />
    </div>
  );
}
