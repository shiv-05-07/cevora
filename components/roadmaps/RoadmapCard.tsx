import * as React from 'react';
import { Roadmap } from '@/types/roadmap';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Clock, Star, Users, ArrowRight } from 'lucide-react';
import { StatusBadge } from '@/components/dashboard/StatusBadge';

interface RoadmapCardProps {
  roadmap: Roadmap;
  onViewDetails: () => void;
}

export function RoadmapCard({ roadmap, onViewDetails }: RoadmapCardProps) {
  const totalLessons = roadmap.modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
  const completedLessons = roadmap.modules.reduce((acc, mod) => acc + mod.lessons.filter(l => l.isCompleted).length, 0);
  const completion = totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);

  return (
    <Card className="border-border/60 bg-card hover:border-primary/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
      <CardContent className="p-6 flex flex-col h-full gap-5">
        
        {/* Header */}
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="font-extrabold text-xl line-clamp-1">{roadmap.title}</h3>
            <p className="text-sm font-semibold text-muted-foreground mt-1">
              {roadmap.company ? `${roadmap.company} • ` : ''}{roadmap.role}
            </p>
          </div>
          <StatusBadge 
            status={roadmap.difficulty === 'Advanced' ? 'danger' : roadmap.difficulty === 'Intermediate' ? 'warning' : 'success'}
            className="text-[10px]"
          >
            {roadmap.difficulty}
          </StatusBadge>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {roadmap.estimatedDuration}
          </div>
          <div className="flex items-center gap-1.5 text-yellow-600 dark:text-yellow-500">
            <Star className="w-3.5 h-3.5 fill-current" />
            {roadmap.rating}
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            {(roadmap.studentsEnrolled / 1000).toFixed(1)}k
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2.5">
          <div className="flex justify-between text-xs font-bold">
            <span>Overall Progress</span>
            <span className="text-primary">{completion}%</span>
          </div>
          <Progress value={completion} className="h-2" />
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 flex-1 items-start mt-2">
          {roadmap.skills.slice(0, 3).map(skill => (
            <Badge key={skill} variant="secondary" className="bg-secondary/40 text-secondary-foreground">
              {skill}
            </Badge>
          ))}
          {roadmap.skills.length > 3 && (
            <Badge variant="secondary" className="bg-secondary/20 text-muted-foreground">
              +{roadmap.skills.length - 3}
            </Badge>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-border/40 mt-auto">
          <Button className="flex-1 font-bold shadow-sm" variant={completion > 0 ? "default" : "secondary"}>
            {completion > 0 ? 'Continue' : 'Start Learning'}
          </Button>
          <Button variant="outline" className="font-bold shadow-sm" onClick={onViewDetails}>
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
