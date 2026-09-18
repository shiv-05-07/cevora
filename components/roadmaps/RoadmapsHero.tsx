'use client';

import * as React from 'react';
import { Compass, Sparkles, Map, Target } from 'lucide-react';

export function RoadmapsHero() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card via-card to-muted/40 border border-border/70 p-6 sm:p-8 lg:p-10 shadow-xs">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_top_right,white,transparent_70%)] pointer-events-none" />
      <div className="absolute -right-12 -top-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl space-y-4">
        {/* Top Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wide uppercase">
          <Compass className="w-3.5 h-3.5" />
          <span>Structured Career Paths</span>
        </div>

        {/* Main Heading */}
        <div className="space-y-1.5">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-[1.15]">
            Build the skills. Follow the path.{' '}
            <span className="bg-gradient-to-r from-primary via-indigo-500 to-emerald-500 bg-clip-text text-transparent">
              Reach the role.
            </span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg font-medium leading-relaxed max-w-2xl pt-1">
            Structured, step-by-step learning paths designed around the skills, technologies, and career roles you are targeting.
          </p>
        </div>

        {/* Supporting Feature Highlights */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-muted-foreground pt-2">
          <div className="flex items-center gap-1.5 bg-background/60 px-3 py-1.5 rounded-lg border border-border/40 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Curated Topics & Practice</span>
          </div>
          <div className="flex items-center gap-1.5 bg-background/60 px-3 py-1.5 rounded-lg border border-border/40 backdrop-blur-xs">
            <Map className="w-3.5 h-3.5 text-emerald-500" />
            <span>Progress Tracking</span>
          </div>
          <div className="flex items-center gap-1.5 bg-background/60 px-3 py-1.5 rounded-lg border border-border/40 backdrop-blur-xs">
            <Target className="w-3.5 h-3.5 text-indigo-500" />
            <span>Verified External Resources</span>
          </div>
        </div>
      </div>
    </div>
  );
}
