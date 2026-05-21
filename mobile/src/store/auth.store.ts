import { create } from 'zustand';
import { User } from '@/types/models';
import { authService } from '@/services/auth.service';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;

  setAuth: (user: User, token: string) => void;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: true,

  setAuth: (user, token) => set({ user, token }),

  logout: async () => {
    await authService.logout();
    set({ user: null, token: null });
  },

  restoreSession: async () => {
    try {
      const stored = await authService.getStoredAuth();
      if (stored) {
        set({ user: stored.user, token: stored.token });
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));
