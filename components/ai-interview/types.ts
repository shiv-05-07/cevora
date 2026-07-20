export type InterviewRole = 'SDE' | 'Data Analyst' | 'Product Manager' | 'Other';
export type InterviewLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type InterviewType = 'Technical' | 'HR' | 'Mixed';
export type InputMode = 'text' | 'audio' | 'video';
export type SessionMode = 'interview' | 'viva';

export interface InterviewConfig {
  role: InterviewRole;
  level: InterviewLevel;
  company: string;
  type: InterviewType;
  inputMode: InputMode;
  sessionMode: SessionMode;
}

export interface InterviewMessage {
  id: string;
  role: 'user' | 'interviewer';
  content: string;
}

export interface InterviewFeedback {
  score: number;
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  recommendedTopics: string[];
}
