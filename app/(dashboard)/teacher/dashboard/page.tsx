'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  FileCheck, 
  Award, 
  Building2, 
  Bot, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Plus, 
  Send,
  FileText,
  UserCheck,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { SectionCard } from '@/components/dashboard/SectionCard';
import { QuickActionCard } from '@/components/dashboard/QuickActionCard';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@/components/ui/table';
import { ActivityFeed } from '@/components/shared/ActivityFeed';
import Link from 'next/link';
import { useWorkspace } from '@/providers/WorkspaceProvider';
import { useProfileStore } from '@/store/useProfileStore';

export default function TeacherDashboardPage() {
  const { profile } = useProfileStore();
  const { currentWorkspace } = useWorkspace();

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Page Header */}
      <PageHeader
        title={`Teacher Dashboard — ${currentWorkspace.name}`}
        description={`Welcome back, ${profile.name || 'Faculty'}. Active cohort: ${currentWorkspace.name} (${currentWorkspace.studentCount || 64} Students).`}
        actions={
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              New Cohort
            </Button>
            <Button className="w-full sm:w-auto">
              <Send className="w-4 h-4 mr-2" />
              Announcement
            </Button>
          </div>
        }
      />

      {/* 2. Top Analytics / KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatCard 
          title="Total Students Managed" 
          value="148" 
          trend={{ value: '+12 this month', isPositive: true }} 
          description="Across 3 batches" 
          icon={Users} 
        />
        <StatCard 
          title="Pending Resume Reviews" 
          value="9" 
          description="Action required" 
          icon={FileCheck} 
        />
        <StatCard 
          title="Avg. Placement Readiness" 
          value="76%" 
          trend={{ value: '+4%', isPositive: true }} 
          description="Cohort average" 
          icon={Award} 
        />
        <StatCard 
          title="Active Drives" 
          value="6" 
          description="Amazon, Google, Adobe..." 
          icon={Building2} 
        />
      </div>

      {/* 3. Main Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN (2 Spans) */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Cohort Performance Overview */}
          <SectionCard 
            title="Batch Performance Overview" 
            actions={
              <div className="flex items-center text-xs font-semibold text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
                <Clock className="w-3.5 h-3.5 mr-1.5" />
                Updated 1h ago
              </div>
            }
          >
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { name: 'CSE 2026 Batch', count: '64 Students', progress: 84, color: 'bg-emerald-500' },
                  { name: 'IT 2026 Batch', count: '48 Students', progress: 72, color: 'bg-blue-500' },
                  { name: 'ECE 2026 Batch', count: '36 Students', progress: 65, color: 'bg-indigo-500' },
                ].map((batch, i) => (
                  <div key={i} className="p-4 rounded-xl border border-border/50 bg-card space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-foreground">{batch.name}</span>
                      <span className="text-xs text-muted-foreground">{batch.count}</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-muted-foreground">Avg. Readiness</span>
                        <span className="font-bold text-foreground">{batch.progress}%</span>
                      </div>
                      <Progress value={batch.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border/40">
                <p className="text-xs text-muted-foreground">
                  Overall cohort completion target is <span className="font-semibold text-foreground">80% readiness</span> before October.
                </p>
                <Link href="/mentor">
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    <Bot className="w-4 h-4 mr-2" />
                    Ask AI Assistant
                  </Button>
                </Link>
              </div>
            </div>
          </SectionCard>

          {/* Pending Resumes Table */}
          <SectionCard 
            title="Resumes Awaiting Verification" 
            actions={<Button variant="ghost" size="sm">View All (9)</Button>}
          >
            <div className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
              <Table className="min-w-[550px]">
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Student</TableHead>
                    <TableHead>Batch</TableHead>
                    <TableHead>Target Role</TableHead>
                    <TableHead>ATS Score</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: 'Aarav Sharma', batch: 'CSE 2026', role: 'Frontend Engineer', score: '88%', status: 'success' },
                    { name: 'Priya Verma', batch: 'IT 2026', role: 'SDE-1', score: '82%', status: 'success' },
                    { name: 'Rohan Gupta', batch: 'CSE 2026', role: 'Full Stack Engineer', score: '74%', status: 'warning' },
                    { name: 'Sneha Patel', batch: 'ECE 2026', role: 'Data Analyst', score: '69%', status: 'neutral' },
                  ].map((student, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-bold flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-primary shrink-0" />
                        {student.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground font-medium text-xs">{student.batch}</TableCell>
                      <TableCell className="font-medium text-xs">{student.role}</TableCell>
                      <TableCell><StatusBadge status={student.status as any}>{student.score}</StatusBadge></TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="h-8 text-xs font-semibold">
                          Review
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </SectionCard>

          {/* Quick Teacher Tools */}
          <div>
            <h3 className="text-lg font-bold tracking-tight mb-4">Faculty Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <QuickActionCard 
                title="AI Mentor" 
                description="Get AI assistance for cohort insights" 
                icon={Bot} 
                href="/mentor" 
                actionText="Open AI Mentor" 
              />
              <QuickActionCard 
                title="Partner Companies" 
                description="Explore active hiring opportunities" 
                icon={Building2} 
                href="/companies" 
                actionText="View Companies" 
              />
              <QuickActionCard 
                title="Workspace Settings" 
                description="Manage preferences & permissions" 
                icon={FileText} 
                href="/settings" 
                actionText="Settings" 
              />
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN (1 Span) */}
        <div className="space-y-6">
          
          {/* Active Placement Drives */}
          <SectionCard title="Active Placement Drives" variant="compact">
            <div className="space-y-3 pt-2">
              {[
                { company: 'Amazon', role: 'SDE Intern', eligible: 42, deadline: 'In 2 days', status: 'warning' },
                { company: 'Google', role: 'Software Engineer', eligible: 35, deadline: 'In 5 days', status: 'info' },
                { company: 'Adobe', role: 'Product Intern', eligible: 28, deadline: 'Applications Open', status: 'success' },
              ].map((drive, i) => (
                <div key={i} className="p-3.5 rounded-xl border border-border/50 bg-card space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">{drive.company} — {drive.role}</span>
                    <StatusBadge status={drive.status as any}>{drive.deadline}</StatusBadge>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{drive.eligible} Eligible Students</span>
                    <span className="font-medium text-foreground">View Applicants →</span>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Recent Cohort Activity */}
          <SectionCard title="Recent Cohort Activity" variant="compact">
            <div className="pt-2">
              <ActivityFeed items={[
                { id: '1', title: '14 Students submitted Amazon OA solutions', timestamp: '1h ago' },
                { id: '2', title: 'Aarav Sharma requested Resume Verification', timestamp: '3h ago' },
                { id: '3', title: 'CSE 2026 Batch graph readiness reached 80%', timestamp: 'Yesterday' },
                { id: '4', title: 'Posted announcement for Google Drive', timestamp: '2 days ago' },
              ]} />
            </div>
          </SectionCard>

          {/* Teacher AI Quick Prompt Card */}
          <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20 shadow-none overflow-hidden relative">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl pointer-events-none" />
            <CardContent className="p-6 text-center space-y-4 relative z-10">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base tracking-tight text-foreground">Need cohort analysis?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Use the AI Mentor to generate cohort reports, spot struggling students, or prepare drive schedules.
              </p>
              <Link href="/mentor" className="block">
                <Button className="w-full font-bold shadow-sm text-xs">
                  Ask AI Mentor
                </Button>
              </Link>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
