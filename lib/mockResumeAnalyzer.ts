import { ATSAnalysisData } from '@/types/resume';
import { mockATSAnalysis } from '@/data/mockResumeAnalysis';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

export class MockResumeAnalyzer {
  static async simulateAnalysis(
    onProgress: (step: string) => void
  ): Promise<ATSAnalysisData> {
    
    onProgress('Uploading Resume...');
    await sleep(600);
    
    onProgress('Parsing Document...');
    await sleep(800);
    
    onProgress('Extracting Sections...');
    await sleep(700);
    
    onProgress('Analyzing ATS Compatibility...');
    await sleep(900);
    
    onProgress('Matching Keywords...');
    await sleep(600);
    
    onProgress('Calculating Resume Score...');
    await sleep(500);
    
    onProgress('Generating AI Suggestions...');
    await sleep(800);
    
    onProgress('Analysis Complete');
    await sleep(300);

    // Deep clone to allow for minor randomization without mutating the base mock
    const result: ATSAnalysisData = JSON.parse(JSON.stringify(mockATSAnalysis));
    
    // Slight randomization for realism
    result.overallScore = randomInt(80, 89);
    result.keywordMatchPercentage = randomInt(75, 85);
    
    return result;
  }
}
