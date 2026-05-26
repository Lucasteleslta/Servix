import { api } from './api';
import { ServiceRequest } from '../types/models';

interface CreateRequestData {
  title: string;
  description: string;
  category: string;
  address: string;
  preferredDate?: string;
  urgency: 'NORMAL' | 'URGENT';
  providerId?: string;
  photos?: string[];
}

export const requestService = {
  create: async (data: CreateRequestData): Promise<ServiceRequest> => {
    const { data: response } = await api.post<ServiceRequest>('/requests', data);
    return response;
  },

  getMyRequests: async (): Promise<ServiceRequest[]> => {
    const { data } = await api.get<ServiceRequest[]>('/requests/my');
    return data;
  },

  getReceivedRequests: async (): Promise<ServiceRequest[]> => {
    const { data } = await api.get<ServiceRequest[]>('/requests/received');
    return data;
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
