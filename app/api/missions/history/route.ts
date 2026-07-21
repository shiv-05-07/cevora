import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createClient } from '@/services/supabase/server';

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const appUser = await prisma.user.findUnique({ where: { id: user.id } });
    if (!appUser) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const history = await prisma.mission.findMany({
      where: { userId: appUser.id, status: 'COMPLETED' },
      orderBy: { completedAt: 'desc' },
      take: 10
    });

    return NextResponse.json({ history });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
