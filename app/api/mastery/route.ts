import { NextRequest } from "next/server";
import { createClient } from "@/services/supabase/server";
import prisma from "@/lib/prisma";
import { apiResponse } from "@/utils/apiResponse";
import { logger } from "@/utils/logger";
import { isAppError } from "@/lib/errors";
import { RoadmapDifficulty, MasteryLevel } from "@prisma/client";
import { diagnosticQuestions } from "@/features/diagnostic/data/diagnosticQuestions";

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

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const showAll = searchParams.get("showAll") === "true";

    let masteries = await prisma.conceptMastery.findMany({
      where: {
        userId: authUser.id,
        ...(category && category !== "ALL"
          ? {
              concept: {
                category: { equals: category, mode: "insensitive" }
              }
            }
          : {})
      },
      include: {
        concept: true
      },
      orderBy: { masteryScore: "asc" }
    });

    let results = [...masteries];

    if (showAll) {
      const allDbConcepts = await prisma.concept.findMany({
        where: category && category !== "ALL" ? { category: { equals: category, mode: "insensitive" } } : {}
      });
      const masteryConceptIds = new Set(masteries.map(m => m.conceptId));
      
      const unattempted = allDbConcepts
        .filter(c => !masteryConceptIds.has(c.id))
        .map(c => ({
          id: `fake-${c.id}`,
          userId: authUser.id,
          conceptId: c.id,
          concept: c,
          masteryScore: 0,
          masteryLevel: MasteryLevel.NOVICE,
          confidenceScore: 0,
          attempts: 0,
          lastPracticed: null,
          lastReviewedAt: null,
          createdAt: new Date(),
          updatedAt: new Date()
        }));
      results = [...masteries, ...unattempted];
    }

    const knowledgeState = await prisma.knowledgeState.findUnique({
      where: { userId: authUser.id }
    });

    const skillScores = await prisma.skillScore.findMany({
      where: { userId: authUser.id }
    });

    return apiResponse.success(
      {
        masteries: results,
        knowledgeState,
        skillScores
      },
      "Concept masteries retrieved successfully",
      200
    );
  } catch (error: any) {
    logger.error("GET /api/mastery error:", error);
    if (isAppError(error)) {
      return apiResponse.error(error.message, error.code, error.status);
    }
    return apiResponse.error("Internal Server Error", error.message, 500);
  }
}
