import { Conversation } from '@/types/mentor';
import { Plus, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ConversationHistory } from './ConversationHistory';

interface MentorSidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNewChat: () => void;
  isLoading?: boolean;
}

export function MentorSidebar({ conversations, activeId, onSelect, onNewChat, isLoading }: MentorSidebarProps) {
  const recent = conversations.filter(c => c.category === 'recent');
  const saved = conversations.filter(c => c.category === 'saved');
  const older = conversations.filter(c => c.category === 'older');

  const hasAnyChats = recent.length > 0 || saved.length > 0 || older.length > 0;

  return (
    <div className="flex flex-col h-full min-h-0 bg-card">
      <div className="p-4 border-b border-border/40 shrink-0">
        <Button 
          onClick={onNewChat} 
          className="w-full justify-start gap-2 shadow-sm font-bold bg-primary hover:bg-primary/90 text-primary-foreground"
          size="lg"
        >
          <Plus className="w-5 h-5" />
          New Chat
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {isLoading && conversations.length === 0 ? (
            <div className="space-y-3 p-1">
              <div className="h-3 w-16 bg-muted/60 rounded animate-pulse" />
              <div className="h-9 w-full bg-muted/40 rounded-lg animate-pulse" />
              <div className="h-9 w-full bg-muted/40 rounded-lg animate-pulse" />
              <div className="h-9 w-full bg-muted/40 rounded-lg animate-pulse" />
            </div>
          ) : !hasAnyChats ? (
            <div className="py-8 px-2 text-center">
              <MessageSquare className="w-6 h-6 mx-auto mb-2 text-muted-foreground/40" />
              <p className="text-xs text-muted-foreground">No chats yet</p>
              <p className="text-[11px] text-muted-foreground/70 mt-1">Start a conversation with your AI Mentor</p>
            </div>
          ) : (
            <>
              {recent.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider ml-2">Recent</span>
                  <div className="space-y-1">
                    {recent.map(conv => (
                      <ConversationHistory 
                        key={conv.id} 
                        conversation={conv} 
                        isActive={activeId === conv.id}
                        onClick={() => onSelect(conv.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {saved.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider ml-2">Saved Chats</span>
                  <div className="space-y-1">
                    {saved.map(conv => (
                      <ConversationHistory 
                        key={conv.id} 
                        conversation={conv} 
                        isActive={activeId === conv.id}
                        onClick={() => onSelect(conv.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {older.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider ml-2">Older</span>
                  <div className="space-y-1">
                    {older.map(conv => (
                      <ConversationHistory 
                        key={conv.id} 
                        conversation={conv} 
                        isActive={activeId === conv.id}
                        onClick={() => onSelect(conv.id)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
