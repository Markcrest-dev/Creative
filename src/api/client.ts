/**
 * Professional API Client
 * Centralized HTTP client with interceptors, retries, and error handling
 */

import { logger } from '../services/logger';
import { config } from '../config/env';
import { rateLimiterManager } from '../utils/rateLimit';
import type { ApiResponse, ApiError, RequestConfig } from '../types/api';

export class ApiClient {
  private baseURL: string;
  private defaultHeaders: HeadersInit;

  constructor(baseURL?: string) {
    this.baseURL = baseURL || config.apiBaseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  /**
   * Generic request method with retries and error handling
   */
  private async request<T>(endpoint: string, options: RequestConfig = {}): Promise<ApiResponse<T>> {
    // Wrap with rate limiting
    return rateLimiterManager.execute(endpoint, async () => {
      const { method = 'GET', body, headers = {}, retries = 3, timeout = 10000 } = options;

      const url = `${this.baseURL}${endpoint}`;
      const requestHeaders = { ...this.defaultHeaders, ...headers };

      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      try {
        logger.info(`API Request: ${method} ${endpoint}`);

        const response = await this.fetchWithRetry(
          url,
          {
            method,
            headers: requestHeaders,
            body: body ? JSON.stringify(body) : undefined,
            signal: controller.signal,
          },
          retries
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw await this.handleErrorResponse(response);
        }

        const data = await response.json();
        logger.info(`API Success: ${method} ${endpoint}`, data);

        return {
          data,
          status: response.status,
          headers: response.headers,
        };
      } catch (error) {
        clearTimeout(timeoutId);
        logger.error(`API Error: ${method} ${endpoint}`, error);
        throw this.normalizeError(error);
      }
    });
  }

  /**
   * Fetch with automatic retries
   */
  private async fetchWithRetry(
    url: string,
    options: RequestInit,
    retries: number
  ): Promise<Response> {
    for (let i = 0; i <= retries; i++) {
      try {
        const response = await fetch(url, options);

        // Don't retry on 4xx errors (client errors)
        if (response.status >= 400 && response.status < 500) {
          return response;
        }

        // Retry on 5xx errors (server errors)
        if (response.status >= 500 && i < retries) {
          const delay = Math.min(1000 * Math.pow(2, i), 10000); // Exponential backoff
          logger.warn(`Retrying request in ${delay}ms (attempt ${i + 1}/${retries})`);
          await this.delay(delay);
          continue;
        }

        return response;
      } catch (error) {
        if (i === retries) throw error;

        const delay = Math.min(1000 * Math.pow(2, i), 10000);
        logger.warn(`Network error, retrying in ${delay}ms (attempt ${i + 1}/${retries})`);
        await this.delay(delay);
      }
    }

    throw new Error('Max retries exceeded');
  }

  /**
   * Handle error responses
   */
  private async handleErrorResponse(response: Response): Promise<ApiError> {
    let message = 'An error occurred';
    let details;

    try {
      const errorData = await response.json();
      message = errorData.message || message;
      details = errorData.details;
    } catch {
      message = response.statusText || message;
    }

    return {
      message,
      status: response.status,
      details,
    };
  }

  /**
   * Normalize errors to consistent format
   */
  private normalizeError(error: unknown): ApiError {
    if (error instanceof Error && error.name === 'AbortError') {
      return {
        message: 'Request timeout',
        status: 408,
      };
    }

    if (typeof error === 'object' && error !== null && 'message' in error) {
      const err = error as Record<string, unknown>;
      return {
        message: String(err.message),
        status: typeof err.status === 'number' ? err.status : 500,
        details: err.details,
      };
    }

    return {
      message: 'An unknown error occurred',
      status: 500,
    };
  }

  /**
   * Utility delay function
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * HTTP Methods
   */
  async get<T>(
    endpoint: string,
    options?: Omit<RequestConfig, 'method' | 'body'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T>(
    endpoint: string,
    body?: unknown,
    options?: Omit<RequestConfig, 'method' | 'body'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'POST', body });
  }

  async put<T>(
    endpoint: string,
    body?: unknown,
    options?: Omit<RequestConfig, 'method' | 'body'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body });
  }

  async patch<T>(
    endpoint: string,
    body?: unknown,
    options?: Omit<RequestConfig, 'method' | 'body'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'PATCH', body });
  }

  async delete<T>(
    endpoint: string,
    options?: Omit<RequestConfig, 'method' | 'body'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
