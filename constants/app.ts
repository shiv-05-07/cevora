/**
 * Centralized Application Configuration.
 * Governs the branding name, description, SEO metadata, and product version.
 * Keeps branding variables consistent and decoupled from components.
 */
export const APP_CONFIG = {
  name: 'Cevora',
  tagline: 'AI-Powered Placement Intelligence',
  description:
    'Master your technical interviews. Cevora accelerates placement readiness for engineering students using AI-guided adaptive assessments, targeted daily study missions, and live diagnostic profiles.',
  version: '0.1.0-mvp',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  metadata: {
    title: 'Cevora | AI-Powered Placement Intelligence',
    description:
      'Master technical interviews and campus placements. Cevora provides AI-guided adaptive assessments, targeted daily micro-learning missions, and detailed skill diagnostic tracking.',
    keywords: [
      'placement preparation',
      'AI learning platform',
      'microlearning',
      'campus placements',
      'adaptive assessments',
      'coding interview prep',
      'career mentor',
    ],
  },
};
