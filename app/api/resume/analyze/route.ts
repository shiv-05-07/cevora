import { NextRequest, NextResponse } from 'next/server';
import { requireAppUser } from '@/lib/auth/requireUser';
import prisma from '@/lib/prisma';
import { validateResumeFile, extractResumeContent } from '@/lib/resume/documentParser';
import {
  analyzeResumeWithGemini,
  PROMPT_VERSION,
  ANALYZER_VERSION,
} from '@/services/geminiResumeAnalyzer';
import { uploadResumeFile } from '@/services/supabase/storage';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  let appUser: { id: string };
  try {
    const authResult = await requireAppUser();
    appUser = authResult.appUser;
  } catch (authError: any) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized. Please log in to analyze your resume.' },
      { status: 401 }
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch (err) {
    return NextResponse.json(
      { success: false, error: 'Invalid form submission.' },
      { status: 400 }
    );
  }

  const file = formData.get('file') as File | null;
  const jobDescription = (formData.get('jobDescription') as string | null) || undefined;
  const targetRole = (formData.get('targetRole') as string | null) || undefined;

  if (!file) {
    return NextResponse.json(
      { success: false, error: 'No resume file uploaded.' },
      { status: 400 }
    );
  }

  // 1. Validate file constraints
  const validation = validateResumeFile(file);
  if (!validation.valid) {
    return NextResponse.json(
      { success: false, error: validation.code || 'VALIDATION_FAILED', message: validation.error },
      { status: 400 }
    );
  }

  const fileBuffer = Buffer.from(await file.arrayBuffer());

  // 2. Extract resume text
  let extracted: { text: string; fileType: 'pdf' | 'docx'; pageCount?: number };
  try {
    extracted = await extractResumeContent(file.name, fileBuffer);
  } catch (extractErr: any) {
    const isDocError = extractErr?.name === 'DocumentParseError' || extractErr?.code;
    const errorCode = isDocError ? extractErr.code : 'EXTRACTION_FAILED';
    const userMessage = isDocError
      ? (extractErr.userMessage || extractErr.message)
      : "We couldn't extract text from this document. Please try another PDF or upload the DOCX version.";

    return NextResponse.json(
      { success: false, error: errorCode, message: userMessage },
      { status: 400 }
    );
  }

  // 3. Create canonical Resume entity
  let resume;
  try {
    resume = await prisma.resume.create({
      data: {
        userId: appUser.id,
        title: file.name.replace(/\.[^/.]+$/, ''),
        fileName: file.name,
        fileType: extracted.fileType,
        fileSize: file.size,
        status: 'DRAFT',
      },
    });
  } catch (dbErr: any) {
    console.error('[Resume Analyze DB Error]', dbErr?.message || dbErr);
    return NextResponse.json(
      { success: false, error: 'Failed to create resume record in database.' },
      { status: 500 }
    );
  }

  // 4. Upload file to user-scoped private Supabase Storage
  try {
    const uploadResult = await uploadResumeFile({
      userId: appUser.id,
      resumeId: resume.id,
      fileName: file.name,
      fileBuffer,
      contentType:
        file.type ||
        (extracted.fileType === 'pdf'
          ? 'application/pdf'
          : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'),
    });

    if (uploadResult.path) {
      await prisma.resume.update({
        where: { id: resume.id },
        data: { filePath: uploadResult.path },
      });
    }
  } catch (storageErr) {
    console.warn('[Resume Analyze Storage Warning] File storage skipped or failed, proceeding with analysis.');
  }

  // 5. Create ResumeAnalysis record with status PROCESSING
  let analysisRecord;
  try {
    analysisRecord = await prisma.resumeAnalysis.create({
      data: {
        resumeId: resume.id,
        userId: appUser.id,
        overallScore: 0,
        interviewReadiness: 0,
        analysisJson: {},
        status: 'PROCESSING',
        model: (process.env.GEMINI_MODEL || 'gemini-3.6-flash').trim(),
        promptVersion: PROMPT_VERSION,
        analyzerVersion: ANALYZER_VERSION,
      },
    });
  } catch (err: any) {
    console.error('[ResumeAnalysis Init Error]', err?.message || err);
    return NextResponse.json(
      { success: false, error: 'Could not initialize analysis session.' },
      { status: 500 }
    );
  }

  // 6. Perform Gemini AI Analysis
  const startTime = Date.now();
  try {
    const analysis = await analyzeResumeWithGemini(extracted.text, {
      jobDescription,
      targetRole,
    });

    // Update ResumeAnalysis to COMPLETED
    await prisma.resumeAnalysis.update({
      where: { id: analysisRecord.id },
      data: {
        overallScore: analysis.data.overallScore,
        interviewReadiness: analysis.data.interviewReadiness,
        analysisJson: analysis.data as any,
        status: 'COMPLETED',
        model: analysis.model,
      },
    });

    // Update Resume cache: score, aiFeedback, detected skills
    await prisma.resume.update({
      where: { id: resume.id },
      data: {
        score: analysis.data.overallScore,
        skills: analysis.data.detectedSkills.map((s) => s.name),
        aiFeedback: {
          headline: (analysis.data as any).summary?.headline || '',
          rating: analysis.data.rating,
          percentile: analysis.data.percentile,
          interviewReadiness: analysis.data.interviewReadiness,
          score: analysis.data.overallScore,
        } as any,
      },
    });

    // Record user activity
    await prisma.userActivity.create({
      data: {
        userId: appUser.id,
        type: 'RESUME',
        title: 'Resume Analyzed',
        description: `Analyzed "${file.name}" with an ATS score of ${analysis.data.overallScore}/100`,
        metadata: {
          score: analysis.data.overallScore,
          rating: analysis.data.rating,
          resumeId: resume.id,
        },
      },
    }).catch(() => {});

    console.log(
      `[Resume Analyzer] Analysis completed in ${Date.now() - startTime}ms (score: ${analysis.data.overallScore}, resumeId: ${resume.id}).`
    );

    return NextResponse.json({
      success: true,
      data: analysis.data,
      resume: {
        id: resume.id,
        fileName: file.name,
        fileType: extracted.fileType,
        fileSize: file.size,
        createdAt: resume.createdAt,
      },
    });
  } catch (analysisErr: any) {
    console.error(
      `[Resume Analyzer Error] Analysis failed after ${Date.now() - startTime}ms:`,
      analysisErr?.message || analysisErr
    );

    // Mark analysis record as FAILED
    await prisma.resumeAnalysis
      .update({
        where: { id: analysisRecord.id },
        data: { status: 'FAILED' },
      })
      .catch(() => {});

    return NextResponse.json(
      {
        success: false,
        error: "Couldn't analyze this resume. Please try uploading a different PDF or DOCX.",
      },
      { status: 500 }
    );
  }
}
