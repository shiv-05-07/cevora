export type HiringStatus = 'Active' | 'Upcoming' | 'Pending' | 'Closed' | 'Shortlisted';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  status?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  statusLabel?: string;
  date?: string;
}

export interface InterviewExperience {
  id: string;
  studentName: string;
  role: string;
  difficulty: Difficulty;
  rating: number;
  shortReview: string;
  questionsAsked?: number;
  verdict?: 'Selected' | 'Rejected' | 'Pending';
}

export interface Company {
  id: string;
  logo: string;
  companyName: string;
  role: string;
  package: string;
  location: string;
  workMode: 'On-site' | 'Hybrid' | 'Remote';
  hiringStatus: HiringStatus;
  applicationDeadline: string;
  cgpaCriteria: string;
  eligibleBranches: string[];
  timeline: TimelineEvent[];
  requiredSkills: string[];
  interviewRounds: number;
  oaDifficulty: Difficulty;
  interviewDifficulty: Difficulty;
  description: string;
  experiences?: InterviewExperience[];
}
