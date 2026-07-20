'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { EducationItem, ExperienceItem } from '@/types/profile';
import { GraduationCap, Briefcase, Calendar, Building, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ExperienceEducationProps {
  education: EducationItem[];
  experience: ExperienceItem[];
}

export function ExperienceEducation({ education, experience }: ExperienceEducationProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Education column */}
      <Card className="bg-card border-border/50 shadow-sm transition-all duration-200 hover:-translate-y-[2px] hover:border-border/60 hover:shadow-md">
        <CardHeader className="border-b border-border/40 pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            Education
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {education && education.length > 0 ? (
            education.map((edu) => (
              <div key={edu.id} className="relative pl-6 border-l-2 border-primary/20 last:border-0 pb-2">
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-foreground">{edu.institution}</h4>
                  <p className="text-xs font-medium text-primary">{edu.degree}</p>
                  <div className="flex items-center gap-4 text-[10px] text-muted-foreground pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {edu.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      CGPA: {edu.cgpa}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <GraduationCap className="w-10 h-10 text-muted-foreground/40 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">No education history added yet.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Experience column */}
      <Card className="bg-card border-border/50 shadow-sm transition-all duration-200 hover:-translate-y-[2px] hover:border-border/60 hover:shadow-md">
        <CardHeader className="border-b border-border/40 pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary" />
            Experience
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {experience && experience.length > 0 ? (
            experience.map((exp) => (
              <div key={exp.id} className="relative pl-6 border-l-2 border-primary/20 last:border-0 pb-2">
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h4 className="font-bold text-sm text-foreground">{exp.role}</h4>
                    <Badge variant="outline" className="text-[8px] px-1.5 py-0.5 border-primary/20 text-primary bg-primary/5">
                      {exp.type}
                    </Badge>
                  </div>
                  <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                    <Building className="w-3.5 h-3.5" />
                    {exp.company}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed pt-1.5">
                    {exp.description}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground pt-2">
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.duration}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Briefcase className="w-10 h-10 text-muted-foreground/40 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">No experience history added yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
