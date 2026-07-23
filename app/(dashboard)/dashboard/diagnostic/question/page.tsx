'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDiagnosticStore } from '@/store/useDiagnosticStore';
import { DiagnosticProgress } from '@/components/diagnostic/DiagnosticProgress';
import { QuestionCard } from '@/components/diagnostic/QuestionCard';
import { QuestionOptions } from '@/components/diagnostic/QuestionOptions';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { DiagnosticStatus } from '@prisma/client';

export default function DiagnosticQuestionPage() {
  const router = useRouter();
  const {
    status,
    questions,
    currentIndex,
    answers,
    timeSpent,
    selectAnswer,
    recordTimeTaken,
    nextQuestion,
    prevQuestion,
    submitCurrentAnswer,
    finishDiagnostic,
    isSubmitting,
    isLoading,
    isFinishing
  } = useDiagnosticStore();

  const [elapsed, setElapsed] = useState(0);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed(prev => prev + 1);
      const currentQ = questions[currentIndex];
      if (currentQ) {
        recordTimeTaken(currentQ.id, 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [questions, currentIndex, recordTimeTaken]);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const selectedAnswerId = currentQuestion ? answers[currentQuestion.id] || null : null;

  const handleSelectOption = (optionId: string) => {
    if (currentQuestion) {
      selectAnswer(currentQuestion.id, optionId);
    }
  };

  const handleNext = async () => {
    console.log(`[Diagnostic] handleNext triggered.`);
    console.log(`[Diagnostic] Current Index: ${currentIndex}, Total Questions: ${questions.length}`);
    console.log(`[Diagnostic] isLastQuestion evaluated as: ${isLastQuestion}`);

    await submitCurrentAnswer();
    
    if (isLastQuestion) {
      console.log(`[Diagnostic] isLastQuestion is true, invoking finishDiagnostic()...`);
      const summary = await finishDiagnostic();
      console.log(`[Diagnostic] finishDiagnostic returned summary:`, !!summary);
      if (summary) {
        console.log(`[Diagnostic] Redirecting to result page...`);
        router.replace('/dashboard/diagnostic/result');
      }
    } else {
      console.log(`[Diagnostic] isLastQuestion is false, invoking nextQuestion()...`);
      nextQuestion();
    }
  };

  useEffect(() => {
    if (status === DiagnosticStatus.LOCKED || status === DiagnosticStatus.COMPLETED) {
      console.log(`[Diagnostic] Status is ${status}, redirecting to result...`);
      router.replace('/dashboard/diagnostic/result');
    }
  }, [status, router]);

  if (isFinishing) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
        <h3 className="text-xl font-bold text-foreground">Analyzing Your Answers</h3>
        <p className="text-sm font-semibold text-muted-foreground">Generating your AI Diagnostic Report & Knowledge State...</p>
      </div>
    );
  }

  if (isLoading || !currentQuestion) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
        <p className="text-sm font-semibold text-muted-foreground">Preparing adaptive question session...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Top Diagnostic Progress */}
      <DiagnosticProgress
        currentStep={currentIndex + 1}
        totalSteps={questions.length || 15}
        category={currentQuestion.category}
        difficulty={currentQuestion.difficulty}
        timeSpentSeconds={elapsed}
        isAutoSaved={true}
      />

      {/* Main Question Card */}
      <QuestionCard question={currentQuestion} />

      {/* Options Selector */}
      <QuestionOptions
        options={currentQuestion.options}
        selectedOptionId={selectedAnswerId}
        onSelect={handleSelectOption}
        disabled={isSubmitting || isFinishing}
      />

      {/* Footer Navigation Actions */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-border/40">
        <Button
          variant="outline"
          disabled={currentIndex === 0 || isSubmitting || isFinishing}
          onClick={prevQuestion}
          className="font-semibold"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <Button
          disabled={!selectedAnswerId || isSubmitting || isFinishing}
          onClick={handleNext}
          className="font-bold shadow-sm"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : isLastQuestion ? (
            <>
              Finish Assessment
              <CheckCircle2 className="w-4 h-4 ml-2" />
            </>
          ) : (
            <>
              Next Question
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
