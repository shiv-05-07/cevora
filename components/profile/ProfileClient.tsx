'use client';

import * as React from 'react';
import { AggregatedProfile } from '@/types/profile';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

// Profile sub-components
import { HeroIdentityCard } from './HeroIdentityCard';
import { FeaturedMetricsRibbon } from './FeaturedMetricsRibbon';
import { ProfileCompletionScore } from './ProfileCompletionScore';
import { AboutMe } from './AboutMe';
import { SkillsShowcase } from './SkillsShowcase';
import { FeaturedProjects } from './FeaturedProjects';
import { ExperienceEducation } from './ExperienceEducation';
import { CompanyCompatibility } from './CompanyCompatibility';
import { AICareerSummary } from './AICareerSummary';
import { SocialProfiles } from './SocialProfiles';
import { ProfileStatistics } from './ProfileStatistics';
import { PersonalPreferences } from './PersonalPreferences';

// Reused Analytics components for consistency
import { ProgressTimeline } from '@/components/analytics/ProgressTimeline';
import { AchievementGallery } from '@/components/analytics/AchievementGallery';
import { WeeklyActivityHeatmap } from '@/components/analytics/WeeklyActivityHeatmap';

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'career', label: 'Career' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'companies', label: 'Companies' },
  { id: 'activity', label: 'Activity' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'statistics', label: 'Statistics' },
  { id: 'preferences', label: 'Preferences' }
];

interface ProfileClientProps {
  initialProfile: AggregatedProfile;
}

export function ProfileClient({ initialProfile }: ProfileClientProps) {
  const [recruiterMode, setRecruiterMode] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('overview');

  React.useEffect(() => {
    const handleScroll = () => {
      const sectionElements = SECTIONS.map(s => document.getElementById(s.id));
      
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        setActiveSection(SECTIONS[SECTIONS.length - 1].id);
        return;
      }

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative pb-24">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <PageHeader
          title="Student Profile Hub"
          description="Your centralized living portfolio. Connects your career settings, analytics, achievements, and projects."
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_200px] gap-8">
        
        {/* Main Content Area */}
        <div className="space-y-12 min-w-0 pb-16">
          
          {/* Chapter 1: Overview */}
          <div className="space-y-6">
            <div className="border-b border-border/40 pb-2">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Overview</h3>
            </div>
            
            <div id="overview" className="scroll-mt-28 space-y-6">
              <HeroIdentityCard 
                profile={initialProfile} 
                recruiterMode={recruiterMode} 
                setRecruiterMode={setRecruiterMode} 
              />
              <FeaturedMetricsRibbon profile={initialProfile} />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <AICareerSummary profile={initialProfile} />
                </div>
                <div>
                  <ProfileCompletionScore profile={initialProfile} recruiterMode={recruiterMode} />
                </div>
              </div>
            </div>
          </div>

          {/* Chapter 2: Career & Preferences */}
          <div className="space-y-6">
            <div className="border-b border-border/40 pb-2">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Career Profile</h3>
            </div>
            
            <div id="career" className="scroll-mt-28">
              <AboutMe profile={initialProfile} recruiterMode={recruiterMode} />
            </div>
          </div>

          {/* Chapter 3: Skills */}
          <div className="space-y-6">
            <div className="border-b border-border/40 pb-2">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Technical Skills</h3>
            </div>

            <div id="skills" className="scroll-mt-28">
              <SkillsShowcase profile={initialProfile} />
            </div>
          </div>

          {/* Chapter 4: Projects */}
          <div className="space-y-6">
            <div className="border-b border-border/40 pb-2">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Technical Projects</h3>
            </div>

            <div id="projects" className="scroll-mt-28">
              <FeaturedProjects projects={initialProfile.projects} />
            </div>
          </div>

          {/* Chapter 5: Work Experience & Education */}
          <div className="space-y-6">
            <div className="border-b border-border/40 pb-2">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Experience & Education</h3>
            </div>

            <div id="experience" className="scroll-mt-28 space-y-6">
              <ExperienceEducation 
                education={initialProfile.education} 
                experience={initialProfile.experience} 
              />
              <PersonalPreferences profile={initialProfile} recruiterMode={recruiterMode} />
            </div>
          </div>

          {/* Chapter 6: Companies Match */}
          <div className="space-y-6">
            <div className="border-b border-border/40 pb-2">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Company Compatibility</h3>
            </div>

            <div id="companies" className="scroll-mt-28">
              <CompanyCompatibility companies={initialProfile.analytics.companyReadiness} />
            </div>
          </div>

          {/* Chapter 7: Platform Activity */}
          <div className="space-y-6">
            <div className="border-b border-border/40 pb-2">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Platform Activity</h3>
            </div>

            <div id="activity" className="scroll-mt-28 space-y-6">
              <WeeklyActivityHeatmap data={initialProfile.analytics.heatmap} />
              <ProgressTimeline milestones={initialProfile.analytics.milestones} />
              <SocialProfiles profile={initialProfile} recruiterMode={recruiterMode} />
            </div>
          </div>

          {/* Chapter 8: Achievements */}
          <div className="space-y-6">
            <div className="border-b border-border/40 pb-2">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Achievements</h3>
            </div>

            <div id="achievements" className="scroll-mt-28">
              <AchievementGallery data={initialProfile.analytics.achievements} />
            </div>
          </div>

          {/* Chapter 9: Statistics Charts */}
          <div className="space-y-6">
            <div className="border-b border-border/40 pb-2">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Statistics</h3>
            </div>

            <div id="statistics" className="scroll-mt-28">
              <ProfileStatistics profile={initialProfile} />
            </div>
          </div>

          {/* Chapter 10: Settings preferences */}
          <div className="space-y-6">
            <div id="preferences" className="scroll-mt-28" />
          </div>

        </div>

        {/* Right Sticky Navigation (Desktop Sidebar, hidden on mobile/tablet) */}
        <div className="hidden xl:block">
          <div className="sticky top-28 space-y-4">
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-3">
              Sections
            </div>
            <div className="flex flex-col gap-1 border-l border-border/40">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className={cn(
                    "text-left text-xs font-semibold py-2 px-3 transition-all duration-200 border-l -ml-[1px]",
                    activeSection === section.id
                      ? "text-primary border-primary font-bold"
                      : "text-muted-foreground border-transparent hover:text-foreground"
                  )}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Floating mobile navigation dropdown bottom sheets */}
      <div className="xl:hidden fixed bottom-6 right-6 z-50 bg-background/95 border border-border shadow-xl rounded-xl p-2 w-48">
        <Select value={activeSection} onValueChange={(val) => { if (val) scrollTo(val); }}>
          <SelectTrigger className="w-full text-xs font-bold h-9">
            <SelectValue placeholder="Jump to Section" />
          </SelectTrigger>
          <SelectContent>
            {SECTIONS.map((s) => (
              <SelectItem key={s.id} value={s.id} className="text-xs font-medium">
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

    </div>
  );
}
