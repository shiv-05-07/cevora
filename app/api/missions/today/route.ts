import { NextResponse } from 'next/server';
import { MissionService } from '@/features/mission/services/MissionService';
import { requireAppUser } from '@/lib/auth/requireUser';
import { apiResponse } from '@/utils/apiResponse';

export async function GET(request: Request) {
  const startTime = Date.now();
  try {
    const { appUser } = await requireAppUser();
    const authTime = Date.now();

    const state = await MissionService.getTodayMission(appUser.id);
    const endTime = Date.now();
    console.log(`[PERF] /api/missions/today auth: ${authTime - startTime}ms db/service: ${endTime - authTime}ms total: ${endTime - startTime}ms`);
    return apiResponse.success(state, 'Mission retrieved successfully', 200);
  } catch (error: any) {
    console.error('Error fetching today mission:', error);
    return apiResponse.error('Internal Server Error', error.message, 500);
  }
}
