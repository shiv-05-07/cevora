import { useRouter } from 'next/navigation';
import { Settings } from 'lucide-react';
import { ProfileAvatar } from './ProfileAvatar';
import { useProfileStore } from '@/store/useProfileStore';
import { useAuth } from '@/hooks/useAuth';

export function ProfilePreviewCard() {
  const router = useRouter();
  const { profile } = useProfileStore();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    router.refresh();
  };

  return (
    <div className="w-64 p-4 rounded-xl backdrop-blur-xl bg-white/95 dark:bg-black/95 border border-white/20 dark:border-white/10 shadow-2xl transition-all duration-300 ease-in-out">
      <div className="flex flex-col items-center text-center space-y-3">
        <ProfileAvatar className="w-16 h-16 shadow-md border-2 border-primary/20" fallbackClassName="text-xl" />
        
        <div className="space-y-1">
          <h4 className="font-semibold text-lg leading-none">{profile.name}</h4>
          <p className="text-sm text-muted-foreground">{profile.email}</p>
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize mt-2">
            {profile.role}
          </div>
        </div>

        <div className="w-full mt-2 space-y-1">
          <button
            onClick={() => router.push('/settings')}
            className="w-full flex items-center justify-center gap-2 rounded-lg py-1.5 px-3 text-sm font-medium bg-background/50 hover:bg-primary hover:text-primary-foreground transition-colors border border-border/50"
          >
            <Settings className="w-4 h-4" />
            Go to Settings
          </button>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 rounded-lg py-1.5 px-3 text-sm font-medium bg-background/50 hover:bg-destructive hover:text-destructive-foreground transition-colors border border-border/50"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
