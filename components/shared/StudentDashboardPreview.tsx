'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  CheckSquare, 
  Calendar, 
  FileText, 
  Map, 
  Activity, 
  Play, 
  TrendingUp, 
  Briefcase,
  ArrowRight
} from 'lucide-react';

/**
 * High-fidelity interactive mockup representing the Student Dashboard.
 * Focuses on placement preparation stats, roadmaps, resume analysis, and mock tests.
 */
export function StudentDashboardPreview() {
  const [resumeScore, setResumeScore] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setResumeScore(82);
      return;
    }

    let start = 0;
    const end = 82;
    const duration = 1200;
    const incrementTime = Math.floor(duration / end);

    const timer = setInterval(() => {
      start += 1;
      setResumeScore(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [shouldReduceMotion]);

  const containerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' as const },
    },
  };

  const upcomingCompanies = [
    { name: 'Google', date: 'July 20', role: 'SWE Intern', logoBg: 'bg-red-500/10 text-red-500' },
    { name: 'Microsoft', date: 'July 25', role: 'SDE-1', logoBg: 'bg-blue-500/10 text-blue-500' },
  ];

  const recentActivities = [
    { title: 'Completed Stack Questions OA', time: '2 hrs ago' },
    { title: 'Submitted Resume for Review', time: 'Yesterday' },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full rounded-xl border border-border bg-card p-5 sm:p-6 shadow-md shadow-primary/5 overflow-hidden select-none hover:shadow-lg transition-shadow duration-300"
    >
      {/* Browser Tab Mockup */}
      <div className="flex items-center justify-between border-b border-border/80 pb-4 mb-6">
        <div className="flex items-center gap-1.5">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
          </div>
          <span className="text-[10px] text-muted-foreground ml-3 font-mono tracking-tight bg-muted/40 px-2.5 py-0.5 rounded border border-border/40">
            app.cevora.com/dashboard
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] text-muted-foreground font-semibold">Active Prep Workspace</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Column 1: Profile Resume Health & Goals */}
        <div className="lg:col-span-1 space-y-4 flex flex-col justify-between">
          
          {/* Resume Health Score */}
          <motion.div
            variants={itemVariants}
            className="bg-background border border-border/60 p-4 rounded-lg flex flex-col items-center text-center shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
          >
            <div className="w-10 h-10 bg-primary/5 text-primary rounded-full flex items-center justify-center mb-2.5">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-foreground">Resume ATS Score</h4>
            <p className="text-3xl font-extrabold text-primary tracking-tight mt-1">
              {resumeScore}%
            </p>
            <span className="text-[9px] font-semibold text-emerald-600 bg-emerald-500/5 px-2 py-0.5 rounded-full border border-emerald-500/10 mt-2">
              Ready for Submission
            </span>
          </motion.div>

          {/* Today's Goal */}
          <motion.div
            variants={itemVariants}
            className="bg-background border border-border/60 p-4 rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
          >
            <div className="flex items-center gap-2 mb-2">
              <CheckSquare className="w-4 h-4 text-primary" />
              <h4 className="text-xs font-bold text-foreground">Today&apos;s Goal</h4>
            </div>
            <ul className="space-y-2 text-[11px] text-muted-foreground">
              <li className="flex items-start gap-1.5">
                <span className="text-primary font-bold mt-0.5">•</span>
                <span>Solve 2 Stacks & Queues problems</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-primary font-bold mt-0.5">•</span>
                <span>Review resume formatting feedback</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Column 2: Upcoming Companies & Roadmap Progress */}
        <div className="lg:col-span-1 space-y-4 flex flex-col justify-between">
          
          {/* Upcoming Companies */}
          <motion.div
            variants={itemVariants}
            className="bg-background border border-border/60 p-4 rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex-1 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Briefcase className="w-4 h-4 text-primary" />
                <h4 className="text-xs font-bold text-foreground">Upcoming Recruiters</h4>
              </div>
              <div className="space-y-3">
                {upcomingCompanies.map((company) => (
                  <div key={company.name} className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold ${company.logoBg}`}>
                        {company.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{company.name}</p>
                        <p className="text-[9px] text-muted-foreground">{company.role}</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono bg-muted/60 px-1.5 py-0.5 rounded text-muted-foreground">
                      {company.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-[10px] text-primary font-semibold flex items-center gap-1 mt-4 pt-2 border-t border-border/40 cursor-pointer hover:underline">
              <span>View recruiting calendar</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </motion.div>

          {/* Roadmap Progress */}
          <motion.div
            variants={itemVariants}
            className="bg-background border border-border/60 p-4 rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Map className="w-4 h-4 text-primary" />
                <h4 className="text-xs font-bold text-foreground">Roadmap Progress</h4>
              </div>
              <span className="text-[10px] font-bold text-primary">68%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '68%' }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full bg-primary"
              />
            </div>
            <p className="text-[9px] text-muted-foreground mt-2">
              Product-focused Preparation Roadmap
            </p>
          </motion.div>
        </div>

        {/* Column 3: Recent Activity & Quick Actions */}
        <div className="lg:col-span-1 space-y-4 flex flex-col justify-between">
          
          {/* Recent Activity */}
          <motion.div
            variants={itemVariants}
            className="bg-background border border-border/60 p-4 rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
          >
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 text-primary" />
              <h4 className="text-xs font-bold text-foreground">Recent Activity</h4>
            </div>
            <div className="space-y-3">
              {recentActivities.map((act, idx) => (
                <div key={idx} className="text-[11px] flex justify-between gap-2 border-l border-primary/20 pl-2">
                  <p className="text-muted-foreground leading-tight">{act.title}</p>
                  <span className="text-[9px] text-muted-foreground/60 shrink-0">{act.time}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            variants={itemVariants}
            className="bg-background border border-border/60 p-4 rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
          >
            <h4 className="text-xs font-bold text-foreground mb-3">Quick Actions</h4>
            <div className="grid grid-cols-1 gap-2">
              <button className="flex items-center justify-between text-[11px] font-semibold bg-primary/5 text-primary border border-primary/10 hover:bg-primary hover:text-primary-foreground py-2 px-3 rounded-md transition-all duration-200 cursor-not-allowed" disabled>
                <span>Analyze Resume</span>
                <Play className="w-3 h-3 fill-current opacity-60" />
              </button>
              <button className="flex items-center justify-between text-[11px] font-semibold bg-primary/5 text-primary border border-primary/10 hover:bg-primary hover:text-primary-foreground py-2 px-3 rounded-md transition-all duration-200 cursor-not-allowed" disabled>
                <span>Interview Practice</span>
                <Play className="w-3 h-3 fill-current opacity-60" />
              </button>
              <button className="flex items-center justify-between text-[11px] font-semibold bg-primary/5 text-primary border border-primary/10 hover:bg-primary hover:text-primary-foreground py-2 px-3 rounded-md transition-all duration-200 cursor-not-allowed" disabled>
                <span>Practice OA</span>
                <Play className="w-3 h-3 fill-current opacity-60" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
