import { ChatMessage as ChatMessageType } from '@/types/mentor';
import { Bot, User, Copy, RefreshCcw, ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import * as React from 'react';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    toast.success("Message copied to clipboard");
  };

  const formatContent = (content: string) => {
    // Strictly sanitize to prevent raw script execution or HTML injection
    const sanitizedContent = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    const lines = sanitizedContent.split('\n');
    let inCodeBlock = false;
    let codeContent = '';
    const result: React.ReactNode[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith('```')) {
        if (inCodeBlock) {
          result.push(
            <div key={`code-${i}`} className="bg-muted p-4 rounded-xl my-3 overflow-x-auto text-sm font-mono border border-border/60 shadow-sm relative group">
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon-sm" className="h-6 w-6 text-muted-foreground hover:text-foreground">
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <pre><code>{codeContent.trim()}</code></pre>
            </div>
          );
          inCodeBlock = false;
          codeContent = '';
        } else {
          inCodeBlock = true;
        }
        continue;
      }

      if (inCodeBlock) {
        codeContent += line + '\n';
        continue;
      }

      if (line.startsWith('# ')) {
        result.push(<h1 key={i} className="text-2xl font-extrabold mt-6 mb-3">{parseInline(line.substring(2))}</h1>);
      } else if (line.startsWith('## ')) {
        result.push(<h2 key={i} className="text-xl font-bold mt-5 mb-2">{parseInline(line.substring(3))}</h2>);
      } else if (line.startsWith('### ')) {
        result.push(<h3 key={i} className="text-lg font-bold mt-4 mb-2">{parseInline(line.substring(4))}</h3>);
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        result.push(
          <li key={i} className="ml-5 list-disc marker:text-primary/70 mb-1 leading-relaxed">
            {parseInline(line.substring(2))}
          </li>
        );
      } else if (/^\d+\.\s/.test(line)) {
        const text = line.replace(/^\d+\.\s/, '');
        result.push(
          <li key={i} className="ml-5 list-decimal marker:text-primary/70 mb-1 font-medium leading-relaxed">
            {parseInline(text)}
          </li>
        );
      } else if (line.startsWith('> ')) {
        result.push(
          <blockquote key={i} className="border-l-4 border-primary pl-4 py-1 my-3 bg-primary/5 rounded-r-lg italic text-muted-foreground">
            {parseInline(line.substring(2))}
          </blockquote>
        );
      } else if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        // Simple Markdown Table parsing
        if (line.replace(/\s/g, '').match(/^\|[-|:]+\|$/)) {
          continue; // Skip separator line
        }
        const cells = line.split('|').slice(1, -1).map(c => c.trim());
        result.push(
          <div key={`tr-${i}`} className="flex border-b border-border/50 py-2 last:border-0 bg-card">
            {cells.map((cell, idx) => (
              <div key={idx} className="flex-1 px-3 py-1 text-sm text-foreground/90 font-medium">
                {parseInline(cell)}
              </div>
            ))}
          </div>
        );
      } else if (line.trim() === '') {
        result.push(<div key={`br-${i}`} className="h-2" />);
      } else {
        result.push(<p key={i} className="mb-2 leading-relaxed text-foreground/90">{parseInline(line)}</p>);
      }
    }
    return result;
  };

  const parseInline = (text: string) => {
    // Handle bold
    let parsed: React.ReactNode[] = text.split(/(\*\*.*?\*\*)/g).map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={`b-${i}`} className="font-bold text-foreground">{part.slice(2, -2)}</strong>;
      }
      return part;
    });

    // Handle italic
    parsed = parsed.flatMap((part, i) => {
      if (typeof part === 'string') {
        return part.split(/(\*.*?\*)/g).map((subPart, j) => {
          if (subPart.startsWith('*') && subPart.endsWith('*') && !subPart.startsWith('**')) {
            return <em key={`i-${i}-${j}`} className="italic">{subPart.slice(1, -1)}</em>;
          }
          return subPart;
        });
      }
      return part;
    });

    // Handle inline code
    parsed = parsed.flatMap((part, i) => {
      if (typeof part === 'string') {
        return part.split(/(`.*?`)/g).map((subPart, j) => {
          if (subPart.startsWith('`') && subPart.endsWith('`')) {
            return <code key={`c-${i}-${j}`} className="px-1.5 py-0.5 bg-muted rounded-md text-[13px] font-mono text-primary">{subPart.slice(1, -1)}</code>;
          }
          return subPart;
        });
      }
      return part;
    });

    // Handle links
    parsed = parsed.flatMap((part, i) => {
      if (typeof part === 'string') {
        const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
        if (linkMatch) {
          const split = part.split(linkMatch[0]);
          return [
            split[0],
            <a key={`l-${i}`} href={linkMatch[2]} className="text-primary hover:underline font-semibold" target="_blank" rel="noreferrer">{linkMatch[1]}</a>,
            split[1]
          ];
        }
      }
      return part;
    });

    return parsed;
  };

  return (
    <div className={cn(
      "flex w-full group animate-in fade-in slide-in-from-bottom-2 duration-300",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "flex gap-4 max-w-[85%] md:max-w-[75%]",
        isUser ? "flex-row-reverse" : "flex-row"
      )}>
        <Avatar className="w-8 h-8 shrink-0 mt-1 shadow-sm border border-border/40">
          {isUser ? (
            <AvatarFallback className="bg-primary text-primary-foreground font-bold">U</AvatarFallback>
          ) : (
            <div className="w-full h-full bg-primary text-primary-foreground flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
          )}
        </Avatar>

        <div className="flex flex-col gap-1 w-full">
          <div className={cn(
            "px-5 py-3.5 rounded-2xl",
            isUser 
              ? "bg-primary text-primary-foreground rounded-tr-sm" 
              : "bg-card border border-border/60 shadow-sm rounded-tl-sm text-foreground/90"
          )}>
            {message.content ? (
              <div className={cn(
                "text-[15px]",
                isUser ? "font-medium" : ""
              )}>
                {isUser ? message.content : formatContent(message.content)}
              </div>
            ) : (
              <div className="h-6 flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce mx-1" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
          </div>

          <div className={cn(
            "flex items-center gap-2 mt-1",
            isUser ? "justify-end" : "justify-start"
          )}>
            <span suppressHydrationWarning className="text-[10px] font-semibold text-muted-foreground px-1">
              {message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
            </span>
            
            {!isUser && message.content && (
              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                <Button variant="ghost" size="icon-sm" className="h-6 w-6 text-muted-foreground hover:text-foreground" onClick={handleCopy}>
                  <Copy className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="icon-sm" className="h-6 w-6 text-muted-foreground hover:text-foreground">
                  <RefreshCcw className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="icon-sm" className="h-6 w-6 text-muted-foreground hover:text-foreground">
                  <ThumbsUp className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="icon-sm" className="h-6 w-6 text-muted-foreground hover:text-foreground">
                  <ThumbsDown className="w-3 h-3" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
