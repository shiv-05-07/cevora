import * as React from 'react';
import { Conversation } from '@/types/mentor';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage as ChatMessageComponent } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { SuggestedPrompts } from './SuggestedPrompts';
import { TypingIndicator } from './TypingIndicator';
import { Bot } from 'lucide-react';

interface ChatWindowProps {
  conversation: Conversation | null;
  onSendMessage: (message: string) => void;
  isStreaming: boolean;
}

export function ChatWindow({ conversation, onSendMessage, isStreaming }: ChatWindowProps) {
  const bottomRef = React.useRef<HTMLDivElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const prevConvId = React.useRef<string | undefined>(undefined);

  React.useEffect(() => {
    const isNewChat = conversation?.id !== prevConvId.current;
    prevConvId.current = conversation?.id;

    if (isNewChat) {
      // When switching to a previous chat, scroll to top instead of bottom
      if (scrollRef.current) {
        scrollRef.current.scrollTop = 0;
      }
    } else {
      // Auto-scroll to bottom only when receiving/sending messages in the current chat
      const timeout = setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [conversation?.id, conversation?.messages, isStreaming]);

  return (
    <div className="flex-1 flex flex-col min-h-0 relative bg-muted/5">
      <div ref={scrollRef} className="flex-1 overflow-y-auto min-h-0">
        <div className="max-w-4xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-6">
          {!conversation || conversation.messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mb-6 shadow-sm border border-primary/20">
                <Bot className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-extrabold mb-2 text-center">How can I help you today?</h2>
              <p className="text-muted-foreground font-medium text-center max-w-lg mb-12 leading-relaxed">
                Career guidance, interview preparation, resume optimization, placement planning, DSA, projects, and much more.
              </p>
              <SuggestedPrompts onSelect={onSendMessage} />
            </div>
          ) : (
            <div className="space-y-6 pb-20">
              {conversation.messages.map((msg) => (
                <ChatMessageComponent key={msg.id} message={msg} />
              ))}
              {isStreaming && (
                <TypingIndicator />
              )}
              <div ref={bottomRef} className="h-1" />
            </div>
          )}
        </div>
      </div>
      
      <div className="shrink-0 p-4 sm:p-6 lg:p-8 bg-gradient-to-t from-background via-background to-transparent pt-4">
        <div className="max-w-3xl mx-auto w-full">
          <ChatInput onSend={onSendMessage} disabled={isStreaming} />
          <p className="text-[11px] text-center text-muted-foreground mt-3 font-medium">
            AI Mentor can make mistakes. Consider verifying important information.
          </p>
        </div>
      </div>
    </div>
  );
}
