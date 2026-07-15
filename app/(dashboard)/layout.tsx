'use client';

import * as React from 'react';
import { SidebarProvider } from '@/providers/SidebarProvider';
import { WorkspaceProvider } from '@/providers/WorkspaceProvider';
import { AppShell } from '@/components/dashboard/AppShell';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <WorkspaceProvider>
        <TooltipProvider delay={200}>
          <AppShell>{children}</AppShell>
        </TooltipProvider>
      </WorkspaceProvider>
    </SidebarProvider>
  );
}
