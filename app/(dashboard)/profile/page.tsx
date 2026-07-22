'use client';

import * as React from 'react';
import Link from 'next/link';
import { 
  User, 
  Mail, 
  GraduationCap, 
  Building2, 
  Target, 
  Award, 
  BookOpen, 
  FileText, 
  Code2,
  Globe, 
  Share2,
  Settings, 
  Bot, 
  Users, 
  Flame,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { SectionCard } from '@/components/dashboard/SectionCard';
import { StatCard } from '@/components/dashboard/StatCard';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useProfileStore } from '@/store/useProfileStore';

export default function ProfilePage() {
  const { profile } = useProfileStore();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const isTeacher = profile.role?.toLowerCase() === 'teacher' || profile.role?.toLowerCase() === 'admin';

  const initials = (profile.name || 'User')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  const displayAvatar = mounted ? profile.avatar : undefined;

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <PageHeader
        title={isTeacher ? 'Faculty Profile' : 'Student Profile'}
        description="View your active workspace identity, academic information, and performance parameters."
        actions={
          <Link href="/settings">
            <Button variant="outline" className="w-full sm:w-auto">
              <Settings className="w-4 h-4 mr-2" />
              Edit Profile in Settings
            </Button>
          </Link>
        }
      />

      {/* Hero Identity Banner */}
      <Card className="bg-card border-border/50 shadow-sm overflow-hidden">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            
            {/* Left: Avatar & Identity Details */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
              <Avatar className="w-24 h-24 border-2 border-primary/20 ring-4 ring-background shrink-0">
                {displayAvatar ? (
                  <AvatarImage src={displayAvatar} alt={profile.name} className="object-cover" />
                ) : (
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-2xl">
                    {initials}
                  </AvatarFallback>
                )}
              </Avatar>

              <div className="space-y-2">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-foreground">{profile.name}</h1>
                  <p className="text-xs text-muted-foreground font-mono">@{profile.username || profile.email.split('@')[0] || 'user'}</p>
                </div>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-0.5">
                  <Badge variant="default" className="text-xs font-semibold">
                    {profile.role || (isTeacher ? 'Teacher' : 'Student')}
                  </Badge>

                  {isTeacher ? (
                    <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                      {profile.department || 'Computer Science & Engineering'}
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                      {profile.specialization || 'Computer Science'}
                    </Badge>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-muted-foreground pt-1">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-primary" />
                    {profile.email || 'No email provided'}
                  </span>
                  <span className="flex items-center gap-1.5">
                    {isTeacher ? <Building2 className="w-3.5 h-3.5 text-primary" /> : <GraduationCap className="w-3.5 h-3.5 text-primary" />}
                    {isTeacher ? (profile.institution || 'Tech University') : (profile.college || 'Tech University')}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Role-specific Badge / Summary */}
            <div className="w-full md:w-auto flex flex-col items-center md:items-end gap-3 shrink-0">
              {isTeacher ? (
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-center md:text-right w-full md:w-56">
                  <span className="text-xs font-semibold text-muted-foreground block">Faculty ID</span>
                  <span className="text-lg font-bold text-foreground block mt-0.5 font-mono">FAC-2026-089</span>
                  <StatusBadge status="success" className="mt-2">Verified Instructor</StatusBadge>
                </div>
              ) : (
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-center md:text-right w-full md:w-56 space-y-2">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-muted-foreground">Profile Completion</span>
                    <span className="text-primary font-bold">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <StatusBadge status="success" className="mt-1">Placement Ready</StatusBadge>
                </div>
              )}
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Role-Specific Sections */}
      {isTeacher ? (
        /* TEACHER PROFILE VIEW */
        <div className="space-y-6">
          {/* Key Faculty Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Cohorts Managed" value="3 Batches" description="CSE 2026, IT 2026, ECE 2026" icon={Users} />
            <StatCard title="Students Supervised" value="148 Students" description="Active learners" icon={GraduationCap} />
            <StatCard title="Active Drives" value="6 Drives" description="Corporate recruitment" icon={Building2} />
            <StatCard title="AI Mentor Queries" value="342 Sessions" description="Faculty assistant usage" icon={Bot} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Institution Details */}
            <SectionCard title="Institution & Faculty Information">
              <div className="space-y-4 text-sm">
                <div className="flex justify-between border-b border-border/40 pb-2.5">
                  <span className="text-muted-foreground">Institution / College</span>
                  <span className="font-semibold text-foreground">{profile.institution || 'Tech University'}</span>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-2.5">
                  <span className="text-muted-foreground">Department</span>
                  <span className="font-semibold text-foreground">{profile.department || 'Computer Science & Engineering'}</span>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-2.5">
                  <span className="text-muted-foreground">Designation</span>
                  <span className="font-semibold text-foreground">{profile.designation || 'Senior Faculty & Placement Mentor'}</span>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-2.5">
                  <span className="text-muted-foreground">Assigned Role</span>
                  <span className="font-semibold text-foreground">Cohort Supervisor & Placement Coordinator</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">System Status</span>
                  <StatusBadge status="success">Active Faculty Account</StatusBadge>
                </div>
              </div>
            </SectionCard>

            {/* AI Mentor Usage Summary */}
            <SectionCard title="AI Mentor & Teaching Insights">
              <div className="space-y-4 text-sm">
                <div className="p-3.5 rounded-xl bg-muted/20 border border-border/50 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-foreground">Adaptive Teaching Insights</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Your cohort readiness trends indicate 84% readiness in Data Structures & Algorithms.
                    </p>
                  </div>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-2.5">
                  <span className="text-muted-foreground">AI Mentor Assistant</span>
                  <span className="font-semibold text-emerald-500 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Active & Synced
                  </span>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-2.5">
                  <span className="text-muted-foreground">Automated Placement Reports</span>
                  <span className="font-semibold text-foreground">Weekly Digest Enabled</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Resume Review Queue</span>
                  <span className="font-semibold text-foreground">9 Pending Approvals</span>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>
      ) : (
        /* STUDENT PROFILE VIEW */
        <div className="space-y-6">
          {/* Key Student Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Target Role" value={profile.targetRole || 'SDE-1'} description="Primary Career Goal" icon={Target} />
            <StatCard title="Graduation Year" value={String(profile.graduationYear || 2026)} description={profile.degree || 'B.Tech'} icon={GraduationCap} />
            <StatCard title="Resume Status" value="ATS Verified" description="86% Match Score" icon={FileText} />
            <StatCard title="Daily Commitment" value={`${profile.dailyGoalMinutes || 30} min/day`} description="Adaptive Learning" icon={Clock} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Academic & Career Info */}
            <SectionCard title="Academic & Placement Information">
              <div className="space-y-4 text-sm">
                <div className="flex justify-between border-b border-border/40 pb-2.5">
                  <span className="text-muted-foreground">College / University</span>
                  <span className="font-semibold text-foreground">{profile.college || 'Tech University'}</span>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-2.5">
                  <span className="text-muted-foreground">Degree</span>
                  <span className="font-semibold text-foreground">{profile.degree || 'B.Tech Computer Science'}</span>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-2.5">
                  <span className="text-muted-foreground">Specialization</span>
                  <span className="font-semibold text-foreground">{profile.specialization || 'Computer Science & Engineering'}</span>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-2.5">
                  <span className="text-muted-foreground">Graduation Year</span>
                  <span className="font-semibold text-foreground">{profile.graduationYear || 2026}</span>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-2.5">
                  <span className="text-muted-foreground">Target Role</span>
                  <span className="font-semibold text-primary">{profile.targetRole || 'Software Development Engineer'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Target Company</span>
                  <span className="font-semibold text-foreground">{profile.targetCompany || 'Top Tech Companies'}</span>
                </div>
              </div>
            </SectionCard>

            {/* Adaptive Learning Summary */}
            <SectionCard title="Adaptive Learning Profile">
              <div className="space-y-4 text-sm">
                <div className="flex justify-between border-b border-border/40 pb-2.5">
                  <span className="text-muted-foreground">Onboarding Status</span>
                  <StatusBadge status={profile.onboardingCompleted ? 'success' : 'warning'}>
                    {profile.onboardingCompleted ? 'Completed' : 'Pending'}
                  </StatusBadge>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-2.5">
                  <span className="text-muted-foreground">Learning Pace & Style</span>
                  <span className="font-semibold text-foreground">
                    {profile.learningPace || 'Normal'} / {profile.learningStyle || 'Visual'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-2.5">
                  <span className="text-muted-foreground">Daily Goal</span>
                  <span className="font-semibold text-foreground">{profile.dailyGoalMinutes || 30} minutes / day</span>
                </div>
                <div className="space-y-2 pt-1">
                  <span className="text-muted-foreground text-xs font-medium block">Preferred Subjects</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(profile.preferredSubjects && profile.preferredSubjects.length > 0
                      ? profile.preferredSubjects
                      : ['DSA', 'Web Development', 'System Design']
                    ).map((sub, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {sub}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </SectionCard>
          </div>

          {/* Socials & Professional Links */}
          <SectionCard title="Professional Links">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a 
                href={profile.github || '#'} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl border border-border/50 bg-card hover:bg-muted/40 transition-colors"
              >
                <Code2 className="w-5 h-5 text-foreground shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-bold truncate">GitHub Profile</p>
                  <p className="text-[11px] text-muted-foreground truncate">{profile.github || 'Not linked'}</p>
                </div>
              </a>
              <a 
                href={profile.linkedin || '#'} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl border border-border/50 bg-card hover:bg-muted/40 transition-colors"
              >
                <Share2 className="w-5 h-5 text-blue-500 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-bold truncate">LinkedIn Profile</p>
                  <p className="text-[11px] text-muted-foreground truncate">{profile.linkedin || 'Not linked'}</p>
                </div>
              </a>
              <a 
                href={profile.portfolio || '#'} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl border border-border/50 bg-card hover:bg-muted/40 transition-colors"
              >
                <Globe className="w-5 h-5 text-emerald-500 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-bold truncate">Portfolio Website</p>
                  <p className="text-[11px] text-muted-foreground truncate">{profile.portfolio || 'Not linked'}</p>
                </div>
              </a>
            </div>
          </SectionCard>
        </div>
      )}
    </div>
  );
}
