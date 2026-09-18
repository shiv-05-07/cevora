import * as React from 'react';
import { RoadmapsClient } from '@/components/roadmaps/RoadmapsClient';

export const metadata = {
  title: 'Roadmaps Explorer | Cevora',
  description: 'Choose a structured learning path for the role, technology, or career goal you are targeting.',
};

export default function RoadmapsPage() {
  return (
    <div className="flex-1 space-y-6">
      <RoadmapsClient />
    </div>
  );
}
