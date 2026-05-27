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
  // API returns userName; service layer normalises to name
  name: string;
  userName?: string;
  avatar?: string;
  avatarUrl?: string;
  // API returns category; specialty is the normalised alias
  specialty: string;
  category?: string;
  bio?: string;
  description?: string;
  rating: number;
  reviewCount: number;
  totalReviews?: number;
  city: string;
  available: boolean;
  hourlyRate?: number;
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
  clientName?: string;
  providerId?: string;
  providerName?: string;
  title: string;
  description: string;
  category: string;
  address: string;
  preferredDate?: string;
  scheduledAt?: string;
  urgency?: UrgencyLevel;
  status: RequestStatus;
  budgetMin?: number;
  budgetMax?: number;
  proposalCount?: number;
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
