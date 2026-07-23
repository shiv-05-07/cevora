import { create } from 'zustand';
import { 
  DiagnosticQuestion, 
  DiagnosticResultSummary, 
  DiagnosticStatusResponse 
} from '@/features/diagnostic/types';
import { DiagnosticStatus } from '@prisma/client';

interface DiagnosticState {
  status: DiagnosticStatus;
  attemptId: string | null;
  questions: DiagnosticQuestion[];
  currentIndex: number;
  answers: Record<string, string>;
  timeSpent: Record<string, number>;
  isLoading: boolean;
  isSubmitting: boolean;
  isFinishing: boolean;
  result: DiagnosticResultSummary | null;
  error: string | null;

  // Actions
  fetchStatus: () => Promise<void>;
  fetchResult: () => Promise<DiagnosticResultSummary | null>;
  startDiagnostic: () => Promise<string | null>;
  selectAnswer: (questionId: string, answerId: string) => void;
  recordTimeTaken: (questionId: string, seconds: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  submitCurrentAnswer: () => Promise<boolean>;
  finishDiagnostic: () => Promise<DiagnosticResultSummary | null>;
  reset: () => void;
}

export const useDiagnosticStore = create<DiagnosticState>((set, get) => ({
  status: DiagnosticStatus.PENDING,
  attemptId: null,
  questions: [],
  currentIndex: 0,
  answers: {},
  timeSpent: {},
  isLoading: false,
  isSubmitting: false,
  isFinishing: false,
  result: null,
  error: null,

  fetchStatus: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch('/api/diagnostic/status');
      const data = await res.json();
      if (data.success) {
        const payload: DiagnosticStatusResponse = data.data;
        set({
          status: payload.status,
          attemptId: payload.activeAttemptId || null,
          isLoading: false
        });
      } else {
        set({ error: data.message || 'Failed to fetch status', isLoading: false });
      }
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchResult: async () => {
    const { result } = get();
    if (result) return result;

    set({ isLoading: true, error: null });
    try {
      const res = await fetch('/api/diagnostic/result');
      const data = await res.json();
      if (data.success) {
        set({
          result: data.data,
          status: DiagnosticStatus.LOCKED,
          isLoading: false
        });
        return data.data;
      } else {
        set({ isLoading: false });
        return null;
      }
    } catch (err: any) {
      set({ isLoading: false });
      return null;
    }
  },

  startDiagnostic: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch('/api/diagnostic/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      const data = await res.json();
      if (data.success) {
        set({
          attemptId: data.data.attemptId,
          questions: data.data.questions,
          status: DiagnosticStatus.IN_PROGRESS,
          currentIndex: 0,
          answers: {},
          timeSpent: {},
          isLoading: false
        });
        return data.data.attemptId;
      } else {
        set({ error: data.message, isLoading: false });
        return null;
      }
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      return null;
    }
  },

  selectAnswer: (questionId, answerId) => {
    set(state => ({
      answers: { ...state.answers, [questionId]: answerId }
    }));
  },

  recordTimeTaken: (questionId, seconds) => {
    set(state => ({
      timeSpent: { ...state.timeSpent, [questionId]: (state.timeSpent[questionId] || 0) + seconds }
    }));
  },

  nextQuestion: () => {
    const { currentIndex, questions } = get();
    if (currentIndex < questions.length - 1) {
      set({ currentIndex: currentIndex + 1 });
    }
  },

  prevQuestion: () => {
    const { currentIndex } = get();
    if (currentIndex > 0) {
      set({ currentIndex: currentIndex - 1 });
    }
  },

  submitCurrentAnswer: async () => {
    const { attemptId, questions, currentIndex, answers, timeSpent } = get();
    if (!attemptId || !questions[currentIndex]) return false;

    const q = questions[currentIndex];
    const selectedAnswer = answers[q.id] || null;

    set({ isSubmitting: true });
    try {
      const res = await fetch('/api/diagnostic/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          attemptId,
          questionId: q.id,
          selectedAnswer,
          correctAnswer: q.correctAnswer,
          timeTaken: timeSpent[q.id] || 30
        })
      });
      const data = await res.json();
      set({ isSubmitting: false });
      return data.success;
    } catch (err) {
      set({ isSubmitting: false });
      return false;
    }
  },

  finishDiagnostic: async () => {
    const { attemptId } = get();
    if (!attemptId) return null;

    set({ isFinishing: true, error: null });
    try {
      const res = await fetch('/api/diagnostic/finish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attemptId })
      });
      const data = await res.json();
      if (data.success) {
        set({
          result: data.data,
          status: DiagnosticStatus.LOCKED,
          isFinishing: false
        });
        return data.data;
      } else {
        set({ error: data.message, isFinishing: false });
        return null;
      }
    } catch (err: any) {
      set({ error: err.message, isFinishing: false });
      return null;
    }
  },

  reset: () => {
    set({
      status: DiagnosticStatus.PENDING,
      attemptId: null,
      questions: [],
      currentIndex: 0,
      answers: {},
      timeSpent: {},
      result: null,
      error: null,
      isFinishing: false
    });
  }
}));
