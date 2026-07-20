'use client';

import * as React from 'react';
import { Conversation, ChatMessage } from '@/types/mentor';
import { mockMentorHistory } from '@/data/mockMentor';
import { MentorSidebar } from './MentorSidebar';
import { ChatWindow } from './ChatWindow';
import { MentorProfile } from './MentorProfile';
import { MentorInsights } from './MentorInsights';
import { MentorTools } from './MentorTools';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { simulateMentorStreaming } from '@/lib/mockMentor';

export function MentorClient() {
  const [conversations, setConversations] = React.useState<Conversation[]>(mockMentorHistory);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isInsightsOpen, setIsInsightsOpen] = React.useState(false);
  const [isStreaming, setIsStreaming] = React.useState(false);

  const activeConversation = conversations.find(c => c.id === activeId) || null;

  const handleSelectConversation = (id: string) => {
    setActiveId(id);
    setIsSidebarOpen(false);
  };

  const handleNewChat = () => {
    setActiveId(null);
    setIsSidebarOpen(false);
  };

  const handleSendMessage = async (content: string) => {
    setIsStreaming(true);

    let currentConversationId = activeId;
    let newConversations = [...conversations];

    if (!currentConversationId) {
      // Create new conversation
      const newId = `c${Date.now()}`;
      const newConv: Conversation = {
        id: newId,
        title: content.slice(0, 30) + '...',
        lastUpdated: new Date(),
        category: 'recent',
        messages: []
      };
      newConversations.unshift(newConv);
      currentConversationId = newId;
      setActiveId(newId);
    }

    const userMessage: ChatMessage = {
      id: `m${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date()
    };

    // Add user message
    newConversations = newConversations.map(c => {
      if (c.id === currentConversationId) {
        return { ...c, messages: [...c.messages, userMessage], lastUpdated: new Date() };
      }
      return c;
    });
    setConversations(newConversations);

    // Mock thinking delay to allow typing indicator phases to render
    await new Promise(r => setTimeout(r, 1500));

    // Create empty assistant message
    const assistantMessageId = `a${Date.now()}`;
    const assistantMessage: ChatMessage = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date()
    };

    newConversations = newConversations.map(c => {
      if (c.id === currentConversationId) {
        return { ...c, messages: [...c.messages, assistantMessage] };
      }
      return c;
    });
    setConversations(newConversations);

    // Stream
    for await (const chunk of simulateMentorStreaming(content)) {
      setConversations(prev => prev.map(c => {
        if (c.id === currentConversationId) {
          const updatedMessages = c.messages.map(m => {
            if (m.id === assistantMessageId) {
              return { ...m, content: m.content + chunk };
            }
            return m;
          });
          return { ...c, messages: updatedMessages };
        }
        return c;
      }));
    }

    setIsStreaming(false);
  };

  return (
    <div className="flex h-full w-full bg-background overflow-hidden relative">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 border-r border-border/40 bg-card transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:flex lg:flex-col",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <MentorSidebar 
          conversations={conversations} 
          activeId={activeId} 
          onSelect={handleSelectConversation}
          onNewChat={handleNewChat}
        />
      </div>

      {/* Center Chat Workspace */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0 bg-background">
        {/* Mobile Header */}
        <div className="h-14 lg:hidden border-b border-border/40 flex items-center justify-between px-4 bg-card shrink-0">
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </Button>
          <span className="font-bold text-sm">AI Career Mentor</span>
          <Button variant="ghost" size="icon" onClick={() => setIsInsightsOpen(!isInsightsOpen)}>
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">AI</span>
            </div>
          </Button>
        </div>

        <ChatWindow 
          conversation={activeConversation} 
          onSendMessage={handleSendMessage}
          isStreaming={isStreaming}
        />
      </div>

      {/* Right Insights Panel (Desktop + Tablet overlay if needed) */}
      <div className={cn(
        "w-80 border-l border-border/40 bg-card flex-col overflow-y-auto hidden xl:flex shrink-0",
        isInsightsOpen ? "fixed inset-y-0 right-0 z-50 flex shadow-2xl" : ""
      )}>
        {isInsightsOpen && (
          <div className="p-4 border-b border-border/40 flex justify-end xl:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsInsightsOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        )}
        <div className="p-6 space-y-8">
          <MentorProfile />
          <MentorInsights />
          <MentorTools />
        </div>
      </div>
    </div>
  );
}
