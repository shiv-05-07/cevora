export type JudgeStatus = 'Idle' | 'Running' | 'Submitting' | 'Completed';
export type RunResultStatus = 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Compilation Error';

export interface TestCaseResult {
  id: string;
  status: RunResultStatus;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  runtime: string;
  memory: string;
}

export interface RunResult {
  status: RunResultStatus;
  passedCount: number;
  totalCount: number;
  runtime: string;
  memory: string;
  failedOnCase?: number;
  testCases: TestCaseResult[];
}

export interface SubmitResult {
  status: RunResultStatus;
  passedCount: number;
  totalCount: number;
  runtime: string;
  memory: string;
  runtimeBeats: number;
  memoryBeats: number;
  timestamp: string;
  language: string;
}

export interface ConsoleLog {
  id: string;
  timestamp: Date;
  message: string;
}
