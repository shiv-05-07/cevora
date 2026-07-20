import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InterviewFeedback } from './types';
import { Target, TrendingUp, TrendingDown, BookOpen, RotateCcw } from 'lucide-react';
import { HoverCard } from '@/components/ui/hover-card';

interface InterviewResultProps {
  feedback: InterviewFeedback | null;
  onRestart: () => void;
}

export function InterviewResult({ feedback, onRestart }: InterviewResultProps) {
  if (!feedback) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] space-y-4">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground font-medium">Analyzing your interview performance...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-3xl font-bold">Interview Results</h2>
        <p className="text-muted-foreground">Here is a detailed breakdown of your performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Score Card */}
        <HoverCard className="col-span-1 md:col-span-3">
          <Card className="bg-primary/5 bg-transparent border-0 shadow-none flex flex-col items-center justify-center p-8 h-full">
            <Target className="w-12 h-12 text-primary mb-4" />
            <div className="text-6xl font-extrabold text-primary mb-2">{feedback.score}<span className="text-3xl text-primary/60">/100</span></div>
            <p className="text-lg font-medium text-foreground">Overall Performance Score</p>
          </Card>
        </HoverCard>

        {/* Strengths */}
        <HoverCard>
          <Card className="shadow-none border-0 bg-transparent h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-green-600 dark:text-green-400">
                <TrendingUp className="w-5 h-5" /> Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {feedback.strengths.map((str, i) => (
                  <li key={i} className="text-sm flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </HoverCard>

        {/* Weaknesses */}
        <HoverCard>
          <Card className="shadow-none border-0 bg-transparent h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-red-600 dark:text-red-400">
                <TrendingDown className="w-5 h-5" /> Areas to Improve
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {feedback.weaknesses.map((weak, i) => (
                  <li key={i} className="text-sm flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span>{weak}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </HoverCard>

        {/* Actionable Feedback */}
        <HoverCard>
          <Card className="shadow-none border-0 bg-transparent h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <BookOpen className="w-5 h-5" /> Action Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {feedback.improvements.map((imp, i) => (
                  <li key={i} className="text-sm flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">•</span>
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </HoverCard>

      </div>

      <div className="flex justify-center mt-8">
        <Button onClick={onRestart} size="lg" className="font-bold transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg active:scale-95 active:translate-y-0 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500">
          <RotateCcw className="w-4 h-4 mr-2" />
          Start New Interview
        </Button>
      </div>

    </div>
  );
}
