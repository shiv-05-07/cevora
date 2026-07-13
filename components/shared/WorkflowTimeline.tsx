'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Goal, ClipboardCheck, UserCheck, Calendar, Bot, TrendingUp, type LucideIcon } from 'lucide-react';

interface WorkflowStep {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const steps: WorkflowStep[] = [
  {
    number: '01',
    title: 'Goal',
    description: 'Set your target companies, desired roles, and timeline benchmarks.',
    icon: Goal,
  },
  {
    number: '02',
    title: 'Assessment',
    description: 'Take adaptive diagnostic tests to identify baseline skill levels.',
    icon: ClipboardCheck,
  },
  {
    number: '03',
    title: 'Learning Profile',
    description: 'Unlock your real-time skills blueprint indicating target gaps.',
    icon: UserCheck,
  },
  {
    number: '04',
    title: 'Mission Planner',
    description: 'Tackle daily bite-sized microlearning study missions.',
    icon: Calendar,
  },
  {
    number: '05',
    title: 'AI Mentor',
    description: 'Review coding problems and simulate mock technical interviews.',
    icon: Bot,
  },
  {
    number: '06',
    title: 'Continuous Growth',
    description: 'Measure progress trends and build placement readiness.',
    icon: TrendingUp,
  },
];

/**
 * Connected timeline layout representing "How Cevora Works".
 * Flexibly switches from a horizontal node path on desktop to vertical nodes on mobile.
 * Features scroll-triggered connector animations and progressive highlights.
 */
export function WorkflowTimeline() {
  const shouldReduceMotion = useReducedMotion();

  // Framer Motion staggered grid layout variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const },
    },
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6">
      
      {/* Mobile/Tablet Vertical Line Track (left-aligned, visible on md and below) */}
      <div className="lg:hidden absolute left-[36px] sm:left-[44px] top-6 bottom-6 w-[2px] bg-border/60 -z-10" />

      {/* Steps List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col lg:flex-row gap-8 lg:gap-4 relative"
      >
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.title}
              variants={cardVariants}
              className="relative flex-1 flex flex-row lg:flex-col items-center lg:text-center gap-4 lg:gap-0 bg-card border border-border/60 lg:border-border/40 p-5 lg:p-6 rounded-xl shadow-sm hover:border-primary/20 transition-colors duration-300"
            >
              
              {/* Desktop Horizontal Line Connectors (drawn between circles) */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-[34px] left-[calc(50%+28px)] right-[calc(-50%+28px)] h-[2px] bg-border/40 -z-10">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.6,
                      delay: idx * 0.15 + 0.3,
                      ease: 'easeInOut' as const,
                    }}
                    className="absolute inset-0 bg-primary origin-left"
                  />
                </div>
              )}

              {/* Node Circle Wrapper */}
              <div className="w-11 h-11 sm:w-14 sm:h-14 bg-background border-2 border-border group-hover:border-primary text-muted-foreground group-hover:text-primary rounded-full flex items-center justify-center shrink-0 mb-0 lg:mb-4 shadow-sm relative transition-all duration-300">
                <Icon className="w-5.5 h-5.5 sm:w-6 sm:h-6 text-muted-foreground/80" />
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm select-none">
                  {step.number}
                </span>
              </div>

              {/* Content block */}
              <div className="flex-1 lg:flex-none text-left lg:text-center">
                <h3 className="text-sm font-bold text-foreground mb-1 select-none">
                  {step.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>

            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
