import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAppUser } from '@/lib/auth/requireUser';
import { apiResponse } from '@/utils/apiResponse';
export async function GET(request: Request) {
  try {
    const { appUser } = await requireAppUser();

    const history = await prisma.mission.findMany({
      where: { userId: appUser.id, status: 'COMPLETED' },
      orderBy: { completedAt: 'desc' },
      take: 10
    });

    return apiResponse.success({ history }, 'History retrieved successfully', 200);
  } catch (error: any) {
    return apiResponse.error('Internal Server Error', error.message, 500);
  }
}
