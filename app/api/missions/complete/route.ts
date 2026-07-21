import { NextResponse } from 'next/server';
import { MissionService } from '@/features/mission/services/MissionService';
import { requireAppUser } from '@/lib/auth/requireUser';
import { apiResponse } from '@/utils/apiResponse';
import { missionCompletionSchema } from '@/features/mission/validators/missionValidators';

export async function POST(request: Request) {
  try {
    const { appUser } = await requireAppUser();

    const body = await request.json();
    const { missionId, ...payload } = body;

    const validatedPayload = missionCompletionSchema.parse(payload);

    const result = await MissionService.completeMission(appUser.id, missionId, validatedPayload);

    return apiResponse.success(result, 'Mission completed successfully', 200);
  } catch (error: any) {
    console.error('Error completing mission:', error);
    return apiResponse.error('Internal Server Error', error.message, 500);
  }
}
