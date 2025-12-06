# API Documentation

## Overview

The Creative★ Agency application uses a centralized API architecture with built-in error handling, retries, and rate limiting.

## API Client

### ApiClient Class

Location: [`src/api/client.ts`](file:///home/mark/Desktop/Creative/src/api/client.ts)

The main HTTP client for all API requests with automatic retries, timeout handling, and rate limiting.

#### Configuration

```typescript
const apiClient = new ApiClient(baseURL?: string)
```

**Default Configuration:**
- Base URL: From `config.apiBaseUrl`
- Timeout: 10 seconds
- Retries: 3 attempts with exponential backoff
- Rate Limiting: Token bucket algorithm (10 requests/second default)

#### Methods

##### GET Request
```typescript
apiClient.get<T>(endpoint: string, options?: RequestConfig): Promise<ApiResponse<T>>
```

##### POST Request
```typescript
apiClient.post<T>(endpoint: string, body?: unknown, options?: RequestConfig): Promise<ApiResponse<T>>
```

##### PUT Request
```typescript
apiClient.put<T>(endpoint: string, body?: unknown, options?: RequestConfig): Promise<ApiResponse<T>>
```

##### DELETE Request
```typescript
apiClient.delete<T>(endpoint: string, options?: RequestConfig): Promise<ApiResponse<T>>
```

## API Service

### ApiService Class

Location: [`src/api/apiService.ts`](file:///home/mark/Desktop/Creative/src/api/apiService.ts)

High-level service for business logic and data transformation.

#### Contact Form

```typescript
ApiService.submitContactForm(data: ContactFormData): Promise<ApiResponse<void>>
```

**Parameters:**
- `data.name` (string): Contact name
- `data.email` (string): Email address
- `data.phone` (string, optional): Phone number
- `data.message` (string): Message content

**Example:**
```typescript
const result = await ApiService.submitContactForm({
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Interested in your services'
});
```

#### Portfolio Data

```typescript
ApiService.fetchPortfolioData(): Promise<PortfolioProject[]>
```

**Returns:** Array of portfolio projects

**Example:**
```typescript
const projects = await ApiService.fetchPortfolioData();
```

#### Instructors Data

```typescript
ApiService.fetchInstructors(): Promise<Instructor[]>
```

**Returns:** Array of instructors

#### Team Members

```typescript
ApiService.fetchTeamMembers(): Promise<TeamMember[]>
```

**Returns:** Array of team members

#### Analytics Events

```typescript
ApiService.trackEvent(event: AnalyticsEvent): Promise<void>
```

**Parameters:**
- `event.name` (string): Event name
- `event.properties` (object, optional): Event metadata

## Rate Limiting

### RateLimiter

Location: [`src/utils/rateLimit.ts`](file:///home/mark/Desktop/Creative/src/utils/rateLimit.ts)

Token bucket implementation for API rate limiting.

#### Configuration

```typescript
new RateLimiter({
  maxTokens: 10,        // Bucket capacity
  refillRate: 2,        // Tokens per second
  refillInterval: 1000  // Refill frequency (ms)
})
```

#### Usage

```typescript
const limiter = new RateLimiter({ maxTokens: 10, refillRate: 2 });

// Execute rate-limited request
await limiter.execute(async () => {
  return await fetch('/api/data');
});
```

### RateLimiterManager

Manages rate limiters for multiple endpoints.

```typescript
// Execute with per-endpoint limiting
await rateLimiterManager.execute('/api/contact', async () => {
  return await apiClient.post('/contact', data);
});
```

## Error Handling

### ApiError Interface

```typescript
interface ApiError {
  message: string;
  status: number;
  details?: unknown;
}
```

### Error Responses

All API errors follow a consistent format:

```typescript
try {
  await ApiService.submitContactForm(data);
} catch (error: ApiError) {
  console.error(error.message);  // Human-readable message
  console.error(error.status);   // HTTP status code
  console.error(error.details);  // Additional error info
}
```

## Type Definitions

### Core Types

Location: [`src/types/api.ts`](file:///home/mark/Desktop/Creative/src/types/api.ts)

#### ContactFormData
```typescript
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}
```

#### PortfolioProject
```typescript
interface PortfolioProject {
  id: string;
  title: string;
  category: 'web' | 'app' | 'branding' | '3d';
  description: string;
  color: string;
  results: string[];
  instructor?: Instructor;
}
```

#### Instructor
```typescript
interface Instructor {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
}
```

#### TeamMember
```typescript
interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  social: Array<{ platform: string; url: string }>;
}
```

## Best Practices

### 1. Use ApiService Methods

Instead of calling `apiClient` directly, use `ApiService` methods:

```typescript
// ✅ Good
const projects = await ApiService.fetchPortfolioData();

// ❌ Avoid
const response = await apiClient.get('/portfolio');
```

### 2. Handle Errors Properly

```typescript
try {
  await ApiService.submitContactForm(data);
  // Handle success
} catch (error) {
  logger.error('Form submission failed', error);
  // Show user-friendly error
}
```

### 3. Use TypeScript Types

```typescript
import type { ContactFormData, PortfolioProject } from '@/types/api';

const formData: ContactFormData = {
  name: 'John',
  email: 'john@example.com',
  message: 'Hello'
};
```

### 4. Respect Rate Limits

The rate limiter is automatic, but for custom scenarios:

```typescript
// Check if request would be rate limited
if (rateLimiterManager.wouldBeRateLimited('/api/heavy-endpoint')) {
  // Show user feedback
  showWarning('Please wait before retrying');
}
```

## Environment Configuration

### API Base URL

Set in `.env` or `src/config/env.ts`:

```
VITE_API_BASE_URL=https://api.example.com
```

### Mock Data

For development, enable mock data:

```typescript
// In src/api/apiService.ts
const USE_MOCK_DATA = true;
```

## Monitoring

All API calls are automatically logged with:
- Request method and endpoint
- Response status and duration
- Error details (if applicable)

Access logs via:
```typescript
import { logger } from '@/services/logger';

// View stored logs
const logs = logger.getStoredLogs();
```
