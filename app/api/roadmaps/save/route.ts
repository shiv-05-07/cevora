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

    // Check existing save
    const existingSave = await prisma.userRoadmapSave.findUnique({
      where: {
        userId_roadmapId: {
          userId,
          roadmapId
        }
      }
    });

    let isSaved = false;

    if (existingSave) {
      await prisma.userRoadmapSave.delete({
        where: {
          id: existingSave.id
        }
      });
      isSaved = false;
    } else {
      await prisma.userRoadmapSave.create({
        data: {
          userId,
          roadmapId
        }
      });
      isSaved = true;
    }

    return NextResponse.json({
      success: true,
      data: {
        roadmapId,
        isSaved
      }
    });
  } catch (error: any) {
    console.error('Error toggling roadmap save:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update save status' },
      { status: 500 }
    );
  }
}
