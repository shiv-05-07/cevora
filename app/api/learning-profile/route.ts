import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/services/supabase/server";
import { learningProfileService } from "@/features/learning-profile/services/LearningProfileService";
import { updateProfileSchema } from "@/features/learning-profile/validators/profileValidators";
import { validateSchema } from "@/utils/validation";
import { apiResponse } from "@/utils/apiResponse";
import { logger } from "@/utils/logger";
import { isAppError, ValidationError } from "@/lib/errors";

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

    const profile = await learningProfileService.getProfile(authUser.id);

    if (!profile) {
      return apiResponse.error("Learning profile not found", "NOT_FOUND", 404);
    }

    return apiResponse.success(profile, "Profile retrieved successfully", 200);
  } catch (error: any) {
    logger.error("GET /api/learning-profile error:", error);
    return apiResponse.error("Internal Server Error", error.message, 500);
  }
}

export async function PATCH(request: NextRequest) {
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
    const parsedData = validateSchema(updateProfileSchema, body);

    const updatedProfile = await learningProfileService.updateProfile(authUser.id, parsedData);

    return apiResponse.success(updatedProfile, "Profile updated successfully", 200);
  } catch (error: any) {
    logger.error("PATCH /api/learning-profile error:", error);
    
    if (error instanceof ValidationError) {
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
