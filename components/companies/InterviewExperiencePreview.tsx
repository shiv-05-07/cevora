import * as React from 'react';
import { Company } from '@/types/company';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ArrowRight, MessageSquare, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/dashboard/StatusBadge';

export function InterviewExperiencePreview({ company }: { company: Company }) {
  if (!company.experiences || company.experiences.length === 0) {
    return (
      <div className="text-sm text-muted-foreground italic">
        No experiences shared yet for this company.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {company.experiences.map((exp) => (
        <Card key={exp.id} className="border-border/60 bg-card hover:border-primary/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
          <CardContent className="p-6 flex flex-col h-full gap-5">
            <div className="flex justify-between items-start gap-4 border-b border-border/40 pb-4">
              <div>
                <h5 className="font-extrabold text-lg">{exp.studentName}</h5>
                <p className="text-sm font-semibold text-muted-foreground mt-0.5">{exp.role}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 px-2 py-1 rounded-full text-xs font-extrabold">
                  {exp.rating} <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <StatusBadge 
                  status={exp.difficulty === 'Hard' ? 'danger' : exp.difficulty === 'Medium' ? 'warning' : 'success'}
                  className="text-[10px]"
                >
                  {exp.difficulty}
                </StatusBadge>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm font-semibold text-muted-foreground">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary/70" />
                <span>{exp.questionsAsked || 3} Questions</span>
              </div>
              <div className="flex items-center gap-2">
                {exp.verdict === 'Selected' ? (
                  <CheckCircle2 className="w-4 h-4 text-success" />
                ) : (
                  <XCircle className="w-4 h-4 text-destructive" />
                )}
                <span className={exp.verdict === 'Selected' ? 'text-success' : 'text-destructive'}>
                  {exp.verdict || 'Selected'}
                </span>
              </div>
            </div>
            
            <p className="text-sm text-foreground/90 line-clamp-3 leading-relaxed flex-1">
              "{exp.shortReview}"
            </p>
            
            <div className="pt-2">
              <Button variant="ghost" size="sm" className="px-0 h-auto self-start text-sm font-bold text-primary hover:bg-transparent group">
                View Experience <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
