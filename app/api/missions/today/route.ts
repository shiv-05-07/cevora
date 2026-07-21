import { NextResponse } from 'next/server';
import { MissionService } from '@/features/mission/services/MissionService';
import { createClient } from '@/services/supabase/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Since our database uses a different user ID, get the app user from Supabase user ID
    const appUser = await prisma.user.findUnique({
      where: { id: user.id }
    });

    if (!appUser) {
      return NextResponse.json({ error: 'User not found in app database' }, { status: 404 });
    }

    const state = await MissionService.getTodayMission(appUser.id);
    return NextResponse.json(state);
  } catch (error: any) {
    console.error('Error fetching today mission:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
