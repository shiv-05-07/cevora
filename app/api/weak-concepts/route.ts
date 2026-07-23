import { NextRequest } from "next/server";
import { createClient } from "@/services/supabase/server";
import prisma from "@/lib/prisma";
import { apiResponse } from "@/utils/apiResponse";
import { logger } from "@/utils/logger";
import { isAppError } from "@/lib/errors";

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

    const weakConcepts = await prisma.weakConcept.findMany({
      where: { userId: authUser.id },
      include: { concept: true },
      orderBy: { masteryScore: "asc" }
    });

    const formatted = weakConcepts.map(w => {
      let severity: 'CRITICAL' | 'WEAK' | 'IMPROVING' | 'HEALTHY' = 'WEAK';
      if (w.masteryScore <= 30) severity = 'CRITICAL';
      else if (w.masteryScore <= 55) severity = 'WEAK';
      else if (w.masteryScore <= 75) severity = 'IMPROVING';

      // Dynamic Practice CTA Decision Tree:
      // Study Assistant -> OA Practice -> Mission -> Roadmap
      let practiceTargetUrl = `/study-assistant?concept=${encodeURIComponent(w.concept.slug)}`;
      let targetModule = 'Study Assistant';

      if (w.masteryScore > 35 && w.masteryScore <= 55) {
        practiceTargetUrl = `/oa-practice?topic=${encodeURIComponent(w.concept.slug)}`;
        targetModule = 'OA Practice';
      } else if (w.masteryScore > 55) {
        practiceTargetUrl = `/roadmaps`;
        targetModule = 'Roadmaps';
      }

      return {
        id: w.id,
        conceptId: w.conceptId,
        conceptName: w.concept.name,
        category: w.concept.category || 'General',
        masteryScore: Math.round(w.masteryScore),
        severity,
        recommendedAction: w.recommendedAction,
        practiceTargetUrl,
        targetModule
      };
    });

    return apiResponse.success(formatted, "Weak concepts retrieved successfully", 200);
  } catch (error: any) {
    logger.error("GET /api/weak-concepts error:", error);
    if (isAppError(error)) {
      return apiResponse.error(error.message, error.code, error.status);
    }
    return apiResponse.error("Internal Server Error", error.message, 500);
  }
}
