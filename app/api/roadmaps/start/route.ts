import { NextResponse } from 'next/server';
import { createClient } from '@/services/supabase/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user: authUser } } = await supabase.auth.getUser();

    if (!authUser) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { roadmapId } = await request.json();
    if (!roadmapId || typeof roadmapId !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Invalid roadmapId' },
        { status: 400 }
      );
    }

    const userId = authUser.id;
    const now = new Date();

    const progressRecord = await prisma.userRoadmapProgress.upsert({
      where: {
        userId_roadmapId: {
          userId,
          roadmapId
        }
      },
      update: {
        lastAccessedAt: now
      },
      create: {
        userId,
        roadmapId,
        startedAt: now,
        lastAccessedAt: now
      }
    });

    const completedLessons = await prisma.userLessonProgress.findMany({
      where: {
        userId,
        roadmapId,
        completed: true
      },
      select: { lessonId: true }
    });

    return NextResponse.json({
      success: true,
      data: {
        roadmapId: progressRecord.roadmapId,
        startedAt: progressRecord.startedAt.toISOString(),
        lastAccessedAt: progressRecord.lastAccessedAt.toISOString(),
        lastAccessedLessonId: progressRecord.lastAccessedLessonId,
        completedLessonIds: completedLessons.map(l => l.lessonId),
        completedAt: progressRecord.completedAt ? progressRecord.completedAt.toISOString() : null
      }
    });
  } catch (error: any) {
    console.error('Error starting roadmap:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to start roadmap' },
      { status: 500 }
    );
  }
}
