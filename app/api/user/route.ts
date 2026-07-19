import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/services/supabase/server";
import { userService, updateProfileSchema } from "@/services/user";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !authUser) {
      return NextResponse.json(
        { success: false, message: "Unauthorized", error: authError?.message },
        { status: 401 }
      );
    }

    const user = await userService.getCurrentUser(authUser.id);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    console.error("GET /api/user error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
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
      return NextResponse.json(
        { success: false, message: "Unauthorized", error: authError?.message },
        { status: 401 }
      );
    }

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

    const updatedUser = await userService.updateProfile(authUser.id, parsedData.data);

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
