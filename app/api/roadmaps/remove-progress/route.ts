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

    let roadmapId: string | null = null;
    try {
      const body = await request.json();
      roadmapId = body.roadmapId;
    } catch {
      const { searchParams } = new URL(request.url);
      roadmapId = searchParams.get('roadmapId');
    }

    if (!roadmapId || typeof roadmapId !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Invalid roadmapId parameter' },
        { status: 400 }
      );
    }

    const userId = authUser.id;

    // Use Prisma transaction to atomically delete UserLessonProgress and UserRoadmapProgress
    // NOTE: UserRoadmapSave is intentionally left untouched!
    await prisma.$transaction([
      prisma.userLessonProgress.deleteMany({
        where: {
          userId,
          roadmapId
        }
      }),
      prisma.userRoadmapProgress.deleteMany({
        where: {
          userId,
          roadmapId
        }
      })
    ]);

    return NextResponse.json({
      success: true,
      data: { roadmapId }
    });
  } catch (error: any) {
    console.error('Error removing roadmap progress:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to remove roadmap progress' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  return POST(request);
}
