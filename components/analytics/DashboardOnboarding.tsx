import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, FileText, Code2, Users, LineChart, Target, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function DashboardOnboarding() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isRendered, setIsRendered] = React.useState(false);

  React.useEffect(() => {
    // Only show if not dismissed before
    const hasSeen = localStorage.getItem('cevora-analytics-onboarding');
    if (!hasSeen) {
      setIsRendered(true);
      // Small delay for entrance animation
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('cevora-analytics-onboarding', 'true');
    setTimeout(() => setIsRendered(false), 300); // Wait for exit animation
  };

  if (!isRendered) return null;

  return (
    <div className={cn(
      "fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm transition-all duration-300",
      isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
    )}>
      <Card className={cn(
        "w-full max-w-md bg-card border-primary/20 shadow-xl transition-all duration-300 transform",
        isVisible ? "translate-y-0 scale-100" : "translate-y-8 scale-95"
      )}>
        <CardContent className="p-8 relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
            onClick={handleDismiss}
          >
            <X className="w-4 h-4" />
          </Button>

          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Brain className="w-6 h-6 text-primary" />
            </div>
          </div>

          <h2 className="text-xl font-bold text-center mb-2">👋 Welcome to Career Intelligence</h2>
          <p className="text-center text-muted-foreground text-sm mb-8">
            This dashboard continuously analyzes your performance across all modules to build your perfect path to placement.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-emerald-500" />
              </div>
              <span className="font-medium">Resume & ATS Tracking</span>
            </div>
            
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                <Code2 className="w-4 h-4 text-blue-500" />
              </div>
              <span className="font-medium">OA Practice Performance</span>
            </div>
            
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4 text-purple-500" />
              </div>
              <span className="font-medium">AI Mock Interview Readiness</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                <LineChart className="w-4 h-4 text-amber-500" />
              </div>
              <span className="font-medium">Learning & Study Progress</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg border border-border/50 text-xs text-muted-foreground mb-6">
            <Target className="w-4 h-4 text-primary shrink-0" />
            Everything updates automatically as you use Cevora.
          </div>

          <Button className="w-full h-11" onClick={handleDismiss}>
            Got it, let's go
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
