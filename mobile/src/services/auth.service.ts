import * as SecureStore from 'expo-secure-store';
import api from './api';
import { AuthResponse, User, UserRole } from '@/types/models';

interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/login', { email, password });
    await SecureStore.setItemAsync('auth_token', data.token);
    await SecureStore.setItemAsync('auth_user', JSON.stringify(data.user));
    return data;
  },

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/register', payload);
    await SecureStore.setItemAsync('auth_token', data.token);
    await SecureStore.setItemAsync('auth_user', JSON.stringify(data.user));
    return data;
  },

  async setRole(role: UserRole): Promise<AuthResponse> {
    const { data } = await api.patch<AuthResponse>('/auth/role', { role });
    await SecureStore.setItemAsync('auth_user', JSON.stringify(data.user));
    return data;
  },

  async getStoredAuth(): Promise<{ user: User; token: string } | null> {
    const [token, userJson] = await Promise.all([
      SecureStore.getItemAsync('auth_token'),
      SecureStore.getItemAsync('auth_user'),
    ]);
    if (!token || !userJson) return null;
    return { token, user: JSON.parse(userJson) };
  },

  async logout(): Promise<void> {
    await Promise.all([
      SecureStore.deleteItemAsync('auth_token'),
      SecureStore.deleteItemAsync('auth_user'),
    ]);
  },

  async refreshToken(): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/refresh');
    await SecureStore.setItemAsync('auth_token', data.token);
    return data;
  },
};
