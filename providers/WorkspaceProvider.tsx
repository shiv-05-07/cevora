'use client';

import * as React from 'react';
import { UserRole } from '@/constants/roles';
import { useProfileStore } from '@/store/useProfileStore';

export interface Workspace {
  id: string;
  name: string;
  role: UserRole;
  studentCount?: number;
}

interface WorkspaceContextType {
  currentWorkspace: Workspace;
  workspaces: Workspace[];
  role: UserRole;
  switchWorkspace: (workspaceId: string) => void;
}

const TEACHER_BATCHES: Workspace[] = [
  { id: 'cse-2026', name: 'CSE 2026 Batch', role: 'teacher' as UserRole, studentCount: 64 },
  { id: 'it-2026', name: 'IT 2026 Batch', role: 'teacher' as UserRole, studentCount: 48 },
  { id: 'ece-2026', name: 'ECE 2026 Batch', role: 'teacher' as UserRole, studentCount: 36 },
];

const WorkspaceContext = React.createContext<WorkspaceContextType | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const { profile } = useProfileStore();

  const isTeacher = profile.role?.toLowerCase() === 'teacher' || profile.role?.toLowerCase() === 'admin';
  const role: UserRole = isTeacher ? (profile.role?.toLowerCase() === 'admin' ? 'admin' as UserRole : 'teacher' as UserRole) : 'student' as UserRole;

  const defaultStudentWorkspace: Workspace = React.useMemo(() => ({
    id: 'student-workspace',
    name: profile.college || 'CSE 2026',
    role: 'student' as UserRole,
  }), [profile.college]);

  const workspaces: Workspace[] = React.useMemo(() => {
    return isTeacher ? TEACHER_BATCHES : [defaultStudentWorkspace];
  }, [isTeacher, defaultStudentWorkspace]);

  const [activeWorkspaceId, setActiveWorkspaceId] = React.useState<string>(() => {
    if (typeof window !== 'undefined' && profile.id) {
      const saved = localStorage.getItem(`cevora_active_batch_${profile.id}`);
      if (saved && isTeacher && TEACHER_BATCHES.some((b) => b.id === saved)) {
        return saved;
      }
    }
    return isTeacher ? TEACHER_BATCHES[0].id : defaultStudentWorkspace.id;
  });

  // Re-hydrate active workspace if profile ID changes
  React.useEffect(() => {
    if (typeof window !== 'undefined' && profile.id && isTeacher) {
      const saved = localStorage.getItem(`cevora_active_batch_${profile.id}`);
      if (saved && TEACHER_BATCHES.some((b) => b.id === saved)) {
        setActiveWorkspaceId(saved);
      } else {
        setActiveWorkspaceId(TEACHER_BATCHES[0].id);
      }
    }
  }, [profile.id, isTeacher]);

  const currentWorkspace = React.useMemo(() => {
    if (isTeacher) {
      return TEACHER_BATCHES.find((b) => b.id === activeWorkspaceId) || TEACHER_BATCHES[0];
    }
    return defaultStudentWorkspace;
  }, [isTeacher, activeWorkspaceId, defaultStudentWorkspace]);

  const switchWorkspace = React.useCallback((workspaceId: string) => {
    setActiveWorkspaceId(workspaceId);
    if (typeof window !== 'undefined' && profile.id) {
      localStorage.setItem(`cevora_active_batch_${profile.id}`, workspaceId);
    }
  }, [profile.id]);

  return (
    <WorkspaceContext.Provider value={{ currentWorkspace, workspaces, role, switchWorkspace }}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = React.useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
}
