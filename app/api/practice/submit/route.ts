import { NextRequest, NextResponse } from 'next/server';
import { practiceService } from '@/features/practice/services/PracticeService';
import { AppError } from '@/lib/errors';
import { logger } from '@/utils/logger';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      userId,
      problemId,
      status,
      runtime,
      memory,
      runtimeBeats,
      memoryBeats,
      conceptSlugs
    } = body;

    if (!userId || !problemId || !status || !conceptSlugs) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const attempt = await practiceService.submitPractice({
      userId,
      problemId,
      status,
      runtime,
      memory,
      runtimeBeats,
      memoryBeats,
      conceptSlugs
    });

    return NextResponse.json({ success: true, data: attempt });
  } catch (error) {
    logger.error('Error submitting practice:', error);
    const status = error instanceof AppError ? error.status : 500;
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ success: false, message }, { status });
  }
}
