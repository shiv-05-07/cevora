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

    const { roadmapId, lessonId, completed, totalLessonsInRoadmap } = await request.json();
    if (!roadmapId || !lessonId || typeof completed !== 'boolean') {
      return NextResponse.json(
        { success: false, error: 'Invalid parameters' },
        { status: 400 }
      );
    }

    const userId = authUser.id;
    const now = new Date();

    // 1. Ensure UserRoadmapProgress ALWAYS exists once any lesson is interacted with (auto-start roadmap)
    const userRoadmapProgress = await prisma.userRoadmapProgress.upsert({
      where: {
        userId_roadmapId: {
          userId,
          roadmapId
        }
      },
      update: {
        lastAccessedAt: now,
        lastAccessedLessonId: lessonId,
      },
      create: {
        userId,
        roadmapId,
        startedAt: now,
        lastAccessedAt: now,
        lastAccessedLessonId: lessonId,
      }
    });

    // 2. Update/Upsert or remove lesson progress
    if (completed) {
      await prisma.userLessonProgress.upsert({
        where: {
          userId_roadmapId_lessonId: {
            userId,
            roadmapId,
            lessonId
          }
        },
        update: {
          completed: true,
          completedAt: now
        },
        create: {
          userId,
          roadmapId,
          lessonId,
          completed: true,
          completedAt: now
        }
      });
    } else {
      await prisma.userLessonProgress.deleteMany({
        where: {
          userId,
          roadmapId,
          lessonId
        }
      });
    }

    // 3. Fetch all completed lessons for this roadmap
    const allCompletedForRoadmap = await prisma.userLessonProgress.findMany({
      where: {
        userId,
        roadmapId,
        completed: true
      },
      select: { lessonId: true }
    });

    const completedLessonIds = allCompletedForRoadmap.map(l => l.lessonId);
    const totalCount = totalLessonsInRoadmap || 9999;
    const isAllCompleted = totalLessonsInRoadmap && totalLessonsInRoadmap > 0 && completedLessonIds.length >= totalLessonsInRoadmap;

    // 4. Update completedAt state on UserRoadmapProgress
    const updatedProgress = await prisma.userRoadmapProgress.update({
      where: { id: userRoadmapProgress.id },
      data: {
        completedAt: isAllCompleted ? now : null
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        roadmapId,
        lessonId,
        completed,
        completedLessonIds,
        startedAt: updatedProgress.startedAt.toISOString(),
        lastAccessedAt: updatedProgress.lastAccessedAt.toISOString(),
        lastAccessedLessonId: updatedProgress.lastAccessedLessonId,
        completedAt: updatedProgress.completedAt ? updatedProgress.completedAt.toISOString() : null
      }
    });
  } catch (error: any) {
    console.error('Error updating lesson progress:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update lesson progress' },
      { status: 500 }
    );
  }
}
