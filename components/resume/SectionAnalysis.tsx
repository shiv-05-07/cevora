import { SectionAnalysis as SectionAnalysisType } from '@/types/resume';
import { Layers, CheckCircle2, AlertCircle, XCircle, ArrowRight } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { cn } from '@/lib/utils';

export function SectionAnalysis({ sections }: { sections: SectionAnalysisType[] }) {
  return (
    <div className="border border-border/60 rounded-2xl bg-card shadow-sm p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm font-bold text-foreground/80">
        <Layers className="w-4 h-4" />
        Section Analysis
      </div>

      <Accordion className="w-full space-y-3">
        {sections.map((section, idx) => (
          <AccordionItem 
            key={idx} 
            value={`section-${idx}`} 
            className="border border-border/40 rounded-xl bg-card overflow-hidden data-[state=open]:border-primary/30"
          >
            <AccordionTrigger className="px-4 py-3 hover:bg-muted/30 hover:no-underline">
              <div className="flex items-center justify-between w-full pr-4">
                <span className="font-bold text-sm">{section.name}</span>
                <div className="flex items-center gap-4">
                  <span className={cn(
                    "text-xs font-black",
                    section.score >= 90 ? "text-emerald-500" : section.score >= 70 ? "text-orange-500" : "text-red-500"
                  )}>
                    {section.score}%
                  </span>
                  <StatusBadge 
                    status={
                      section.status === 'excellent' ? 'success' : 
                      section.status === 'good' ? 'warning' : 'danger'
                    }
                  >
                    {section.status.replace('-', ' ')}
                  </StatusBadge>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2 space-y-5 border-t border-border/10 bg-muted/5">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Strengths */}
                {section.strengths.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[11px] uppercase font-bold text-emerald-500 tracking-wider">Strengths</span>
                    <ul className="space-y-2">
                      {section.strengths.map((str, i) => (
                        <li key={i} className="flex gap-2 text-sm font-medium text-foreground/90 leading-tight">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Weaknesses */}
                {section.weaknesses && section.weaknesses.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[11px] uppercase font-bold text-red-500 tracking-wider">Problems</span>
                    <ul className="space-y-2">
                      {section.weaknesses.map((weak, i) => (
                        <li key={i} className="flex gap-2 text-sm font-medium text-foreground/90 leading-tight">
                          <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                          <span>{weak}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Suggestions */}
              {section.suggestions.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-border/30">
                  <span className="text-[11px] uppercase font-bold text-orange-500 tracking-wider">Recommendations</span>
                  <ul className="space-y-2">
                    {section.suggestions.map((sug, i) => (
                      <li key={i} className="flex gap-2 text-sm font-medium text-foreground/90 leading-tight">
                        <AlertCircle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                        <span>{sug}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Before/After Example */}
              {section.beforeExample && section.afterExample && (
                <div className="pt-4 border-t border-border/30">
                  <span className="text-[11px] uppercase font-bold text-primary tracking-wider mb-2 block">Example Improvement</span>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <div className="p-3 bg-red-500/5 border border-red-500/20 rounded-lg space-y-1 relative">
                      <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">Before</span>
                      <p className="text-xs text-foreground/80 font-medium italic">"{section.beforeExample}"</p>
                      <ArrowRight className="w-4 h-4 text-muted-foreground absolute -right-3 top-1/2 -translate-y-1/2 z-10 hidden lg:block bg-muted/5 rounded-full" />
                    </div>
                    <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-lg space-y-1">
                      <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">After</span>
                      <p className="text-xs text-foreground/80 font-medium">"{section.afterExample}"</p>
                    </div>
                  </div>
                </div>
              )}
              
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
