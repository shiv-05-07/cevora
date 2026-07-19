import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/services/supabase/server";
import { userService, syncUserSchema } from "@/services/user";

export async function POST(request: NextRequest) {
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

    // Enforce that we only sync the currently authenticated user
    const syncData = {
      ...body,
      id: authUser.id,
    };

    const parsedData = syncUserSchema.safeParse(syncData);

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

    const user = await userService.syncUser(parsedData.data);

    return NextResponse.json({
      success: true,
      data: user,
      message: "User synced successfully",
    });
  } catch (error: any) {
    console.error("POST /api/user/sync error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
