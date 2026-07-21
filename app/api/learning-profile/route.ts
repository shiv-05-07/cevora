import { NextRequest, NextResponse } from "next/server";
import { requireAppUser } from '@/lib/auth/requireUser';
import { learningProfileService } from "@/features/learning-profile/services/LearningProfileService";
import { updateProfileSchema } from "@/features/learning-profile/validators/profileValidators";
import { validateSchema } from "@/utils/validation";
import { apiResponse } from "@/utils/apiResponse";
import { logger } from "@/utils/logger";
import { isAppError, ValidationError } from "@/lib/errors";

export async function GET(request: NextRequest) {
  try {
    const { appUser } = await requireAppUser();

    const profile = await learningProfileService.getProfile(appUser.id);

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
    const { appUser } = await requireAppUser();

    const body = await request.json();
    const parsedData = validateSchema(updateProfileSchema, body);

    const updatedProfile = await learningProfileService.updateProfile(appUser.id, parsedData);

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
