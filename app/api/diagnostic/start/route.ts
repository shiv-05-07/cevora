import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/services/supabase/server";
import { diagnosticService } from "@/features/diagnostic/services/DiagnosticService";
import { apiResponse } from "@/utils/apiResponse";
import { logger } from "@/utils/logger";
import { isAppError } from "@/lib/errors";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !authUser) {
      return apiResponse.error("Unauthorized", authError?.message, 401);
    }

    const result = await diagnosticService.startDiagnostic(authUser.id);
    return apiResponse.success(result, "Diagnostic started successfully", 201);
  } catch (error: any) {
    logger.error("POST /api/diagnostic/start error:", error);
    if (isAppError(error)) {
      return apiResponse.error(error.message, error.code, error.status);
    }
    return apiResponse.error("Internal Server Error", error.message, 500);
  }
}
