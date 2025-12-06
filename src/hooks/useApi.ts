import { useState, useCallback } from 'react';
import { apiClient } from '../api/client';
import type { ApiResponse, ApiError, RequestConfig } from '../types/api';
import { logger } from '../services/logger';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: (config?: RequestConfig) => Promise<ApiResponse<T> | null>;
  reset: () => void;
}

/**
 * Custom hook for API requests
 * Manages loading, error, and data states
 */
export function useApi<T>(endpoint: string, initialConfig?: RequestConfig): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (config?: RequestConfig) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const mergedConfig = { ...initialConfig, ...config };

        // Determine method based on config or default to GET
        const method = mergedConfig.method || 'GET';
        let response: ApiResponse<T>;

        switch (method) {
          case 'POST':
            response = await apiClient.post<T>(endpoint, mergedConfig.body, mergedConfig);
            break;
          case 'PUT':
            response = await apiClient.put<T>(endpoint, mergedConfig.body, mergedConfig);
            break;
          case 'PATCH':
            response = await apiClient.patch<T>(endpoint, mergedConfig.body, mergedConfig);
            break;
          case 'DELETE':
            response = await apiClient.delete<T>(endpoint, mergedConfig);
            break;
          case 'GET':
          default:
            response = await apiClient.get<T>(endpoint, mergedConfig);
            break;
        }

        setState({
          data: response.data,
          loading: false,
          error: null,
        });

        return response;
      } catch (error: unknown) {
        const apiError: ApiError = {
          message: error instanceof Error ? error.message : 'An unexpected error occurred',
          status: (error as ApiError).status || 500,
          details: (error as ApiError).details,
        };

        logger.error(`API Error in useApi (${endpoint})`, apiError);

        setState((prev) => ({
          ...prev,
          loading: false,
          error: apiError,
        }));

        return null;
      }
    },
    [endpoint, initialConfig]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}
