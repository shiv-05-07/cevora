import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface ProfileState {
  profile: UserProfile;
  setProfile: (profile: Partial<UserProfile>) => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'Student',
      },
      setProfile: (newProfile) =>
        set((state) => ({
          profile: { ...state.profile, ...newProfile },
        })),
    }),
    {
      name: 'cevora-profile-storage',
    }
  )
);
