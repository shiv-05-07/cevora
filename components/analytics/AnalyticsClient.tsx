'use client';

import * as React from 'react';
import { TimeFilter } from '@/types/analytics';
import { buildAnalytics } from '@/data/mockAnalytics';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Import child components
import { AnalyticsHero } from './AnalyticsHero';
import { AINarrative } from './AINarrative';
import { AIActionCenter } from './AIActionCenter';
import { WeeklyPlanner } from './WeeklyPlanner';
import { MetricsGrid } from './MetricsGrid';
import { PlacementReadinessCard } from './PlacementReadinessCard';
import { CompanyReadinessMatrix } from './CompanyReadinessMatrix';
import { PlacementForecastCard } from './PlacementForecast';
import { CompanyUnlockTimeline } from './CompanyUnlockTimeline';
import { SkillGapAnalysis } from './SkillGapAnalysis';
import { PerformanceTrend } from './PerformanceTrend';
import { SkillRadar } from './SkillRadar';
import { WeeklyActivityHeatmap } from './WeeklyActivityHeatmap';
import { ProgressTimeline } from './ProgressTimeline';
import { AchievementGallery } from './AchievementGallery';
import { ReadinessSimulator } from './ReadinessSimulator';
import { DashboardOnboarding } from './DashboardOnboarding';
import { CareerHealth } from './CareerHealth';

const SECTIONS = [
  { id: 'hero', label: 'Overview' },
  { id: 'health', label: 'Career Health' },
  { id: 'brief', label: 'AI Brief' },
  { id: 'action', label: 'Action Center' },
  { id: 'plan', label: 'Today\'s Plan' },
  { id: 'kpis', label: 'KPIs' },
  { id: 'readiness', label: 'Readiness' },
  { id: 'companies', label: 'Target Companies' },
  { id: 'forecast', label: 'Forecast' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'gaps', label: 'Skill Gaps' },
  { id: 'trends', label: 'Trends' },
  { id: 'skills', label: 'Skill Radar' },
  { id: 'activity', label: 'Activity' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'simulator', label: 'Simulator' },
];

export function AnalyticsClient() {
  const [timeFilter, setTimeFilter] = React.useState<TimeFilter>('30d');
  const [activeSection, setActiveSection] = React.useState('hero');
  
  const data = React.useMemo(() => buildAnalytics(timeFilter), [timeFilter]);

  React.useEffect(() => {
    const handleScroll = () => {
      const sectionElements = SECTIONS.map(s => document.getElementById(s.id));
      
      // Check if user has scrolled to the absolute bottom
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
    handleScroll(); // Trigger once on mount
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
      {/* Top Header with Global Time Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <PageHeader
          title="Career Intelligence"
          description="Your centralized dashboard for placement readiness and learning insights."
        />
        
        <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-lg border">
          {(['7d', '30d', '3m', '6m', '1y'] as TimeFilter[]).map((filter) => (
            <Button
              key={filter}
              variant={timeFilter === filter ? 'default' : 'ghost'}
              size="sm"
              className={cn("h-7 px-3 text-xs font-medium rounded-md", timeFilter !== filter && "text-muted-foreground")}
              onClick={() => setTimeFilter(filter)}
            >
              {filter.toUpperCase()}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_200px] gap-8">
        
        {/* Main Content Area */}
        <div className="space-y-16 min-w-0 pb-16">
          <DashboardOnboarding />

          {/* CHAPTER 1: CAREER OVERVIEW */}
          <div className="space-y-8">
            <div className="border-b border-border/40 pb-2 mb-6">
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Career Overview</h3>
            </div>
            
            <div id="hero" className="scroll-mt-32">
              <AnalyticsHero data={data.hero} />
            </div>
            <div id="health" className="scroll-mt-32">
              <CareerHealth data={data.readiness} />
            </div>
            <div id="brief" className="scroll-mt-32">
              <AINarrative data={data.brief} />
            </div>
            <div id="action" className="scroll-mt-32">
              <AIActionCenter data={data.actionCenter} />
            </div>
          </div>

          {/* CHAPTER 2: PROGRESS */}
          <div className="space-y-8">
            <div className="border-b border-border/40 pb-2 mb-6">
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Progress</h3>
            </div>

            <div id="kpis" className="scroll-mt-32">
              <MetricsGrid kpis={data.kpis} />
            </div>
            <div id="readiness" className="scroll-mt-32">
              <PlacementReadinessCard data={data.readiness} />
            </div>
            <div id="forecast" className="scroll-mt-32">
              <PlacementForecastCard data={data.forecast} />
            </div>
          </div>

          {/* CHAPTER 3: CAREER PLANNING */}
          <div className="space-y-8">
            <div className="border-b border-border/40 pb-2 mb-6">
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Career Planning</h3>
            </div>

            <div id="plan" className="scroll-mt-32">
              <WeeklyPlanner data={data.weeklyPlan} />
            </div>
            <div id="roadmap" className="scroll-mt-32">
              <CompanyUnlockTimeline data={data.unlockTimeline} />
            </div>
            <div id="companies" className="scroll-mt-32">
              <CompanyReadinessMatrix companies={data.companyReadiness} />
            </div>
          </div>

          {/* CHAPTER 4: SKILLS */}
          <div className="space-y-8">
            <div className="border-b border-border/40 pb-2 mb-6">
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Skills Analysis</h3>
            </div>

            <div id="gaps" className="scroll-mt-32">
              <SkillGapAnalysis skillGaps={data.skillGaps} />
            </div>
            <div id="skills" className="scroll-mt-32">
              <SkillRadar data={data.skills} />
            </div>
          </div>

          {/* CHAPTER 5: ACTIVITY */}
          <div className="space-y-8">
            <div className="border-b border-border/40 pb-2 mb-6">
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Activity & Trends</h3>
            </div>

            <div id="trends" className="scroll-mt-32">
              <PerformanceTrend data={data.performanceTrend} />
            </div>
            <div id="activity" className="scroll-mt-32">
              <WeeklyActivityHeatmap data={data.heatmap} />
            </div>
            <div id="timeline" className="scroll-mt-32">
              <ProgressTimeline milestones={data.milestones} />
            </div>
          </div>

          {/* CHAPTER 6: GROWTH */}
          <div className="space-y-8">
            <div className="border-b border-border/40 pb-2 mb-6">
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Growth & Projections</h3>
            </div>

            <div id="achievements" className="scroll-mt-32">
              <AchievementGallery data={data.achievements} />
            </div>
            <div id="simulator" className="scroll-mt-32">
              <ReadinessSimulator 
                options={data.simulatorOptions} 
                baseReadiness={data.hero.readinessScore}
                baseAmazon={data.companyReadiness.find(c => c.name === 'Amazon')?.overallReadiness || 0}
                baseInterview={data.readiness.behavioral || 0}
              />
            </div>
          </div>
        </div>

        {/* Floating Sticky Nav (Desktop Only) */}
        <div className="hidden xl:block relative">
          <div className="sticky top-24 pl-4 border-l border-border/40">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 pl-2">
              Analytics
            </h4>
            <nav className="flex flex-col space-y-1">
              {SECTIONS.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollTo(section.id)}
                    className={cn(
                      "flex items-center gap-3 px-2 py-1.5 text-sm font-medium rounded-md transition-all text-left",
                      isActive 
                        ? "text-primary bg-primary/5" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <div className={cn(
                      "w-1.5 h-1.5 rounded-full transition-colors",
                      isActive ? "bg-primary" : "bg-transparent border border-muted-foreground/30"
                    )} />
                    {section.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

      </div>
    </div>
  );
}
