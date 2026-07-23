'use client';

import React, { useEffect } from 'react';
import { useKnowledgeStore } from '@/store/useKnowledgeStore';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { ConceptFilters } from '@/components/knowledge/ConceptFilters';
import { KnowledgeCard } from '@/components/knowledge/KnowledgeCard';
import { Loader2, BookOpen } from 'lucide-react';

export default function ConceptMasteryPage() {
  const {
    conceptMasteries,
    selectedSubject,
    searchQuery,
    filterLevel,
    isLoading,
    fetchMastery,
    setSelectedSubject,
    setSearchQuery,
    setFilterLevel
  } = useKnowledgeStore();

  useEffect(() => {
    fetchMastery(selectedSubject);
  }, [fetchMastery, selectedSubject]);

  // Client filtering
  const filteredConcepts = conceptMasteries.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.concept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.concept.category && item.concept.category.toLowerCase().includes(searchQuery.toLowerCase()));

    const normScore = item.masteryScore <= 1.0 ? item.masteryScore * 100 : item.masteryScore;
    
    let matchesLevel = true;
    if (filterLevel === 'WEAK') {
      matchesLevel = normScore < 60;
    } else if (filterLevel === 'STRONG') {
      matchesLevel = normScore >= 75;
    }

    return matchesSearch && matchesLevel;
  });

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Concept Mastery Explorer"
        description="Continuously tracked mastery across core Computer Science, Aptitude, and Communication concepts."
      />

      <ConceptFilters
        selectedSubject={selectedSubject}
        searchQuery={searchQuery}
        filterLevel={filterLevel}
        onSubjectChange={setSelectedSubject}
        onSearchChange={setSearchQuery}
        onFilterLevelChange={setFilterLevel}
      />

      {isLoading ? (
        <div className="py-20 text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
          <p className="text-xs text-muted-foreground font-semibold">Loading concept masteries...</p>
        </div>
      ) : filteredConcepts.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-border/60 rounded-2xl p-8 bg-card/40 space-y-3">
          <BookOpen className="w-10 h-10 text-muted-foreground mx-auto" />
          <h3 className="font-bold text-base text-foreground">No concepts found</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Try adjusting your search query or subject filters. Complete diagnostic tests or practice problems to populate masteries.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConcepts.map((item) => (
            <KnowledgeCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
