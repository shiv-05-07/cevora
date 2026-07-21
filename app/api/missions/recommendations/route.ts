import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAppUser } from '@/lib/auth/requireUser';
import { apiResponse } from '@/utils/apiResponse';
import { RecommendationEngine } from '@/features/mission/services/RecommendationEngine';

export async function GET(request: Request) {
  try {
    const { appUser } = await requireAppUser();

    const recommendation = await RecommendationEngine.recommendNextMission(appUser.id);

    return apiResponse.success({ recommendations: [recommendation] }, 'Recommendations retrieved successfully', 200);
  } catch (error: any) {
    return apiResponse.error('Internal Server Error', error.message, 500);
  }
}
