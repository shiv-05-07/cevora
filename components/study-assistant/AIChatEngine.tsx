'use client';

import * as React from 'react';
import { Send, Bot, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { DetectedRegion } from './SmartScanner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type AgentMode = "summarize" | "doubt" | "math" | "planning" | "coding";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatEngineProps {
  documentContext: string;
}

export function AIChatEngine({ documentContext }: AIChatEngineProps) {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI Assistant. I have read the uploaded document. You can ask me anything about it!",
    }
  ]);
  const [input, setInput] = React.useState('');
  const [mode, setMode] = React.useState<AgentMode>('doubt');
  const [isTyping, setIsTyping] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsTyping(true);
    
    setTimeout(() => {
      // Mock askAI logic with mode switching
      const contextLength = documentContext.length;
      let response = '';

      if (contextLength > 0) {
        switch (mode) {
          case 'summarize':
            response = `[Summarize Mode]\n\nHere is a quick summary of the ${contextLength} characters in your document:\n- Key concept identified\n- Main arguments extracted\n- Conclusion summarized.`;
            break;
          case 'math':
            response = `[Math Solver Mode]\n\nLet's break down the math problem found in your document:\n1. Identify the given variables.\n2. Apply the relevant formulas.\n3. Compute the final answer step-by-step.`;
            break;
          case 'planning':
            response = `[Planning Mode]\n\nBased on your document, here is a structured study plan:\n- Week 1: Master the fundamentals.\n- Week 2: Dive into advanced problems.\n- Week 3: Mock tests and review.`;
            break;
          case 'coding':
            response = `[Coding Mode]\n\nHere is a code implementation based on the logic in your document:\n\n\`\`\`ts\nfunction solve() {\n  console.log("Analyzing document logic...");\n}\n\`\`\``;
            break;
          case 'doubt':
          default:
            response = `[Doubt Resolution Mode]\n\nBased on the uploaded document, here is the answer to your question. Let me know if you need further clarification!`;
            break;
        }
      } else {
        response = "Please upload a document first! I need the file context to properly answer your question in " + mode + " mode.";
      }

      setMessages(prev => [
        ...prev,
        { id: Date.now().toString(), role: 'assistant', content: response }
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-background relative border-l border-border/60">
      {/* Chat Header */}
      <div className="px-4 h-12 border-b border-border/60 flex items-center justify-between bg-card shrink-0">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-sm">AI Assistant</h3>
        </div>
        <div className="text-xs font-medium px-2 py-1 bg-muted rounded-full text-muted-foreground flex items-center gap-1">
          <FileText className="w-3 h-3" />
          Document Context Active
        </div>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={cn(
                "flex gap-3 max-w-[90%]",
                msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                msg.role === 'user' ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              )}>
                {msg.role === 'user' ? <div className="text-xs font-bold">You</div> : <Bot className="w-4 h-4" />}
              </div>
              <div className={cn(
                "p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap",
                msg.role === 'user' 
                  ? "bg-primary text-primary-foreground rounded-tr-sm" 
                  : "bg-muted/50 border border-border/50 text-foreground rounded-tl-sm"
              )}>
                {msg.content}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl bg-muted/50 border border-border/50 rounded-tl-sm flex items-center gap-1">
                <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 bg-background border-t border-border/60 shrink-0">
        <form onSubmit={handleSend} className="relative flex items-center">
          <div className="absolute left-2 z-10 flex items-center h-full py-1">
            <Select value={mode} onValueChange={(val) => setMode(val as AgentMode)}>
              <SelectTrigger className="h-full border-none bg-transparent shadow-none focus:ring-0 focus:ring-offset-0 text-xs font-semibold hover:bg-muted/50 rounded-lg px-2 w-[110px]">
                <SelectValue placeholder="Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="doubt">Doubt</SelectItem>
                <SelectItem value="summarize">Summarize</SelectItem>
                <SelectItem value="math">Math</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="coding">Coding</SelectItem>
              </SelectContent>
            </Select>
            <div className="w-px h-6 bg-border/60 ml-1" />
          </div>
          
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something..."
            className="pl-[130px] pr-12 py-6 rounded-xl border-border/60 bg-muted/20 focus-visible:ring-primary/30 focus-visible:bg-background"
          />
          <Button 
            type="submit" 
            size="icon" 
            className="absolute right-2 h-9 w-9 rounded-lg"
            disabled={!input.trim() || isTyping}
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
