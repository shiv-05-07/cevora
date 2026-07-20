'use client';

import { OnboardingState } from '@/features/onboarding/types';

import * as React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

const TIME_OPTIONS = [15, 30, 45, 60, 90, 120];

interface Props {
  dailyStudyTime: number;
  preferredStudyTime: string;
  onChange: (updates: Partial<OnboardingState>) => void;
}

export function StudyScheduleForm({ dailyStudyTime, preferredStudyTime, onChange }: Props) {
  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <Label className="text-base">Daily Study Goal</Label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {TIME_OPTIONS.map((time) => {
            const isSelected = dailyStudyTime === time;
            return (
              <div
                key={time}
                onClick={() => onChange({ dailyStudyTime: time })}
                className={cn(
                  'flex items-center justify-center rounded-md border p-3 cursor-pointer text-sm font-medium transition-colors hover:bg-muted',
                  isSelected ? 'border-primary bg-primary text-primary-foreground hover:bg-primary/90' : 'border-border'
                )}
              >
                {time} m
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-3 pt-4">
        <Label>Preferred Study Time</Label>
        <Select 
          value={preferredStudyTime} 
          onValueChange={(val) => onChange({ preferredStudyTime: val as string })}
        >
          <SelectTrigger>
            <SelectValue placeholder="When do you focus best?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Morning">Morning</SelectItem>
            <SelectItem value="Afternoon">Afternoon</SelectItem>
            <SelectItem value="Evening">Evening</SelectItem>
            <SelectItem value="Night">Night</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="pt-4 border-t">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">Calculated Weekly Target</span>
          <span className="text-lg font-bold">{(dailyStudyTime * 7) / 60} hrs / week</span>
        </div>
      </div>
    </Card>
  );
}
