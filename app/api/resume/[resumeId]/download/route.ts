import { NextRequest, NextResponse } from 'next/server';
import { requireAppUser } from '@/lib/auth/requireUser';
import prisma from '@/lib/prisma';
import { downloadResumeFile } from '@/services/supabase/storage';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ resumeId: string }> }
) {
  let appUser: { id: string };
  try {
    const authResult = await requireAppUser();
    appUser = authResult.appUser;
  } catch {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { resumeId } = await params;
  if (!resumeId) {
    return NextResponse.json({ success: false, error: 'Missing resume ID' }, { status: 400 });
  }

  try {
    const resume = await prisma.resume.findUnique({
      where: { id: resumeId },
    });

    if (!resume || resume.userId !== appUser.id) {
      return NextResponse.json({ success: false, error: 'Resume not found' }, { status: 404 });
    }

    if (!resume.filePath) {
      return NextResponse.json({ success: false, error: 'File path not recorded for this resume.' }, { status: 404 });
    }

    // Defense-in-depth: Ensure filePath strictly belongs to the authenticated user's folder
    if (!resume.filePath.startsWith(appUser.id + '/')) {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

    const { data: blob, error } = await downloadResumeFile(resume.filePath);
    if (error || !blob) {
      return NextResponse.json({ success: false, error: 'Failed to retrieve file from storage.' }, { status: 500 });
    }

    const arrayBuffer = await blob.arrayBuffer();
    const headers = new Headers();
    headers.set('Content-Disposition', `attachment; filename="${resume.fileName || 'resume.pdf'}"`);
    headers.set('Content-Type', resume.fileType === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');

    return new NextResponse(arrayBuffer, { status: 200, headers });
  } catch (err: any) {
    console.error('[Resume Download API Error]', err?.message || err);
    return NextResponse.json({ success: false, error: 'Download failed.' }, { status: 500 });
  }
}
