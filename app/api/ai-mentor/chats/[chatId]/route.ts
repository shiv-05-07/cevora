import { NextRequest, NextResponse } from "next/server";
import { requireAppUser } from "@/lib/auth/requireUser";
import { aiChatService } from "@/services/aiChat";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ chatId: string }> }
) {
  try {
    const { appUser } = await requireAppUser();
    const resolvedParams = await params;
    const chatId = resolvedParams.chatId;

    const isValidUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(chatId);
    if (!isValidUuid) {
      return NextResponse.json(
        { success: false, error: "Invalid chat ID." },
        { status: 400 }
      );
    }

    const chat = await aiChatService.getUserCareerChatWithMessages(chatId, appUser.id);
    if (!chat) {
      return NextResponse.json(
        { success: false, error: "Chat not found or access denied." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      chat: {
        id: chat.id,
        title: chat.title,
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt,
        messages: chat.messages.map((m) => ({
          id: m.id,
          role: m.role.toLowerCase(),
          content: m.content,
          createdAt: m.createdAt,
        })),
      },
    });
  } catch (error: any) {
    const status = typeof error?.status === "number" ? error.status : 500;
    if (status === 401) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please log in to continue." },
        { status: 401 }
      );
    }
    console.error("[GET /api/ai-mentor/chats/[chatId]] Error:", error?.message || error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve chat." },
      { status: 500 }
    );
  }
}
