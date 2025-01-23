import type { Nullable } from '@/types/utility';
import type { User } from 'firebase/auth';
import { create } from 'zustand';

type AuthState = {
  user: Nullable<User>
  isSignedIn: boolean;
  setIsSignedIn: (value: boolean) => void;
  setUser: (user: AuthState['user']) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isSignedIn: false,
  setIsSignedIn: (isSignedIn) => set({ isSignedIn }),
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));