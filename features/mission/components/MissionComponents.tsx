import React, { useState } from 'react';
import Link from 'next/link';
import { MissionState, MissionStage } from '../types';
import {
  BookOpen,
  Code2,
  RotateCcw,
  Mic2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  AlertCircle,
  HelpCircle,
  Clock,
  Send,
  Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function MissionSkeleton() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      <div className="h-10 bg-muted/40 rounded-2xl w-1/3"></div>
      <div className="h-6 bg-muted/30 rounded-xl w-1/2"></div>
      <div className="h-72 bg-muted/20 rounded-3xl w-full"></div>
    </div>
  );
}

export function MissionStepper({ currentStage }: { currentStage: MissionStage }) {
  const stages: Array<{ id: MissionStage; label: string; number: number }> = [
    { id: 'LEARN', label: 'Learn', number: 1 },
    { id: 'PRACTICE', label: 'Practice', number: 2 },
    { id: 'REVIEW', label: 'Review', number: 3 },
    { id: 'INTERVIEW', label: 'Interview', number: 4 },
  ];

  const getStageIndex = (s: MissionStage) => {
    if (s === 'LEARN' || s === 'LESSON') return 0;
    if (s === 'PRACTICE') return 1;
    if (s === 'REVIEW' || s === 'REFLECTION') return 2;
    if (s === 'INTERVIEW') return 3;
    if (s === 'COMPLETED') return 4;
    return 0;
  };

  const currentIndex = getStageIndex(currentStage);

  return (
    <div className="p-4 rounded-2xl border border-border/60 bg-card mb-6 shadow-sm">
      <div className="flex items-center justify-between gap-2 overflow-x-auto">
        {stages.map((st, i) => {
          const isDone = currentIndex > i;
          const isCurrent = currentIndex === i;
          return (
            <React.Fragment key={st.id}>
              <div className="flex items-center gap-2 shrink-0">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${isDone
                      ? 'bg-emerald-500 text-white'
                      : isCurrent
                        ? 'bg-primary text-primary-foreground ring-2 ring-primary/30'
                        : 'bg-muted/60 text-muted-foreground'
                    }`}
                >
                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : st.number}
                </div>
                <span
                  className={`text-xs font-semibold ${isCurrent ? 'text-foreground font-bold' : isDone ? 'text-emerald-500' : 'text-muted-foreground'
                    }`}
                >
                  {st.label}
                </span>
              </div>
              {i < stages.length - 1 && (
                <div className={`h-[2px] flex-1 min-w-[20px] ${currentIndex > i ? 'bg-emerald-500' : 'bg-muted'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export function MissionHeroCard({ mission }: { mission?: MissionState['mission'] }) {
  if (!mission) return null;
  return (
    <div className="p-6 border border-border/70 rounded-3xl shadow-sm bg-card mb-6 relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-bold uppercase tracking-wider text-[11px]">
          Daily Learning Mission
        </Badge>
        <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {mission.estimatedMinutes || 45} mins
          </span>
          <span>XP Awarded: +{mission.xpAwarded || 50} XP</span>
        </div>
      </div>
      <h1 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">{mission.title || 'Daily Mission'}</h1>
      {mission.description && (
        <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
          {mission.description}
        </p>
      )}
    </div>
  );
}

export function MissionReasonCard({ reason }: { reason: string }) {
  return (
    <div className="p-4 bg-primary/10 border border-primary/20 rounded-2xl mb-6 flex items-start gap-3">
      <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
      <div>
        <span className="text-primary font-bold text-xs uppercase tracking-wider block">Why this mission?</span>
        <p className="text-xs sm:text-sm text-foreground/90 mt-0.5 leading-relaxed font-medium">{reason}</p>
      </div>
    </div>
  );
}

export function LessonCard({ lesson, onComplete }: { lesson: any; onComplete: () => void }) {
  return (
    <div className="p-6 sm:p-7 border border-border/70 rounded-3xl shadow-sm bg-card space-y-6">
      <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
        <BookOpen className="w-4 h-4" />
        Step 1 · Concept Walkthrough
      </div>

      <div>
        <h2 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">{lesson.title}</h2>
        <div className="text-xs sm:text-sm text-muted-foreground mt-3 space-y-3 whitespace-pre-line leading-relaxed font-normal">
          {lesson.content}
        </div>
      </div>

      {lesson.interactiveExample && (
        <div className="rounded-2xl border border-border/60 bg-muted/20 p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-muted-foreground">
            <span>Example Implementation</span>
            <span className="uppercase text-[10px]">{lesson.interactiveExample.language || 'typescript'}</span>
          </div>
          <pre className="p-3 bg-muted/60 text-foreground rounded-xl font-mono text-xs overflow-x-auto">
            <code>{lesson.interactiveExample.code}</code>
          </pre>
          {lesson.interactiveExample.explanation && (
            <p className="text-xs text-muted-foreground pt-1">
              💡 {lesson.interactiveExample.explanation}
            </p>
          )}
        </div>
      )}

      <div className="pt-2 flex justify-end">
        <Button onClick={onComplete} className="font-bold text-xs sm:text-sm h-10 px-6 gap-2">
          Continue to Practice
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export function PracticeCard({
  practice,
  onComplete,
}: {
  practice: any;
  onComplete: (extra?: { practiceAnswerId?: string; isCorrect?: boolean }) => void;
}) {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const options: Array<{ id: string; text: string }> = Array.isArray(practice.options)
    ? practice.options
    : [];

  const correctAnswerId = practice.correctAnswer?.id || practice.correctAnswer;
  const isCorrect = selectedOptionId === correctAnswerId;

  const handleSubmit = () => {
    if (!selectedOptionId) return;
    setSubmitted(true);
  };

  const handleContinue = () => {
    onComplete({
      practiceAnswerId: selectedOptionId || undefined,
      isCorrect,
    });
  };

  return (
    <div className="p-6 sm:p-7 border border-border/70 rounded-3xl shadow-sm bg-card space-y-6">
      <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 uppercase tracking-wider">
        <Code2 className="w-4 h-4" />
        Step 2 · Targeted Practice
      </div>

      <div className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-foreground leading-relaxed">
          {practice.question}
        </h2>
      </div>

      <div className="space-y-2.5">
        {options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          let buttonStyle = 'border-border/60 hover:border-primary/40 bg-card';

          if (submitted) {
            if (opt.id === correctAnswerId) {
              buttonStyle = 'border-emerald-500 bg-emerald-500/10 text-emerald-500 font-bold';
            } else if (isSelected) {
              buttonStyle = 'border-red-500 bg-red-500/10 text-red-500 font-bold';
            } else {
              buttonStyle = 'opacity-60 border-border/40';
            }
          } else if (isSelected) {
            buttonStyle = 'border-primary bg-primary/10 text-primary font-bold';
          }

          return (
            <button
              key={opt.id}
              disabled={submitted}
              onClick={() => setSelectedOptionId(opt.id)}
              className={`w-full text-left p-3.5 sm:p-4 border rounded-2xl transition-all flex items-start gap-3 text-xs sm:text-sm ${buttonStyle}`}
            >
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs ${isSelected ? 'border-primary bg-primary text-primary-foreground font-bold' : 'border-muted-foreground/40'
                  }`}
              >
                {opt.id.toUpperCase()}
              </div>
              <span className="flex-1 font-medium">{opt.text}</span>
            </button>
          );
        })}
      </div>

      {submitted && (
        <div
          className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-1.5 animate-in fade-in duration-300 ${isCorrect
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
              : 'bg-amber-500/10 border-amber-500/20 text-amber-500'
            }`}
        >
          <div className="font-bold flex items-center gap-2">
            {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {isCorrect ? 'Correct! Excellent problem solving.' : 'Review Explanation:'}
          </div>
          <p className="text-foreground/80 leading-relaxed font-normal pt-1">
            {practice.explanation || 'Review the algorithmic traversal pattern.'}
          </p>
        </div>
      )}

      <div className="pt-2 flex justify-end gap-3">
        {!submitted ? (
          <Button
            onClick={handleSubmit}
            disabled={!selectedOptionId}
            className="font-bold text-xs sm:text-sm h-10 px-6"
          >
            Submit Answer
          </Button>
        ) : (
          <Button onClick={handleContinue} className="font-bold text-xs sm:text-sm h-10 px-6 gap-2">
            Continue to Review
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

export function ReviewCard({
  reviewData,
  onComplete,
}: {
  reviewData: any;
  onComplete: () => void;
}) {
  const pitfalls: string[] = reviewData?.pitfalls || [
    'Off-by-one errors when adjusting pointer bounds.',
    'Missing handling for empty or single-element inputs.',
    'Assumes sorted input without verification.',
  ];

  const edgeCases: string[] = reviewData?.edgeCases || [
    'Boundary indices: start and end of array.',
    'Inputs with negative values or duplicate numbers.',
  ];

  return (
    <div className="p-6 sm:p-7 border border-border/70 rounded-3xl shadow-sm bg-card space-y-6">
      <div className="flex items-center gap-2 text-xs font-bold text-amber-500 uppercase tracking-wider">
        <RotateCcw className="w-4 h-4" />
        Step 3 · Pitfalls & Edge Cases
      </div>

      <div>
        <h2 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
          {reviewData?.title || 'Review & Mistake Prevention'}
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Review these standard edge cases to avoid silent failures in placement evaluations.
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-4 rounded-2xl bg-muted/20 border border-border/50 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5" /> Common Pitfalls
          </h4>
          <ul className="list-disc list-inside text-xs sm:text-sm text-foreground/90 space-y-1.5 font-medium">
            {pitfalls.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>

        <div className="p-4 rounded-2xl bg-muted/20 border border-border/50 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" /> Key Edge Cases
          </h4>
          <ul className="list-disc list-inside text-xs sm:text-sm text-foreground/90 space-y-1.5 font-medium">
            {edgeCases.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>

        {reviewData?.keyTakeaway && (
          <div className="p-3.5 rounded-2xl bg-primary/10 border border-primary/20 text-xs sm:text-sm text-foreground">
            <strong className="text-primary block font-bold mb-0.5">Key Takeaway:</strong>
            {reviewData.keyTakeaway}
          </div>
        )}
      </div>

      <div className="pt-2 flex justify-end">
        <Button onClick={onComplete} className="font-bold text-xs sm:text-sm h-10 px-6 gap-2">
          Continue to Interview
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export function InterviewCard({
  interviewData,
  onSubmit,
}: {
  interviewData: any;
  onSubmit: (notes: string) => void;
}) {
  const [notes, setNotes] = useState('');

  const keyPoints: string[] = interviewData?.keyPoints || [
    'Articulate space-time complexity trade-offs clearly.',
    'Mention memory allocation differences.',
    'Explain how to handle edge conditions.',
  ];

  return (
    <div className="p-6 sm:p-7 border border-border/70 rounded-3xl shadow-sm bg-card space-y-6">
      <div className="flex items-center gap-2 text-xs font-bold text-purple-500 uppercase tracking-wider">
        <Mic2 className="w-4 h-4" />
        Step 4 · Technical Interview Viva
      </div>

      <div>
        <h2 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
          {interviewData?.title || 'Technical Viva & Complexity Trade-off'}
        </h2>
        <p className="text-xs sm:text-sm text-foreground/90 font-semibold mt-2 leading-relaxed bg-muted/20 p-4 rounded-2xl border border-border/50">
          "{interviewData?.question || 'Explain how you would optimize this algorithm for constrained memory systems.'}"
        </p>
      </div>

      {interviewData?.hint && (
        <div className="text-xs text-muted-foreground flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <span><strong>Hint:</strong> {interviewData.hint}</span>
        </div>
      )}

      <div className="space-y-2">
        <label className="text-xs font-bold text-foreground block">
          Your Explanation / Key Takeaways:
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Briefly articulate your reasoning (e.g. why Two Pointers saves space compared to Hash Map)..."
          rows={4}
          className="w-full rounded-2xl border border-border/60 bg-muted/10 p-3.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      <div className="p-4 rounded-2xl bg-muted/20 border border-border/40 space-y-1.5 text-xs">
        <span className="font-bold text-foreground">Points Interviewers Look For:</span>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          {keyPoints.map((kp, i) => (
            <li key={i}>{kp}</li>
          ))}
        </ul>
      </div>

      <div className="pt-2 flex justify-end">
        <Button
          onClick={() => onSubmit(notes)}
          className="font-bold text-xs sm:text-sm h-10 px-6 gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          Complete Mission
          <CheckCircle2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export function CompletionDialog({ xp }: { xp: number }) {
  return (
    <div className="p-8 sm:p-10 text-center border border-emerald-500/30 rounded-3xl bg-emerald-500/10 shadow-lg space-y-6 animate-in zoom-in-95 duration-400">
      <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md shadow-emerald-500/20">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">Mission Completed!</h2>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
          You earned <strong className="text-emerald-500">+{xp} XP</strong> and recorded real concept mastery progress on your placement learning path.
        </p>
      </div>

      <div className="flex justify-center gap-3 pt-2">
        <Link href="/dashboard">
          <Button size="lg" className="font-bold text-xs sm:text-sm gap-2 h-11 px-8 shadow-md">
            <Home className="w-4 h-4" />
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
