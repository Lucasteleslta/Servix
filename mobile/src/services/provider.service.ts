import api from './api';
import { Provider } from '@/types/models';

interface SearchParams {
  query?: string;
  category?: string;
  lat?: number;
  lng?: number;
  radius?: number;
  page?: number;
  size?: number;
}

export const providerService = {
  async getFeatured(): Promise<Provider[]> {
    const { data } = await api.get<Provider[]>('/providers/featured');
    return data;
  },

  async search(query: string, category?: string, params?: Partial<SearchParams>): Promise<Provider[]> {
    const { data } = await api.get<Provider[]>('/providers/search', {
      params: { query, category, ...params },
    });
    return data;
  },

  async getById(id: string): Promise<Provider> {
    const { data } = await api.get<Provider>(`/providers/${id}`);
    return data;
  },

  async getMyProfile(): Promise<Provider> {
    const { data } = await api.get<Provider>('/providers/me');
    return data;
  },

  async updateProfile(payload: Partial<Provider>): Promise<Provider> {
    const { data } = await api.put<Provider>('/providers/me', payload);
    return data;
  },

  async getNearby(lat: number, lng: number, radius = 10): Promise<Provider[]> {
    const { data } = await api.get<Provider[]>('/providers/nearby', {
      params: { lat, lng, radius },
    });
    return data;
  },
};
