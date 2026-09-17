'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Code,
  ExternalLink,
  Building2,
  Map,
  Bot,
  FileSearch,
  Video,
  ArrowRight,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/dashboard/StatusBadge';

export function SecondaryContentSection() {
  return (
    <div className="space-y-6 pt-4 border-t border-border/40">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-foreground">Practice & Preparation Hub</h3>
          <p className="text-xs text-muted-foreground">
            Targeted problem solving, company preparation, and career resources.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Practice Hub Card */}
        <div className="p-5 rounded-2xl border border-border/60 bg-card shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Code className="w-4 h-4 text-emerald-500" />
              Practice Environment
            </span>
            <Badge variant="outline" className="text-[10px] font-bold">Active Track</Badge>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-foreground">Curated Problem Solving</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Solve company-specific OA questions or follow your active topic track.
            </p>
          </div>

          <div className="space-y-2 pt-1">
            <Link href="/oa-practice" className="block">
              <Button size="sm" className="w-full font-bold text-xs justify-between">
                <span>Solve OA Problems</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>

            <a
              href="https://leetcode.com/problemset/all/"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button variant="outline" size="sm" className="w-full text-xs font-semibold justify-between border-border/60 text-muted-foreground hover:text-foreground">
                <span>External LeetCode Curated</span>
                <ExternalLink className="w-3 h-3 text-muted-foreground" />
              </Button>
            </a>
          </div>
        </div>

        {/* Company Opportunities Preview */}
        <div className="p-5 rounded-2xl border border-border/60 bg-card shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-primary" />
              Upcoming Hiring
            </span>
            <Link href="/companies">
              <span className="text-[11px] font-bold text-primary hover:underline">View All</span>
            </Link>
          </div>

          <div className="space-y-2.5">
            {[
              { name: 'Amazon', role: 'SDE Intern', timing: 'OA in 3 days', status: 'warning' as const },
              { name: 'Google', role: 'Software Engineer', timing: 'Applications Open', status: 'info' as const },
              { name: 'Microsoft', role: 'Software Engineer', timing: 'Shortlisting', status: 'neutral' as const },
            ].map((opp, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-lg bg-muted/5 border border-border/30">
                <div>
                  <span className="font-bold text-foreground block">{opp.name}</span>
                  <span className="text-[10px] text-muted-foreground">{opp.timing}</span>
                </div>
                <StatusBadge status={opp.status}>{opp.role}</StatusBadge>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Career Tools */}
        <div className="p-5 rounded-2xl border border-border/60 bg-card shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Map className="w-4 h-4 text-amber-500" />
              Quick Career Tools
            </span>
          </div>

          <div className="space-y-2">
            <Link href="/resume" className="flex items-center justify-between p-2.5 rounded-xl border border-border/40 hover:border-primary/40 transition-colors group text-xs">
              <div className="flex items-center gap-2">
                <FileSearch className="w-4 h-4 text-primary" />
                <span className="font-bold text-foreground group-hover:text-primary transition-colors">Resume Analyzer</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link href="/interview" className="flex items-center justify-between p-2.5 rounded-xl border border-border/40 hover:border-primary/40 transition-colors group text-xs">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-indigo-400" />
                <span className="font-bold text-foreground group-hover:text-primary transition-colors">Mock Interview</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link href="/mentor" className="flex items-center justify-between p-2.5 rounded-xl border border-border/40 hover:border-primary/40 transition-colors group text-xs">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-amber-500" />
                <span className="font-bold text-foreground group-hover:text-primary transition-colors">AI Study Mentor</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
