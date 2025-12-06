# Component Documentation

## Overview

Component catalog for the Creative★ Agency application. All components are built with React, TypeScript, and Framer Motion for animations.

## Page Components

### Home
**Path:** [`src/components/Home.tsx`](file:///home/mark/Desktop/Creative/src/components/Home.tsx)

Landing page with hero section and call-to-action.

**Features:**
- Animated hero text
- Background gradient effects
- Responsive layout

### About
**Path:** [`src/components/About.tsx`](file:///home/mark/Desktop/Creative/src/components/About.tsx)

Company information and team members display.

**Props:**
```typescript
// No props - fetches data internally
```

**Features:**
- Company mission and values
- Team member grid with avatars
- Social media links
- Smooth scroll animations

### Services
**Path:** [`src/components/Services.tsx`](file:///home/mark/Desktop/Creative/src/components/Services.tsx)

Service offerings display with interactive cards.

**Features:**
- Service category cards
- Hover effects and animations
- Icon displays
- Responsive grid layout

### Portfolio
**Path:** [`src/components/Portfolio.tsx`](file:///home/mark/Desktop/Creative/src/components/Portfolio.tsx)

Project portfolio with filtering and search.

**Features:**
- Category filtering (web, app, branding, 3d)
- Search by title/description
- Project detail modal
- Instructor information display
- Loading states

**State Management:**
```typescript
const [projects, setProjects] = useState<PortfolioProject[]>([]);
const [filter, setFilter] = useState<string>('all');
const [searchQuery, setSearchQuery] = useState<string>('');
const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
```

### Contact
**Path:** [`src/components/Contact.tsx`](file:///home/mark/Desktop/Creative/src/components/Contact.tsx)

Contact form with validation and submission.

**Features:**
- Form validation with `useFormValidation` hook
- Success/error feedback
- Loading states during submission
- Interactive map modal
- Contact information display

**Form Fields:**
- Name (required)
- Email (required, validated)
- Phone (optional)
- Message (required)

## UI Components

### Navbar
**Path:** [`src/components/Navbar.tsx`](file:///home/mark/Desktop/Creative/src/components/Navbar.tsx)

Navigation bar with scroll effects.

**Features:**
- Responsive mobile menu
- Scroll-based background opacity
- Active route highlighting
- Smooth transitions

### Footer
**Path:** [`src/components/Footer.tsx`](file:///home/Desktop/Creative/src/components/Footer.tsx)

Site footer with links and information.

**Features:**
- Quick links navigation
- Contact information
- Social media links
- Copyright notice

### Modal
**Path:** [`src/components/Modal.tsx`](file:///home/mark/Desktop/Creative/src/components/Modal.tsx)

Reusable modal component.

**Props:**
```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}
```

**Usage:**
```typescript
<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Project Details"
>
  <div>Modal content here</div>
</Modal>
```

### ErrorBoundary
**Path:** [`src/components/ErrorBoundary.tsx`](file:///home/mark/Desktop/Creative/src/components/ErrorBoundary.tsx)

Error boundary for catching React errors.

**Props:**
```typescript
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}
```

**Usage:**
```typescript
<ErrorBoundary fallback={<ErrorFallback />}>
  <App />
</ErrorBoundary>
```

### WebVitalsTracker
**Path:** [`src/components/WebVitalsTracker.tsx`](file:///home/mark/Desktop/Creative/src/components/WebVitalsTracker.tsx)

Performance monitoring component.

**Features:**
- Tracks Core Web Vitals
- Reports to analytics
- Development mode logging

## Custom Hooks

### useFormValidation
**Path:** [`src/hooks/useFormValidation.ts`](file:///home/mark/Desktop/Creative/src/hooks/useFormValidation.ts)

Form validation hook with field-level validation.

**Usage:**
```typescript
const { values, errors, handleChange, validateField, resetForm } = useFormValidation({
  name: '',
  email: '',
  message: ''
}, {
  name: (value) => !value ? 'Name is required' : '',
  email: (value) => !/\S+@\S+\.\S+/.test(value) ? 'Invalid email' : '',
  message: (value) => !value ? 'Message is required' : ''
});
```

### useApi
**Path:** [`src/hooks/useApi.ts`](file:///home/mark/Desktop/Creative/src/hooks/useApi.ts)

Generic API fetching hook with loading/error states.

**Usage:**
```typescript
const { data, loading, error, execute } = useApi(
  () => ApiService.fetchPortfolioData()
);
```

**Returns:**
```typescript
{
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: () => Promise<void>;
}
```

### usePerformanceOptimizations
**Path:** [`src/hooks/usePerformanceOptimizations.ts`](file:///home/mark/Desktop/Creative/src/hooks/usePerformanceOptimizations.ts)

Performance utilities including throttle and debounce.

**Usage:**
```typescript
const { useThrottle, useDebounce } = usePerformanceOptimizations();

const throttledSearch = useThrottle((query: string) => {
  performSearch(query);
}, 300);
```

### use3DAnimations
**Path:** [`src/hooks/use3DAnimations.ts`](file:///home/mark/Desktop/Creative/src/hooks/use3DAnimations.ts)

3D animation utilities for Three.js/React Three Fiber.

**Features:**
- Rotation animations
- Floating effects
- Animation sequences

## Animation Patterns

### Framer Motion Variants

Most components use consistent animation variants:

**Fade In:**
```typescript
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};
```

**Stagger Children:**
```typescript
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};
```

## Styling Approach

All components use:
- **Tailwind CSS** for utility classes
- **Custom CSS** for complex animations
- **Responsive design** (mobile-first)
- **Dark mode** support (where applicable)

## Component Testing

Tests are located in [`src/__tests__/`](file:///home/mark/Desktop/Creative/src/__tests__/)

**Test Coverage:**
- Contact component: 34 tests
- Portfolio component: 20 tests
- ErrorBoundary: 3 tests

**Running Tests:**
```bash
npm test                    # Run all tests
npm test -- Portfolio.test  # Run specific test
npm test -- --coverage      # With coverage report
```

## Best Practices

### 1. Component Structure

```typescript
// Imports
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Types
interface Props {
  // ...
}

// Component
export const ComponentName = ({ prop1, prop2 }: Props) => {
  // Hooks
  const [state, setState] = useState();

  // Effects
  useEffect(() => {
    // ...
  }, []);

  // Handlers
  const handleClick = () => {
    // ...
  };

  // Render
  return (
    <motion.div>
      {/* JSX */}
    </motion.div>
  );
};
```

### 2. TypeScript Props

Always type component props:
```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}
```

### 3. Performance

- Use `React.memo` for expensive components
- Implement proper loading states
- Lazy load heavy components

### 4. Accessibility

- Include ARIA labels
- Ensure keyboard navigation
- Maintain focus management in modals

## File Organization

```
src/
├── components/        # Page & UI components
├── hooks/            # Custom React hooks
├── types/            # TypeScript interfaces
├── utils/            # Utility functions
└── __tests__/        # Component tests
```
