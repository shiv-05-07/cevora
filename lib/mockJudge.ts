import { TestCase } from '@/components/oa/solve/mockProblems';
import { RunResult, SubmitResult, TestCaseResult, RunResultStatus } from '@/types/judge';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
const randomFloat = (min: number, max: number) => (Math.random() * (max - min) + min).toFixed(1);

export class MockJudge {
  
  static async simulateRun(
    testCases: TestCase[], 
    onLog: (msg: string) => void,
    onProgress: (current: number, total: number) => void
  ): Promise<RunResult> {
    onLog('Compiling...');
    await sleep(500);
    onLog('✓ Compilation Successful');
    await sleep(200);
    
    onLog('Running Sample Testcases...');
    await sleep(200);

    const results: TestCaseResult[] = [];
    const total = testCases.filter(tc => !tc.isHidden).length;
    let passed = 0;
    let failedOnCase: number | undefined = undefined;

    // Simulate 10% chance of a bug for demo purposes
    const hasBug = Math.random() > 0.9;
    const bugCaseIndex = hasBug ? randomInt(0, total - 1) : -1;

    for (let i = 0; i < total; i++) {
      const tc = testCases[i];
      onProgress(i + 1, total);
      onLog(`Executing Case ${i + 1}...`);
      await sleep(randomInt(350, 500));

      const isPass = i !== bugCaseIndex;
      const status: RunResultStatus = isPass ? 'Accepted' : 'Wrong Answer';
      
      const runtime = `${randomInt(1, 25)} ms`;
      const memory = `${randomFloat(40, 65)} MB`;

      if (isPass) {
        passed++;
        onLog('✓ Passed');
      } else {
        failedOnCase = i + 1;
        onLog('✗ Wrong Answer');
      }

      results.push({
        id: tc.id,
        status,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        actualOutput: isPass ? tc.expectedOutput : 'null',
        runtime,
        memory
      });
    }

    onLog('Generating Results...');
    await sleep(300);

    return {
      status: passed === total ? 'Accepted' : 'Wrong Answer',
      passedCount: passed,
      totalCount: total,
      runtime: `${randomInt(1, 25)} ms`,
      memory: `${randomFloat(40, 65)} MB`,
      failedOnCase,
      testCases: results
    };
  }

  static async simulateSubmit(
    language: string,
    onLog: (msg: string) => void
  ): Promise<SubmitResult> {
    onLog('Compiling...');
    await sleep(500);
    onLog('Running Hidden Testcases...');
    await sleep(800);
    onLog('Checking Performance...');
    await sleep(600);
    onLog('Evaluating Complexity...');
    await sleep(500);
    onLog('Generating Report...');
    await sleep(400);

    const totalHidden = randomInt(200, 450);
    // 20% chance of failing hidden testcases
    const isSuccess = Math.random() > 0.2;
    const passed = isSuccess ? totalHidden : randomInt(totalHidden - 50, totalHidden - 1);

    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const todayString = `Today ${timeString}`;

    return {
      status: isSuccess ? 'Accepted' : 'Wrong Answer',
      passedCount: passed,
      totalCount: totalHidden,
      runtime: `${randomInt(1, 25)} ms`,
      memory: `${randomFloat(40, 65)} MB`,
      runtimeBeats: randomInt(70, 98),
      memoryBeats: randomInt(65, 95),
      timestamp: todayString,
      language
    };
  }
}
