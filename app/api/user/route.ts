import { NextRequest, NextResponse } from "next/server";
import { requireAppUser } from "@/lib/auth/requireUser";
import { userService, updateProfileSchema } from "@/services/user";

export async function GET(request: NextRequest) {
  try {
    const { appUser } = await requireAppUser();

    // Since requireAppUser always syncs and returns the full Prisma user
    // including studentProfile and learningProfile (via queries), we can just return it.


    return NextResponse.json({
      success: true,
      data: appUser,
    });
  } catch (error: any) {
    console.error("GET /api/user error:", error);
    // Propagate the actual HTTP status from AppError (e.g. 401 Unauthorized)
    // so RouteGuard can distinguish auth failures from server errors.
    const status: number = typeof error.status === 'number' ? error.status : 500;
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
