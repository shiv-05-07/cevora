'use client';

import * as React from 'react';
import { StatCard } from '@/components/dashboard/StatCard';
import { FilterBar } from '@/components/shared/FilterBar';
import { SearchInput } from '@/components/shared/SearchInput';
import { Map, CheckCircle2, Clock, Flame } from 'lucide-react';
import { mockRoadmaps } from '@/data/mockRoadmaps';
import { RoadmapCard } from './RoadmapCard';
import { RoadmapDetailsDialog } from './RoadmapDetailsDialog';
import { Roadmap } from '@/types/roadmap';

export function RoadmapsClient() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeFilters, setActiveFilters] = React.useState<Record<string, string[]>>({});
  const [selectedRoadmap, setSelectedRoadmap] = React.useState<Roadmap | null>(null);

  const handleFilterChange = (filterId: string, values: string[]) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterId]: values
    }));
  };

  const filteredRoadmaps = mockRoadmaps.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.role.toLowerCase().includes(searchQuery.toLowerCase());
                          
    const selectedDifficulties = activeFilters['difficulty'] || [];
    const matchesDifficulty = selectedDifficulties.length === 0 || selectedDifficulties.includes(r.difficulty);
    
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="space-y-8">
      {/* Statistics Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Active Roadmaps" value="2" icon={Map} trend={{ value: '+1 this week', isPositive: true }} />
        <StatCard title="Completed" value="1" icon={CheckCircle2} />
        <StatCard title="Learning Hours" value="48h" icon={Clock} trend={{ value: '+12h this week', isPositive: true }} />
        <StatCard title="Current Streak" value="4 Days" icon={Flame} trend={{ value: 'Personal best: 14', isPositive: true }} className="[&_svg]:text-orange-500" />
      </div>

      {/* Search & Filter */}
      <div className="w-full pb-2 hide-scrollbar">
        <FilterBar 
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search roadmaps by title, role, or company..."
          filters={[
            {
              id: 'difficulty',
              label: 'Difficulty',
              options: [
                { label: 'Beginner', value: 'Beginner' },
                { label: 'Intermediate', value: 'Intermediate' },
                { label: 'Advanced', value: 'Advanced' }
              ]
            }
          ]}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          onReset={() => {
            setSearchQuery('');
            setActiveFilters({});
          }}
        />
      </div>

      {/* Roadmaps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredRoadmaps.map(roadmap => (
          <RoadmapCard 
            key={roadmap.id} 
            roadmap={roadmap} 
            onViewDetails={() => setSelectedRoadmap(roadmap)} 
          />
        ))}
        {filteredRoadmaps.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground bg-card rounded-2xl border border-dashed">
            No roadmaps found matching your search.
          </div>
        )}
      </div>

      {/* Details Dialog */}
      <RoadmapDetailsDialog 
        roadmap={selectedRoadmap}
        isOpen={!!selectedRoadmap}
        onClose={() => setSelectedRoadmap(null)}
      />
    </div>
  );
}
