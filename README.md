# Creative★ Agency Website

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/typescript-5.2.2-blue)
![Vite](https://img.shields.io/badge/vite-5.0.0-purple)
![Test Coverage](https://img.shields.io/badge/coverage-66%25-green)

A modern, high-performance creative agency website featuring advanced 3D animations, interactive elements, and enterprise-grade architecture.

## ✨ Features

### Core Functionality
- 📱 **Responsive Design**: Fully responsive layout optimized for all devices
- 🎨 **Modern UI/UX**: Clean, professional interface with smooth animations
- 🎯 **Portfolio Showcase**: Dynamic project filtering and search capabilities
- 📧 **Contact Form**: Validated form with real-time feedback
- 👥 **Team Profiles**: Interactive team member displays with social links

### Technical Features
- ⚡ **Performance Optimized**: Web Vitals tracking and performance budgets
- 🔒 **Enterprise Security**: Rate limiting, CORS, input sanitization, and CSP
- 📊 **Type Safety**: 100% TypeScript with strict mode enabled
- ✅ **Testing**: Comprehensive test suite (54 tests, 66% coverage)
- 🎭 **3D Visualizations**: Three.js with React Three Fiber integration
- 🎬 **Smooth Animations**: Framer Motion for fluid UI transitions

### Developer Experience
- 🛠️ **Modern Tooling**: Vite, ESLint, Prettier, Husky pre-commit hooks
- 📝 **Well Documented**: API docs, component catalog, and inline JSDoc
- 🔄 **CI/CD Ready**: GitHub Actions workflow included
- 🎨 **VS Code Integration**: Workspace settings and EditorConfig
- 🧪 **Test Coverage**: Vitest with UI and coverage reporting

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library

### 3D Graphics
- **Three.js** - 3D rendering engine
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F

### Quality & Testing
- **Vitest** - Unit and integration testing
- **Testing Library** - React component testing
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks

### API & State
- **Custom API Client** - Centralized HTTP client with retries
- **Rate Limiting** - Token bucket algorithm
- **Error Boundaries** - Graceful error handling

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/creative-agency.git
   cd creative-agency
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🧪 Testing

Run the comprehensive test suite:

```bash
npm test                 # Run all tests
npm run test:ui          # Open interactive test UI
npm run test:coverage    # Generate coverage report
npm run test:watch       # Watch mode
```

**Current Coverage:** 66.14% (54 passing tests)
- Contact component: 34 tests
- Portfolio component: 20 tests
- Error boundary: 3 tests

## 🚀 Available Scripts

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run format           # Format code with Prettier
npm test                 # Run tests
npm run type-check       # Check TypeScript types
```

## 📚 Documentation

- **[API Documentation](docs/API.md)** - API client, services, and types
- **[Component Catalog](docs/COMPONENTS.md)** - All components and hooks
- **[Architecture](docs/ARCHITECTURE.md)** - System design and patterns
- **[Roadmap](ROADMAP.md)** - Development roadmap and progress

## 🏗️ Project Structure

```
creative-agency/
├── src/
│   ├── components/      # React components
│   ├── hooks/          # Custom React hooks
│   ├── api/            # API client and services
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript definitions
│   ├── services/       # Business logic services
│   ├── config/         # Configuration files
│   └── __tests__/      # Test files
├── public/             # Static assets
├── docs/               # Documentation
└── .github/            # GitHub Actions workflows
```

## 🔒 Security Features

- **Rate Limiting**: Token bucket algorithm (10 req/sec default)
- **CORS**: Configured origins and credentials
- **Input Sanitization**: DOMPurify for user inputs
- **CSP**: Content Security Policy headers
- **Type Safety**: Strict TypeScript mode

## ⚡ Performance

- **Lazy Loading**: Code splitting for optimal bundle size
- **Web Vitals**: Tracking LCP, FID, CLS, TTFB
- **Optimized Assets**: Image optimization and compression
- **Caching Strategy**: Service worker for offline support

## 🌐 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## 🤝 Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- Design inspiration from modern agency websites
- Three.js community for excellent 3D resources
- React and Vite teams for amazing tools
