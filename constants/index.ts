import { NavigationItem } from '@/types';

/**
 * Platform meta attributes for SEO and header declarations.
 */
export const PLATFORM_METADATA = {
  name: 'Atlas',
  description: 'AI-powered Adaptive Microlearning Platform',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
};

/**
 * Standard list of navigation nodes for the Platform Sidebar.
 * Grouped under major product areas.
 */
export const SIDEBAR_NAV_ITEMS: NavigationItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'LayoutDashboard',
  },
  {
    title: 'Microlearning Missions',
    href: '/missions',
    icon: 'Compass',
  },
  {
    title: 'Personal Roadmaps',
    href: '/roadmaps',
    icon: 'Map',
  },
  {
    title: 'Performance & Analytics',
    href: '/analytics',
    icon: 'BarChart2',
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: 'Settings',
  },
];

/**
 * Standard HTTP Status Codes.
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
