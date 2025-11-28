/**
 * API Type Definitions
 * Centralized types for API requests and responses
 */

export interface ApiResponse<T> {
  data: T;
  status: number;
  headers: Headers;
}

export interface ApiError {
  message: string;
  status: number;
  details?: unknown;
}

export interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  headers?: HeadersInit;
  retries?: number;
  timeout?: number;
}

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
  id?: string;
}

// Instructor Types
export interface Instructor {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio?: string;
}

// Portfolio Types
export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  category: 'web' | 'app' | 'branding' | '3d';
  color: string;
  tags?: string[];
  results?: string[];
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  instructor?: Instructor; // Added instructor field
}

export interface PortfolioResponse {
  projects: PortfolioProject[];
  total: number;
  page: number;
  pageSize: number;
}

// Service Types
export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  price?: {
    min: number;
    max: number;
    currency: string;
  };
}

// Team Member Types
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

// Analytics Types
export interface AnalyticsEvent {
  name: string;
  value?: number;
  category?: string;
  label?: string;
}

export interface WebVitalMetric {
  name: string;
  value: number;
  id: string;
  navigationType?: string;
}
