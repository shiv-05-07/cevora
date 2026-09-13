import { NextRequest, NextResponse } from "next/server";
import { requireAppUser } from "@/lib/auth/requireUser";
import { aiChatService } from "@/services/aiChat";

export async function GET(request: NextRequest) {
  try {
    const { appUser } = await requireAppUser();

    const chats = await aiChatService.listUserCareerChats(appUser.id);

    return NextResponse.json({
      success: true,
      chats,
    });
  } catch (error: any) {
    const status = typeof error?.status === "number" ? error.status : 500;
    if (status === 401) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please log in to continue." },
        { status: 401 }
      );
    }
    console.error("[GET /api/ai-mentor/chats] Error:", error?.message || error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch recent chats." },
      { status: 500 }
    );
  }
}
