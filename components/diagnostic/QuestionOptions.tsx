'use client';

import React from 'react';
import { DiagnosticQuestionOption } from '@/features/diagnostic/types';
import { cn } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';

interface QuestionOptionsProps {
  options: DiagnosticQuestionOption[];
  selectedOptionId: string | null;
  onSelect: (optionId: string) => void;
  disabled?: boolean;
}

export function QuestionOptions({
  options,
  selectedOptionId,
  onSelect,
  disabled = false
}: QuestionOptionsProps) {
  return (
    <div className="grid grid-cols-1 gap-3">
      {options.map((opt) => {
        const isSelected = selectedOptionId === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(opt.id)}
            className={cn(
              "w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-3.5 group relative cursor-pointer",
              isSelected
                ? "bg-primary/10 border-primary shadow-sm text-foreground ring-2 ring-primary/30"
                : "bg-card hover:bg-muted/40 border-border/60 text-foreground hover:border-border"
            )}
          >
            <div
              className={cn(
                "w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors",
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground group-hover:bg-muted-foreground/20 group-hover:text-foreground"
              )}
            >
              {opt.id}
            </div>

            <div className="flex-1 pt-0.5 font-medium text-sm leading-relaxed">
              {opt.text}
            </div>

            {isSelected && (
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 self-center" />
            )}
          </button>
        );
      })}
    </div>
  );
}
