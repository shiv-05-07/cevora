import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { InterviewConfig, InterviewMessage } from './types';
import { Send, Bot, Clock, CheckCircle2, Mic, Video as VideoIcon, StopCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface SharedSessionProps {
  config: InterviewConfig;
  onEnd: (history: InterviewMessage[]) => void;
}

export function SharedSession({ config, onEnd }: SharedSessionProps) {
  const router = useRouter();
  const [messages, setMessages] = React.useState<InterviewMessage[]>([]);
  const [input, setInput] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(true);
  const [questionCount, setQuestionCount] = React.useState(1);
  const [isRecording, setIsRecording] = React.useState(false);
  const MAX_QUESTIONS = 3;
  
  const [timeLeft, setTimeLeft] = React.useState(600); // 10 minutes
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Timer effect
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  React.useEffect(() => {
    setTimeout(() => {
      const modeText = config.sessionMode === 'interview' ? 'interview' : 'viva';
      setMessages([
        {
          id: Date.now().toString(),
          role: 'interviewer',
          content: `Welcome! I will be conducting your ${config.level} ${config.role} ${modeText} for ${config.company}. Let's get started with your first question.\n\nCould you briefly explain how you would optimize a slow-performing application?`
        }
      ]);
      setIsTyping(false);
    }, 1500);
  }, [config]);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const submitAnswer = (textValue: string) => {
    const userMsg: InterviewMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: textValue,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    if (questionCount >= MAX_QUESTIONS) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: 'interviewer',
            content: "Thank you for your responses! That concludes our session today. I'm compiling your results now..."
          }
        ]);
        setTimeout(() => {
          onEnd([...messages, userMsg]);
        }, 3000);
      }, 1500);
    } else {
      setTimeout(() => {
        setQuestionCount((c) => c + 1);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: 'interviewer',
            content: `That's an interesting approach. Following up on that, how would you handle architectural scalability?`
          }
        ]);
        setIsTyping(false);
      }, 2000);
    }
  };

  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    submitAnswer(input);
    setInput('');
  };

  const handleToggleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      submitAnswer("[Audio Transcription Mock] I would optimize the application by lazy loading components, utilizing memoization, and optimizing database queries with proper indexing.");
    } else {
      setIsRecording(true);
    }
  };

  const currentQuestion = [...messages].reverse().find(m => m.role === 'interviewer')?.content || "Preparing your first question...";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px] h-[calc(100vh-140px)]">
      
      {/* Left: AI Interviewer Video & Question Panel */}
      <div className="col-span-1 lg:col-span-4 flex flex-col h-full gap-4">
        {/* Mock AI Video Frame */}
        <Card className="shadow-sm border-border/60 overflow-hidden shrink-0 relative bg-black/5 dark:bg-black/40">
          <div className="aspect-video relative flex items-center justify-center">
            {/* Pulsing ring for "AI Speaking" effect */}
            {isTyping ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-primary/20 animate-pulse" />
              </div>
            )}
            <Bot className="w-12 h-12 text-primary relative z-10" />
            <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
              AI Interviewer
            </div>
          </div>
        </Card>

        {/* Current Question */}
        <Card className="flex-1 shadow-sm border-border/60 flex flex-col overflow-hidden">
          <CardHeader className="bg-muted/30 border-b py-3">
            <CardTitle className="text-sm font-bold flex items-center justify-between">
              <span>Current Question</span>
              <span className="text-xs font-bold px-2 py-1 bg-primary/10 text-primary rounded-full">
                {questionCount} / {MAX_QUESTIONS}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 flex-1 overflow-y-auto">
            <p className="text-[15px] leading-relaxed font-medium">
              {currentQuestion}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Center: User Interaction Panel */}
      <div className="col-span-1 lg:col-span-5 flex flex-col h-full">
        <Card className="flex-1 shadow-sm border-border/60 flex flex-col overflow-hidden relative">
          
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
                    {msg.role === 'user' ? <span className="text-xs font-bold">You</span> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={cn(
                    "p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm",
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
                  <div className="p-4 rounded-2xl bg-muted/50 border border-border/50 rounded-tl-sm flex items-center gap-1 shadow-sm">
                    <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Conditional Interaction Panel */}
          <div className="p-4 bg-muted/10 border-t border-border/60 shrink-0">
            {config.inputMode === 'text' && (
              <form onSubmit={handleSendText} className="relative flex items-center">
                <Input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your answer here..."
                  className="pr-12 py-6 rounded-xl border-border/60 bg-background focus-visible:ring-primary/30"
                  disabled={isTyping}
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
            )}

            {config.inputMode === 'audio' && (
              <div className="flex flex-col items-center justify-center gap-3 py-4">
                <div className="text-sm font-medium text-muted-foreground">
                  {isRecording ? "Listening to your response..." : "Click to speak your answer"}
                </div>
                <div className="flex items-center gap-4">
                  {isRecording && (
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="w-1.5 h-6 bg-primary rounded-full animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                      ))}
                    </div>
                  )}
                  <Button 
                    size="lg"
                    variant={isRecording ? "destructive" : "default"}
                    className={cn("rounded-full w-14 h-14 p-0 shadow-lg transition-transform", isRecording && "scale-110")}
                    onClick={handleToggleRecord}
                    disabled={isTyping}
                  >
                    {isRecording ? <StopCircle className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                  </Button>
                </div>
              </div>
            )}

            {config.inputMode === 'video' && (
              <div className="flex flex-col items-center justify-center gap-3 py-2">
                <div className="aspect-video w-full max-w-[280px] bg-black/90 rounded-lg overflow-hidden relative shadow-inner border border-border/40">
                  {/* Mock Webcam View */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/50">
                    <VideoIcon className="w-8 h-8 mb-2" />
                    <span className="text-xs">Camera Active</span>
                  </div>
                  {isRecording && <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />}
                  
                  {/* Mock Face Box */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-32 border-2 border-primary/20 rounded-lg border-dashed" />
                </div>
                
                <Button 
                  variant={isRecording ? "destructive" : "default"}
                  className="rounded-full px-6 shadow-md"
                  onClick={handleToggleRecord}
                  disabled={isTyping}
                >
                  {isRecording ? (
                    <><StopCircle className="w-4 h-4 mr-2" /> Stop Recording</>
                  ) : (
                    <><VideoIcon className="w-4 h-4 mr-2" /> Start Answering</>
                  )}
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Right: Controls + Status */}
      <div className="col-span-1 lg:col-span-3 flex flex-col h-full gap-4">
        <Card className="shadow-sm border-border/60">
          <CardHeader className="py-4 border-b bg-muted/30">
            <CardTitle className="text-sm flex items-center gap-2">
              <Clock className="w-4 h-4" /> Session Time
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 text-center">
            <div className={cn(
              "text-4xl font-mono font-bold",
              timeLeft < 60 ? "text-red-500 animate-pulse" : "text-foreground"
            )}>
              {formatTime(timeLeft)}
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1 shadow-sm border-border/60 flex flex-col">
          <CardHeader className="py-4 border-b bg-muted/30">
            <CardTitle className="text-sm">Progress Tracker</CardTitle>
          </CardHeader>
          <CardContent className="p-4 flex-1 flex flex-col">
            <div className="space-y-4">
              {[...Array(MAX_QUESTIONS)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2",
                    i + 1 < questionCount 
                      ? "bg-green-500 border-green-500 text-white" 
                      : i + 1 === questionCount
                        ? "border-primary text-primary"
                        : "border-border text-muted-foreground bg-muted/50"
                  )}>
                    {i + 1 < questionCount ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-[10px] font-bold">{i + 1}</span>}
                  </div>
                  <span className={cn(
                    "text-sm font-medium",
                    i + 1 === questionCount ? "text-foreground" : "text-muted-foreground"
                  )}>
                    Question {i + 1}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-4 border-t border-border/60 space-y-3">
              <div className="text-xs text-center text-muted-foreground mb-2">
                Mode: <span className="uppercase font-bold text-foreground">{config.inputMode}</span>
              </div>
              <Button 
                variant="destructive" 
                className="w-full font-bold shadow-sm"
                onClick={() => onEnd(messages)}
              >
                End Session Early
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
