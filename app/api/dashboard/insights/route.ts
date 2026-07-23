import { NextRequest } from "next/server";
import { createClient } from "@/services/supabase/server";
import prisma from "@/lib/prisma";
import { apiResponse } from "@/utils/apiResponse";
import { logger } from "@/utils/logger";
import { isAppError } from "@/lib/errors";

const CORE_CATEGORIES = [
  'DSA', 'Aptitude', 'DBMS', 'OS', 'CN', 'OOP', 'SQL', 'Behavioral', 'Communication'
];

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !authUser) {
      return apiResponse.error("Unauthorized", authError?.message, 401);
    }

    // Fetch KnowledgeState
    const knowledgeState = await prisma.knowledgeState.findUnique({
      where: { userId: authUser.id }
    });

    // Fetch LearningProfile
    const profile = await prisma.learningProfile.findUnique({
      where: { userId: authUser.id }
    });

    // Fetch WeakConcepts
    const weakConcepts = await prisma.weakConcept.findMany({
      where: { userId: authUser.id },
      include: { concept: true },
      orderBy: { masteryScore: "asc" },
      take: 3
    });

    // Fetch SkillScores for Radar
    const skillScores = await prisma.skillScore.findMany({
      where: { userId: authUser.id }
    });

    // Fetch latest snapshots
    const snapshots = await prisma.knowledgeSnapshot.findMany({
      where: { userId: authUser.id },
      orderBy: { snapshotDate: "desc" },
      take: 7
    });

    const latestSnapshot = snapshots[0];
    const previousSnapshot = snapshots[snapshots.length - 1];

    let growthDelta = 0.0;
    if (latestSnapshot && previousSnapshot && snapshots.length > 1) {
      growthDelta = Math.round((latestSnapshot.overallMastery - previousSnapshot.overallMastery) * 10) / 10;
    } else if (knowledgeState) {
      growthDelta = Math.round(knowledgeState.overallMastery * 10) / 10;
    }

    const weakestSkill = weakConcepts[0]?.concept.name || "None detected";
    const todaysFocus = weakConcepts[0] ? `Revise ${weakConcepts[0].concept.name} fundamentals` : "Complete Daily OA Mission";
    const nextRecommendation = weakConcepts[0] 
      ? `Practice ${weakConcepts[0].concept.name} on Study Assistant`
      : "Start Placement Preparation Track";

    // Map skillScores dynamically with 0.0 fallback instead of hardcoded lists
    const activeSkillScores = CORE_CATEGORIES.map(cat => {
      const match = skillScores.find(s => s.category.toUpperCase() === cat.toUpperCase());
      return {
        category: cat,
        currentScore: match ? match.currentScore : 0,
        previousScore: match ? match.previousScore : 0,
        accuracy: match ? match.accuracy : 0
      };
    });

    const payload = {
      diagnosticCompleted: profile?.diagnosticCompleted || false,
      diagnosticStatus: profile?.diagnosticStatus || "PENDING",
      overallMastery: knowledgeState?.overallMastery || 0,
      placementReadiness: knowledgeState?.placementReadiness || "NEEDS_FOUNDATION",
      readinessScore: knowledgeState?.readinessScore || 0,
      todaysFocus,
      weakestSkill,
      knowledgeGrowth: growthDelta >= 0 ? `+${growthDelta}%` : `${growthDelta}%`,
      nextRecommendation,
      skillScores: activeSkillScores,
      weakConceptsCount: weakConcepts.length,
      currentStreak: profile?.currentStreak || 0,
      snapshots: snapshots.reverse()
    };

    return apiResponse.success(payload, "Dashboard insights retrieved successfully", 200);
  } catch (error: any) {
    logger.error("GET /api/dashboard/insights error:", error);
    if (isAppError(error)) {
      return apiResponse.error(error.message, error.code, error.status);
    }
    return apiResponse.error("Internal Server Error", error.message, 500);
  }
}
