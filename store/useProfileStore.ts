import { create } from 'zustand';

export interface UserProfile {
  id?: string;
  name: string;
  username?: string;
  email: string;
  role: string; // 'Student' | 'Teacher' | 'Admin'
  avatar?: string;
  bio?: string;
  
  // Student Profile
  college?: string;
  degree?: string;
  specialization?: string;
  semester?: number | null;
  graduationYear?: number | null;
  cgpa?: number | null;
  targetRole?: string;
  targetCompany?: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  
  // Teacher Profile
  department?: string;
  designation?: string;
  institution?: string;
  facultyId?: string;
  office?: string;
  
  // Learning Profile
  onboardingCompleted?: boolean;
  learningLevel?: string;
  learningStyle?: string;
  learningPace?: string;
  learningGoals?: string[];
  preferredSubjects?: string[];
  dailyGoalMinutes?: number;
}

interface ProfileState {
  profile: UserProfile;
  setProfile: (profile: Partial<UserProfile>) => void;
  syncFromUser: (appUser: any, authEmail?: string) => void;
  resetProfile: () => void;
}

const DEFAULT_PROFILE: UserProfile = {
  name: 'User',
  email: '',
  role: 'Student',
  avatar: undefined,
};

export const useProfileStore = create<ProfileState>()((set) => ({
  profile: DEFAULT_PROFILE,
  setProfile: (newProfile) =>
    set((state) => ({
      profile: { ...state.profile, ...newProfile },
    })),
  syncFromUser: (appUser, authEmail) => {
    if (!appUser) return;
    
    const isTeacher = appUser.role === 'TEACHER' || appUser.role === 'ADMIN';
    const roleDisplay = isTeacher ? (appUser.role === 'ADMIN' ? 'Admin' : 'Teacher') : 'Student';
    
    const sp = appUser.studentProfile || {};
    const tp = appUser.teacherProfile || {};
    const lp = appUser.learningProfile || {};

    set({
      profile: {
        id: appUser.id,
        name: appUser.fullName || appUser.username || 'User',
        username: appUser.username || '',
        email: authEmail || appUser.email || '',
        role: roleDisplay,
        // STRICT USER ISOLATION: Take avatar strictly from appUser.avatarUrl in Prisma
        avatar: appUser.avatarUrl || undefined,
        bio: appUser.bio || tp.bio || '',
        
        // Student fields (populated only for Students)
        college: !isTeacher ? (sp.college || 'Tech University') : undefined,
        degree: !isTeacher ? (sp.degree || 'B.Tech Computer Science') : undefined,
        specialization: !isTeacher ? (sp.specialization || 'Computer Science & Engineering') : undefined,
        semester: !isTeacher ? (sp.semester || null) : undefined,
        graduationYear: !isTeacher ? (sp.graduationYear || 2026) : undefined,
        cgpa: !isTeacher ? (sp.cgpa || null) : undefined,
        targetRole: !isTeacher ? (sp.targetRole || 'Software Development Engineer') : undefined,
        targetCompany: !isTeacher ? (sp.targetCompany || 'Top Tech Companies') : undefined,
        github: !isTeacher ? (sp.github || '') : undefined,
        linkedin: !isTeacher ? (sp.linkedin || '') : undefined,
        portfolio: !isTeacher ? (sp.portfolio || '') : undefined,
        
        // Teacher fields (populated strictly from TeacherProfile for Teachers)
        department: isTeacher ? (tp.department || 'Computer Science & Engineering') : undefined,
        designation: isTeacher ? (tp.designation || 'Senior Faculty & Mentor') : undefined,
        institution: isTeacher ? (tp.institution || 'Tech University') : undefined,
        facultyId: isTeacher ? (tp.facultyId || 'FAC-2026-089') : undefined,
        office: isTeacher ? (tp.office || '') : undefined,
        
        // Learning Profile
        onboardingCompleted: lp.onboardingCompleted ?? false,
        learningLevel: lp.learningLevel || 'BEGINNER',
        learningStyle: lp.learningStyle || 'VISUAL',
        learningPace: lp.learningPace || 'NORMAL',
        learningGoals: lp.learningGoals || [],
        preferredSubjects: lp.preferredSubjects || [],
        dailyGoalMinutes: lp.dailyGoalMinutes || 30,
      },
    });
  },
  resetProfile: () => {
    // Clear in-memory profile state on logout to guarantee complete user isolation
    set({ profile: DEFAULT_PROFILE });
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('cevora-profile-storage-v2');
      } catch (e) {
        // Ignore localStorage errors
      }
    }
  },
}));
