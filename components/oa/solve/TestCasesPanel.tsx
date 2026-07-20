'use client';

import * as React from 'react';
import { Terminal, CheckCircle2, XCircle, ChevronUp, ChevronDown, List, Code2, Loader2, Play } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import type { TestCase } from './mockProblems';
import { JudgeStatus, RunResult, SubmitResult, ConsoleLog } from '@/types/judge';

interface TestCasesPanelProps {
  testCases: TestCase[];
  status: JudgeStatus;
  lastAction: 'run' | 'submit' | null;
  logs: ConsoleLog[];
  runResult: RunResult | null;
  submitResult: SubmitResult | null;
  progress: { current: number; total: number } | null;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export function TestCasesPanel({
  testCases,
  status,
  lastAction,
  logs,
  runResult,
  submitResult,
  progress,
  isExpanded,
  onToggleExpand,
}: TestCasesPanelProps) {
  const visibleCases = testCases.filter(tc => !tc.isHidden);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  
  // Auto-scroll console
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  // Determine active tab dynamically based on status
  const [activeTab, setActiveTab] = React.useState('testcases');
  
  React.useEffect(() => {
    if (status === 'Running' || status === 'Submitting') {
      setActiveTab('console');
    } else if (status === 'Completed') {
      setActiveTab('testcases');
    }
  }, [status]);

  return (
    <div className="flex flex-col h-full bg-card relative">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/60 bg-muted/20 shrink-0">
        <div className="flex items-center gap-2 text-sm font-bold text-foreground/80">
          <Terminal className="w-4 h-4" />
          Test Cases
        </div>
        <div className="flex items-center gap-2">
          {status !== 'Idle' && status !== 'Completed' && progress && status === 'Running' && (
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mr-4">
              <Loader2 className="w-3 h-3 animate-spin" />
              <span>Running Sample Testcases</span>
              <div className="flex w-24 h-1.5 bg-muted rounded-full overflow-hidden mx-1 border border-border/40">
                 <div className="h-full bg-primary transition-all duration-300" style={{ width: `${(progress.current / progress.total) * 100}%` }} />
              </div>
              <span className="text-primary font-bold">Case {progress.current} / {progress.total}</span>
            </div>
          )}
          {status === 'Submitting' && (
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mr-4">
              <Loader2 className="w-3 h-3 animate-spin" />
              <span className="text-primary font-bold">Evaluating...</span>
            </div>
          )}
          <Button variant="ghost" size="icon-xs" onClick={onToggleExpand} className="text-muted-foreground">
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      <div className={cn("flex-1 min-h-0 flex flex-col", !isExpanded && "hidden")}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
          <div className="px-4 pt-2 border-b border-border/60 flex items-center justify-between">
            <TabsList className="h-8 bg-transparent p-0 gap-4 mb-[-1px]">
              <TabsTrigger 
                value="testcases"
                className="data-[state=active]:bg-card data-[state=active]:border-border/60 data-[state=active]:border-b-card border border-transparent border-b-0 rounded-t-md rounded-b-none px-4 py-1.5 text-xs font-medium text-muted-foreground data-[state=active]:text-foreground relative z-10 flex items-center gap-2"
              >
                <List className="w-3.5 h-3.5" />
                Test Cases Result
              </TabsTrigger>
              <TabsTrigger 
                value="console"
                className="data-[state=active]:bg-card data-[state=active]:border-border/60 data-[state=active]:border-b-card border border-transparent border-b-0 rounded-t-md rounded-b-none px-4 py-1.5 text-xs font-medium text-muted-foreground data-[state=active]:text-foreground relative z-10 flex items-center gap-2"
              >
                <Code2 className="w-3.5 h-3.5" />
                Console
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="flex-1 min-h-0 bg-card relative">
            
            {/* CONSOLE TAB */}
            <TabsContent value="console" className="m-0 h-full p-4 overflow-y-auto font-mono text-xs text-foreground/80" ref={scrollRef}>
              {logs.length === 0 ? (
                <div className="text-muted-foreground italic">No output yet. Run or Submit your code.</div>
              ) : (
                <div className="space-y-1.5 pb-4">
                  {logs.map((log) => (
                    <div key={log.id} className="flex gap-3">
                      <span className="text-muted-foreground/50 select-none">[{log.timestamp.toLocaleTimeString([], { hour12: false })}]</span>
                      <span className={cn(
                        log.message.includes('✓') && "text-emerald-500",
                        log.message.includes('✗') && "text-red-500",
                        log.message.includes('Error') && "text-red-500"
                      )}>{log.message}</span>
                    </div>
                  ))}
                  {(status === 'Running' || status === 'Submitting') && (
                    <div className="flex gap-3 text-muted-foreground animate-pulse">
                      <span>...</span>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>

            {/* TESTCASES TAB */}
            <TabsContent value="testcases" className="m-0 h-full flex flex-col">
              
              {/* SUBMIT RESULT VIEW */}
              {(lastAction === 'submit' && submitResult) ? (
                <ScrollArea className="h-full">
                  <div className="p-6 space-y-6">
                    <h2 className={cn(
                      "text-3xl font-extrabold tracking-tight",
                      submitResult.status === 'Accepted' ? "text-emerald-500" : "text-red-500"
                    )}>
                      {submitResult.status}
                    </h2>
                    
                    <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                      {submitResult.status === 'Accepted' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                      <span>{submitResult.passedCount} / {submitResult.totalCount} Testcases Passed</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl border border-border/40 bg-muted/10 space-y-2">
                        <span className="text-xs font-bold text-muted-foreground uppercase">Runtime</span>
                        <div className="text-xl font-bold">{submitResult.runtime}</div>
                        <div className="text-sm font-semibold text-emerald-500">Beats {submitResult.runtimeBeats}%</div>
                      </div>
                      <div className="p-4 rounded-xl border border-border/40 bg-muted/10 space-y-2">
                        <span className="text-xs font-bold text-muted-foreground uppercase">Memory</span>
                        <div className="text-xl font-bold">{submitResult.memory}</div>
                        <div className="text-sm font-semibold text-emerald-500">Beats {submitResult.memoryBeats}%</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-4 border-t border-border/40 text-sm font-medium text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span>Language:</span>
                        <span className="text-foreground capitalize">{submitResult.language}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>Submitted:</span>
                        <span className="text-foreground">{submitResult.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              ) 
              
              /* RUN RESULT VIEW */
              : (lastAction === 'run' && runResult) ? (
                <div className="h-full flex flex-col">
                  {/* Summary Header */}
                  <div className="p-4 border-b border-border/40 bg-muted/5 flex items-center justify-between shrink-0">
                    <div>
                      <h3 className={cn(
                        "text-xl font-extrabold",
                        runResult.status === 'Accepted' ? "text-emerald-500" : "text-red-500"
                      )}>
                        {runResult.status}
                      </h3>
                      <p className="text-sm font-medium text-muted-foreground mt-1 flex gap-2">
                        <span>Passed</span>
                        <span className="text-foreground">{runResult.passedCount} / {runResult.totalCount} Testcases</span>
                        {runResult.status === 'Wrong Answer' && runResult.failedOnCase && (
                           <span className="text-red-400 ml-2">Failed on Case {runResult.failedOnCase}</span>
                        )}
                      </p>
                    </div>
                    <div className="text-right text-sm flex gap-4">
                      <div className="font-bold text-muted-foreground flex flex-col items-end">
                        <span className="text-[10px] uppercase">Runtime</span>
                        <span className="text-foreground">{runResult.runtime}</span>
                      </div>
                      <div className="font-bold text-muted-foreground flex flex-col items-end">
                         <span className="text-[10px] uppercase">Memory</span>
                         <span className="text-foreground">{runResult.memory}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Detailed Accordion */}
                  <ScrollArea className="flex-1">
                    <Accordion className="p-4 space-y-3">
                      {runResult.testCases.map((tc, idx) => (
                        <AccordionItem key={tc.id} value={`case-${idx + 1}`} className="border border-border/40 rounded-xl bg-card overflow-hidden data-[state=open]:border-primary/30">
                          <AccordionTrigger className="px-4 py-3 hover:bg-muted/30 hover:no-underline">
                            <div className="flex items-center gap-3">
                              {tc.status === 'Accepted' ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                              ) : (
                                <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                              )}
                              <span className="font-bold text-sm">Case {idx + 1}</span>
                              <span className={cn(
                                "text-xs font-semibold ml-2",
                                tc.status === 'Accepted' ? "text-emerald-500" : "text-red-500"
                              )}>
                                {tc.status}
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-4 pt-1 space-y-4">
                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-muted-foreground">Input</label>
                              <div className="bg-muted/30 font-mono text-xs p-3 rounded-md border border-border/40 text-foreground">
                                {tc.input.split('\n').map((line, i) => (
                                  <div key={i}>{line}</div>
                                ))}
                              </div>
                            </div>
                            
                            {tc.status === 'Wrong Answer' ? (
                              <>
                                <div className="space-y-1.5">
                                  <label className="text-xs font-semibold text-emerald-500">Expected</label>
                                  <div className="bg-emerald-500/10 font-mono text-xs p-3 rounded-md border border-emerald-500/20 text-emerald-400">
                                    {tc.expectedOutput}
                                  </div>
                                </div>
                                <div className="space-y-1.5">
                                  <label className="text-xs font-semibold text-red-400">Received</label>
                                  <div className="bg-red-500/10 font-mono text-xs p-3 rounded-md border border-red-500/20 text-red-400">
                                    {tc.actualOutput}
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-muted-foreground">Expected Output</label>
                                <div className="bg-muted/30 font-mono text-xs p-3 rounded-md border border-border/40 text-foreground">
                                  {tc.expectedOutput}
                                </div>
                              </div>
                            )}

                            <div className="flex gap-4 pt-2">
                                <span className="text-xs font-semibold text-muted-foreground">Runtime: <span className="text-foreground">{tc.runtime}</span></span>
                                <span className="text-xs font-semibold text-muted-foreground">Memory: <span className="text-foreground">{tc.memory}</span></span>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </ScrollArea>
                </div>
              ) 
              
              /* IDLE VIEW */
              : (
                <div className="h-full flex flex-col">
                   <Tabs defaultValue="idle-case-0" className="flex flex-col h-full">
                    <div className="px-4 pt-2 border-b border-border/60">
                      <TabsList className="h-8 bg-transparent p-0 gap-2 mb-[-1px]">
                        {visibleCases.map((tc, idx) => (
                          <TabsTrigger 
                            key={tc.id} 
                            value={`idle-case-${idx}`}
                            className="data-[state=active]:bg-muted/30 data-[state=active]:border-border/60 data-[state=active]:border-b-transparent border border-transparent border-b-0 rounded-t-md rounded-b-none px-4 py-1.5 text-xs font-medium text-muted-foreground data-[state=active]:text-foreground relative z-10"
                          >
                            Case {idx + 1}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </div>
                    
                    <div className="flex-1 min-h-0">
                      <ScrollArea className="h-full">
                        {visibleCases.map((tc, idx) => (
                          <TabsContent key={tc.id} value={`idle-case-${idx}`} className="m-0 p-4 space-y-4">
                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-muted-foreground">Input</label>
                              <div className="bg-muted/20 font-mono text-xs p-3 rounded-md border border-border/40 text-foreground">
                                {tc.input.split('\n').map((line, i) => (
                                  <div key={i}>{line}</div>
                                ))}
                              </div>
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-muted-foreground">Expected Output</label>
                              <div className="bg-muted/20 font-mono text-xs p-3 rounded-md border border-border/40 text-foreground">
                                {tc.expectedOutput}
                              </div>
                            </div>
                          </TabsContent>
                        ))}
                      </ScrollArea>
                    </div>
                  </Tabs>
                </div>
              )}
            </TabsContent>

          </div>
        </Tabs>
      </div>
    </div>
  );
}
