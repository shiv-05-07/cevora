'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  Compass,
  FileText,
  Map,
  Code,
  Video,
  Users,
  ArrowRight,
  TrendingUp,
  Award,
  Key,
  Shield,
  Layers,
  Sparkles,
  ClipboardList
} from 'lucide-react';

import { APP_CONFIG } from '@/constants/app';
import { Navbar } from '@/components/shared/Navbar';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { FeatureCard } from '@/components/shared/FeatureCard';
import { WorkflowTimeline } from '@/components/shared/WorkflowTimeline';
import { StudentDashboardPreview } from '@/components/shared/StudentDashboardPreview';
import { FacultyWorkspacePreview } from '@/components/shared/FacultyWorkspacePreview';
import { Footer } from '@/components/shared/Footer';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function LandingPage() {
  const shouldReduceMotion = useReducedMotion();

  // Core MVP Features to list in requested order
  const features = [
    {
      icon: Compass,
      title: 'Companies Explorer',
      description: 'Access comprehensive hiring profiles, screening criteria, and historical selection patterns of target recruiters.',
    },
    {
      icon: FileText,
      title: 'Resume Analyzer',
      description: 'Review ATS formatting guidelines, audit key resume sections, and match qualifications against job descriptions.',
    },
    {
      icon: Map,
      title: 'Placement Roadmaps',
      description: 'Follow structured, linear preparation paths aligned to specific hiring seasons and timeline milestones.',
    },
    {
      icon: Code,
      title: 'OA Practice',
      description: 'Familiarize yourself with typical online assessments using coding editors, multiple-choice questions, and timers.',
    },
    {
      icon: Video,
      title: 'Interview Practice',
      description: 'Practice simulated interview tracks (Technical, HR, Behavioral, Viva, Resume-based, Company-specific) with guided feedback.',
    },
    {
      icon: Users,
      title: 'Faculty Workspace',
      description: 'Connect to classroom workspaces managed by faculty mentors to track milestones and receive resume approvals.',
    },
  ];

  // Why Choose Cevora items
  const whyChooseItems = [
    {
      title: 'Company-Specific Preparation',
      description: 'Prepare with timelines, hiring criteria, and selection patterns mapped directly to your target recruiters.',
    },
    {
      title: 'One Platform for Placements',
      description: 'Centralize your resume reviews, coding practice, mock interviews, and timeline roadmaps under a single account.',
    },
    {
      title: 'Resume Optimization',
      description: 'Optimize your layout and content sections against standard formatting rules to improve screening outcomes.',
    },
    {
      title: 'Faculty Collaboration',
      description: 'Join faculty workspaces, receive updates, submit resumes for approval, and track milestones with mentors.',
    },
    {
      title: 'Progress Tracking',
      description: 'Monitor daily goals, completed preparation roadmaps, mock test histories, and overall cohort benchmarks.',
    },
    {
      title: 'Role-Based Dashboards',
      description: 'Custom portals tailormade for students managing preparation, and faculty tracking multiple cohorts.',
    },
  ];

  // Product Capabilities (Replaces Philosophy)
  const capabilities = [
    {
      title: 'Placement Intelligence',
      description: 'Access data-driven insights covering eligibility criteria, hiring processes, and candidate selectiveness rules.',
    },
    {
      title: 'Career Growth',
      description: 'Build core technical, logical, and communication skills aligned with actual corporate interview requirements.',
    },
    {
      title: 'Focused Preparation',
      description: 'Eliminate scattered bookmarks and worksheets. Follow a structured checklist to stay on path for target placement goals.',
    },
    {
      title: 'Data-driven Progress',
      description: 'Track coding challenges solved, mock interview benchmarks completed, and resume optimization history transparently.',
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
      {/* 1. Sticky Navigation Header */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 flex flex-col">
        
        {/* ========================================================
            2. HERO SECTION
           ======================================================== */}
        <section className="relative py-20 md:py-28 overflow-hidden bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
            
            {/* Value Proposition Column */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="flex-1 space-y-6 text-center lg:text-left animate-fade-in"
            >
              <motion.span 
                variants={fadeInUp}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/5 text-primary border border-primary/10 select-none"
              >
                <Layers className="w-3.5 h-3.5" />
                Intelligent Placement Companion
              </motion.span>
              
              <motion.h1 
                variants={fadeInUp}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.08] max-w-2xl mx-auto lg:mx-0"
              >
                Your Intelligent <br />
                <span className="text-primary">Placement Companion</span>
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0"
              >
                Prepare smarter with structured placement preparation, resume optimization, company exploration, interview practice, and collaborative faculty workspaces—all in one place.
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
                <a
                  href="#features"
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'lg' }), 
                    'text-xs sm:text-sm font-semibold h-11 px-6 active:scale-[0.98] hover:scale-[1.02] transition-all duration-200'
                  )}
                >
                  Explore Features
                </a>
              </motion.div>
            </motion.div>

            {/* Showcase Visual Mockup Column */}
            <div className="flex-1 w-full max-w-xl lg:max-w-none">
              <StudentDashboardPreview />
            </div>

          </div>
        </section>

        {/* ========================================================
            3. WORKSPACE HIGHLIGHT SECTION
           ======================================================== */}
        <section id="solutions" className="py-16 border-t border-border/60 bg-muted/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-card border border-border/80 rounded-2xl p-8 sm:p-12 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-xl space-y-4">
                <span className="text-xs font-semibold tracking-wider text-primary uppercase bg-primary/5 px-2.5 py-1 rounded-full">
                  Unified Workspaces
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  Connect Students and Faculty
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Cevora simplifies cohort management. Faculty mentors establish secure spaces, students sign in using a single access code, and preparation metrics sync instantly to a shared dashboard.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full lg:w-auto shrink-0 border-t lg:border-t-0 lg:border-l border-border/60 pt-6 lg:pt-0 lg:pl-8">
                <div className="space-y-1">
                  <div className="w-8 h-8 bg-primary/5 text-primary rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-foreground mt-2">Faculty Set Up</h4>
                  <p className="text-[11px] text-muted-foreground">Mentors define tracking rules & review resumes.</p>
                </div>
                <div className="space-y-1">
                  <div className="w-8 h-8 bg-primary/5 text-primary rounded-lg flex items-center justify-center">
                    <Key className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-foreground mt-2">Access Codes</h4>
                  <p className="text-[11px] text-muted-foreground">Students join matching workspace instantly.</p>
                </div>
                <div className="space-y-1">
                  <div className="w-8 h-8 bg-primary/5 text-primary rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-foreground mt-2">Progress Sync</h4>
                  <p className="text-[11px] text-muted-foreground">Tracks goals, practice, and timelines.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            4. PLATFORM OVERVIEW (6 FEATURE CARDS)
           ======================================================== */}
        <section id="features" className="py-20 md:py-28 border-t border-border/60 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Platform Features"
              title="A Integrated Placement Workspace"
              description="Eliminate fragmented tools. Cevora brings together recruiting calendar profiles, linear roadmaps, resume score checking, mock tests, and faculty reporting."
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
            5. HOW CEVORA WORKS (WORKFLOW SECTION)
           ======================================================== */}
        <section id="about" className="py-20 md:py-28 border-t border-border/60 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="The Workflow"
              title="How Cevora Architectures Preparation"
              description="Follow a structured sequence from registration to final placement readiness, designed around clear benchmarks."
            />

            <WorkflowTimeline />
          </div>
        </section>

        {/* ========================================================
            6. STUDENT DASHBOARD PREVIEW
           ======================================================== */}
        <section className="py-20 md:py-28 border-t border-border/60 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Student Interface"
              title="Track Placement Readiness in Real-Time"
              description="Manage target recruiting deadlines, follow structured prep plans, analyze ATS resume match index, and complete mock coding sessions."
            />

            <div className="max-w-5xl mx-auto">
              <StudentDashboardPreview />
            </div>
          </div>
        </section>

        {/* ========================================================
            7. FACULTY WORKSPACE
           ======================================================== */}
        <section id="faculty" className="py-20 md:py-28 border-t border-border/60 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
            
            <div className="flex-1 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/5 text-primary border border-primary/10 select-none">
                <Users className="w-3.5 h-3.5" />
                Faculty Mentorship Suite
              </span>
              
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                Maintain Cohort Oversight
              </h2>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                Faculty workspaces make coordinating campus placement preparation simple. Mentors monitor study progress, review resume draft details, flag student weak topics, and publish cohort announcements.
              </p>

              <ul className="space-y-3.5 text-xs text-muted-foreground">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 bg-primary/5 text-primary rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold">1</span>
                  <div>
                    <strong className="text-foreground font-semibold">Faculty creates workspace:</strong> Generate custom codes for batch segments.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 bg-primary/5 text-primary rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold">2</span>
                  <div>
                    <strong className="text-foreground font-semibold">Students join via access code:</strong> Instant sync without registration overheads.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 bg-primary/5 text-primary rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold">3</span>
                  <div>
                    <strong className="text-foreground font-semibold">Faculty tracks progress:</strong> Review average roadmap completion metrics.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 bg-primary/5 text-primary rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold">4</span>
                  <div>
                    <strong className="text-foreground font-semibold">Analytics Dashboard:</strong> Identify collective topic weaknesses early.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 bg-primary/5 text-primary rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold">5</span>
                  <div>
                    <strong className="text-foreground font-semibold">Resume Reviews:</strong> Review and sign off on student drafts inside the portal.
                  </div>
                </li>
              </ul>
            </div>

            <div className="flex-1 w-full max-w-xl lg:max-w-none">
              <FacultyWorkspacePreview />
            </div>

          </div>
        </section>

        {/* ========================================================
            8. WHY CHOOSE CEVORA
           ======================================================== */}
        <section className="py-20 md:py-28 border-t border-border/60 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Platform Advantage"
              title="Built for Streamlined Placement Prep"
              description="A robust structural design mapping academic prep steps to actual campus hiring timelines."
            />

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {whyChooseItems.map((item) => (
                <motion.div 
                  key={item.title} 
                  variants={fadeInUp}
                  className="bg-card border border-border/60 p-6 rounded-xl hover:border-primary/20 transition-all duration-300 hover:shadow-sm"
                >
                  <h3 className="text-base font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ========================================================
            9. CAPABILITIES OVERVIEW (REPLACES DEVELOMENT PHILOSOPHY)
           ======================================================== */}
        <section id="roadmap" className="py-20 md:py-28 border-t border-border/60 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12 items-start">
            
            {/* Left side: Heading */}
            <div className="lg:w-1/3 sticky lg:top-24 space-y-4">
              <span className="text-xs font-semibold tracking-wider text-primary uppercase bg-primary/5 px-2.5 py-1 rounded-full select-none">
                Platform Strategy
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground select-none">
                Placement Intelligence Workspace
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Traditional placement preparation is unstructured, scattered, and generic. Cevora introduces coordination, linear planning, and trackable milestones for batches.
              </p>
            </div>

            {/* Right side: Capabilities List */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={staggerContainer}
              className="lg:w-2/3 w-full grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {capabilities.map((cap, idx) => (
                <motion.div 
                  key={cap.title} 
                  variants={fadeInUp}
                  className="group bg-card border border-border/60 p-6 rounded-xl hover:border-primary/20 transition-all duration-300 hover:shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-sm font-mono font-bold text-primary bg-primary/5 w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 select-none group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      0{idx + 1}
                    </span>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {cap.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {cap.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </section>

        {/* ========================================================
            10. FINAL CALL TO ACTION (CTA)
           ======================================================== */}
        <section className="py-20 md:py-28 border-t border-border/60 bg-muted/20">
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
                Start Preparing for Your Dream Placement Today
              </h2>
              
              <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
                Join your campus workspace, review target company hiring timelines, optimize your ATS resume draft, and practice assessments.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/register"
                  className={cn(
                    buttonVariants({ variant: 'default', size: 'lg' }), 
                    'w-full sm:w-auto text-xs sm:text-sm font-semibold h-11 px-6 shadow-sm active:scale-[0.98] hover:scale-[1.02] transition-all'
                  )}
                >
                  Create Account
                </Link>
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'lg' }), 
                    'w-full sm:w-auto text-xs sm:text-sm font-semibold h-11 px-6 active:scale-[0.98] hover:scale-[1.02] transition-all'
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
