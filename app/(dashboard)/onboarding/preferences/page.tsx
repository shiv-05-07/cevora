import { redirect } from 'next/navigation';

export default function PreferencesPageRedirect() {
  redirect('/onboarding/goal');
}
