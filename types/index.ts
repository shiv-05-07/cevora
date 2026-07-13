/**
 * Universal API Response wrapper format.
 * Matches recommendations in DEVELOPER_BIBLE.md.
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

/**
 * Standard user role enumeration.
 */
export type UserRole = 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';

/**
 * Generic navigation configuration item.
 */
export interface NavigationItem {
  title: string;
  href: string;
  icon?: string;
  disabled?: boolean;
  external?: boolean;
}

/**
 * Represents current platform UI State (e.g. Loading / Success / Error).
 */
export type LoadState = 'idle' | 'loading' | 'success' | 'error';
