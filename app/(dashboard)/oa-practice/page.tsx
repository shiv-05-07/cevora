'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { SectionCard } from '@/components/dashboard/SectionCard';
import { ActivityFeed } from '@/components/shared/ActivityFeed';
import { SearchInput } from '@/components/shared/SearchInput';
import { Button } from '@/components/ui/button';
import { Play, ArrowDownUp } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { CompanyPracticeCard } from '@/components/oa/CompanyPracticeCard';
import { TopicPracticeCard } from '@/components/oa/TopicPracticeCard';
import { DailyChallengeCard } from '@/components/oa/DailyChallengeCard';
import { ProblemStatsChart } from '@/components/oa/ProblemStatsChart';

import { 
  STATS_DATA, 
  COMPANIES_DATA, 
  TOPICS_DATA, 
  RECENT_ACTIVITY_DATA, 
  DAILY_CHALLENGE_DATA 
} from '@/components/oa/mockData';

import { MOCK_PROBLEMS } from '@/components/oa/solve/mockProblems';

export default function OAPracticePage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [difficultyFilter, setDifficultyFilter] = React.useState('all');

  const router = useRouter();

  const handlePractice = (id?: string) => {
    const problems = Object.values(MOCK_PROBLEMS);
    let eligibleProblems = problems;

    if (id && id !== 'Daily Challenge') {
      const searchTerm = id.toLowerCase();
      // Try to find problems that match the company tag or topic tag
      eligibleProblems = problems.filter(p => 
        p.companyTags.some(tag => tag.toLowerCase() === searchTerm) ||
        p.topicTags.some(tag => tag.toLowerCase() === searchTerm)
      );
      
      // Fallback to all problems if no exact match found
      if (eligibleProblems.length === 0) eligibleProblems = problems;
    }

    // Pick a random problem from the eligible ones
    const randomProblem = eligibleProblems[Math.floor(Math.random() * eligibleProblems.length)];
    router.push(`/oa-practice/solve/${randomProblem.id}`);
  };

  // Filter companies based on search
  const filteredCompanies = COMPANIES_DATA.filter((c) => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Page Header */}
      <PageHeader
        title="OA Practice"
        description="Familiarize yourself with typical corporate online screening assessments in a timed simulated environment."
        actions={
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <SearchInput
              placeholder="Search companies or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery('')}
              containerClassName="w-full sm:w-[220px]"
            />
            
            <Select value={difficultyFilter} onValueChange={(val) => setDifficultyFilter(val || 'all')}>
              <SelectTrigger className="h-8.5 w-full sm:w-[140px] text-xs font-semibold bg-background/50">
                <div className="flex items-center">
                  <ArrowDownUp className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Difficulty" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-xs">All Difficulties</SelectItem>
                <SelectItem value="easy" className="text-xs">Easy</SelectItem>
                <SelectItem value="medium" className="text-xs">Medium</SelectItem>
                <SelectItem value="hard" className="text-xs">Hard</SelectItem>
              </SelectContent>
            </Select>

            <Button className="w-full sm:w-auto font-semibold shadow-sm" onClick={() => handlePractice()}>
              <Play className="w-4 h-4 mr-2" />
              Start Random
            </Button>
          </div>
        }
      />

      {/* 2. Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {STATS_DATA.map((stat, i) => (
          <MetricCard
            key={i}
            title={stat.title}
            value={stat.value}
            trend={stat.trend as any}
            trendValue={stat.trendValue}
            subtitle={stat.subtitle}
            icon={stat.icon}
            colorVariant={stat.colorVariant as any}
          />
        ))}
      </div>

      {/* 3. Main Layout Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column (2 Spans) */}
        <div className="xl:col-span-2 space-y-6">
          
          <SectionCard title="Company-wise Practice">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCompanies.map((company) => (
                <CompanyPracticeCard
                  key={company.id}
                  id={company.id}
                  name={company.name}
                  logoLetter={company.logoLetter}
                  logoGradient={company.logoGradient}
                  totalQuestions={company.totalQuestions}
                  difficulty={company.difficulty}
                  onPractice={(id) => handlePractice(id)}
                />
              ))}
              {filteredCompanies.length === 0 && (
                <div className="col-span-full py-8 text-center text-sm text-muted-foreground">
                  No companies found matching "{searchQuery}"
                </div>
              )}
            </div>
          </SectionCard>

          <SectionCard title="Topic-wise Practice">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {TOPICS_DATA.filter((t) => t.name.toLowerCase().includes(searchQuery.toLowerCase())).map((topic, i) => (
                <TopicPracticeCard
                  key={i}
                  name={topic.name}
                  completed={topic.completed}
                  total={topic.total}
                  onClick={() => handlePractice(topic.name)}
                />
              ))}
            </div>
          </SectionCard>

        </div>

        {/* Right Column (1 Span) */}
        <div className="space-y-6">
          
          <DailyChallengeCard
            title={DAILY_CHALLENGE_DATA.title}
            company={DAILY_CHALLENGE_DATA.company}
            difficulty={DAILY_CHALLENGE_DATA.difficulty}
            points={DAILY_CHALLENGE_DATA.points}
            estimatedTime={DAILY_CHALLENGE_DATA.estimatedTime}
            description={DAILY_CHALLENGE_DATA.description}
            onStart={() => handlePractice('Daily Challenge')}
          />

          <SectionCard title="Recent Activity">
            <div className="pt-2">
              <ActivityFeed items={RECENT_ACTIVITY_DATA} />
            </div>
          </SectionCard>

          <ProblemStatsChart />

        </div>
      </div>
    </div>
  );
}
