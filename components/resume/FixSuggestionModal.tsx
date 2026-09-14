'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Sparkles, Copy, Check, ArrowRight, Lightbulb } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { ImprovementSuggestion } from '@/types/resume';

interface FixSuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  suggestion: ImprovementSuggestion | null;
  onApplyChange?: (suggestedText: string) => void;
}

export function FixSuggestionModal({
  isOpen,
  onClose,
  suggestion,
  onApplyChange,
}: FixSuggestionModalProps) {
  const [loading, setLoading] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [applied, setApplied] = React.useState(false);
  const [fixData, setFixData] = React.useState<{
    original: string;
    suggested: string;
    explanation: string;
  } | null>(null);

  React.useEffect(() => {
    if (!isOpen || !suggestion) {
      setFixData(null);
      setApplied(false);
      setCopied(false);
      return;
    }

    let isMounted = true;
    const fetchFix = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/resume/fix-suggestion', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            suggestionTitle: suggestion.title,
            explanation: suggestion.explanation,
            sectionName: 'Work Experience',
          }),
        });

        if (!res.ok) throw new Error('Failed to generate fix');
        const json = await res.json();
        if (isMounted && json.data) {
          setFixData(json.data);
        }
      } catch (err) {
        if (isMounted) {
          toast.error('Failed to generate AI improvement. Please try again.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchFix();

    return () => {
      isMounted = false;
    };
  }, [isOpen, suggestion]);

  const handleCopy = () => {
    if (!fixData?.suggested) return;
    navigator.clipboard.writeText(fixData.suggested);
    setCopied(true);
    toast.success('Copied improved text to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApply = () => {
    if (!fixData?.suggested) return;
    if (onApplyChange) {
      onApplyChange(fixData.suggested);
    }
    setApplied(true);
    toast.success('Suggestion accepted!');
    setTimeout(() => {
      onClose();
    }, 800);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl bg-card border-border/60 p-6 rounded-2xl shadow-xl">
        <DialogHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-extrabold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              AI Fix Suggestion
            </DialogTitle>
            {suggestion && (
              <Badge
                variant="secondary"
                className={cn(
                  'uppercase text-[10px] font-black tracking-wider px-2 py-0.5',
                  suggestion.priority === 'high'
                    ? 'bg-red-500/10 text-red-500 border-red-500/20'
                    : suggestion.priority === 'medium'
                    ? 'bg-orange-500/10 text-orange-500 border-orange-500/20'
                    : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                )}
              >
                {suggestion.priority} Priority
              </Badge>
            )}
          </div>
          <DialogDescription className="text-xs text-muted-foreground">
            {suggestion?.title}: {suggestion?.explanation}
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
            <p className="text-xs font-semibold text-muted-foreground animate-pulse">
              Gemini is crafting an evidence-based improvement...
            </p>
          </div>
        ) : fixData ? (
          <div className="space-y-4 my-2">
            {/* Original vs Suggested Comparison */}
            <div className="space-y-3">
              {/* Original */}
              <div className="p-3.5 rounded-xl border border-border/40 bg-muted/10 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                  Original Phrasing
                </span>
                <p className="text-xs text-muted-foreground font-medium italic">
                  "{fixData.original}"
                </p>
              </div>

              {/* AI Suggested */}
              <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-2 relative">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> AI Suggested Replacement
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    ATS Optimized
                  </span>
                </div>
                <p className="text-xs text-foreground font-semibold leading-relaxed">
                  "{fixData.suggested}"
                </p>
                <p className="text-[11px] text-muted-foreground italic">
                  Note: Fill in any bracketed placeholders like{' '}
                  <span className="text-primary font-bold">[metric]</span> with your genuine numbers.
                </p>
              </div>

              {/* Rationale */}
              {fixData.explanation && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-card border border-border/40 text-[11px] text-muted-foreground">
                  <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-foreground">Why this helps:</strong> {fixData.explanation}
                  </span>
                </div>
              )}
            </div>

            {/* Guidance Callout */}
            <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/20 text-[11px] text-muted-foreground flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <span>
                <strong className="text-foreground">Next Step:</strong> Copy this phrasing into your source resume file (Word, Docs, or LaTeX), replace any bracketed placeholders with your genuine achievements, then use <strong className="text-foreground">Replace</strong> on the dashboard to re-analyze.
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-border/40">
              <Button variant="outline" size="sm" onClick={onClose} className="text-xs font-semibold">
                Close
              </Button>
              
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" onClick={handleCopy} className="text-xs font-bold shadow-sm">
                  {copied ? <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 mr-1.5" />}
                  {copied ? 'Copied to Clipboard' : 'Copy Improved Phrasing'}
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleApply}
                  disabled={applied}
                  className="text-xs font-bold"
                >
                  {applied ? (
                    <>
                      <Check className="w-3.5 h-3.5 mr-1.5 text-white" /> Marked as Reviewed
                    </>
                  ) : (
                    <>
                      Mark as Reviewed <Check className="w-3.5 h-3.5 ml-1.5" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-muted-foreground">
            Could not load suggestion. Please close and try again.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
