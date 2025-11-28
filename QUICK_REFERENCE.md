# 🚀 Quick Reference Guide - Creative★ Agency

## 📋 Available Scripts

### Development
```bash
npm run dev              # Start development server (localhost:5173)
npm run build            # Build for production
npm run preview          # Preview production build
```

### Testing
```bash
npm test                 # Run all tests
npm run test:ui          # Open visual test interface
npm run test:coverage    # Generate coverage report
npm run test:watch       # Run tests in watch mode
```

### Code Quality
```bash
npm run lint             # Check code for issues
npm run lint:fix         # Auto-fix linting issues
npm run format           # Format all code with Prettier
npm run format:check     # Check if code is formatted
```

---

## 🗂️ Project Structure

```
Creative/
├── src/
│   ├── components/          # React components
│   │   ├── ErrorBoundary.tsx    # Error handling
│   │   ├── Modal.tsx            # Reusable modal
│   │   ├── Contact.tsx          # Contact form
│   │   └── ...
│   ├── hooks/               # Custom React hooks
│   │   ├── useFormValidation.ts  # Form validation
│   │   └── ...
│   ├── services/            # Business logic
│   │   ├── apiService.ts        # API calls
│   │   └── logger.ts            # Logging service
│   ├── utils/               # Utility functions
│   │   ├── sanitize.ts          # Input sanitization
│   │   └── webVitals.ts         # Performance tracking
│   ├── config/              # Configuration
│   │   └── env.ts               # Environment config
│   ├── context/             # React context
│   │   └── AppContext.tsx       # Global state
│   └── __tests__/           # Test files
│       ├── setup.ts             # Test configuration
│       ├── ErrorBoundary.test.tsx
│       ├── Modal.test.tsx
│       └── useFormValidation.test.ts
├── .env.example             # Environment template
├── .eslintrc.cjs            # ESLint config
├──prettierrc              # Prettier config
└── vitest.config.ts         # Test config
```

---

## 🔧 Configuration Files

### Environment Variables (`.env`)
Copy `.env.example` to `.env` and configure:
```bash
VITE_API_BASE_URL=http://localhost:3000/api
VITE_GOOGLE_MAPS_API_KEY=your_key_here
VITE_MOCK_API=true
VITE_ENABLE_ANALYTICS=false
```

### TypeScript (`tsconfig.json`)
- Strict mode enabled
- No unused locals/parameters
- ES2020 target

### Vite (`vite.config.ts`)
- React SWC plugin
- Fast refresh
- Code splitting automatic

---

## 🛡️ Security Features

### Input Sanitization
```typescript
import { sanitizeInput, sanitizeEmail } from './utils/sanitize';

const clean = sanitizeInput(userInput);      // Remove XSS
const email = sanitizeEmail(emailInput);     // Validate email
```

### Content Security Policy
- Blocks inline scripts (except trusted)
- Restricts external resources
- Prevents clickjacking
- Located in `index.html`

---

## 📊 Performance

### Code Splitting
```tsx
// Automatic route-based splitting
const About = lazy(() => import('./components/About'));
```

### Web Vitals Tracked
- **CLS** - Cumulative Layout Shift
- **INP** - Interaction to Next Paint
- **FCP** - First Contentful Paint
- **LCP** - Largest Contentful Paint
- **TTFB** - Time to First Byte

### Current Metrics
- Initial Bundle: ~300-400KB
- Route Chunks: ~100-200KB each
- Build Time: ~20-30s
- Test Coverage: 45%+

---

## 🧪 Testing

### Run Specific Tests
```bash
vitest src/__tests__/ErrorBoundary.test.tsx
```

### Writing Tests
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

---

## 🐛 Debugging

### Logger Service
```typescript
import { logger } from './services/logger';

logger.info('User logged in', { userId: 123 });
logger.error('API call failed', error);
logger.performance('Page Load', 1234, 'ms');
```

### View Logs (Development)
```bash
# Check browser console
# Or access stored logs
logger.getStoredLogs()
```

---

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

### Output
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js      # Main bundle
│   ├── About-[hash].js      # Route chunk
│   ├── Contact-[hash].js    # Route chunk  
│   └── ...
```

### Deploy To
- Vercel: `vercel --prod`
- Netlify: Drag `dist` folder
- AWS S3: `aws s3 sync dist/ s3://bucket`

---

## 📚 Key Technologies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Three Fiber** - 3D graphics
- **Vitest** - Testing
- **ESLint** - Linting
- **Prettier** - Formatting
- **DOMPurify** - XSS protection

---

## 🔗 Useful Commands

```bash
# Clean and reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check for outdated packages
npm outdated

# Update packages
npm update

# Audit security
npm audit
npm audit fix

# Bundle analysis
npm run build -- --analyze
```

---

## 💡 Tips

1. **Use the logger** instead of `console.log`
2. **Sanitize all user inputs** before processing
3. **Write tests** for new features
4. **Run linter** before committing
5. **Check web vitals** in production

---

## 🆘 Common Issues

### Build Fails
```bash
# Clear cache
rm -rf node_modules/.vite
npm run build
```

### Tests Fail
```bash
# Update snapshots
npm test -- -u
```

### Linting Errors
```bash
# Auto-fix
npm run lint:fix
```

---

**Happy coding! 🚀**
