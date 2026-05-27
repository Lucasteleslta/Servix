import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';
import { User } from '../types/models';

interface AuthState {
  user: User | null;
  token: string | null;
  _hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  restoreSession: () => void;
}

const secureStorage = createJSONStorage(() => ({
  getItem: async (key: string): Promise<string | null> => {
    try {
      return await SecureStore.getItemAsync(key);
    } catch {
      return null;
    }
  },
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch {
      // SecureStore unavailable (e.g. simulator without keychain) — ignore
    }
  },
  removeItem: async (key: string): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch {}
  },
}));

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      _hasHydrated: false,

      setHasHydrated: (value) => set({ _hasHydrated: value }),

      setAuth: (user, token) => set({ user, token }),

      logout: () => set({ user: null, token: null }),

      restoreSession: () => {
        // zustand persist restores user/token automatically from SecureStore.
        // This is a no-op kept for API compatibility; _hasHydrated signals readiness.
      },
    }),
    {
      name: 'auth-storage',
      storage: secureStorage,
      // Only persist user and token — not ephemeral flags
      partialize: (state) => ({ user: state.user, token: state.token }),
      onRehydrateStorage: () => (state) => {
        // Called after hydration completes (or fails). Marks the store as ready.
        state?.setHasHydrated(true);
      },
    }
  )
);
