import { NextResponse } from 'next/server';
import { MissionService } from '@/features/mission/services/MissionService';
import { requireAppUser } from '@/lib/auth/requireUser';
import { apiResponse } from '@/utils/apiResponse';

export async function GET(request: Request) {
  try {
    const { appUser } = await requireAppUser();

    const state = await MissionService.getTodayMission(appUser.id);
    return apiResponse.success(state, 'Mission retrieved successfully', 200);
  } catch (error: any) {
    console.error('Error fetching today mission:', error);
    return apiResponse.error('Internal Server Error', error.message, 500);
  }
}
