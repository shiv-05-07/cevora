import { NextResponse } from 'next/server';
import { learningProfileService } from '@/features/learning-profile/services/LearningProfileService';
import { requireAppUser } from '@/lib/auth/requireUser';
import { isAppError } from '@/lib/errors';
import { apiResponse } from '@/utils/apiResponse';
import { OnboardingState } from '@/features/onboarding/types';
import { LearningStyle, RoadmapDifficulty, LearningPace } from '@prisma/client';

export async function POST(req: Request) {
  try {
    const { appUser } = await requireAppUser();
    const body: Partial<OnboardingState> = await req.json();

    const primaryGoal = body.primaryGoal || (body.goals && body.goals.length > 0 ? body.goals[0] : 'Get Internship');
    const primarySubject = body.primarySubject || (body.subjects && body.subjects.length > 0 ? body.subjects[0] : 'DSA');

    const goals = Array.from(new Set([primaryGoal, ...(body.goals || [])]));
    const subjects = Array.from(new Set([primarySubject, ...(body.subjects || [])]));

    // Attempt to get the profile. If it doesn't exist, create defaults.
    let profile = await learningProfileService.getProfile(appUser.id);
    if (!profile) {
      profile = await learningProfileService.createProfile(appUser.id);
    }

    const updated = await learningProfileService.updateProfile(appUser.id, {
      learningGoals: goals,
      preferredSubjects: subjects,
      learningStyle: LearningStyle.VISUAL,
      preferredDifficulty: RoadmapDifficulty.BEGINNER,
      learningPace: LearningPace.NORMAL,
      dailyGoalMinutes: 30,
      onboardingCompleted: true,
    });

    return apiResponse.success(updated, 'Onboarding completed successfully', 200);
  } catch (error: any) {
    console.error('Onboarding API Error:', error);
    if (isAppError(error)) {
      return apiResponse.error(error.message, error.code, error.status);
    }
    return apiResponse.error('Internal Server Error', error.message, 500);
  }
}
