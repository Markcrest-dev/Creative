# System Architecture

## Overview

The Creative Agency website is a modern, high-performance Single Page Application (SPA) built with React, TypeScript, and Vite. It features advanced 3D graphics using Three.js and React Three Fiber.

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js, @react-three/fiber, @react-three/drei
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **State Management**: React Context / Hooks
- **Testing**: Vitest, React Testing Library

## Directory Structure

```
src/
├── api/            # API client and endpoints
├── components/     # Reusable UI components
├── config/         # Configuration files (env, etc.)
├── hooks/          # Custom React hooks
├── services/       # Business logic and services
├── types/          # TypeScript type definitions
├── utils/          # Helper functions
├── __tests__/      # Test files
├── App.tsx         # Main application component
└── main.tsx        # Entry point
```

## Key Components

### 3D Integration
The application uses `Canvas` from `@react-three/fiber` to render 3D scenes. Key 3D components include:
- `AnimatedLogo`: The main hero section 3D element.
- `CompactAnimatedLogo`: Smaller version for navigation.
- `InteractiveMap`: 3D visualization of location.

### Performance Optimization
- **Web Vitals**: Core Web Vitals are tracked using `web-vitals` library.
- **Lazy Loading**: (Currently disabled due to Three.js compatibility, but architecture supports it).
- **Asset Optimization**: 3D models and textures are optimized for web delivery.

### Security
- **CSP**: Content Security Policy headers are configured.
- **Sanitization**: DOMPurify is used to sanitize user input.
- **Error Handling**: Global Error Boundary catches and logs runtime errors.

## Data Flow

1.  **API Layer**: `src/api/client.ts` handles all HTTP requests with interceptors and error handling.
2.  **Services**: `src/services/` (e.g., `apiService.ts`) abstract the API calls and provide business logic.
3.  **Hooks**: Custom hooks (e.g., `useApi`) consume services and manage local state (loading, error, data).
4.  **Components**: UI components consume hooks to display data.

## Deployment

The application is designed to be deployed to static hosting providers like Vercel, Netlify, or AWS S3/CloudFront. The build process (`npm run build`) generates static assets in the `dist/` directory.
