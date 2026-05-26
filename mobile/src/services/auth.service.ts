import { api } from './api';
import { AuthResponse, User } from '../types/models';

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/login', { email, password });
    return data;
  },

  register: async (
    name: string,
    email: string,
    phone: string,
    password: string
  ): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/register', {
      name,
      email,
      phone,
      password,
    });
    return data;
  },

  setRole: async (role: 'CLIENT' | 'PROVIDER'): Promise<User> => {
    const { data } = await api.patch<User>('/auth/role', { role });
    return data;
  },
};
