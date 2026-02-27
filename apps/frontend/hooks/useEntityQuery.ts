import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { apiGet } from '../lib/apiClient';
import { ApiResponse, PaginatedResponse } from '../lib/types';

/**
 * useEntityQuery<T>
 * 
 * Generic hook to query any entity to reduce duplication for different domains
 * while increasing type safety.
 */

export function useEntityQuery<T>(
    queryKey: string[],
    endpoint: string,
    options?: Omit<UseQueryOptions<T, Error, T, string[]>, 'queryKey' | 'queryFn'>
) {
    return useQuery({
        queryKey,
        queryFn: async () => {
            const data = await apiGet<T>(endpoint);
            return data;
        },
        ...options,
    });
}

export function usePaginatedEntityQuery<T>(
    queryKey: string[],
    endpoint: string,
    page: number = 1,
    limit: number = 10,
    options?: Omit<UseQueryOptions<PaginatedResponse<T>, Error, PaginatedResponse<T>, string[]>, 'queryKey' | 'queryFn'>
) {
    return useQuery({
        queryKey: [...queryKey, page.toString(), limit.toString()],
        queryFn: async () => {
            const data = await apiGet<PaginatedResponse<T>>(`${endpoint}?page=${page}&limit=${limit}`);
            return data;
        },
        ...options,
    });
}
