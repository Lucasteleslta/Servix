export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'CLIENT' | 'PROVIDER' | null;
  avatar?: string;
  createdAt: string;
}

export interface Provider {
  id: string;
  userId: string;
  name: string;
  avatar?: string;
  specialty: string;
  bio?: string;
  rating: number;
  reviewCount: number;
  city: string;
  available: boolean;
  services: string[];
  portfolio?: string[];
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
}

export type RequestStatus =
  | 'PENDING'
  | 'ACCEPTED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export type UrgencyLevel = 'NORMAL' | 'URGENT';

export interface ServiceRequest {
  id: string;
  clientId: string;
  providerId?: string;
  title: string;
  description: string;
  category: string;
  address: string;
  preferredDate?: string;
  urgency: UrgencyLevel;
  status: RequestStatus;
  photos?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Proposal {
  id: string;
  requestId: string;
  providerId: string;
  description: string;
  price: number;
  availableDate: string;
  estimatedDays: number;
  includesLabor: boolean;
  includesMaterials: boolean;
  includesWarranty: boolean;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  createdAt: string;
}

export interface Review {
  id: string;
  requestId: string;
  clientId: string;
  providerId: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  requestId: string;
  senderId: string;
  content: string;
  type: 'TEXT' | 'PROPOSAL';
  proposalId?: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
