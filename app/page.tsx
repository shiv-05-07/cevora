'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  Calendar, 
  Bot, 
  ClipboardCheck, 
  UserCheck, 
  BarChart3, 
  TrendingUp, 
  ArrowRight,
  Compass
} from 'lucide-react';

import { APP_CONFIG } from '@/constants/app';
import { Navbar } from '@/components/shared/Navbar';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { FeatureCard } from '@/components/shared/FeatureCard';
import { WorkflowTimeline } from '@/components/shared/WorkflowTimeline';
import { HeroShowcase } from '@/components/shared/HeroShowcase';
import { Footer } from '@/components/shared/Footer';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function EntryExperience() {
  const shouldReduceMotion = useReducedMotion();

  // Core Platform features to list
  const features = [
    {
      icon: Calendar,
      title: 'Personalized Mission Planner',
      description: 'Generates structured daily learning tasks tailored to your weak areas and target roles, keeping you focused.',
    },
    {
      icon: Bot,
      title: 'AI Mentor',
      description: 'A 24/7 conversational companion that explains complex algorithms, reviews mock solutions, and simulates technical interviews.',
    },
    {
      icon: ClipboardCheck,
      title: 'Adaptive Assessments',
      description: 'Dynamic testing engines that automatically recalibrate question difficulty based on your real-time performance.',
    },
    {
      icon: UserCheck,
      title: 'Learning Profile',
      description: 'A living diagnostic blueprint that visualizes active skill proficiencies, strengths, and priority development paths.',
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Stunning data charts mapping performance indexes, conceptual readiness, and comparative cohort benchmarks.',
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Interactive tracker detailing study streaks, milestones unlocked, and mock interview completion rates.',
    },
  ];

  // Why Cevora philosophy items
  const philosophies = [
    {
      title: 'Personalized Learning',
      description: 'No generic syllabus. Cevora dynamically adapts content density and sequencing specifically to your study habits and company goals.',
    },
    {
      title: 'AI-Guided Growth',
      description: 'Get deep feedback on logic errors, edge cases, and code style. It is like having a staff engineer pairing with you around the clock.',
    },
    {
      title: 'Explainable Recommendations',
      description: 'Every suggested question or conceptual study topic comes with clear reasoning explaining how it targets your current skills gap.',
    },
    {
      title: 'Daily Learning Missions',
      description: 'Eliminate preparation decision fatigue. Log in, complete your targeted daily missions in 15-30 minutes, and log out with clear progress.',
    },
    {
      title: 'Long-Term Progress',
      description: 'Watch your diagnostic score steadily grow, locked into a data-driven preparation methodology that keeps you interview-ready.',
    },
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const } 
    }
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Sticky Navigation Header */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 flex flex-col">
        
        {/* ========================================================
            1. HERO SECTION
           ======================================================== */}
        <section className="relative py-20 md:py-28 overflow-hidden bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
            
            {/* Value Proposition Column */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="flex-1 space-y-6 text-center lg:text-left"
            >
              <motion.span 
                variants={fadeInUp}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/5 text-primary border border-primary/10 select-none"
              >
                <Compass className="w-3.5 h-3.5" />
                Adaptive Placement Intelligence
              </motion.span>
              
              <motion.h1 
                variants={fadeInUp}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.08] max-w-2xl mx-auto lg:mx-0"
              >
                AI-Powered <br />
                <span className="text-primary">Placement Intelligence</span>
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0"
              >
                Master your technical interviews. {APP_CONFIG.name} accelerates placement readiness for engineering students using AI-guided adaptive assessments, targeted daily study missions, and live diagnostic profiles.
              </motion.p>

              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2"
              >
                <Link
                  href="/register"
                  className={cn(
                    buttonVariants({ variant: 'default', size: 'lg' }), 
                    'text-xs sm:text-sm font-semibold h-11 px-6 shadow-sm active:scale-[0.98] hover:scale-[1.02] transition-all duration-200'
                  )}
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'lg' }), 
                    'text-xs sm:text-sm font-semibold h-11 px-6 active:scale-[0.98] transition-all duration-200'
                  )}
                >
                  Sign In
                </Link>
              </motion.div>
            </motion.div>

            {/* Showcase Visual Mockup Column */}
            <div className="flex-1 w-full max-w-xl lg:max-w-none">
              <HeroShowcase />
            </div>

          </div>
        </section>

        {/* ========================================================
            2. CORE FEATURES SECTION
           ======================================================== */}
        <section id="features" className="py-20 md:py-28 border-t border-border/60 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Platform Features"
              title="A Complete AI-First Preparation Suite"
              description={`Eliminate scattered resources. ${APP_CONFIG.name} integrates your curriculum, workspace, guidance, and analytical insights under one intelligent portal.`}
            />

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {features.map((feat) => (
                <motion.div key={feat.title} variants={fadeInUp} className="h-full">
                  <FeatureCard
                    icon={feat.icon}
                    title={feat.title}
                    description={feat.description}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ========================================================
            3. HOW CEVORA WORKS (WORKFLOW SECTION)
           ======================================================== */}
        <section id="about" className="py-20 md:py-28 border-t border-border/60 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="The Workflow"
              title={`How ${APP_CONFIG.name} Architectures Your Growth`}
              description="A structured path designed to identify gaps, calibrate curriculum, prompt actions, and track placement readiness metrics."
            />

            <WorkflowTimeline />
          </div>
        </section>

        {/* ========================================================
            4. WHY CEVORA (PHILOSOPHY SECTION)
           ======================================================== */}
        <section id="roadmap" className="py-20 md:py-28 border-t border-border/60 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12 items-start">
            
            {/* Left side: Heading */}
            <div className="lg:w-1/3 sticky lg:top-24 space-y-4">
              <span className="text-xs font-semibold tracking-wider text-primary uppercase bg-primary/5 px-2.5 py-1 rounded-full select-none">
                Product Philosophy
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground select-none">
                Why Prepare with {APP_CONFIG.name}?
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Traditional placement preparation is chaotic, fragmented, and generic. {APP_CONFIG.name} introduces structure, clarity, and explainability to daily study.
              </p>
            </div>

            {/* Right side: Philosophy Items list */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={staggerContainer}
              className="lg:w-2/3 w-full grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {philosophies.map((philo, idx) => (
                <motion.div 
                  key={philo.title} 
                  variants={fadeInUp}
                  className="group bg-card border border-border/60 p-6 rounded-xl hover:border-primary/20 transition-all duration-300 hover:shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-sm font-mono font-bold text-primary bg-primary/5 w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 select-none group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {philo.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {philo.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </section>

        {/* ========================================================
            5. FINAL CALL TO ACTION (CTA)
           ======================================================== */}
        <section className="py-20 md:py-28 border-t border-border/60 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div 
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="border border-border/80 bg-card p-8 sm:p-12 md:p-16 rounded-2xl shadow-sm relative overflow-hidden"
            >
              {/* Subtle background highlight shape */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full pointer-events-none" />
              
              <span className="text-xs font-semibold tracking-wider text-primary uppercase bg-primary/5 px-2.5 py-1 rounded-full mb-4 inline-block select-none">
                Start Preparing Today
              </span>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-4">
                Ready to unlock your interview potential?
              </h2>
              
              <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
                Join students using {APP_CONFIG.name} to benchmark capabilities, focus study tasks, and prepare for top-tier tech placements.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/register"
                  className={cn(
                    buttonVariants({ variant: 'default', size: 'lg' }), 
                    'w-full sm:w-auto text-xs sm:text-sm font-semibold h-11 px-6 shadow-sm active:scale-[0.98] hover:scale-[1.02] transition-all'
                  )}
                >
                  Get Started
                </Link>
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'lg' }), 
                    'w-full sm:w-auto text-xs sm:text-sm font-semibold h-11 px-6 active:scale-[0.98] transition-all'
                  )}
                >
                  Sign In
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* Footer component */}
      <Footer />
    </div>
  );
}
