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

  const handleSend = () => {
    if (!input.trim() || disabled) return;
    onSend(input);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = '60px';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = '60px'; // Reset height
    const scrollHeight = e.target.scrollHeight;
    e.target.style.height = Math.min(scrollHeight, 200) + 'px';
  };

  return (
    <div className="relative group rounded-2xl bg-card border-2 border-border/60 shadow-sm focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10 transition-all duration-200">
      <Textarea
        ref={textareaRef}
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Ask your AI Career Mentor anything..."
        className="w-full resize-none bg-transparent border-0 focus-visible:ring-0 px-4 py-4 min-h-[60px] max-h-[200px] overflow-y-auto text-[15px]"
        disabled={disabled}
      />
      <div className="absolute right-3 bottom-3 flex items-center gap-2 bg-card rounded-xl">
        <span className="text-xs font-semibold text-muted-foreground mr-2 select-none">
          {input.length} / 2000
        </span>
        {input.length > 0 && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-8 h-8 text-muted-foreground hover:text-destructive transition-colors"
            onClick={() => { setInput(''); if(textareaRef.current) textareaRef.current.style.height = '60px'; }}
            disabled={disabled}
          >
            <Eraser className="w-4 h-4" />
          </Button>
        )}
        <Button 
          size="icon" 
          onClick={handleSend} 
          disabled={!input.trim() || disabled}
          className="w-8 h-8 rounded-lg shadow-sm font-bold"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
