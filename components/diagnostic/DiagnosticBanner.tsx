'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Target, ArrowRight, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DiagnosticBannerProps {
  completed?: boolean;
  status?: string;
}

export function DiagnosticBanner({ completed = false, status = 'PENDING' }: DiagnosticBannerProps) {
  if (completed || status === 'COMPLETED' || status === 'LOCKED') {
    return (
      <Card className="bg-gradient-to-r from-emerald-500/10 via-primary/5 to-transparent border-emerald-500/20 shadow-sm relative overflow-hidden">
        <CardContent className="p-5 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-foreground">Diagnostic Assessment Baseline Completed</h3>
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 text-xs font-semibold">
                  Locked
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Your AI Learner Model is active and dynamically updates concept mastery from daily activities.
              </p>
            </div>
          </div>
          <Link href="/dashboard/diagnostic/result">
            <Button variant="outline" size="sm" className="shrink-0 font-semibold border-emerald-500/30 hover:bg-emerald-500/10">
              View Diagnostic Report
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="bg-gradient-to-r from-primary/15 via-primary/10 to-indigo-500/10 border-primary/30 shadow-md relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <CardContent className="p-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary text-primary-foreground font-bold px-2.5 py-0.5 text-xs flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Action Required
                </Badge>
                <span className="text-xs text-muted-foreground font-medium">Takes 15 mins • 15 Adaptive Questions</span>
              </div>
              <h2 className="text-xl font-extrabold tracking-tight text-foreground">
                You haven't completed your diagnostic yet.
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Take our adaptive diagnostic assessment to establish your placement baseline, uncover weak concepts across DSA, DBMS, OS, and SQL, and generate your custom AI readiness roadmap.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <Link href="/dashboard/diagnostic/start">
                <Button size="lg" className="font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                  Start Diagnostic
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
