import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SimulatorOption } from '@/types/analytics';
import { Beaker, ArrowRight, Building2, Users } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface ReadinessSimulatorProps {
  options: SimulatorOption[];
  baseReadiness: number;
  baseAmazon: number;
  baseInterview: number;
}

function useAnimatedNumber(value: number, duration: number = 800) {
  const [current, setCurrent] = React.useState(value);

  React.useEffect(() => {
    let startTimestamp: number;
    const startValue = current;
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // easeOutQuart
      const ease = 1 - Math.pow(1 - progress, 4);
      setCurrent(startValue + (value - startValue) * ease);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCurrent(value);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [value, duration]);

  return Math.round(current);
}

export function ReadinessSimulator({ options, baseReadiness, baseAmazon, baseInterview }: ReadinessSimulatorProps) {
  const [selected, setSelected] = React.useState<Set<string>>(new Set());

  const toggleOption = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const totalReadinessImpact = options.filter(o => selected.has(o.id)).reduce((acc, curr) => acc + curr.impactReadiness, 0);
  const totalAmazonImpact = options.filter(o => selected.has(o.id)).reduce((acc, curr) => acc + curr.impactAmazon, 0);
  const totalInterviewImpact = options.filter(o => selected.has(o.id)).reduce((acc, curr) => acc + curr.impactInterview, 0);

  const nextReadiness = Math.min(100, baseReadiness + totalReadinessImpact);
  const nextAmazon = Math.min(100, baseAmazon + totalAmazonImpact);
  const nextInterview = Math.min(100, baseInterview + totalInterviewImpact);

  const animatedReadiness = useAnimatedNumber(nextReadiness);
  const animatedAmazon = useAnimatedNumber(nextAmazon);
  const animatedInterview = useAnimatedNumber(nextInterview);

  const renderImpactValue = (base: number, impact: number, animatedNext: number) => {
    return (
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">{base}%</span>
        {impact > 0 && (
          <>
            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="font-bold text-emerald-500 tabular-nums">{animatedNext}%</span>
          </>
        )}
      </div>
    );
  };

  return (
    <Card className="bg-card border-border/50 shadow-sm transition-all duration-200 ease-out hover:-translate-y-[2px] hover:border-border/60 hover:shadow-md">
      <CardHeader className="border-b border-border/40 pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Beaker className="w-5 h-5 text-purple-500" />
          Readiness Simulator
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Options side */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">"What if I..."</h3>
            <div className="space-y-3">
              {options.map(option => (
                <div 
                  key={option.id} 
                  className={cn(
                    "flex items-center space-x-3 p-3 rounded-lg border transition-all cursor-pointer",
                    selected.has(option.id) ? "bg-primary/5 border-primary/30" : "bg-muted/20 border-border/50 hover:bg-muted/40"
                  )}
                  onClick={() => toggleOption(option.id)}
                >
                  <Checkbox 
                    id={option.id} 
                    checked={selected.has(option.id)}
                    onCheckedChange={() => toggleOption(option.id)}
                  />
                  <Label htmlFor={option.id} className="cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Impact side */}
          <div className="bg-muted/10 p-6 rounded-xl border border-border/50">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Predicted Outcome</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Overall Readiness</span>
                  {renderImpactValue(baseReadiness, totalReadinessImpact, animatedReadiness)}
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden flex">
                  <div className="h-full bg-primary transition-all duration-500" style={{ width: `${baseReadiness}%` }} />
                  {totalReadinessImpact > 0 && (
                    <div className="h-full bg-emerald-500 transition-all duration-500 animate-pulse" style={{ width: `${Math.min(100 - baseReadiness, totalReadinessImpact)}%` }} />
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-1.5 font-medium text-sm text-muted-foreground">
                    <Building2 className="w-4 h-4" />
                    Amazon Match
                  </span>
                  {renderImpactValue(baseAmazon, totalAmazonImpact, animatedAmazon)}
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden flex">
                  <div className="h-full bg-muted-foreground/40 transition-all duration-500" style={{ width: `${baseAmazon}%` }} />
                  {totalAmazonImpact > 0 && (
                    <div className="h-full bg-emerald-500/80 transition-all duration-500 animate-pulse" style={{ width: `${Math.min(100 - baseAmazon, totalAmazonImpact)}%` }} />
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-1.5 font-medium text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    Interview Skill
                  </span>
                  {renderImpactValue(baseInterview, totalInterviewImpact, animatedInterview)}
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden flex">
                  <div className="h-full bg-muted-foreground/40 transition-all duration-500" style={{ width: `${baseInterview}%` }} />
                  {totalInterviewImpact > 0 && (
                    <div className="h-full bg-emerald-500/80 transition-all duration-500 animate-pulse" style={{ width: `${Math.min(100 - baseInterview, totalInterviewImpact)}%` }} />
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}
