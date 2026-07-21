import { NextResponse } from 'next/server';
import { MissionService } from '@/features/mission/services/MissionService';
import { createClient } from '@/services/supabase/server';
import prisma from '@/lib/prisma';
import { missionCompletionSchema } from '@/features/mission/validators/missionValidators';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const appUser = await prisma.user.findUnique({
      where: { id: user.id }
    });

    if (!appUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await request.json();
    const { missionId, ...payload } = body;

    const validatedPayload = missionCompletionSchema.parse(payload);

    const result = await MissionService.completeMission(appUser.id, missionId, validatedPayload);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error completing mission:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
