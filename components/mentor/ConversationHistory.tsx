import { Conversation } from '@/types/mentor';
import { MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConversationHistoryProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}

export function ConversationHistory({ conversation, isActive, onClick }: ConversationHistoryProps) {
  // Simple mock relative time
  const isRecent = conversation.lastUpdated.getTime() > Date.now() - 1000 * 60 * 60 * 24;
  const timeDisplay = isRecent ? 'Today' : conversation.lastUpdated.toLocaleDateString();

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex flex-col gap-1 px-3 py-2.5 rounded-lg text-sm text-left transition-all duration-200 group",
        isActive 
          ? "bg-primary/10 text-primary" 
          : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
      )}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2 truncate">
          <MessageSquare className={cn(
            "w-4 h-4 shrink-0 transition-colors",
            isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
          )} />
          <span className={cn("truncate font-medium", isActive ? "font-semibold" : "")}>
            {conversation.title}
          </span>
        </div>
        <span suppressHydrationWarning className="text-[10px] text-muted-foreground shrink-0">
          {isRecent ? 'Today' : conversation.lastUpdated.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </span>
      </div>
      {conversation.preview && (
        <div className="text-xs text-muted-foreground/80 truncate pl-6 pr-2">
          {conversation.preview}
        </div>
      )}
    </button>
  );
}
