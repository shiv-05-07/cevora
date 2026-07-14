'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, Play, Award, Zap, BookOpen } from 'lucide-react';

/**
 * High-fidelity, animated interactive dashboard mockup for the Hero Section.
 * Implements:
 * - Upward counting animation for diagnostic stats score.
 * - Sequential cascaded card entry animations respecting prefers-reduced-motion.
 * - Progressive animated skill bar track metrics.
 * - Premium shadows, spacing, and dashboard realism.
 */
export function HeroShowcase() {
  const [score, setScore] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // Upward counting stats score logic
  useEffect(() => {
    if (shouldReduceMotion) {
      const delayTimer = setTimeout(() => {
        setScore(84);
      }, 0);
      return () => clearTimeout(delayTimer);
    }

    let start = 0;
    const end = 84;
    const duration = 1200; // 1.2s total count duration
    const incrementTime = Math.floor(duration / end);

    const timer = setInterval(() => {
      start += 1;
      setScore(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [shouldReduceMotion]);

  // Framer Motion animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const },
    },
  };

  const skillBars = [
    { name: 'Arrays & Strings', value: '92%', color: 'bg-primary' },
    { name: 'Trees & Graphs', value: '70%', color: 'bg-primary/80' },
    { name: 'Recursion', value: '45%', color: 'bg-amber-500' },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative w-full max-w-2xl mx-auto rounded-xl border border-border bg-card p-6 shadow-md shadow-primary/5 overflow-hidden select-none hover:shadow-lg transition-shadow duration-300"
    >
      {/* Browser Navigation Bar Mockup */}
      <div className="flex items-center gap-1.5 border-b border-border/80 pb-4 mb-6">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-border" />
          <div className="w-2.5 h-2.5 rounded-full bg-border" />
          <div className="w-2.5 h-2.5 rounded-full bg-border" />
        </div>
        <span className="text-[10px] text-muted-foreground ml-3 font-mono tracking-tight bg-muted/40 px-2 py-0.5 rounded border border-border/40 select-none">
          app.cevora.com/experience
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Diagnostics, Skill metrics & Streak */}
        <div className="md:col-span-1 space-y-4 flex flex-col justify-between">
          {/* Diagnostic score block */}
          <motion.div
            variants={itemVariants}
            className="bg-background border border-border/60 p-4 rounded-lg flex flex-col items-center text-center shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
          >
            <div className="w-11 h-11 bg-primary/5 text-primary rounded-full flex items-center justify-center mb-3">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-foreground">Diagnostic Score</h4>
            <p className="text-3xl font-extrabold text-primary tracking-tight mt-1">
              {score}%
            </p>
            <span className="text-[9px] font-semibold text-emerald-600 bg-emerald-500/5 px-2 py-0.5 rounded-full border border-emerald-500/10 mt-2 select-none">
              Tier-1 Ready
            </span>

            {/* Micro skill progress bars inside diagnostics for realism */}
            <div className="w-full mt-4 space-y-2.5 pt-3 border-t border-border/40 text-left">
              {skillBars.map((bar) => (
                <div key={bar.name} className="space-y-1">
                  <div className="flex justify-between text-[9px] font-semibold text-muted-foreground">
                    <span>{bar.name}</span>
                    <span>{bar.value}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: bar.value }}
                      transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                      className={`h-full ${bar.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Daily streak card */}
          <motion.div
            variants={itemVariants}
            className="bg-background border border-border/60 p-4 rounded-lg flex items-center gap-3 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-primary/20 transition-colors"
          >
            <div className="w-8 h-8 bg-amber-500/5 text-amber-500 rounded-lg flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 fill-current animate-pulse" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground font-medium">Daily Study Streak</p>
              <p className="text-xs font-bold text-foreground">5 Days 🔥</p>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Active Mission Details & AI Mentor Bubble */}
        <div className="md:col-span-2 space-y-4 flex flex-col justify-between">
          
          {/* Today's study mission layout */}
          <motion.div
            variants={itemVariants}
            className="bg-background border border-border/60 p-5 rounded-lg flex-1 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-primary/20 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[9px] font-bold text-primary bg-primary/5 border border-primary/10 px-2 py-0.5 rounded-full select-none">
                  Today&apos;s Active Mission
                </span>
                <span className="text-[10px] text-muted-foreground font-mono bg-muted/40 px-1.5 py-0.2 rounded border border-border/20">
                  15 mins
                </span>
              </div>
              <h4 className="text-sm font-extrabold text-foreground mb-1">
                SQL Optimization - Indexing Path
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Tackle custom indexing constraints derived directly from Tier-1 placement patterns.
              </p>
            </div>

            <div className="flex items-center justify-between mt-6 pt-3 border-t border-border/40">
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                <BookOpen className="w-3.5 h-3.5" />
                Adaptive Track
              </div>
              <button
                type="button"
                className="h-8 px-3.5 bg-primary text-primary-foreground hover:bg-primary/95 hover:scale-[1.03] active:scale-[0.98] text-xs font-semibold rounded-md flex items-center gap-1.5 cursor-not-allowed opacity-90 transition-all shadow-sm"
                disabled
              >
                <Play className="w-3 h-3 fill-current" />
                Start
              </button>
            </div>
          </motion.div>

          {/* AI Recommendation Message layout */}
          <motion.div
            variants={itemVariants}
            className="bg-background border border-border/60 p-4 rounded-lg flex gap-3 items-start shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-primary/10 transition-colors"
          >
            <div className="w-8 h-8 bg-primary/5 text-primary rounded-lg flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <h5 className="text-[11px] font-bold text-foreground">AI Mentor Recommendations</h5>
              <p className="text-[10.5px] text-muted-foreground mt-1.5 leading-relaxed">
                &ldquo;You&rsquo;ve unlocked 92% proficiency in Arrays, but Recursion limits have been flagged for adaptive study. Reviewing call stack allocations is suggested.&rdquo;
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
