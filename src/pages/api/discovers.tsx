import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;


const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const getDiscover = async (params?: {
  page?: number;
  page_size?: number;
  min_follower?: number;
  max_follower?: number;
  username?: string;
  min_avg_feed_like?: number;
  max_avg_feed_like?: number;
  min_real_engagement?: number;
  max_real_engagement?: number;
  main_audience_gender?: string;
  main_audience_age_range?: string;
  is_verified?: boolean;
  sort_by?: string;
  order?: string;
}) => {
  try {
    // undefined 값들만 제거하여 쿼리 파라미터로 전달 (false는 유지)
    const cleanParams = Object.fromEntries(
      Object.entries(params || {}).filter(([_, value]) => value !== undefined)
    );

    console.log('원본 파라미터:', params);
    console.log('정리된 파라미터:', cleanParams);
    const response = await apiClient.get('api/discover', { params: cleanParams });
    console.log('API 요청 파라미터:', cleanParams);
    console.log('API 응답 데이터:', response.data);
    return response.data;

  } catch (error) {
    console.error('API 요청 실패:', error);
    throw error;
  }
};


export const useDiscoverQuery = (params?: Parameters<typeof getDiscover>[0]) => {
  return useQuery({
    queryKey: ['discover', params],
    queryFn: () => getDiscover(params),
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};


