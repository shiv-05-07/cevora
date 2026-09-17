import { redirect } from 'next/navigation';

export default function DiagnosticPage() {
  redirect('/dashboard/diagnostic/start');
}
