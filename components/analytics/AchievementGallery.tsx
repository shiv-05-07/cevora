import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Achievement } from '@/types/analytics';
import { Award, CheckCircle2, Lock, Sparkles, Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface AchievementGalleryProps {
  data: Achievement[];
}

export function AchievementGallery({ data }: AchievementGalleryProps) {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Legendary': return 'text-amber-500 bg-amber-500/10 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]';
      case 'Epic': return 'text-purple-500 bg-purple-500/10 border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]';
      case 'Rare': return 'text-blue-500 bg-blue-500/10 border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]';
      case 'Common': return 'text-muted-foreground bg-muted/50 border-border/50';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  return (
    <Card className="bg-card border-border/50 shadow-sm transition-all duration-200 ease-out hover:-translate-y-[2px] hover:border-border/60 hover:shadow-md">
      <CardHeader className="border-b border-border/40 pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          Achievements
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {data.map((achievement) => {
            const isUnlocked = achievement.status === 'Unlocked';
            const isLocked = achievement.status === 'Locked';
            const isInProgress = achievement.status === 'In Progress';

            return (
              <div 
                key={achievement.id}
                className={cn(
                  "relative p-4 rounded-xl border flex flex-col transition-all duration-300",
                  isUnlocked ? "bg-muted/30 hover:border-border/80" : 
                  isInProgress ? "bg-card border-dashed hover:border-primary/50" : 
                  "bg-muted/10 opacity-60 grayscale hover:grayscale-0"
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border",
                      isUnlocked ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" :
                      isInProgress ? "bg-primary/10 border-primary/30 text-primary" :
                      "bg-muted border-muted-foreground/30 text-muted-foreground"
                    )}>
                      {isUnlocked && <CheckCircle2 className="w-4 h-4" />}
                      {isInProgress && <Star className="w-4 h-4 fill-primary/20" />}
                      {isLocked && <Lock className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{achievement.title}</h4>
                      {isUnlocked && achievement.unlockDate && (
                        <p className="text-[10px] text-muted-foreground">{achievement.unlockDate}</p>
                      )}
                    </div>
                  </div>
                  
                  <Badge variant="outline" className={cn("text-[10px] px-2 py-0.5", getRarityColor(achievement.rarity))}>
                    {achievement.rarity}
                  </Badge>
                </div>

                {!isUnlocked && (
                  <div className="mt-auto pt-4 border-t border-border/40">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                      <span>Progress</span>
                      <span className="font-medium">{achievement.progress}%</span>
                    </div>
                    <Progress 
                      value={achievement.progress} 
                      className="h-1.5 [&_[data-slot=progress-indicator]]:bg-primary"
                    />
                  </div>
                )}
                
                {isUnlocked && (
                  <div className="absolute -top-1 -right-1">
                    <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500/20" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
