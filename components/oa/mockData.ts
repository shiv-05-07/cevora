import { Code2, Target, Flame, Clock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const STATS_DATA = [
  {
    title: 'Questions Practiced',
    value: '124',
    trend: 'up' as const,
    trendValue: '+12 this week',
    icon: Code2,
    colorVariant: 'default' as const,
  },
  {
    title: 'Accuracy',
    value: '78.5%',
    trend: 'up' as const,
    trendValue: '+2.4%',
    icon: Target,
    colorVariant: 'success' as const,
  },
  {
    title: 'Current Streak',
    value: '6 Days',
    trend: 'neutral' as const,
    trendValue: 'Personal best 12d',
    icon: Flame,
    colorVariant: 'warning' as const,
  },
  {
    title: 'Weekly Progress',
    value: '18 / 25',
    subtitle: 'Target: 25 problems/week',
    icon: Clock,
    colorVariant: 'default' as const,
  },
];

export const COMPANIES_DATA = [
  {
    id: 'amazon',
    name: 'Amazon',
    logoLetter: 'a',
    logoGradient: 'from-orange-400 to-orange-600',
    totalQuestions: 142,
    difficulty: { easy: 45, medium: 72, hard: 25 },
  },
  {
    id: 'google',
    name: 'Google',
    logoLetter: 'G',
    logoGradient: 'from-blue-500 via-red-500 to-yellow-500',
    totalQuestions: 215,
    difficulty: { easy: 50, medium: 105, hard: 60 },
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    logoLetter: 'M',
    logoGradient: 'from-blue-400 to-blue-600',
    totalQuestions: 180,
    difficulty: { easy: 60, medium: 90, hard: 30 },
  },
  {
    id: 'meta',
    name: 'Meta',
    logoLetter: '∞',
    logoGradient: 'from-blue-600 to-indigo-700',
    totalQuestions: 95,
    difficulty: { easy: 20, medium: 50, hard: 25 },
  },
];

export const TOPICS_DATA = [
  { name: 'Arrays & Hashing', completed: 42, total: 50 },
  { name: 'Two Pointers', completed: 18, total: 25 },
  { name: 'Sliding Window', completed: 15, total: 30 },
  { name: 'Stack', completed: 20, total: 22 },
  { name: 'Binary Search', completed: 12, total: 35 },
  { name: 'Linked List', completed: 28, total: 30 },
  { name: 'Trees', completed: 10, total: 45 },
  { name: 'Graphs', completed: 5, total: 40 },
];

export const RECENT_ACTIVITY_DATA = [
  {
    id: '1',
    title: 'Two Sum',
    description: 'Amazon • Arrays & Hashing',
    timestamp: '2h ago',
    status: 'success' as const,
    statusLabel: 'Accepted',
  },
  {
    id: '2',
    title: 'Number of Islands',
    description: 'Amazon • Graphs',
    timestamp: '5h ago',
    status: 'danger' as const,
    statusLabel: 'Time Limit Exceeded',
  },
  {
    id: '3',
    title: 'Valid Parentheses',
    description: 'Microsoft • Stack',
    timestamp: 'Yesterday',
    status: 'success' as const,
    statusLabel: 'Accepted',
  },
  {
    id: '4',
    title: 'Merge K Sorted Lists',
    description: 'Google • Linked List',
    timestamp: '2 days ago',
    status: 'warning' as const,
    statusLabel: 'Wrong Answer',
  },
];

export const DAILY_CHALLENGE_DATA = {
  title: 'Maximum Subarray',
  company: 'Meta',
  difficulty: 'Medium' as const,
  points: 50,
  estimatedTime: '25 mins',
  description: 'Find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.',
};
