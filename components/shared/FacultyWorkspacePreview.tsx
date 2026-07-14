'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { 
  Users, 
  Key, 
  TrendingUp, 
  FileText, 
  AlertTriangle, 
  Megaphone,
  Plus
} from 'lucide-react';

/**
 * High-fidelity interactive mockup representing the Faculty Workspace Dashboard.
 * Focuses on cohort tracking, resume reviews, performance diagnostics, and announcements.
 */
export function FacultyWorkspacePreview() {
  const shouldReduceMotion = useReducedMotion();

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

  const weakTopics = [
    { topic: 'Linked Lists', count: '18 students struggling', percentage: 42 },
    { topic: 'System Design', count: '14 students struggling', percentage: 51 },
  ];

  const announcements = [
    { message: 'Mock OA scheduled for Friday at 10 AM', date: 'Today' },
    { message: 'Final draft resume submission deadline extended', date: '2 days ago' },
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
            app.cevora.com/faculty/workspace
          </span>
        </div>
        <span className="text-[10px] text-primary font-bold bg-primary/5 border border-primary/10 px-2.5 py-0.5 rounded-full">
          Faculty Workspace
        </span>
      </div>

      {/* Workspace Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h3 className="text-base font-extrabold text-foreground">CSE 2026 Batch - Section A</h3>
          <p className="text-xs text-muted-foreground">Main placement cohort preparation hub</p>
        </div>
        <div className="flex items-center gap-2 bg-background border border-border/60 rounded-md p-1.5 pr-2.5 shadow-sm">
          <div className="w-7 h-7 bg-primary/10 text-primary rounded flex items-center justify-center">
            <Key className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[8px] text-muted-foreground uppercase font-semibold">Access Code</p>
            <p className="text-xs font-mono font-bold text-foreground tracking-wider select-all">CEV-2026-IIT</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Stat 1: Student Count */}
        <motion.div variants={itemVariants} className="bg-background border border-border/60 p-4 rounded-lg flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground font-semibold">Enrolled Students</p>
            <p className="text-lg font-extrabold text-foreground">58 Active</p>
          </div>
        </motion.div>

        {/* Stat 2: Avg Progress */}
        <motion.div variants={itemVariants} className="bg-background border border-border/60 p-4 rounded-lg flex items-center gap-3">
          <div className="w-9 h-9 bg-emerald-500/10 text-emerald-500 rounded-lg flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground font-semibold">Average Progress</p>
            <p className="text-lg font-extrabold text-foreground">74% Complete</p>
          </div>
        </motion.div>

        {/* Stat 3: Pending Resume Reviews */}
        <motion.div variants={itemVariants} className="bg-background border border-border/60 p-4 rounded-lg flex items-center gap-3">
          <div className="w-9 h-9 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground font-semibold">Resume Reviews</p>
            <p className="text-lg font-extrabold text-foreground">12 Pending</p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left Column: Weak Topics Diagnostics */}
        <motion.div
          variants={itemVariants}
          className="bg-background border border-border/60 p-4 rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h4 className="text-xs font-bold text-foreground">Cohort Skill Gaps</h4>
            </div>
            <div className="space-y-3">
              {weakTopics.map((topic) => (
                <div key={topic.topic} className="space-y-1">
                  <div className="flex justify-between text-[10px] font-semibold">
                    <span className="text-foreground">{topic.topic}</span>
                    <span className="text-muted-foreground">{topic.count}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${topic.percentage}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full bg-amber-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-[9px] text-muted-foreground mt-4 pt-2 border-t border-border/40">
            Topic weakness flagged when average accuracy drops below 60%.
          </p>
        </motion.div>

        {/* Right Column: Active Announcements */}
        <motion.div
          variants={itemVariants}
          className="bg-background border border-border/60 p-4 rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-primary" />
              <h4 className="text-xs font-bold text-foreground">Announcements</h4>
            </div>
            <button className="w-5 h-5 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground rounded flex items-center justify-center transition-colors cursor-not-allowed" disabled>
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-3">
            {announcements.map((ann, idx) => (
              <div key={idx} className="text-[11px] border-l border-primary/20 pl-2 py-0.5">
                <p className="text-foreground leading-snug">{ann.message}</p>
                <span className="text-[9px] text-muted-foreground/60 mt-0.5 block">{ann.date}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
