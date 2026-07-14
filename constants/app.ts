/**
 * Centralized Application Configuration.
 * Governs the branding name, description, SEO metadata, and product version.
 * Keeps branding variables consistent and decoupled from components.
 */
export const APP_CONFIG = {
  name: 'Cevora',
  tagline: 'Placement Intelligence Platform',
  description:
    'Prepare smarter for campus placements. Cevora organizes company-specific preparation, resume analysis, linear roadmaps, and mock interview practice in a collaborative workspace.',
  version: '0.1.0-mvp',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  metadata: {
    title: 'Cevora | Placement Intelligence Platform',
    description:
      'Prepare smarter for campus placements. Cevora organizes company-specific preparation, resume analysis, linear roadmaps, and mock interview practice in a collaborative workspace.',
    keywords: [
      'placement preparation',
      'placement intelligence',
      'resume optimization',
      'campus placements',
      'coding interview prep',
      'faculty workspace',
      'mock interview',
    ],
  },
};
