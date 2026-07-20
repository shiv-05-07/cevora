'use client';

import * as React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { LearningStyle, RoadmapDifficulty, LearningPace } from '@prisma/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Props {
  learningStyle: LearningStyle | null;
  difficulty: RoadmapDifficulty | null;
  learningPace: LearningPace | null;
  dailyReminder: boolean;
  onChange: (updates: Partial<{
    learningStyle: LearningStyle;
    difficulty: RoadmapDifficulty;
    learningPace: LearningPace;
    dailyReminder: boolean;
  }>) => void;
}

export function PreferencesForm({ learningStyle, difficulty, learningPace, dailyReminder, onChange }: Props) {
  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-6">
        
        {/* Learning Style */}
        <div className="space-y-3">
          <Label>Preferred Learning Style</Label>
          <Select 
            value={learningStyle || ''} 
            onValueChange={(val) => onChange({ learningStyle: val as LearningStyle })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={LearningStyle.VISUAL}>Visual (Videos & Diagrams)</SelectItem>
              <SelectItem value={LearningStyle.AUDITORY}>Auditory (Listening & Lectures)</SelectItem>
              <SelectItem value={LearningStyle.READING_WRITING}>Reading (Articles & Books)</SelectItem>
              <SelectItem value={LearningStyle.KINESTHETIC}>Kinesthetic (Practice & Projects)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Difficulty */}
        <div className="space-y-3">
          <Label>Difficulty Preference</Label>
          <Select 
            value={difficulty || ''} 
            onValueChange={(val) => onChange({ difficulty: val as RoadmapDifficulty })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={RoadmapDifficulty.BEGINNER}>Beginner (Start from scratch)</SelectItem>
              <SelectItem value={RoadmapDifficulty.INTERMEDIATE}>Intermediate (I know the basics)</SelectItem>
              <SelectItem value={RoadmapDifficulty.ADVANCED}>Advanced (Give me hard problems)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Learning Pace */}
        <div className="space-y-3">
          <Label>Learning Pace</Label>
          <Select 
            value={learningPace || ''} 
            onValueChange={(val) => onChange({ learningPace: val as LearningPace })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select pace" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={LearningPace.SLOW}>Slow (Deep understanding, more revision)</SelectItem>
              <SelectItem value={LearningPace.NORMAL}>Normal (Standard pacing)</SelectItem>
              <SelectItem value={LearningPace.FAST}>Fast (Crash course style)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Daily Reminder */}
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label className="text-base">Daily Reminders</Label>
            <p className="text-sm text-muted-foreground">
              Receive notifications to maintain your study streak.
            </p>
          </div>
          <Switch
            checked={dailyReminder}
            onCheckedChange={(val) => onChange({ dailyReminder: val })}
          />
        </div>

      </Card>
    </div>
  );
}
