'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Certification } from '@/types/profile';
import { Award, ShieldCheck, Calendar, ExternalLink } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';

interface CertificationsProps {
  certifications: Certification[];
}

export function Certifications({ certifications }: CertificationsProps) {
  if (!certifications || certifications.length === 0) {
    return (
      <Card className="bg-card border-border/50 shadow-sm p-8 text-center flex flex-col items-center justify-center min-h-[200px]">
        <Award className="w-10 h-10 text-muted-foreground/60 mb-2" />
        <h3 className="font-bold text-base text-foreground">No Certifications</h3>
        <p className="text-xs text-muted-foreground">Add verified industry certifications to boost your recruiter matching score.</p>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-border/50 shadow-sm transition-all duration-200 hover:-translate-y-[2px] hover:border-border/60 hover:shadow-md">
      <CardHeader className="border-b border-border/40 pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Award className="w-5 h-5 text-primary" />
          Certifications
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {certifications.map((cert) => (
            <div 
              key={cert.id} 
              className="p-4 rounded-xl border border-border/50 bg-muted/10 flex flex-col justify-between transition-all duration-200 hover:border-border/80"
            >
              <div className="space-y-2">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary shrink-0 border border-primary/10">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-xs text-foreground line-clamp-1">{cert.name}</h4>
                    <p className="text-[10px] font-medium text-muted-foreground">{cert.issuer}</p>
                  </div>
                </div>

                <div className="space-y-1 pl-10">
                  <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>Completed {cert.completionDate}</span>
                  </div>
                  <div className="text-[9px] text-muted-foreground">
                    ID: <span className="font-mono">{cert.credentialId}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 pl-10 border-t border-border/30 mt-3">
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: 'outline', size: 'sm' }) + ' h-7 text-[10px] w-full inline-flex items-center'}
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Verify Credential
                </a>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
