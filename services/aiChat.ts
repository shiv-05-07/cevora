import prisma from "@/lib/prisma";
import { AIChatType, MessageRole } from "@prisma/client";

/**
 * Generates a clean, human-readable title from the first message locally
 * without making extra API calls.
 */
export function generateChatTitle(message: string): string {
  const clean = message
    .replace(/[#*`_~\[\]()>-]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!clean) return "Career Discussion";

  const words = clean.split(" ");
  if (words.length <= 5 && clean.length <= 36) {
    return clean.charAt(0).toUpperCase() + clean.slice(1);
  }

  const truncated = words.slice(0, 5).join(" ");
  return (truncated.charAt(0).toUpperCase() + truncated.slice(1)).substring(0, 36).trim() + "...";
}

export const aiChatService = {
  /**
   * Retrieves lightweight recent CAREER chats for the authenticated user,
   * sorted by updatedAt descending.
   */
  async listUserCareerChats(userId: string) {
    return prisma.aIChat.findMany({
      where: {
        userId,
        type: AIChatType.CAREER,
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  },

  /**
   * Retrieves a single CAREER chat with all its messages, verifying user ownership.
   */
  async getUserCareerChatWithMessages(chatId: string, userId: string) {
    return prisma.aIChat.findFirst({
      where: {
        id: chatId,
        userId,
        type: AIChatType.CAREER,
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
          select: {
            id: true,
            role: true,
            content: true,
            createdAt: true,
          },
        },
      },
    });
  },

  /**
   * Creates a new CAREER chat belonging to the authenticated user.
   */
  async createCareerChat(userId: string, title: string) {
    return prisma.aIChat.create({
      data: {
        userId,
        title,
        type: AIChatType.CAREER,
      },
    });
  },

  /**
   * Fetches the latest N messages from an existing chat for LLM context,
   * strictly verifying ownership.
   */
  async getRecentChatHistory(chatId: string, userId: string, limit: number = 10) {
    const chat = await prisma.aIChat.findFirst({
      where: {
        id: chatId,
        userId,
        type: AIChatType.CAREER,
      },
      select: { id: true },
    });

    if (!chat) return null;

    const messages = await prisma.aIChatMessage.findMany({
      where: { chatId },
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        role: true,
        content: true,
      },
    });

    return messages.reverse();
  },

  /**
   * Saves a message to the database for the given chatId.
   */
  async saveMessage(chatId: string, role: MessageRole, content: string) {
    return prisma.aIChatMessage.create({
      data: {
        chatId,
        role,
        content,
      },
    });
  },

  /**
   * Updates the chat updatedAt timestamp.
   */
  async updateChatTimestamp(chatId: string) {
    return prisma.aIChat.update({
      where: { id: chatId },
      data: { updatedAt: new Date() },
    });
  },
};
