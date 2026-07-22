'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GraduationCap, BookOpen, FlaskConical, Users, Plus, ArrowRight, ArrowLeft, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { CevoraUser, UserRole } from '@/types/auth';
import { createClient } from '@/services/supabase/client';
import { MailCheck } from 'lucide-react';

type Step = 'signup' | 'role' | 'community';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SignupForm {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface FormErrors {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
}

// Slide animation variants — clean directional transitions
const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
};

const ROLES: { id: UserRole; label: string; description: string; icon: React.ElementType }[] = [
  {
    id: 'student',
    label: 'Student',
    description: 'Prepare for placements, track your progress, and join faculty workspaces.',
    icon: GraduationCap,
  },
  {
    id: 'teacher',
    label: 'Teacher',
    description: 'Manage cohorts, review resumes, and mentor students through their journey.',
    icon: BookOpen,
  },
  {
    id: 'professor',
    label: 'Professor',
    description: 'Oversee entire departments, track analytics, and coordinate placement drives.',
    icon: FlaskConical,
  },
];

function validateSignup(form: SignupForm): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = 'Full name is required.';
  if (!form.username.trim()) {
    errors.username = 'Username is required.';
  } else if (!/^[a-z0-9_]{3,20}$/.test(form.username)) {
    errors.username = 'Username must be 3–20 lowercase letters, numbers, or underscores.';
  }
  if (!form.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!form.password) {
    errors.password = 'Password is required.';
  } else if (form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  }
  return errors;
}

