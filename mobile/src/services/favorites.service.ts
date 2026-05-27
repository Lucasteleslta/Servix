import { api } from './api';

export interface FavoriteItem {
  id: string;
  providerId: string;
  providerName: string;
  providerAvatarUrl?: string;
  category: string;
  hourlyRate?: number;
  rating: number;
  available: boolean;
  favoritedAt: string;
}

function extractList(data: any): any[] {
  if (Array.isArray(data)) return data;
  if (data?.content && Array.isArray(data.content)) return data.content;
  return [];
}

export const favoritesService = {
  getAll: async (): Promise<FavoriteItem[]> => {
    const { data } = await api.get<any>('/favorites');
    return extractList(data);
  },

  add: async (providerId: string): Promise<FavoriteItem> => {
    const { data } = await api.post<FavoriteItem>(`/favorites/${providerId}`, {});
    return data;
  },

  remove: async (providerId: string): Promise<void> => {
    await api.delete(`/favorites/${providerId}`);
  },
};
