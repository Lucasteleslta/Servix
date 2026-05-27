import { api } from './api';
import { ServiceRequest } from '../types/models';

interface CreateRequestData {
  title: string;
  description: string;
  category: string;
  address: string;
  preferredDate?: string;
  urgency?: 'NORMAL' | 'URGENT';
  providerId?: string;
  photos?: string[];
}

/** Extract list from either array or paginated { content: [] } response */
function extractList(data: any): ServiceRequest[] {
  if (Array.isArray(data)) return data;
  if (data?.content && Array.isArray(data.content)) return data.content;
  return [];
}

export const requestService = {
  create: async (data: CreateRequestData): Promise<ServiceRequest> => {
    const { data: response } = await api.post<ServiceRequest>('/requests', data);
    return response;
  },

  getMyRequests: async (): Promise<ServiceRequest[]> => {
    const { data } = await api.get<any>('/requests/my');
    return extractList(data);
  },

  getReceivedRequests: async (): Promise<ServiceRequest[]> => {
    const { data } = await api.get<any>('/requests/received');
    return extractList(data);
  },

  accept: async (id: string): Promise<ServiceRequest> => {
    const { data } = await api.patch<ServiceRequest>(`/requests/${id}/accept`);
    return data;
  },

  cancel: async (id: string): Promise<ServiceRequest> => {
    const { data } = await api.patch<ServiceRequest>(`/requests/${id}/cancel`);
    return data;
  },

  complete: async (id: string): Promise<ServiceRequest> => {
    const { data } = await api.patch<ServiceRequest>(`/requests/${id}/complete`);
    return data;
  },
};
