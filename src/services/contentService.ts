export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content?: string; // HTML or Markdown content
    author: string;
    role: string;
    date: string;
    readTime: string;
    image: string;
    category: string;
}

// Mock Data - In a real app, this would come from Contentful, Strapi, or Sanity
const MOCK_POSTS: BlogPost[] = [
    {
        id: 'future-of-web-design-2025',
        title: "The Future of Web Design in 2025",
        excerpt: "Explore the emerging trends that will define the next generation of digital experiences, from AI-driven layouts to immersive 3D interactions.",
        content: `
      <p class="lead">The web is evolving at an unprecedented pace. As we look towards 2025, several key trends are emerging that will reshape how we design and interact with digital content.</p>
      
      <h2>1. AI-Driven Generative Layouts</h2>
      <p>Static templates are becoming a thing of the past. AI algorithms will soon generate dynamic layouts tailored to individual user preferences and content types in real-time.</p>
      
      <h2>2. Immersive 3D Experiences</h2>
      <p>With the maturation of WebGL and libraries like React Three Fiber, 3D is moving from a novelty to a core design element. Expect to see more seamless integrations of 3D objects that enhance storytelling without sacrificing performance.</p>
      
      <h2>3. Neomorphism 2.0</h2>
      <p>A softer, more tactile approach to UI design is making a comeback. Combined with glassmorphism, this new style prioritizes depth and texture to create interfaces that feel like physical objects.</p>
    `,
        author: "Alex Johnson",
        role: "Creative Director",
        date: "Nov 15, 2024",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1558655146-d09347e0b7a9?q=80&w=2070&auto=format&fit=crop",
        category: "Design"
    },
    {
        id: 'mastering-react-three-fiber',
        title: "Mastering React Three Fiber: A Beginner's Guide",
        excerpt: "Learn how to bring your React applications to life with 3D graphics using the power of React Three Fiber and WebGL.",
        content: `
      <p class="lead">React Three Fiber (R3F) is a powerful renderer for Three.js that allows you to build 3D scenes using declarative React components.</p>
      
      <h2>Why R3F?</h2>
      <p>R3F solves the "imperative vs declarative" conflict when using Three.js with React. It handles the render loop, resize events, and cleanups automatically, letting you focus on the scene graph.</p>
      
      <h2>Getting Started</h2>
      <p>To start, you simply need to install the dependencies: <code>npm install three @react-three/fiber @react-three/drei</code>. The <code>Canvas</code> component acts as your portal into the 3D world.</p>
    `,
        author: "Sarah Williams",
        role: "Lead Developer",
        date: "Nov 10, 2024",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
        category: "Development"
    },
    {
        id: 'building-scalable-design-systems',
        title: "Building Scalable Design Systems for Enterprise",
        excerpt: "How to create and maintain a design system that scales with your product and team. Best practices and lessons learned.",
        content: `
      <p class="lead">A design system is more than just a component library; it's the shared language of your product team.</p>
      
      <h2>Atomic Design Principles</h2>
      <p>We follow the Atomic Design methodology: starting with atoms (colors, fonts, icons) and building up to molecules, organisms, and templates.</p>
      
      <h2>Documentation is Key</h2>
      <p>A design system without documentation is just a collection of code. Tools like Storybook are essential for visualizing components and explaining their usage.</p>
    `,
        author: "Emma Davis",
        role: "UX Researcher",
        date: "Oct 28, 2024",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?q=80&w=2070&auto=format&fit=crop",
        category: "Systems"
    },
    {
        id: 'optimizing-web-performance',
        title: "Optimizing Web Performance: The Ultimate Checklist",
        excerpt: "Don't let slow load times kill your conversion rates. Follow this checklist to ensure your website runs at lightning speed.",
        content: `
      <p class="lead">Performance is a feature. In 2025, users expect instant load times and buttery smooth interactions.</p>
      
      <h2>Image Optimization</h2>
      <p>Always use modern formats like WebP or AVIF. Implement lazy loading for images below the fold to save bandwidth.</p>
      
      <h2>Code Splitting</h2>
      <p>Break your bundle into smaller chunks. Use <code>React.lazy</code> and <code>Suspense</code> to load routes only when they are needed.</p>
    `,
        author: "Sarah Williams",
        role: "Lead Developer",
        date: "Oct 15, 2024",
        readTime: "7 min read",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        category: "Performance"
    },
    {
        id: 'power-of-micro-interactions',
        title: "The Power of Micro-Interactions",
        excerpt: "How subtle animations and feedback loops can significantly enhance user experience and engagement.",
        content: `
      <p class="lead">Micro-interactions are the small, functional animations that guide users through your application.</p>
      
      <h2>Feedback is Essential</h2>
      <p>When a user clicks a button, they expect a response. A subtle ripple effect or a loading spinner confirms that the system has received their request.</p>
      
      <h2>Delight the User</h2>
      <p>Unexpected animations, like a confetti pop on success or a playful error shake, can turn a mundane task into a delightful moment.</p>
    `,
        author: "Alex Johnson",
        role: "Creative Director",
        date: "Oct 05, 2024",
        readTime: "4 min read",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
        category: "Design"
    },
    {
        id: 'accessibility-modern-web',
        title: "Accessibility in Modern Web Apps",
        excerpt: "Building inclusive digital experiences that everyone can use, regardless of their abilities.",
        content: `
      <p class="lead">The web is for everyone. Accessibility (a11y) should be a core consideration from day one, not an afterthought.</p>
      
      <h2>Semantic HTML</h2>
      <p>Using the correct HTML tags (<code>button</code> vs <code>div</code>) is the first step. It ensures screen readers can interpret your content correctly.</p>
      
      <h2>Color Contrast</h2>
      <p>Ensure your text has sufficient contrast against the background. Tools like the WCAG Contrast Checker can help you verify compliance.</p>
    `,
        author: "Emma Davis",
        role: "UX Researcher",
        date: "Sep 28, 2024",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop",
        category: "Development"
    }
];

export const ContentService = {
    getPosts: async (): Promise<BlogPost[]> => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return MOCK_POSTS;
    },

    getPostById: async (id: string): Promise<BlogPost | undefined> => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return MOCK_POSTS.find(post => post.id === id);
    },

    getCategories: async (): Promise<string[]> => {
        return ['All', ...Array.from(new Set(MOCK_POSTS.map(post => post.category)))];
    }
};
