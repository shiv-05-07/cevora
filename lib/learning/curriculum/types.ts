export type SubjectKey =
  | 'dsa'
  | 'web-development'
  | 'app-development'
  | 'ai-ml'
  | 'data-science'
  | 'devops'
  | 'dbms'
  | 'operating-systems'
  | 'computer-networks'
  | 'aptitude';

export interface CurriculumLesson {
  title: string;
  content: string;
  interactiveExample?: {
    language: string;
    code: string;
    explanation: string;
  };
}

export interface CurriculumPractice {
  question: string;
  options: Array<{ id: string; text: string }>;
  correctAnswerId: string;
  explanation: string;
}

export interface CurriculumReview {
  title: string;
  pitfalls: string[];
  edgeCases: string[];
  keyTakeaway: string;
}

export interface CurriculumInterview {
  title: string;
  question: string;
  hint: string;
  keyPoints: string[];
}

export interface MissionContent {
  id: string;
  subjectKey?: SubjectKey;
  topicKey: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  lesson: CurriculumLesson;
  practice: CurriculumPractice;
  review: CurriculumReview;
  interview: CurriculumInterview;
}

export interface RoadmapStepItem {
  id: string;
  topicKey: string;
  title: string;
  description: string;
  order: number;
  estimatedMinutes?: number;
}

export interface SubjectDiagnosticQuestion {
  id: string;
  subjectKey: SubjectKey;
  conceptKey: string;
  concept: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  questionType?: string;
  question: string;
  options: Array<{ id: string; text: string }>;
  correctAnswer: string;
  explanation: string;
}

export interface SubjectCurriculum {
  key: SubjectKey;
  label: string;
  roadmapTitle: string;
  roadmapDescription: string;
  roadmapSteps: RoadmapStepItem[];
  diagnosticQuestions: SubjectDiagnosticQuestion[];
  missions: MissionContent[];
  learningInsight: {
    overview: string;
    nextStep: string;
  };
}
