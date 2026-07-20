'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CevoraLogo } from '@/components/shared/CevoraLogo';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { useCevoraAuth } from '@/hooks/useCevoraAuth';
import { cn } from '@/lib/utils';

interface LoginForm {
  identifier: string; // email or username
  password: string;
}

interface FormErrors {
  identifier?: string;
  password?: string;
  general?: string;
}

function validate(form: LoginForm): FormErrors {
  const errors: FormErrors = {};
  if (!form.identifier.trim()) errors.identifier = 'Email or username is required.';
  if (!form.password) {
    errors.password = 'Password is required.';
  } else if (form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  }
  return errors;
}

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoggedIn, isLoaded } = useCevoraAuth();

  const [form, setForm] = React.useState<LoginForm>({ identifier: '', password: '' });
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [showPassword, setShowPassword] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Redirect if already logged in
  React.useEffect(() => {
    if (isLoaded && isLoggedIn) {
      router.replace('/dashboard');
    }
  }, [isLoaded, isLoggedIn, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    // Small artificial delay for UX feel
    await new Promise(r => setTimeout(r, 600));

    const success = login(form.identifier.trim(), form.password);
    if (success) {
      router.push('/dashboard');
    } else {
      setErrors({ general: 'Invalid credentials. Please check your email / username and password.' });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Minimal top bar */}
      <header className="h-14 border-b border-border/60 flex items-center justify-between px-4 sm:px-8 shrink-0">
        <Link href="/" aria-label="Cevora home">
          <CevoraLogo size="medium" />
        </Link>
        <ThemeToggle />
      </header>

      {/* Centered card */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-[420px] space-y-6 sm:space-y-8">

          {/* Heading */}
          <div className="text-center space-y-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Welcome back</h1>
            <p className="text-sm text-muted-foreground">
              Sign in to continue your placement journey.
            </p>
          </div>

          {/* Card */}
          <div className="bg-card border border-border/50 rounded-2xl shadow-sm p-5 sm:p-8 space-y-5">

            {/* General error */}
            {errors.general && (
              <div className="flex items-start gap-3 p-3 rounded-xl bg-destructive/5 border border-destructive/20 text-destructive">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <p className="text-xs leading-relaxed">{errors.general}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Email or Username */}
              <div className="space-y-1.5">
                <Label htmlFor="login-identifier" className="text-xs font-medium">
                  Email or Username
                </Label>
                <Input
                  id="login-identifier"
                  type="text"
                  autoComplete="username"
                  placeholder="john@university.edu or johndoe"
                  value={form.identifier}
                  onChange={e => setForm(prev => ({ ...prev, identifier: e.target.value }))}
                  className={cn(errors.identifier && 'border-destructive focus-visible:ring-destructive')}
                />
                {errors.identifier && (
                  <p className="text-[11px] text-destructive">{errors.identifier}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <Label htmlFor="login-password" className="text-xs font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={e => setForm(prev => ({ ...prev, password: e.target.value }))}
                    className={cn(
                      'pr-10',
                      errors.password && 'border-destructive focus-visible:ring-destructive'
                    )}
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
                {errors.password && (
                  <p className="text-[11px] text-destructive">{errors.password}</p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full font-semibold hover:-translate-y-[1px] transition-all duration-200 shadow-sm mt-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 mr-2 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Signing in…
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/40" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-3 text-muted-foreground">or</span>
              </div>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/" className="text-primary hover:underline font-medium underline-offset-4">
                Get started free
              </Link>
            </p>
          </div>

          <p className="text-center text-[11px] text-muted-foreground">
            By signing in, you agree to Cevora&apos;s terms of service and privacy policy.
          </p>
        </div>
      </main>
    </div>
  );
}
