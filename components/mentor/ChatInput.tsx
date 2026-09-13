import * as React from 'react';
import { Send, Eraser } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = React.useState('');
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const isSubmittingRef = React.useRef(false);

  React.useEffect(() => {
    if (!disabled) {
      isSubmittingRef.current = false;
    }
  }, [disabled]);

  // Adjust textarea height dynamically up to 200px
  React.useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height temporarily to correctly compute scrollHeight
    textarea.style.height = 'auto';
    const nextHeight = Math.min(Math.max(textarea.scrollHeight, 56), 200);
    textarea.style.height = `${nextHeight}px`;
  }, [input]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || disabled || isSubmittingRef.current) return;

    isSubmittingRef.current = true;
    setInput('');

    if (textareaRef.current) {
      textareaRef.current.style.height = '56px';
      textareaRef.current.focus();
    }

    onSend(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 2000) {
      setInput(e.target.value);
    }
  };

  return (
    <div className="relative group rounded-2xl bg-card border-2 border-border/60 shadow-sm focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10 transition-all duration-200">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Ask your AI Career Mentor anything..."
        rows={1}
        maxLength={2000}
        disabled={disabled}
        aria-label="Chat with AI Career Mentor"
        className="w-full resize-none bg-transparent border-0 outline-none focus:outline-none focus:ring-0 pl-4 pr-36 py-4 min-h-[56px] max-h-[200px] overflow-y-auto overflow-x-hidden text-[15px] leading-relaxed text-foreground placeholder:text-muted-foreground whitespace-pre-wrap break-words [overflow-wrap:anywhere] disabled:cursor-not-allowed disabled:opacity-50 block"
      />
      <div className="absolute right-3 bottom-3 flex items-center gap-2 bg-card/90 backdrop-blur-xs rounded-xl pl-2">
        <span className="text-xs font-semibold text-muted-foreground mr-1 select-none tabular-nums">
          {input.length} / 2000
        </span>
        {input.length > 0 && (
          <Button 
            variant="ghost" 
            size="icon" 
            type="button"
            className="w-8 h-8 text-muted-foreground hover:text-destructive transition-colors"
            onClick={() => {
              setInput('');
              if (textareaRef.current) {
                textareaRef.current.style.height = '56px';
                textareaRef.current.focus();
              }
            }}
            disabled={disabled}
          >
            <Eraser className="w-4 h-4" />
          </Button>
        )}
        <Button 
          size="icon" 
          type="button"
          onClick={handleSend} 
          disabled={!input.trim() || disabled}
          className="w-8 h-8 rounded-lg shadow-sm font-bold shrink-0"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

