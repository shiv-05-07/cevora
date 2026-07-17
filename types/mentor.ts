export type MessageRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  title: string;
  lastUpdated: Date;
  messages: ChatMessage[];
  category: 'recent' | 'saved' | 'older';
  preview?: string;
}

export interface SuggestedPrompt {
  id: string;
  category: string;
  title: string;
  prompt: string;
  icon: string;
}

export interface MentorInsight {
  id: string;
  label: string;
  value: string;
  icon: string;
  color: string;
}

export interface QuickTool {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
}
