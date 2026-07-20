'use client';

import * as React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { PageContainer } from './PageContainer';
import { useSidebar } from '@/providers/SidebarProvider';

export function AppShell({ children }: { children: React.ReactNode }) {
  const { isExpanded } = useSidebar();

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-foreground transition-colors duration-200">
      {/* Sidebar (desktop fixed) */}
      <Sidebar />

      {/* Main Container */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isExpanded ? 'md:pl-64' : 'md:pl-16'
        }`}
      >
        {/* Sticky Top Header */}
        <Header />

        {/* Reusable page content container */}
        <PageContainer>
          {children}
        </PageContainer>
      </div>
    </div>
  );
}
