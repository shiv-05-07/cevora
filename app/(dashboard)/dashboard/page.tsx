'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Code2, 
  FileText, 
  Flame, 
  CheckCircle2, 
  FileSearch, 
  Code, 
  Bot, 
  Video, 
  TrendingUp, 
  TrendingDown, 
  Building2, 
  Map,
  Clock,
  ArrowRight
} from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { SectionCard } from '@/components/dashboard/SectionCard';
import { QuickActionCard } from '@/components/dashboard/QuickActionCard';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { ProgressRing } from '@/components/dashboard/ProgressRing';
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
import { cn } from '@/lib/utils';

import { ActivityFeed } from '@/components/shared/ActivityFeed';

// --- Main Page Component ---

export default function DashboardPage() {
  return (
    <div className="space-y-6 pb-12">
      {/* 1. Page Header */}
      <PageHeader
        title="Dashboard"
        description="Welcome back, Cody. You're making excellent progress toward your placement goals."
        actions={
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto">View Roadmap</Button>
            <Button className="w-full sm:w-auto">Continue Learning</Button>
          </div>
        }
      />

      {/* 2. Top Analytics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatCard 
          title="Placement Readiness" 
          value="82%" 
          trend={{ value: '+6%', isPositive: true }} 
          description="Weekly trend" 
          icon={Target} 
        />
        <StatCard 
          title="Problems Solved" 
          value="247" 
          trend={{ value: '+8', isPositive: true }} 
          description="Today's" 
          icon={Code2} 
        />
        <StatCard 
          title="Resume Score" 
          value="86%" 
          description="ATS Ready" 
          icon={FileText} 
        />
        <StatCard 
          title="Learning Streak" 
          value="19 Days" 
          description="Keep Going" 
          icon={Flame} 
        />
      </div>

      {/* 3. Main Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN (2 Spans) */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Today's Focus */}
          <SectionCard 
            title="Today's Mission" 
            actions={
              <div className="flex items-center text-xs font-semibold text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
                <Clock className="w-3.5 h-3.5 mr-1.5" />
                3h 20m estimated
              </div>
            }
          >
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Solve 3 Graph questions',
                  'Review DBMS normalization',
                  'Complete Amazon OA',
                  'Update Resume'
                ].map((task, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-border/40 bg-muted/10">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="font-medium text-sm text-foreground">{task}</span>
                  </div>
                ))}
              </div>
              
              <div className="pt-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Mission Progress</span>
                  <span className="text-sm font-bold text-primary">72%</span>
                </div>
                <Progress value={72} className="h-2.5" />
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <Button className="w-full sm:w-auto shadow-sm">
                  Continue Mission
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" className="w-full sm:w-auto">View Plan</Button>
              </div>
            </div>
          </SectionCard>

          {/* AI Recommendations */}
          <div>
            <h3 className="text-lg font-bold tracking-tight mb-4">AI Recommendations</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <QuickActionCard 
                title="Resume Analyzer" 
                description="Improve ATS score by 8%" 
                icon={FileSearch} 
                href="/resume" 
                actionText="Analyze Resume"
              />
              <QuickActionCard 
                title="Practice DSA" 
                description="Arrays & Graphs need revision" 
                icon={Code} 
                href="/oa-practice" 
                actionText="Practice OA"
              />
              <QuickActionCard 
                title="AI Mentor" 
                description="Ask questions or request study plans" 
                icon={Bot} 
                href="/mentor" 
                actionText="Ask Mentor"
              />
              <QuickActionCard 
                title="Mock Interview" 
                description="Behavioral Interview pending" 
                icon={Video} 
                href="/interview" 
                actionText="Start Interview"
              />
            </div>
          </div>

          {/* Performance Insights */}
          <div>
            <h3 className="text-lg font-bold tracking-tight mb-4">Performance Insights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <MetricCard 
                title="Strengths" 
                value="Arrays" 
                subtitle="Strings, OOP" 
                icon={TrendingUp} 
                colorVariant="success" 
              />
              <MetricCard 
                title="Needs Improvement" 
                value="Graphs" 
                subtitle="Operating Systems, Computer Networks" 
                icon={TrendingDown} 
                colorVariant="danger" 
              />
            </div>
          </div>

          {/* Upcoming Opportunities */}
          <SectionCard 
            title="Upcoming Opportunities" 
            actions={<Button variant="ghost" size="sm" className="hidden sm:inline-flex">View All</Button>}
          >
            <div className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
              <Table className="min-w-[500px]">
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Company</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-bold">Amazon</TableCell>
                    <TableCell className="text-muted-foreground font-medium">OA in 3 Days</TableCell>
                    <TableCell><StatusBadge status="warning">Upcoming</StatusBadge></TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="h-8 text-xs font-semibold">Prepare</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">Google</TableCell>
                    <TableCell className="text-muted-foreground font-medium">Applications Open</TableCell>
                    <TableCell><StatusBadge status="info">Active</StatusBadge></TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="h-8 text-xs font-semibold">Apply</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">Microsoft</TableCell>
                    <TableCell className="text-muted-foreground font-medium">Resume Shortlisting</TableCell>
                    <TableCell><StatusBadge status="neutral">Pending</StatusBadge></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="h-8 text-xs font-semibold" disabled>Wait</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">Adobe</TableCell>
                    <TableCell className="text-muted-foreground font-medium">Interview Round</TableCell>
                    <TableCell><StatusBadge status="success">Shortlisted</StatusBadge></TableCell>
                    <TableCell className="text-right">
                      <Button variant="default" size="sm" className="h-8 text-xs font-semibold">Schedule</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 sm:hidden">
              <Button variant="outline" className="w-full">View All Opportunities</Button>
            </div>
          </SectionCard>

          {/* Quick Tools */}
          <div>
            <h3 className="text-lg font-bold tracking-tight mb-4">Quick Tools</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <QuickActionCard title="Companies Explorer" description="Find hiring companies" icon={Building2} href="/companies" actionText="Explore Companies" />
              <QuickActionCard title="Placement Roadmaps" description="Track your curriculum" icon={Map} href="/roadmaps" actionText="View Roadmaps" />
              <QuickActionCard title="AI Mentor" description="Get instant answers" icon={Bot} href="/mentor" actionText="Ask Mentor" />
            </div>
          </div>
          
        </div>

        {/* RIGHT COLUMN (1 Span) */}
        <div className="space-y-6">
          
          {/* Roadmap Progress */}
          <SectionCard title="Roadmap Progress" variant="compact">
            <div className="flex flex-col items-center py-6">
              <ProgressRing 
                value={68} 
                size={160} 
                strokeWidth={12}
                label="68%" 
                subtitle="Overall" 
                className="mb-8"
              />
              <div className="w-full space-y-4">
                <div className="flex justify-between items-center text-sm border-b border-border/40 pb-2">
                  <span className="text-muted-foreground font-medium">Current Track</span>
                  <span className="font-bold text-foreground">Amazon SDE</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-border/40 pb-2">
                  <span className="text-muted-foreground font-medium">Current Module</span>
                  <span className="font-bold text-foreground">Graphs</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-border/40 pb-2">
                  <span className="text-muted-foreground font-medium">Next Module</span>
                  <span className="font-bold text-foreground">Dynamic Prog.</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground font-medium">Remaining Weeks</span>
                  <span className="font-bold text-foreground">5 Weeks</span>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Weekly Activity */}
          <SectionCard title="Weekly Activity" variant="compact">
            <div className="flex items-end justify-between h-36 gap-2 mt-4 px-2">
              {[
                { day: 'Mon', val: 30 },
                { day: 'Tue', val: 50 },
                { day: 'Wed', val: 40 },
                { day: 'Thu', val: 80 },
                { day: 'Fri', val: 60 },
                { day: 'Sat', val: 90 },
                { day: 'Sun', val: 70 },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 flex-1 h-full group cursor-default">
                  <div className="w-full bg-muted/50 rounded-t-sm h-full relative flex items-end overflow-hidden">
                    <motion.div 
                      className="w-full bg-primary/80 group-hover:bg-primary transition-colors rounded-t-sm"
                      initial={{ height: 0 }}
                      animate={{ height: `${item.val}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">{item.day}</span>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Learning Insights */}
          <SectionCard title="Learning Insights" variant="compact">
            <div className="space-y-3 pt-2">
              <div className="p-3.5 bg-green-500/10 border border-green-500/20 rounded-xl text-sm">
                <span className="font-bold text-green-600 dark:text-green-400 block mb-1.5 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" /> Trending Up
                </span>
                <span className="text-muted-foreground font-medium">Your Graph accuracy improved by 18% this week.</span>
              </div>
              <div className="p-3.5 bg-orange-500/10 border border-orange-500/20 rounded-xl text-sm">
                <span className="font-bold text-orange-600 dark:text-orange-400 block mb-1.5 flex items-center gap-1.5">
                  <Flame className="w-4 h-4" /> Action Required
                </span>
                <span className="text-muted-foreground font-medium">DBMS revision is currently overdue by 2 days.</span>
              </div>
              <div className="p-3.5 bg-blue-500/10 border border-blue-500/20 rounded-xl text-sm">
                <span className="font-bold text-blue-600 dark:text-blue-400 block mb-1.5 flex items-center gap-1.5">
                  <Target className="w-4 h-4" /> Target Met
                </span>
                <span className="text-muted-foreground font-medium">Resume now matches Amazon SDE role by 86%.</span>
              </div>
            </div>
          </SectionCard>

          {/* Recent Activity */}
          <SectionCard title="Recent Activity" variant="compact">
            <div className="pt-2">
              <ActivityFeed items={[
                { id: '1', title: 'Completed Resume Analysis', timestamp: '2h ago' },
                { id: '2', title: 'Solved 14 Problems', timestamp: '5h ago' },
                { id: '3', title: 'Finished Mock Interview', timestamp: 'Yesterday' },
                { id: '4', title: 'Started Amazon Roadmap', timestamp: 'Yesterday' },
                { id: '5', title: 'Downloaded Resume Report', timestamp: '2 days ago' },
              ]} />
            </div>
          </SectionCard>

          {/* Bottom CTA */}
          <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20 shadow-none overflow-hidden relative">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl pointer-events-none" />
            <CardContent className="p-6 text-center space-y-5 relative z-10">
              <h3 className="font-extrabold text-lg tracking-tight text-foreground">Ready for today's preparation?</h3>
              <div className="space-y-3">
                <Button className="w-full font-bold shadow-sm">
                  Continue Learning
                </Button>
                <Button variant="outline" className="w-full bg-background/60 backdrop-blur-sm font-semibold hover:bg-background/80">
                  Generate AI Study Plan
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
