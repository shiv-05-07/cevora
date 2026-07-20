import { Bot, CheckCircle2, Clock, MessageSquare, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export function MentorProfile() {
  return (
    <Card className="p-6 border-border/60 shadow-sm relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
      
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="relative">
          <Avatar className="w-20 h-20 border-4 border-background shadow-md">
            <div className="w-full h-full bg-primary flex items-center justify-center text-primary-foreground">
              <Bot className="w-10 h-10" />
            </div>
          </Avatar>
          <div className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-500 border-2 border-background rounded-full" />
        </div>

        <div>
          <h3 className="font-extrabold text-xl">AI Career Mentor</h3>
          <p className="text-sm text-muted-foreground font-medium mt-1">Specialized Placement Coach</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
          <div className="flex items-center gap-1.5 bg-muted/50 py-1.5 px-3 rounded-full">
            <Clock className="w-3.5 h-3.5 text-primary" />
            Instant Reply
          </div>
          <div className="flex items-center gap-1.5 bg-muted/50 py-1.5 px-3 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            99% Success
          </div>
          <div className="flex items-center gap-1.5 bg-muted/50 py-1.5 px-3 rounded-full">
            <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
            14.2k Chats
          </div>
          <div className="flex items-center gap-1.5 bg-muted/50 py-1.5 px-3 rounded-full">
            <Award className="w-3.5 h-3.5 text-yellow-500" />
            Top 1% Coach
          </div>
        </div>

        <div className="w-full pt-4 border-t border-border/40 text-left">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Expertise Areas</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">Resume & ATS</Badge>
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">DSA & Algorithms</Badge>
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">System Design</Badge>
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">Big Tech Prep</Badge>
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">Behavioral (STAR)</Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}
