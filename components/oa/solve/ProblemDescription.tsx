import * as React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Building2, Lightbulb, History, FileText } from 'lucide-react';
import type { Problem } from './mockProblems';

interface ProblemDescriptionProps {
  problem: Problem;
}

export function ProblemDescription({ problem }: ProblemDescriptionProps) {
  return (
    <div className="flex flex-col h-full bg-card border-r border-border/60">
      <Tabs defaultValue="description" className="flex-1 flex flex-col min-h-0">
        <TabsList className="h-10 justify-start rounded-none border-b border-border/60 bg-transparent px-4 py-0 shrink-0 space-x-4">
          <TabsTrigger 
            value="description" 
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-1 py-2 text-xs font-semibold"
          >
            <FileText className="w-3.5 h-3.5 mr-1.5" /> Description
          </TabsTrigger>
          <TabsTrigger 
            value="hints" 
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-1 py-2 text-xs font-semibold"
          >
            <Lightbulb className="w-3.5 h-3.5 mr-1.5" /> Hints
          </TabsTrigger>
          <TabsTrigger 
            value="submissions" 
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-1 py-2 text-xs font-semibold"
          >
            <History className="w-3.5 h-3.5 mr-1.5" /> Submissions
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="description" className="flex-1 overflow-hidden m-0 data-[state=active]:flex flex-col">
          <ScrollArea className="h-full">
            <div className="p-5 space-y-6">
              
              {/* Description Body */}
              <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-muted/50 prose-pre:text-foreground">
                {problem.description.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-[13px] text-foreground/90">{paragraph}</p>
                ))}
              </div>

              {/* Company Tags */}
              {problem.companyTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {problem.companyTags.map(tag => (
                    <span key={tag} className="inline-flex items-center px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-[10px] font-semibold">
                      <Building2 className="w-3 h-3 mr-1" /> {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Examples */}
              <div className="space-y-4 pt-4">
                <h3 className="font-bold text-sm tracking-tight text-foreground">Examples</h3>
                <div className="space-y-4">
                  {problem.examples.map((ex, idx) => (
                    <div key={idx} className="bg-muted/30 border border-border/40 rounded-lg p-3 space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground">Example {idx + 1}:</p>
                      <div className="font-mono text-xs text-foreground bg-background rounded p-2">
                        <div className="mb-1"><span className="text-muted-foreground select-none">Input: </span> {ex.input}</div>
                        <div><span className="text-muted-foreground select-none">Output: </span> {ex.output}</div>
                        {ex.explanation && (
                          <div className="mt-2 text-muted-foreground/80 font-sans leading-relaxed">
                            <span className="font-semibold text-muted-foreground select-none">Explanation: </span> {ex.explanation}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Constraints */}
              <div className="space-y-3 pt-4 pb-4">
                <h3 className="font-bold text-sm tracking-tight text-foreground">Constraints</h3>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted-foreground">
                  {problem.constraints.map((constraint, idx) => (
                    <li key={idx} className="font-mono bg-muted/30 rounded px-1.5 py-0.5 inline-block my-0.5">
                      {constraint.replace(/`/g, '')}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="hints" className="flex-1 p-5 text-sm text-muted-foreground m-0">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex gap-3">
            <Lightbulb className="w-5 h-5 text-primary shrink-0" />
            <p className="text-sm">Try to think about how you could solve this using a dynamic programming approach, keeping track of the current sequence sum.</p>
          </div>
        </TabsContent>

        <TabsContent value="submissions" className="flex-1 p-5 text-sm text-muted-foreground m-0 text-center flex flex-col items-center justify-center h-full">
          <History className="w-8 h-8 text-muted-foreground/30 mb-3" />
          <p>No past submissions found.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
