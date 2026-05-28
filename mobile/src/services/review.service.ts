import { api } from './api';

export interface ReviewItem {
  id: string;
  requestId: string;
  reviewerId: string;
  reviewerName: string;
  revieweeId: string;
  revieweeName: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

export interface CreateReviewData {
  requestId: string;
  rating: number;
  comment?: string;
}

/** Extract list from either array or paginated { content: [] } response */
function extractList(data: any): ReviewItem[] {
  if (Array.isArray(data)) return data;
  if (data?.content && Array.isArray(data.content)) return data.content;
  return [];
}

export const reviewService = {
  getByProvider: async (providerId: string): Promise<ReviewItem[]> => {
    const { data } = await api.get<any>(`/reviews/provider/${providerId}`);
    return extractList(data);
  },

  create: async (reviewData: CreateReviewData): Promise<ReviewItem> => {
    const { data } = await api.post<ReviewItem>('/reviews', reviewData);
    return data;
  },

  getMyReviews: async (): Promise<ReviewItem[]> => {
    const { data } = await api.get<any>('/reviews/my');
    return extractList(data);
  },
};
