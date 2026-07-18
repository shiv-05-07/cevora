import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useProfileStore } from '@/store/useProfileStore';

interface ProfileAvatarProps {
  className?: string;
  fallbackClassName?: string;
}

export function ProfileAvatar({ className, fallbackClassName }: ProfileAvatarProps) {
  const { profile } = useProfileStore();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Avatar className={cn('w-8 h-8 shrink-0 select-none border border-white/20', className)}>
      {profile.avatar ? (
        <AvatarImage src={profile.avatar} alt={profile.name} className="object-cover" />
      ) : (
        <AvatarFallback className={cn('text-xs uppercase font-semibold bg-primary/10 text-primary', fallbackClassName)}>
          {getInitials(profile.name)}
        </AvatarFallback>
      )}
    </Avatar>
  );
}
