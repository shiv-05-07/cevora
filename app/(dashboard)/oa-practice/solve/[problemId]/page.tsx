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

export default function SolvePage() {
  const params = useParams();
  const router = useRouter();
  const problemId = params.problemId as string;
  
  const [problem, setProblem] = React.useState<Problem | null>(null);
  const [language, setLanguage] = React.useState('javascript');
  const [code, setCode] = React.useState('');
  
  const [isRunning, setIsRunning] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [executionResult, setExecutionResult] = React.useState<any>(null);
  const [isTestPanelExpanded, setIsTestPanelExpanded] = React.useState(true);

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
    }
  }, [language, problem]);

  const handleRun = () => {
    setIsRunning(true);
    setExecutionResult(null);
    setIsTestPanelExpanded(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsRunning(false);
      setExecutionResult({
        status: 'Accepted',
        runtime: '42 ms',
        memory: '34.2 MB',
      });
      toast.success('Run successful');
    }, 1500);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setExecutionResult(null);
    setIsTestPanelExpanded(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Randomly succeed or fail for demo purposes
      const success = Math.random() > 0.4;
      if (success) {
        setExecutionResult({
          status: 'Accepted',
          runtime: '45 ms',
          memory: '34.5 MB',
        });
        toast.success('Solution Accepted!');
      } else {
        setExecutionResult({
          status: 'Wrong Answer',
          output: '[2,3]',
          runtime: 'N/A',
          memory: 'N/A',
        });
        toast.error('Wrong Answer on test case 1');
      }
    }, 2000);
  };

  if (!problem) {
    return <div className="flex h-[calc(100vh-4rem)] items-center justify-center">Loading...</div>;
  }

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
        <ResizablePanelGroup direction="horizontal">
          
          {/* Left Pane: Problem Description */}
          <ResizablePanel defaultSize={40} minSize={25}>
            <ProblemDescription problem={problem} />
          </ResizablePanel>
          
          <ResizableHandle className="w-1.5 bg-border/40 hover:bg-primary/50 transition-colors cursor-col-resize active:bg-primary" />
          
          {/* Right Pane: Code Editor + Test Cases */}
          <ResizablePanel defaultSize={60}>
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
                  executionResult={executionResult}
                  onClearResult={() => setExecutionResult(null)}
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
