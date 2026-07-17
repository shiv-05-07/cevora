import { Metadata } from 'next';
import { MentorClient } from '@/components/mentor/MentorClient';

export const metadata: Metadata = {
  title: 'AI Career Mentor | Cevora',
  description: 'Your personal AI career mentor for resume optimization, DSA planning, and interview preparation.',
};

export default function MentorPage() {
  return (
    <div className="absolute inset-0 m-0 border-t border-border/40">
      <MentorClient />
    </div>
  );
}
