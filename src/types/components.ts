/**
 * Component Prop Types
 * Shared type definitions for React components
 */

import { ReactNode, CSSProperties } from 'react';

export interface BaseProps {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  id?: string;
  'data-testid'?: string;
}

export interface WithLoading {
  isLoading?: boolean;
}

export interface WithError {
  error?: string | Error | null;
}

export interface ButtonProps extends BaseProps, WithLoading {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  href?: string;
}

export interface InputProps extends BaseProps, WithError {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
}

export interface ModalProps extends BaseProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
}

export interface CardProps extends BaseProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  footer?: ReactNode;
  hoverable?: boolean;
  onClick?: () => void;
}

export interface IconProps extends BaseProps {
  size?: number | string;
  color?: string;
  strokeWidth?: number;
}

// Team Member types for About component
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface TeamMemberData {
  name: string;
  role: string;
  bio: string;
  image: string;
  social: SocialLink[];
}

// Product types for Services component
export interface Product {
  title: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  tags: string[];
  type: 'course' | 'asset';
  color: string;
}

export interface ProductCategory {
  category: string;
  description: string;
  items: Product[];
}

// Performance Metric types
export interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}
