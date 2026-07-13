/**
 * Pure, side-effect-free formatting utility.
 * Converts a Date object, ISO string, or timestamp into a human-readable format.
 * Matches guidelines in DEVELOPER_BIBLE.md (pure, no UI dependencies, testable).
 */
export function formatDate(date: Date | string | number | null | undefined): string {
  if (!date) return '';
  
  try {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return '';
    }
    
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(parsedDate);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
}

/**
 * Formats a date to show relative time (e.g. "2 hours ago", "yesterday").
 */
export function formatRelativeTime(date: Date | string | number): string {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return '';
  }

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - parsedDate.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return 'yesterday';
  if (diffInDays < 7) return `${diffInDays}d ago`;

  return formatDate(parsedDate);
}
