'use client';

import { useState, useEffect, useCallback } from 'react';
import { CevoraUser } from '@/types/auth';

const STORAGE_KEY = 'cevora_user';

/**
 * Frontend-only auth hook for Cevora's onboarding flow.
 * Reads/writes to localStorage (SSR-safe via useEffect).
 * Separate from useAuth.ts which handles Supabase.
 */
export function useCevoraAuth() {
  const [user, setUser] = useState<CevoraUser | null>(null);
  // isLoaded prevents hydration mismatch — never reads localStorage on the server
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: CevoraUser = JSON.parse(stored);
        setUser(parsed);
      }
    } catch {
      // Corrupted storage — ignore
    }
    setIsLoaded(true);
  }, []);

  /**
   * Persist newly registered user (not yet logged in).
   * Called at the end of the onboarding modal before navigating to /login.
   */
  const register = useCallback((data: CevoraUser) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setUser(data);
  }, []);

  /**
   * Mock login: matches stored email or username. Password must be ≥ 8 chars.
   * Sets auth.loggedIn = true in localStorage and in state.
   * Returns true on success, false on failure.
   */
  const login = useCallback((emailOrUsername: string, password: string): boolean => {
    if (!emailOrUsername.trim() || password.length < 8) return false;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return false;
      const storedUser: CevoraUser = JSON.parse(stored);
      const isMatch =
        storedUser.profile.email === emailOrUsername.trim() ||
        storedUser.profile.username === emailOrUsername.trim();
      if (!isMatch) return false;
      const loggedIn: CevoraUser = {
        ...storedUser,
        auth: { ...storedUser.auth, loggedIn: true },
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedIn));
      setUser(loggedIn);
      return true;
    } catch {
      return false;
    }
  }, []);

  /**
   * Clears loggedIn flag. Keeps profile in storage so user can log back in.
   */
  const logout = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const u: CevoraUser = JSON.parse(stored);
        const updated: CevoraUser = {
          ...u,
          auth: { ...u.auth, loggedIn: false },
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
    } catch {
      //
    }
    setUser(prev =>
      prev ? { ...prev, auth: { ...prev.auth, loggedIn: false } } : null
    );
  }, []);

  const isLoggedIn = isLoaded && user?.auth?.loggedIn === true;

  return { user, isLoaded, isLoggedIn, register, login, logout };
}
