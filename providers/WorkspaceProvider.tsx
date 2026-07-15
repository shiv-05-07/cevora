'use client';

import * as React from 'react';
import { UserRole } from '@/constants/roles';

export interface Workspace {
  id: string;
  name: string;
  role: UserRole;
}

interface WorkspaceContextType {
  currentWorkspace: Workspace;
  workspaces: Workspace[];
  role: UserRole;
}

const WorkspaceContext = React.createContext<WorkspaceContextType | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const workspaces: Workspace[] = [
    { id: 'cse-2026', name: 'CSE 2026', role: 'student' },
  ];

  const currentWorkspace = { id: 'cse-2026', name: 'CSE 2026', role: 'student' as UserRole };

  return (
    <WorkspaceContext.Provider value={{ currentWorkspace, workspaces, role: 'student' }}>
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
