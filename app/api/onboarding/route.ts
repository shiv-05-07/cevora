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

    const state: OnboardingState = await req.json();
    
    // Attempt to get the profile. If it doesn't exist, create defaults.
    let profile = await learningProfileService.getProfile(appUser.id);
    if (!profile) {
      profile = await learningProfileService.createProfile(appUser.id);
    }

    const updated = await learningProfileService.updateProfile(appUser.id, {
      learningGoals: state.goals,
      preferredSubjects: state.subjects,
      learningStyle: state.learningStyle || LearningStyle.VISUAL,
      preferredDifficulty: state.difficulty || RoadmapDifficulty.BEGINNER,
      learningPace: state.learningPace || LearningPace.NORMAL,
      dailyGoalMinutes: state.dailyStudyTime,
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
