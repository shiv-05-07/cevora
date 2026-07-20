import { NextResponse } from 'next/server';
import { learningProfileService } from '@/features/learning-profile/services/LearningProfileService';
import { createClient } from '@/services/supabase/server';
import { OnboardingState } from '@/features/onboarding/types';
import { LearningStyle, RoadmapDifficulty, LearningPace } from '@prisma/client';

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const state: OnboardingState = await req.json();
    
    // Attempt to get the profile. If it doesn't exist, create defaults.
    let profile = await learningProfileService.getProfile(user.id);
    if (!profile) {
      profile = await learningProfileService.createProfile(user.id);
    }

    const updated = await learningProfileService.updateProfile(user.id, {
      learningGoals: state.goals,
      preferredSubjects: state.subjects,
      learningStyle: state.learningStyle || LearningStyle.VISUAL,
      preferredDifficulty: state.difficulty || RoadmapDifficulty.BEGINNER,
      learningPace: state.learningPace || LearningPace.NORMAL,
      dailyGoalMinutes: state.dailyStudyTime,
      onboardingCompleted: true,
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error('Onboarding API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
