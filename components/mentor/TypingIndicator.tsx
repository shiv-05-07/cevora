import { Bot } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import * as React from 'react';

export function TypingIndicator() {
  const [phase, setPhase] = React.useState('Thinking...');

  React.useEffect(() => {
    const timer1 = setTimeout(() => setPhase('Searching knowledge...'), 400);
    const timer2 = setTimeout(() => setPhase('Preparing response...'), 800);
    const timer3 = setTimeout(() => setPhase('Generating response...'), 1200);
    return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); };
  }, []);

  return (
    <div className="flex w-full justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex gap-4 max-w-[85%] md:max-w-[75%]">
        <Avatar className="w-8 h-8 shrink-0 mt-1 shadow-sm border border-border/40">
          <div className="w-full h-full bg-primary text-primary-foreground flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
        </Avatar>

        <div className="flex flex-col gap-1 w-full">
          <div className="px-5 py-3.5 rounded-2xl bg-card border border-border/60 shadow-sm rounded-tl-sm flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">{phase}</span>
            <div className="h-6 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
