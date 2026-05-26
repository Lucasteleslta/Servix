import { api } from './api';
import { Provider } from '../types/models';

export const providerService = {
  getFeatured: async (): Promise<Provider[]> => {
    const { data } = await api.get<Provider[]>('/providers/featured');
    return data;
  },

  search: async (query?: string, category?: string, city?: string): Promise<Provider[]> => {
    const { data } = await api.get<Provider[]>('/providers', {
      params: { query, category, city },
    });
    return data;
  },

  getById: async (id: string): Promise<Provider> => {
    const { data } = await api.get<Provider>(`/providers/${id}`);
    return data;
  },
};
