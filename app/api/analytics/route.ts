import { NextRequest } from "next/server";
import { createClient } from "@/services/supabase/server";
import { AnalyticsService } from "@/features/analytics/services/AnalyticsService";
import { PeriodFilter } from "@/features/analytics/types";
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
      return apiResponse.error("Unauthorized", authError?.message || "User is not authenticated", 401);
    }

    const { searchParams } = new URL(request.url);
    const periodParam = (searchParams.get("period") || "30d").toLowerCase();
    const validPeriods: PeriodFilter[] = ["7d", "30d", "90d", "all"];
    const period: PeriodFilter = validPeriods.includes(periodParam as PeriodFilter)
      ? (periodParam as PeriodFilter)
      : "30d";

    const payload = await AnalyticsService.getAnalyticsData(authUser.id, period);

    return apiResponse.success(payload, "Analytics retrieved successfully", 200);
  } catch (error: any) {
    logger.error("GET /api/analytics error:", error);
    if (isAppError(error)) {
      return apiResponse.error(error.message, error.code, error.status);
    }
    return apiResponse.error("Internal Server Error", error.message || "Failed to load analytics", 500);
  }
}
