'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from '@/components/ui/resizable';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

import { MOCK_PROBLEMS, Problem } from '@/components/oa/solve/mockProblems';
import { SolveHeader } from '@/components/oa/solve/SolveHeader';
import { ProblemDescription } from '@/components/oa/solve/ProblemDescription';
import { CodeEditor } from '@/components/oa/solve/CodeEditor';
import { TestCasesPanel } from '@/components/oa/solve/TestCasesPanel';
import { useJudge } from '@/hooks/useJudge';

export default function SolvePage() {
  const params = useParams();
  const router = useRouter();
  const problemId = params.problemId as string;
  
  const [problem, setProblem] = React.useState<Problem | null>(null);
  const [language, setLanguage] = React.useState('javascript');
  const [code, setCode] = React.useState('');
  
  const [isTestPanelExpanded, setIsTestPanelExpanded] = React.useState(true);
  const { status, lastAction, logs, runResult, submitResult, progress, executeRun, executeSubmit, reset } = useJudge();

  React.useEffect(() => {
    // In a real app, this would fetch from an API
    const prob = MOCK_PROBLEMS[problemId];
    if (prob) {
      setProblem(prob);
      setCode(prob.starterCode.javascript);
    } else {
      // Fallback for random/unknown IDs to maximum-subarray for demo
      setProblem(MOCK_PROBLEMS['maximum-subarray']);
      setCode(MOCK_PROBLEMS['maximum-subarray'].starterCode.javascript);
      toast.info("Problem not found, loading default mock problem");
    }
  }, [problemId]);

  // Update code when language changes
  React.useEffect(() => {
    if (problem) {
      setCode(problem.starterCode[language as keyof typeof problem.starterCode] || '');
      reset();
    }
  }, [language, problem, reset]);

  const handleRun = () => {
    if (!problem) return;
    setIsTestPanelExpanded(true);
    executeRun(problem.testCases);
  };

  const handleSubmit = () => {
    if (!problem) return;
    setIsTestPanelExpanded(true);
    executeSubmit(language);
  };

  if (!problem) {
    return <div className="flex h-[calc(100vh-4rem)] items-center justify-center">Loading...</div>;
  }

  const isRunning = status === 'Running';
  const isSubmitting = status === 'Submitting';

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] -mx-4 md:-mx-8 -mt-6">
      <SolveHeader
        title={`${problem.title}`}
        difficulty={problem.difficulty}
        onRun={handleRun}
        onSubmit={handleSubmit}
        isRunning={isRunning}
        isSubmitting={isSubmitting}
      />

      <div className="flex-1 overflow-hidden">
        {/* @ts-expect-error react-resizable-panels type mismatches in shadcn */}
        <ResizablePanelGroup direction="horizontal">
          
          {/* Left Pane: Problem Description */}
          <ResizablePanel defaultSize={40} minSize={25}>
            <ProblemDescription problem={problem} />
          </ResizablePanel>
          
          <ResizableHandle className="w-1.5 bg-border/40 hover:bg-primary/50 transition-colors cursor-col-resize active:bg-primary" />
          
          {/* Right Pane: Code Editor + Test Cases */}
          <ResizablePanel defaultSize={60}>
            {/* @ts-expect-error react-resizable-panels type mismatches in shadcn */}
            <ResizablePanelGroup direction="vertical">
              
              {/* Code Editor */}
              <ResizablePanel defaultSize={isTestPanelExpanded ? 65 : 100} minSize={20}>
                <CodeEditor
                  language={language}
                  setLanguage={setLanguage}
                  code={code}
                  onChange={(val) => setCode(val || '')}
                  onReset={() => setCode(problem.starterCode[language as keyof typeof problem.starterCode] || '')}
                />
              </ResizablePanel>
              
              <ResizableHandle 
                className={cn(
                  "h-1.5 bg-border/40 hover:bg-primary/50 transition-colors cursor-row-resize active:bg-primary",
                  !isTestPanelExpanded && "hidden"
                )} 
              />
              
              {/* Test Cases Panel */}
              <ResizablePanel 
                defaultSize={35} 
                minSize={15} 
                collapsible 
                className={cn(!isTestPanelExpanded && "min-h-[40px] flex-none transition-all")}
              >
                <TestCasesPanel
                  testCases={problem.testCases}
                  status={status}
                  lastAction={lastAction}
                  logs={logs}
                  runResult={runResult}
                  submitResult={submitResult}
                  progress={progress}
                  isExpanded={isTestPanelExpanded}
                  onToggleExpand={() => setIsTestPanelExpanded(!isTestPanelExpanded)}
                />
              </ResizablePanel>
              
            </ResizablePanelGroup>
          </ResizablePanel>

        </ResizablePanelGroup>
      </div>
    </div>
  );
}
