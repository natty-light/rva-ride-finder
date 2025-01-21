import type { Nullable } from '@/types/utility';
import type { User } from 'firebase/auth';
import { create } from 'zustand';

type AuthState = {
    user: Nullable<User>
    setUser: (user: AuthState['user']) => void;
    clearUser: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}));