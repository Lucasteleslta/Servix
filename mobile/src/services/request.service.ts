import api from './api';
import { ServiceRequest, Proposal, ProviderStats } from '@/types/models';

interface CreateRequestPayload {
  title: string;
  description: string;
  category: string;
  scheduledAt?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  budgetMin?: number;
  budgetMax?: number;
}

export const requestService = {
  async getMyRequests(): Promise<ServiceRequest[]> {
    const { data } = await api.get<ServiceRequest[]>('/requests/mine');
    return data;
  },

  async getById(id: string): Promise<ServiceRequest> {
    const { data } = await api.get<ServiceRequest>(`/requests/${id}`);
    return data;
  },

  async create(payload: CreateRequestPayload): Promise<ServiceRequest> {
    const { data } = await api.post<ServiceRequest>('/requests', payload);
    return data;
  },

  async cancel(id: string): Promise<void> {
    await api.patch(`/requests/${id}/cancel`);
  },

  async getPendingForProvider(): Promise<ServiceRequest[]> {
    const { data } = await api.get<ServiceRequest[]>('/requests/pending');
    return data;
  },

  async acceptRequest(id: string): Promise<ServiceRequest> {
    const { data } = await api.patch<ServiceRequest>(`/requests/${id}/accept`);
    return data;
  },

  async rejectRequest(id: string): Promise<void> {
    await api.patch(`/requests/${id}/reject`);
  },

  async completeRequest(id: string): Promise<ServiceRequest> {
    const { data } = await api.patch<ServiceRequest>(`/requests/${id}/complete`);
    return data;
  },

  async getProposals(requestId: string): Promise<Proposal[]> {
    const { data } = await api.get<Proposal[]>(`/requests/${requestId}/proposals`);
    return data;
  },

  async acceptProposal(requestId: string, proposalId: string): Promise<Proposal> {
    const { data } = await api.patch<Proposal>(`/requests/${requestId}/proposals/${proposalId}/accept`);
    return data;
  },

  async getProviderStats(): Promise<ProviderStats> {
    const { data } = await api.get<ProviderStats>('/providers/me/stats');
    return data;
  },
};
