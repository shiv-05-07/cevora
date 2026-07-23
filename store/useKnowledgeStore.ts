import { create } from 'zustand';

export interface ConceptMasteryItem {
  id: string;
  conceptId: string;
  concept: {
    name: string;
    slug: string;
    description?: string | null;
    category?: string | null;
    difficulty: string;
  };
  masteryScore: number;
  masteryLevel: string;
  confidenceScore: number;
  attempts: number;
  lastPracticed?: string | null;
}

export interface DashboardInsights {
  diagnosticCompleted: boolean;
  diagnosticStatus: string;
  overallMastery: number;
  placementReadiness: string;
  readinessScore: number;
  todaysFocus: string;
  weakestSkill: string;
  knowledgeGrowth: string;
  nextRecommendation: string;
  skillScores: Array<{ category: string; currentScore: number; previousScore: number }>;
  weakConceptsCount: number;
  currentStreak: number;
  snapshots: Array<any>;
}

interface KnowledgeStateStore {
  conceptMasteries: ConceptMasteryItem[];
  knowledgeState: any | null;
  skillScores: any[];
  weakConcepts: any[];
  dashboardInsights: DashboardInsights | null;
  selectedSubject: string;
  searchQuery: string;
  filterLevel: string;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchMastery: (subject?: string, showAll?: boolean) => Promise<void>;
  fetchWeakConcepts: () => Promise<void>;
  fetchDashboardInsights: () => Promise<void>;
  setSelectedSubject: (subject: string) => void;
  setSearchQuery: (query: string) => void;
  setFilterLevel: (level: string) => void;
}

export const useKnowledgeStore = create<KnowledgeStateStore>((set, get) => ({
  conceptMasteries: [],
  knowledgeState: null,
  skillScores: [],
  weakConcepts: [],
  dashboardInsights: null,
  selectedSubject: 'ALL',
  searchQuery: '',
  filterLevel: 'ALL',
  isLoading: false,
  error: null,

  fetchMastery: async (subject, showAll = false) => {
    set({ isLoading: true, error: null });
    try {
      const queryParams = new URLSearchParams();
      if (subject && subject !== 'ALL') queryParams.append('category', subject);
      if (showAll) queryParams.append('showAll', 'true');
      
      const res = await fetch(`/api/mastery?${queryParams.toString()}`);
      const data = await res.json();
      if (data.success) {
        set({
          conceptMasteries: data.data.masteries,
          knowledgeState: data.data.knowledgeState,
          skillScores: data.data.skillScores,
          isLoading: false
        });
      } else {
        set({ error: data.message, isLoading: false });
      }
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchWeakConcepts: async () => {
    try {
      const res = await fetch('/api/weak-concepts');
      const data = await res.json();
      if (data.success) {
        set({ weakConcepts: data.data });
      }
    } catch (err) {
      // silent handle
    }
  },

  fetchDashboardInsights: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch('/api/dashboard/insights');
      const data = await res.json();
      if (data.success) {
        set({ dashboardInsights: data.data, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (err) {
      set({ isLoading: false });
    }
  },

  setSelectedSubject: (subject) => {
    set({ selectedSubject: subject });
    get().fetchMastery(subject); // This will fetch without showAll, but frontend can manage showAll locally or pass it. We'll update the page instead.
  },

  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilterLevel: (level) => set({ filterLevel: level })
}));
