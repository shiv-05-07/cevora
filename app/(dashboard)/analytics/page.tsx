import { Metadata } from 'next';
import { AnalyticsClient } from '@/components/analytics/AnalyticsClient';
import { PageContainer } from '@/components/dashboard/PageContainer';

export const metadata: Metadata = {
  title: 'Analytics | Cevora',
  description: 'Your Career Intelligence Dashboard.',
};

export default function AnalyticsPage() {
  return (
    <PageContainer>
      <AnalyticsClient />
    </PageContainer>
  );
}
