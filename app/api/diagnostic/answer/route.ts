import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/services/supabase/server";
import { diagnosticService } from "@/features/diagnostic/services/DiagnosticService";
import { submitAnswerSchema } from "@/features/diagnostic/validators/diagnosticValidators";
import { validateSchema } from "@/utils/validation";
import { apiResponse } from "@/utils/apiResponse";
import { logger } from "@/utils/logger";
import { isAppError, ValidationError } from "@/lib/errors";

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

    const body = await request.json();
    const parsedData = validateSchema(submitAnswerSchema, body);

    const result = await diagnosticService.submitAnswer(parsedData.attemptId, parsedData, authUser.id);
    return apiResponse.success(result, "Answer submitted successfully", 200);
  } catch (error: any) {
    logger.error("POST /api/diagnostic/answer error:", error);
    
    if (error instanceof ValidationError) {
       // Our custom validateSchema throws ValidationError
       return NextResponse.json(
        {
          success: false,
          message: error.message,
          error: error.errors,
        },
        { status: 400 }
      );
    }

    if (isAppError(error)) {
      return apiResponse.error(error.message, error.code, error.status);
    }
    
    return apiResponse.error("Internal Server Error", error.message, 500);
  }
}
