import * as React from 'react';
import { notFound } from 'next/navigation';
import { getRoadmapById } from '@/lib/roadmaps/roadmapResolver';
import { RoadmapDetailsPageClient } from '@/components/roadmaps/RoadmapDetailsPageClient';

interface PageProps {
  params: Promise<{ roadmapId: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { roadmapId } = await params;
  const roadmap = getRoadmapById(roadmapId);
  if (!roadmap) {
    return { title: 'Roadmap Not Found | Cevora' };
  }
  return {
    title: `${roadmap.title} | Cevora`,
    description: roadmap.description,
  };
}

export default async function RoadmapDetailPage({ params }: PageProps) {
  const { roadmapId } = await params;
  const roadmap = getRoadmapById(roadmapId);

  if (!roadmap) {
    notFound();
  }

  return <RoadmapDetailsPageClient roadmapId={roadmapId} initialRoadmap={roadmap} />;
}
