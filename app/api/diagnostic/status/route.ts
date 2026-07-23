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

    const status = await diagnosticService.getDiagnosticStatus(authUser.id);
    return apiResponse.success(status, "Diagnostic status retrieved successfully", 200);
  } catch (error: any) {
    logger.error("GET /api/diagnostic/status error:", error);
    if (isAppError(error)) {
      return apiResponse.error(error.message, error.code, error.status);
    }
    return apiResponse.error("Internal Server Error", error.message, 500);
  }
}
