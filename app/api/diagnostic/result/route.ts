import { NextRequest } from "next/server";
import { createClient } from "@/services/supabase/server";
import { diagnosticService } from "@/features/diagnostic/services/DiagnosticService";
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

    const result = await diagnosticService.getDiagnosticResult(authUser.id);
    if (!result) {
      return apiResponse.error("No completed diagnostic result found", "NOT_FOUND", 404);
    }

    return apiResponse.success(result, "Diagnostic result retrieved successfully", 200);
  } catch (error: any) {
    logger.error("GET /api/diagnostic/result error:", error);
    if (isAppError(error)) {
      return apiResponse.error(error.message, error.code, error.status);
    }
    return apiResponse.error("Internal Server Error", error.message, 500);
  }
}
