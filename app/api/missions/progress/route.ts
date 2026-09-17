import { NextResponse } from 'next/server';
import { requireAppUser } from '@/lib/auth/requireUser';
import { apiResponse } from '@/utils/apiResponse';
import { MissionStateMachine } from '@/features/mission/services/MissionStateMachine';
import { MissionStage } from '@/features/mission/types';
import { LearningEventType } from '@prisma/client';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { appUser } = await requireAppUser();
    const body = await request.json();
    const { missionId, stage, practiceAnswerId, isCorrect } = body;

    if (!missionId || !stage) {
      return apiResponse.error('Missing required fields', 'missionId and stage are required', 400);
    }

    const mission = await prisma.mission.findUnique({
      where: { id: missionId },
    });

    if (!mission || mission.userId !== appUser.id) {
      return apiResponse.error('Not Found', 'Mission not found or unauthorized', 404);
    }

    const updatedProgress = await MissionStateMachine.advanceToStage(missionId, stage as MissionStage);

    // If practice answered, record event
    if (practiceAnswerId) {
      await prisma.learningEvent.create({
        data: {
          userId: appUser.id,
          eventType: LearningEventType.QUIZ_TAKEN,
          source: 'MISSION_PRACTICE',
          metadata: {
            missionId,
            selectedAnswerId: practiceAnswerId,
            isCorrect: Boolean(isCorrect),
          },
        },
      });
    }

    return apiResponse.success(
      { progress: updatedProgress, stage },
      'Mission progress updated successfully',
      200
    );
  } catch (error: any) {
    console.error('Error updating mission progress:', error);
    return apiResponse.error('Internal Server Error', error.message, 500);
  }
}
