import { NextRequest, NextResponse } from 'next/server';
import { requireAppUser } from '@/lib/auth/requireUser';
import { generateFixSuggestion } from '@/services/geminiResumeAnalyzer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    await requireAppUser();
  } catch (authError) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { suggestionTitle, explanation, sectionName, originalText } = body;

    if (!suggestionTitle || !explanation) {
      return NextResponse.json(
        { success: false, error: 'Missing suggestion parameters.' },
        { status: 400 }
      );
    }

    const fixResult = await generateFixSuggestion({
      suggestionTitle,
      explanation,
      sectionName,
      originalText,
    });

    return NextResponse.json({
      success: true,
      data: fixResult,
    });
  } catch (err: any) {
    console.error('[Fix Suggestion API Error]', err?.message || err);
    return NextResponse.json(
      { success: false, error: 'Failed to generate improvement suggestion.' },
      { status: 500 }
    );
  }
}
