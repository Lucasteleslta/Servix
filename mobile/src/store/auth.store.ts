import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';
import { User } from '../types/models';

interface AuthState {
  user: User | null;
  token: string | null;
  // Derived at call sites with Boolean(token) — not persisted to avoid string coercion
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  restoreSession: () => void;
}

const secureStorage = createJSONStorage(() => ({
  getItem: async (key: string) => {
    return await SecureStore.getItemAsync(key);
  },
  setItem: async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value);
  },
  removeItem: async (key: string) => {
    await SecureStore.deleteItemAsync(key);
  },
}));

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,

      setAuth: (user, token) => {
        set({ user, token });
      },

      logout: () => {
        set({ user: null, token: null });
      },

      restoreSession: () => {
        // No-op: token/user are restored automatically by zustand persist
      },
    }),
    {
      name: 'auth-storage',
      storage: secureStorage,
    }
  )
);
