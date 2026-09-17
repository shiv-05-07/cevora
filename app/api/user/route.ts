import { NextRequest, NextResponse } from "next/server";
import { requireAppUser } from "@/lib/auth/requireUser";
import { userService, updateProfileSchema } from "@/services/user";
import { logger } from "@/utils/logger";

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  try {
    const { appUser } = await requireAppUser();

    logger.info(`[PERF] /api/user total: ${Date.now() - startTime}ms`);

    return NextResponse.json({
      success: true,
      data: appUser,
    });
  } catch (error: any) {
    const status: number = typeof error.status === 'number' ? error.status : 500;
    if (status !== 401) {
      console.error("GET /api/user error:", error);
    }
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error", error: error.code || error.message },
      { status }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { appUser } = await requireAppUser();

    const body = await request.json();
    const parsedData = updateProfileSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation Error",
          error: parsedData.error.flatten(),
        },
        { status: 400 }
      );
    }

    const updatedUser = await userService.updateProfile(appUser.id, parsedData.data);

    return NextResponse.json({
      success: true,
      data: updatedUser,
      message: "Profile updated successfully",
    });
  } catch (error: any) {
    console.error("PATCH /api/user error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
