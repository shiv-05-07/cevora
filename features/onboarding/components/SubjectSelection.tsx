'use client';

import * as React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Code2,
  Globe,
  Smartphone,
  Brain,
  BarChart3,
  Server,
  Database,
  Cpu,
  Network,
  Calculator,
  CheckCircle2,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const SUBJECT_OPTIONS = [
  {
    id: 'DSA',
    name: 'DSA',
    label: 'Placement Data Structures & Algorithms',
    description: 'Arrays, Two Pointers, Trees, Graphs, Binary Search, and Dynamic Programming.',
    icon: Code2,
    difficulty: 'Intermediate',
  },
  {
    id: 'Web Development',
    name: 'Web Development',
    label: 'Full-Stack Web Development',
    description: 'HTML, CSS, JavaScript, React, Node.js, REST APIs, and deployment.',
    icon: Globe,
    difficulty: 'Intermediate',
  },
  {
    id: 'App Development',
    name: 'App Development',
    label: 'Mobile App Development',
    description: 'Cross-platform mobile apps using React Native, Flutter, and APIs.',
    icon: Smartphone,
    difficulty: 'Intermediate',
  },
  {
    id: 'AI / ML',
    name: 'AI / ML',
    label: 'Artificial Intelligence & Machine Learning',
    description: 'Python numerical computing, NumPy, Pandas, Scikit-Learn, and ML pipelines.',
    icon: Brain,
    difficulty: 'Advanced',
  },
  {
    id: 'Data Science',
    name: 'Data Science',
    label: 'Data Science & Analytics',
    description: 'Data wrangling, statistical inference, Matplotlib/Seaborn, and SQL aggregation.',
    icon: BarChart3,
    difficulty: 'Intermediate',
  },
  {
    id: 'DBMS',
    name: 'DBMS',
    label: 'Database Management Systems',
    description: 'Relational algebra, SQL queries, 1NF-3NF/BCNF normalization, B+ Trees, and ACID.',
    icon: Database,
    difficulty: 'Beginner',
  },
  {
    id: 'Operating Systems',
    name: 'Operating Systems',
    label: 'Core Operating Systems',
    description: 'Process state transitions, CPU scheduling, semaphores, paging, and virtual memory.',
    icon: Cpu,
    difficulty: 'Intermediate',
  },
  {
    id: 'Computer Networks',
    name: 'Computer Networks',
    label: 'Computer Networks & Security',
    description: 'OSI/TCP-IP models, IP addressing, subnetting, TCP/UDP, DNS, and HTTP/S.',
    icon: Network,
    difficulty: 'Beginner',
  },
  {
    id: 'DevOps',
    name: 'DevOps',
    label: 'DevOps & Cloud Infrastructure',
    description: 'Linux CLI, Git branching, Docker containers, GitHub Actions CI/CD, and Terraform.',
    icon: Server,
    difficulty: 'Advanced',
  },
  {
    id: 'Aptitude',
    name: 'Aptitude',
    label: 'Aptitude & Quantitative Reasoning',
    description: 'Quantitative math, logical reasoning, speed calculations, and placement OA prep.',
    icon: Calculator,
    difficulty: 'Beginner',
  },
];

interface Props {
  selectedSubject: string | null;
  onChange: (subject: string) => void;
}

export function SubjectSelection({ selectedSubject, onChange }: Props) {
  return (
    <div className="space-y-6">
      {/* Supporting Guidance Note */}
      <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 flex items-start gap-3">
        <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <p className="text-xs sm:text-sm font-medium text-foreground leading-relaxed">
          <strong className="font-extrabold">Flexible Learning Path:</strong> You can explore and study other subjects anytime. For now, this primary focus selection helps Cevora configure your initial roadmap and daily missions.
        </p>
      </div>

      {/* Radio-Style Single-Select Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SUBJECT_OPTIONS.map((subject) => {
          const isSelected = selectedSubject === subject.name || selectedSubject === subject.id;
          const IconComponent = subject.icon;

          return (
            <Card
              key={subject.id}
              onClick={() => onChange(subject.name)}
              className={cn(
                'relative p-5 cursor-pointer transition-all duration-200 border flex flex-col justify-between gap-3 group hover:border-primary/50 hover:shadow-xs',
                isSelected
                  ? 'border-primary bg-primary/5 shadow-xs ring-1 ring-primary/40'
                  : 'border-border/70 bg-card hover:bg-muted/30'
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors',
                  isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground group-hover:text-foreground'
                )}>
                  <IconComponent className="w-5 h-5" />
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px] font-bold border-border/60">
                    {subject.difficulty}
                  </Badge>
                  {isSelected ? (
                    <Badge variant="default" className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Focus
                    </Badge>
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-border/80 group-hover:border-primary/50 transition-colors" />
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="font-extrabold text-base text-foreground group-hover:text-primary transition-colors">
                  {subject.name}
                </h3>
                <p className="text-xs font-medium text-muted-foreground leading-relaxed line-clamp-2">
                  {subject.description}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
