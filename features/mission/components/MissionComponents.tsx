import React from 'react';
import { MissionState, MissionStage } from '../types';

export function MissionSkeleton() {
  return (
    <div className="p-6 space-y-4 animate-pulse">
      <div className="h-8 bg-muted rounded w-1/3"></div>
      <div className="h-4 bg-muted rounded w-1/2"></div>
      <div className="h-64 bg-muted rounded w-full"></div>
    </div>
  );
}

export function MissionHeroCard({ mission }: { mission: MissionState['mission'] }) {
  return (
    <div className="p-6 border rounded-lg shadow-sm bg-card mb-6">
      <h1 className="text-2xl font-bold mb-2">{mission.title}</h1>
      <div className="flex gap-4 text-sm text-muted-foreground">
        <span>Difficulty: {mission.difficulty}</span>
        <span>XP: {mission.xpAwarded}</span>
      </div>
    </div>
  );
}

export function MissionReasonCard({ reason }: { reason: string }) {
  return (
    <div className="p-4 bg-primary/10 border border-primary/20 rounded-md mb-6">
      <p className="text-primary-foreground font-medium text-sm">🎯 Why this mission?</p>
      <p className="text-sm mt-1">{reason}</p>
    </div>
  );
}

export function LessonCard({ lesson, onComplete }: { lesson: any, onComplete: () => void }) {
  return (
    <div className="p-6 border rounded-lg shadow-sm bg-card space-y-4">
      <h2 className="text-xl font-semibold">{lesson.title}</h2>
      <div className="prose dark:prose-invert">
        <p>{lesson.content}</p>
      </div>
      <button 
        onClick={onComplete}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
      >
        Continue to Practice
      </button>
    </div>
  );
}

export function PracticeCard({ practice, onComplete }: { practice: any, onComplete: () => void }) {
  return (
    <div className="p-6 border rounded-lg shadow-sm bg-card space-y-4">
      <h2 className="text-xl font-semibold">Practice</h2>
      <p>{practice.question}</p>
      <div className="space-y-2">
        {practice.options.map((opt: any) => (
          <button key={opt.id} className="block w-full text-left p-3 border rounded-md hover:bg-muted">
            {opt.text}
          </button>
        ))}
      </div>
      <button 
        onClick={onComplete}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
      >
        Submit & Continue
      </button>
    </div>
  );
}

export function ReflectionCard({ onSubmit }: { onSubmit: (data: any) => void }) {
  return (
    <div className="p-6 border rounded-lg shadow-sm bg-card space-y-4">
      <h2 className="text-xl font-semibold">Reflection</h2>
      <p>How confident do you feel about this concept?</p>
      <div className="flex gap-2">
        {[1,2,3,4,5].map(rating => (
          <button key={rating} className="w-10 h-10 border rounded-full hover:bg-primary hover:text-primary-foreground">
            {rating}
          </button>
        ))}
      </div>
      <button 
        onClick={() => onSubmit({ confidenceRating: 5, timeSpentSeconds: 120 })}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
      >
        Complete Mission
      </button>
    </div>
  );
}

export function CompletionDialog({ xp }: { xp: number }) {
  return (
    <div className="p-8 text-center border rounded-lg bg-green-500/10 border-green-500/20">
      <h2 className="text-2xl font-bold text-green-600 mb-2">Mission Completed!</h2>
      <p className="text-lg">You earned {xp} XP</p>
    </div>
  );
}
