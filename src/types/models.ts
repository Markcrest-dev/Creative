/**
 * Domain Models
 * Core business entities used throughout the application
 */

export type ID = string;
export type DateString = string; // ISO 8601 format

export interface User {
    id: ID;
    email: string;
    name: string;
    role: 'admin' | 'editor' | 'viewer';
    avatar?: string;
    createdAt: DateString;
    lastLogin?: DateString;
}

export interface Project {
    id: ID;
    slug: string;
    title: string;
    description: string;
    content: string;
    category: ProjectCategory;
    tags: string[];
    thumbnailUrl: string;
    images: string[];
    client?: string;
    completionDate?: DateString;
    status: 'draft' | 'published' | 'archived';
    featured: boolean;
}

export type ProjectCategory = 'web' | 'app' | 'branding' | '3d' | 'marketing';

export interface Testimonial {
    id: ID;
    author: string;
    role: string;
    company?: string;
    avatar?: string;
    content: string;
    rating: 1 | 2 | 3 | 4 | 5;
    projectId?: ID;
}

export interface BlogPost {
    id: ID;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    authorId: ID;
    coverImage?: string;
    tags: string[];
    publishedAt: DateString;
    status: 'draft' | 'published';
    readTimeMinutes: number;
}
