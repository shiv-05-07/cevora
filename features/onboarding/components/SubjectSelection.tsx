'use client';

import * as React from 'react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const SUBJECTS = [
  'DSA',
  'Web Development',
  'App Development',
  'AI / ML',
  'Data Science',
  'DevOps',
  'DBMS',
  'Operating Systems',
  'Computer Networks',
  'Aptitude',
];

interface Props {
  selectedSubjects: string[];
  onChange: (subjects: string[]) => void;
}

export function SubjectSelection({ selectedSubjects, onChange }: Props) {
  const toggleSubject = (subject: string) => {
    if (selectedSubjects.includes(subject)) {
      onChange(selectedSubjects.filter(s => s !== subject));
    } else {
      onChange([...selectedSubjects, subject]);
    }
  };

  return (
    <Card className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SUBJECTS.map((subject) => {
          const isSelected = selectedSubjects.includes(subject);

          return (
            <div
              key={subject}
              onClick={() => toggleSubject(subject)}
              className={cn(
                'flex items-center space-x-3 rounded-lg border p-4 cursor-pointer transition-colors hover:bg-muted/50',
                isSelected ? 'border-primary bg-primary/5' : 'border-border'
              )}
            >
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => toggleSubject(subject)}
              />
              <Label className="font-medium cursor-pointer flex-1">{subject}</Label>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
