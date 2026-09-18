import { NextResponse } from 'next/server';
import { createClient } from '@/services/supabase/server';
import prisma from '@/lib/prisma';
import { UserRoadmapStateResponse } from '@/types/roadmap';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user: authUser } } = await supabase.auth.getUser();

    if (!authUser) {
      return NextResponse.json({
        success: true,
        data: {
          savedRoadmapIds: [],
          userRoadmaps: {}
        } as UserRoadmapStateResponse
      });
    }

    const userId = authUser.id;

    const [saves, progresses, lessonCompletions] = await Promise.all([
      prisma.userRoadmapSave.findMany({
        where: { userId },
        select: { roadmapId: true }
      }),
      prisma.userRoadmapProgress.findMany({
        where: { userId }
      }),
      prisma.userLessonProgress.findMany({
        where: { userId, completed: true }
      })
    ]);

    const savedRoadmapIds = saves.map(s => s.roadmapId);

    const userRoadmaps: Record<string, {
      roadmapId: string;
      startedAt: string;
      lastAccessedAt: string;
      lastAccessedLessonId?: string | null;
      completedLessonIds: string[];
      completedAt?: string | null;
    }> = {};

    for (const prog of progresses) {
      const completedForRoadmap = lessonCompletions
        .filter(l => l.roadmapId === prog.roadmapId)
        .map(l => l.lessonId);

      userRoadmaps[prog.roadmapId] = {
        roadmapId: prog.roadmapId,
        startedAt: prog.startedAt.toISOString(),
        lastAccessedAt: prog.lastAccessedAt.toISOString(),
        lastAccessedLessonId: prog.lastAccessedLessonId,
        completedLessonIds: completedForRoadmap,
        completedAt: prog.completedAt ? prog.completedAt.toISOString() : null
      };
    }

    return NextResponse.json({
      success: true,
      data: {
        savedRoadmapIds,
        userRoadmaps
      }
    });
  } catch (error: any) {
    console.error('Error fetching user roadmap state:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch roadmap progress' },
      { status: 500 }
    );
  }
}
