import { NextResponse } from 'next/server';
import { requireAppUser } from '@/lib/auth/requireUser';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  let appUser: { id: string };
  try {
    const authResult = await requireAppUser();
    appUser = authResult.appUser;
  } catch (authError: any) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    // 1. Fetch total count of completed analyses
    const totalCount = await prisma.resumeAnalysis.count({
      where: {
        userId: appUser.id,
        status: 'COMPLETED',
      },
    });

    // 2. Fetch latest completed analysis
    const latestAnalysis = await prisma.resumeAnalysis.findFirst({
      where: {
        userId: appUser.id,
        status: 'COMPLETED',
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        resume: true,
      },
    });

    if (!latestAnalysis) {
      return NextResponse.json({
        success: true,
        hasData: false,
        totalCount: 0,
        data: null,
        resume: null,
      });
    }

    return NextResponse.json({
      success: true,
      hasData: true,
      totalCount,
      data: latestAnalysis.analysisJson,
      resume: {
        id: latestAnalysis.resume.id,
        fileName: latestAnalysis.resume.fileName || latestAnalysis.resume.title || 'resume.pdf',
        fileType: latestAnalysis.resume.fileType || 'pdf',
        fileSize: latestAnalysis.resume.fileSize,
        createdAt: latestAnalysis.createdAt,
      },
    });
  } catch (err: any) {
    console.error('[Resume Latest API Error]', err?.message || err);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve latest resume analysis.' },
      { status: 500 }
    );
  }
}
