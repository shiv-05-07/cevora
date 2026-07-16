'use client';

import * as React from 'react';
import { Terminal, CheckCircle2, XCircle, ChevronUp, ChevronDown } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { TestCase } from './mockProblems';

interface TestCasesPanelProps {
  testCases: TestCase[];
  executionResult: any; // Simplified for mockup
  onClearResult: () => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export function TestCasesPanel({
  testCases,
  executionResult,
  onClearResult,
  isExpanded,
  onToggleExpand,
}: TestCasesPanelProps) {
  const visibleCases = testCases.filter(tc => !tc.isHidden);

  return (
    <div className="flex flex-col h-full bg-card">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/60 bg-muted/20">
        <div className="flex items-center gap-2 text-sm font-bold text-foreground/80">
          <Terminal className="w-4 h-4" />
          Test Cases
        </div>
        <Button variant="ghost" size="icon-xs" onClick={onToggleExpand} className="text-muted-foreground">
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </Button>
      </div>

      <div className={cn("flex-1 min-h-0", !isExpanded && "hidden")}>
        {executionResult ? (
          <div className="h-full flex flex-col">
            <div className="p-3 border-b border-border/60 bg-muted/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {executionResult.status === 'Accepted' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500" />
                )}
                <span className={cn(
                  "font-bold text-sm",
                  executionResult.status === 'Accepted' ? "text-emerald-500" : "text-red-500"
                )}>
                  {executionResult.status}
                </span>
                <span className="text-xs text-muted-foreground ml-2">
                  Runtime: {executionResult.runtime} • Memory: {executionResult.memory}
                </span>
              </div>
              <Button variant="ghost" size="xs" onClick={onClearResult} className="text-xs">
                Clear Result
              </Button>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {visibleCases.map((tc, idx) => (
                  <div key={tc.id} className="space-y-2">
                    <h4 className="text-xs font-semibold text-muted-foreground">Case {idx + 1}</h4>
                    <div className="space-y-1">
                      <div className="text-[11px] text-muted-foreground">Input:</div>
                      <div className="bg-muted/40 font-mono text-xs p-2 rounded border border-border/50 text-foreground">
                        {tc.input}
                      </div>
                    </div>
                    {executionResult.status !== 'Accepted' && idx === 0 && ( // Just mock failing on first for WRONG ANSWER
                      <>
                        <div className="space-y-1 mt-2">
                          <div className="text-[11px] text-muted-foreground">Output:</div>
                          <div className="bg-red-500/10 font-mono text-xs p-2 rounded border border-red-500/20 text-red-400">
                            {executionResult.output || 'null'}
                          </div>
                        </div>
                        <div className="space-y-1 mt-2">
                          <div className="text-[11px] text-muted-foreground">Expected:</div>
                          <div className="bg-emerald-500/10 font-mono text-xs p-2 rounded border border-emerald-500/20 text-emerald-400">
                            {tc.expectedOutput}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        ) : (
          <Tabs defaultValue="case-0" className="flex flex-col h-full">
            <div className="px-4 pt-2 border-b border-border/60">
              <TabsList className="h-8 bg-transparent p-0 gap-2 mb-[-1px]">
                {visibleCases.map((tc, idx) => (
                  <TabsTrigger 
                    key={tc.id} 
                    value={`case-${idx}`}
                    className="data-[state=active]:bg-card data-[state=active]:border-border/60 data-[state=active]:border-b-card border border-transparent border-b-0 rounded-t-md rounded-b-none px-4 py-1.5 text-xs font-medium text-muted-foreground data-[state=active]:text-foreground relative z-10"
                  >
                    Case {idx + 1}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            <div className="flex-1 min-h-0 bg-card">
              <ScrollArea className="h-full">
                {visibleCases.map((tc, idx) => (
                  <TabsContent key={tc.id} value={`case-${idx}`} className="m-0 p-4 space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground">Input</label>
                      <div className="bg-muted/30 font-mono text-xs p-3 rounded-md border border-border/40 text-foreground">
                        {tc.input.split('\n').map((line, i) => (
                          <div key={i}>{line}</div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground">Expected Output</label>
                      <div className="bg-muted/30 font-mono text-xs p-3 rounded-md border border-border/40 text-foreground">
                        {tc.expectedOutput}
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </ScrollArea>
            </div>
          </Tabs>
        )}
      </div>
    </div>
  );
}
