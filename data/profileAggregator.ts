import { SettingsData } from '@/types/settings';
import { AnalyticsDashboardData } from '@/types/analytics';
import { AggregatedProfile } from '@/types/profile';
import { mockProjects, mockCertifications, mockEducation, mockExperience } from './mockProfile';

export function buildProfile({
  settings,
  analytics
}: {
  settings: SettingsData;
  analytics: AnalyticsDashboardData;
}): AggregatedProfile {
  // Calculate dynamic profile completion
  const remainingTasks: string[] = [];
  let score = 0;

  if (settings.profile.avatar) {
    score += 10;
  } else {
    remainingTasks.push('Upload an avatar picture');
  }

  // Resume score (check settings or analytics)
  const resumeScore = analytics.readiness.resume;
  if (resumeScore > 0) {
    score += 20;
  } else {
    remainingTasks.push('Upload and scan your resume');
  }

  if (mockProjects.length > 0) {
    score += 20;
  } else {
    remainingTasks.push('Add at least one portfolio project');
  }

  if (settings.career.techStack.length > 0) {
    score += 15;
  } else {
    remainingTasks.push('List your core tech stack skills');
  }

  // Bio from settings or custom
  if (settings.profile.name) {
    score += 10;
  } else {
    remainingTasks.push('Fill in your profile bio details');
  }

  if (settings.career.targetRole) {
    score += 10;
  } else {
    remainingTasks.push('Set your target career role');
  }

  const githubConnected = settings.accounts.find(a => a.id === 'github' && a.status === 'Connected');
  const linkedinConnected = settings.accounts.find(a => a.id === 'linkedin' && a.status === 'Connected');
  if (githubConnected || linkedinConnected) {
    score += 15;
  } else {
    remainingTasks.push('Connect your GitHub or LinkedIn account');
  }

  // Generate dynamic AI summary recommendations
  let aiSummaryText = 'Your strongest area is Coding & Algorithm design. Excellent progress on your DSA streak.';
  let suggestedAction = 'Practice Mock Interview';
  let suggestedActionHref = '/interview/session';
  let priority: 'High' | 'Medium' | 'Low' = 'Medium';

  if (resumeScore < 85) {
    aiSummaryText = 'Your Resume ATS score is currently at ' + resumeScore + '%. We recommend optimizing keywords for cloud and system design.';
    suggestedAction = 'Optimize Resume';
    suggestedActionHref = '/resume';
    priority = 'High';
  } else if (mockProjects.length < 3) {
    aiSummaryText = 'Your technical baseline is solid, but showcasing 3 projects on your portfolio is recommended for Amazon.';
    suggestedAction = 'Add Project';
    suggestedActionHref = '#projects';
  } else {
    const amazonComp = analytics.companyReadiness.find(c => c.name === 'Amazon');
    if (amazonComp && amazonComp.overallReadiness < 85) {
      aiSummaryText = `To become Amazon-ready, complete the System Design roadmap. Current match is ${amazonComp.overallReadiness}%.`;
      suggestedAction = 'Start System Design';
      suggestedActionHref = '/roadmaps';
      priority = 'High';
    }
  }

  return {
    settings,
    analytics,
    projects: mockProjects,
    certifications: mockCertifications,
    education: mockEducation,
    experience: mockExperience,
    profileCompletionScore: score,
    remainingTasks,
    aiSummary: {
      text: aiSummaryText,
      priority,
      confidence: 89,
      suggestedAction,
      suggestedActionHref
    }
  };
}
