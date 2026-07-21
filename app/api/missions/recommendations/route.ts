import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createClient } from '@/services/supabase/server';
import { RecommendationEngine } from '@/features/mission/services/RecommendationEngine';

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const appUser = await prisma.user.findUnique({ where: { id: user.id } });
    if (!appUser) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const recommendation = await RecommendationEngine.recommendNextMission(appUser.id);

    return NextResponse.json({ recommendations: [recommendation] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
