export type UserRole = 'CLIENT' | 'PROVIDER' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
}

export interface Provider {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  category: string;
  description?: string;
  hourlyRate?: number;
  rating?: number;
  totalReviews?: number;
  latitude?: number;
  longitude?: number;
  isAvailable: boolean;
  avatarUrl?: string;
  createdAt: string;
}

export type RequestStatus =
  | 'PENDING'
  | 'ACCEPTED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export interface ServiceRequest {
  id: string;
  clientId: string;
  providerId?: string;
  title: string;
  description: string;
  category: string;
  status: RequestStatus;
  scheduledAt?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  budgetMin?: number;
  budgetMax?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Proposal {
  id: string;
  requestId: string;
  providerId: string;
  provider?: Provider;
  price: number;
  estimatedDuration?: string;
  message?: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  createdAt: string;
}

export interface Review {
  id: string;
  requestId: string;
  reviewerId: string;
  revieweeId: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  requestId: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: 'TEXT' | 'IMAGE' | 'LOCATION';
  readAt?: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface ProviderStats {
  completed: number;
  earnings: number;
  rating: number;
}
