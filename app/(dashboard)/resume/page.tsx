import { ResumeAnalyzerClient } from '@/components/resume/ResumeAnalyzerClient';
import { PageHeader } from '@/components/dashboard/PageHeader';

export const metadata = {
  title: 'Resume Analyzer | Cevora',
  description: 'Upload your resume and receive a complete ATS-style analysis, personalized improvement suggestions, keyword optimization, and recruiter readiness insights.',
};

export default function ResumeAnalyzerPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Resume Analyzer"
        description="Upload your resume and receive a complete ATS-style analysis, personalized improvement suggestions, keyword optimization, and recruiter readiness insights."
      />
      <ResumeAnalyzerClient />
    </div>
  );
}