export function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const router = useRouter();
  const supabase = createClient();

  const [step, setStep] = React.useState<Step>('signup');
  const [direction, setDirection] = React.useState(1);
  const [showPassword, setShowPassword] = React.useState(false);

  const [form, setForm] = React.useState<SignupForm>({
    name: '',
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [selectedRole, setSelectedRole] = React.useState<UserRole | null>(null);

  const [communityKey, setCommunityKey] = React.useState('');
  const [communityName, setCommunityName] = React.useState('');
  const [communityError, setCommunityError] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [signupError, setSignupError] = React.useState<string | null>(null);
  const [signupSuccess, setSignupSuccess] = React.useState(false);

  // Close on Escape
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Reset when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep('signup');
        setDirection(1);
        setForm({ name: '', username: '', email: '', password: '' });
        setErrors({});
        setSelectedRole(null);
        setCommunityKey('');
        setCommunityName('');
        setCommunityError('');
        setSignupError(null);
        setSignupSuccess(false);
        setIsSubmitting(false);
      }, 300);
    }
  }, [isOpen]);

  const goNext = (nextStep: Step) => {
    setDirection(1);
    setStep(nextStep);
  };

  const goBack = (prevStep: Step) => {
    setDirection(-1);
    setStep(prevStep);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateSignup(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    goNext('role');
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleRoleConfirm = () => {
    if (!selectedRole) return;
    goNext('community');
  };

  const finishOnboarding = async (withCommunity: boolean) => {
    if (!selectedRole) return;

    // Validate community input if user chose to add one
    if (withCommunity) {
      if (selectedRole === 'student' && !communityKey.trim()) {
        setCommunityError('Please enter a community key.');
        return;
      }
      if ((selectedRole === 'teacher' || selectedRole === 'professor') && !communityName.trim()) {
        setCommunityError('Please enter a community name.');
        return;
      }
    }

    setIsSubmitting(true);
    setSignupError(null);

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.name,
          user_name: form.username,
          role: selectedRole.toUpperCase(), // Store role in metadata
        },
      },
    });

    setIsSubmitting(false);

    if (error) {
      setSignupError(error.message);
      return;
    }

    if (!data.session) {
      // Email confirmation is required by Supabase
      setSignupSuccess(true);
      return;
    }

    onClose();
    router.push('/dashboard');
  };

  if (!isOpen) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Create your account"
    >
      {/* Backdrop overlay */}
      <motion.div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal panel */}
      <motion.div
        className="relative z-10 w-full max-w-lg bg-card border border-border/60 rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92dvh] sm:max-h-[90vh]"
        initial={{ opacity: 0, scale: 0.97, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 8 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border/40">
          <div>
            <h2 className="text-lg font-bold text-foreground">
              {signupSuccess && 'Check your email'}
              {!signupSuccess && step === 'signup' && 'Create your account'}
              {!signupSuccess && step === 'role' && 'Choose your role'}
              {!signupSuccess && step === 'community' && 'Join a community'}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {signupSuccess && 'We sent a verification link to your inbox.'}
              {!signupSuccess && step === 'signup' && 'Start your placement journey with Cevora.'}
              {!signupSuccess && step === 'role' && 'This helps us personalise your workspace.'}
              {!signupSuccess && step === 'community' && (
                selectedRole === 'student'
                  ? 'Enter your community key to join a faculty workspace.'
                  : 'Set up a workspace for your students.'
              )}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step indicator */}
        <div className="flex gap-1.5 px-6 pt-4">
          {(['signup', 'role', 'community'] as Step[]).map((s, i) => (
            <div
              key={s}
              className={cn(
                'h-1 flex-1 rounded-full transition-all duration-300',
                step === s
                  ? 'bg-primary'
                  : (['signup', 'role', 'community'].indexOf(step) > i)
                    ? 'bg-primary/40'
                    : 'bg-border/60'
              )}
            />
          ))}
        </div>

        {/* Step content — overflow-hidden clips the x-slide animation */}
        <div className="relative flex-1 overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            {signupSuccess ? (
              <motion.div
                key="success"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="p-6 sm:p-8 flex flex-col items-center justify-center text-center gap-6 h-full min-h-[280px]"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <MailCheck className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Verification Required</h3>
                  <p className="text-sm text-muted-foreground max-w-[280px] mx-auto">
                    We've sent a verification email to <span className="font-semibold text-foreground">{form.email}</span>. 
                    Please click the link in the email to activate your account.
                  </p>
                </div>
                <Button onClick={() => { onClose(); router.push('/login'); }} className="w-full sm:w-auto min-w-[200px] mt-4">
                  Go to Login
                </Button>
              </motion.div>
            ) : step === 'signup' && (
              <motion.div
                key="signup"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="p-4 sm:p-6 flex flex-col gap-4"
              >
                <form onSubmit={handleSignupSubmit} className="flex flex-col gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="ob-name" className="text-xs font-medium">Full Name</Label>
                    <Input
                      id="ob-name"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                      className={cn(errors.name && 'border-destructive focus-visible:ring-destructive')}
                    />
                    {errors.name && <p className="text-[11px] text-destructive">{errors.name}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="ob-username" className="text-xs font-medium">Username</Label>
                    <Input
                      id="ob-username"
                      placeholder="alexmorgan"
                      value={form.username}
                      onChange={e => setForm(prev => ({ ...prev, username: e.target.value.toLowerCase() }))}
                      className={cn(errors.username && 'border-destructive focus-visible:ring-destructive')}
                    />
                    {errors.username && <p className="text-[11px] text-destructive">{errors.username}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="ob-email" className="text-xs font-medium">Email Address</Label>
                    <Input
                      id="ob-email"
                      type="email"
                      placeholder="alex@university.edu"
                      value={form.email}
                      onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                      className={cn(errors.email && 'border-destructive focus-visible:ring-destructive')}
                    />
                    {errors.email && <p className="text-[11px] text-destructive">{errors.email}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="ob-password" className="text-xs font-medium">Password</Label>
                    <div className="relative">
                      <Input
                        id="ob-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Min. 8 characters"
                        value={form.password}
                        onChange={e => setForm(prev => ({ ...prev, password: e.target.value }))}
                        className={cn('pr-10', errors.password && 'border-destructive focus-visible:ring-destructive')}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(v => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-[11px] text-destructive">{errors.password}</p>}
                  </div>

                  <Button type="submit" className="w-full font-semibold mt-1">
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    Already have an account?{' '}
                    <a href="/login" className="text-primary hover:underline font-medium" onClick={onClose}>
                      Sign in
                    </a>
                  </p>
                </form>
              </motion.div>
            )}

            {/* ─── STEP 2: Role Selection ─── */}
            {step === 'role' && (
              <motion.div
                key="role"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="p-4 sm:p-6 flex flex-col gap-4"
              >
                <div className="flex flex-col gap-3">
                  {ROLES.map(({ id, label, description, icon: Icon }) => {
                    const isSelected = selectedRole === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => handleRoleSelect(id)}
                        className={cn(
                          'flex items-start gap-4 p-4 rounded-xl border text-left transition-all duration-200 group',
                          isSelected
                            ? 'border-primary bg-primary/5 ring-1 ring-primary/30'
                            : 'border-border/50 bg-background hover:border-border hover:bg-muted/30'
                        )}
                      >
                        <div className={cn(
                          'w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors',
                          isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground group-hover:text-foreground'
                        )}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-foreground">{label}</span>
                            {isSelected && <CheckCircle className="w-4 h-4 text-primary" />}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{description}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => goBack('signup')} className="flex-1">
                    <ArrowLeft className="w-4 h-4 mr-2" />Back
                  </Button>
                  <Button onClick={handleRoleConfirm} disabled={!selectedRole} className="flex-1 font-semibold">
                    Continue<ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* ─── STEP 3: Community ─── */}
            {step === 'community' && (
              <motion.div
                key="community"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="p-4 sm:p-6 flex flex-col gap-4"
              >
                {selectedRole === 'student' ? (
                  <>
                    <div className="flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-muted/20">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Join with Community Key</p>
                        <p className="text-xs text-muted-foreground">Enter the key shared by your faculty mentor.</p>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="community-key" className="text-xs font-medium">Community Key</Label>
                      <Input
                        id="community-key"
                        placeholder="e.g. CSE-2026-BATCH"
                        value={communityKey}
                        onChange={e => { setCommunityKey(e.target.value); setCommunityError(''); }}
                        className={cn(communityError && 'border-destructive focus-visible:ring-destructive')}
                      />
                      {communityError && <p className="text-[11px] text-destructive">{communityError}</p>}
                    </div>
                    {signupError && (
                      <p className="text-sm font-medium text-destructive mt-3 mb-1">{signupError}</p>
                    )}
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => goBack('role')} className="flex-1" disabled={isSubmitting}>
                        <ArrowLeft className="w-4 h-4 mr-2" />Back
                      </Button>
                      <Button onClick={() => finishOnboarding(true)} className="flex-1 font-semibold" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating...' : 'Join & Continue'}
                      </Button>
                    </div>
                    <button onClick={() => finishOnboarding(false)} disabled={isSubmitting} className="text-xs text-muted-foreground hover:text-foreground transition-colors text-center underline-offset-4 hover:underline">
                      Continue without community
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-muted/20">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Plus className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Create a Community</p>
                        <p className="text-xs text-muted-foreground">Set up a workspace and share the key with your students.</p>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="community-name" className="text-xs font-medium">Community Name</Label>
                      <Input
                        id="community-name"
                        placeholder="e.g. CSE 2026 Batch"
                        value={communityName}
                        onChange={e => { setCommunityName(e.target.value); setCommunityError(''); }}
                        className={cn(communityError && 'border-destructive focus-visible:ring-destructive')}
                      />
                      {communityError && <p className="text-[11px] text-destructive">{communityError}</p>}
                    </div>
                    {signupError && (
                      <p className="text-sm font-medium text-destructive mb-3">{signupError}</p>
                    )}
                    <Button
                      className="w-full h-11 text-sm font-semibold shadow-sm"
                      onClick={() => finishOnboarding(true)}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Creating account...' : 'Create Workspace'}
                      {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
                    </Button>
                    <button
                      className="w-full py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => finishOnboarding(false)}
                      disabled={isSubmitting}
                    >
                      Skip for now, I'll join later
                    </button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
