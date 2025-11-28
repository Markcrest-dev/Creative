export interface ProductItem {
    title: string;
    description: string;
    price: number;
    rating: number;
    reviews: number;
    type: 'course' | 'asset';
    color: string;
    tags: string[];
    features?: string[]; // Added for ProductDetail
    id?: string; // Added for Cart
}

export interface ProductCategory {
    category: string;
    description: string;
    items: ProductItem[];
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
    {
        category: 'Masterclasses & Courses',
        description: 'Level up your skills with our expert-led creative courses.',
        items: [
            {
                title: 'Advanced 3D Web Design',
                description:
                    'Learn how to build immersive 3D websites using Three.js, React Three Fiber, and WebGL. Master lighting, textures, and performance optimization.',
                price: 149,
                rating: 5,
                reviews: 128,
                type: 'course',
                color: '#F97316',
                tags: ['Three.js', 'React', 'WebGL'],
                features: ['20+ Hours of Video', 'Project Files Included', 'Certificate of Completion', 'Community Access'],
            },
            {
                title: 'UI/UX Design Mastery',
                description:
                    'From wireframes to high-fidelity prototypes. Learn the complete design process used by top agencies.',
                price: 99,
                rating: 4.8,
                reviews: 85,
                type: 'course',
                color: '#3B82F6',
                tags: ['Figma', 'Design Systems', 'UX'],
                features: ['Figma Masterclass', 'Design System Architecture', 'User Testing Guide', 'Portfolio Review'],
            },
            {
                title: 'Creative Frontend Architecture',
                description:
                    'Build scalable, maintainable, and high-performance frontend applications. Deep dive into React patterns and state management.',
                price: 129,
                rating: 4.9,
                reviews: 210,
                type: 'course',
                color: '#10B981',
                tags: ['Architecture', 'Performance', 'React'],
                features: ['Advanced React Patterns', 'State Management', 'Performance Tuning', 'Testing Strategies'],
            },
            {
                title: 'Three.js Shaders Masterclass',
                description:
                    'Unlock the true power of WebGL with custom shaders. Create mind-bending visual effects.',
                price: 119,
                rating: 5.0,
                reviews: 45,
                type: 'course',
                color: '#8B5CF6',
                tags: ['GLSL', 'Shaders', 'Math'],
                features: ['GLSL Fundamentals', 'Vertex & Fragment Shaders', 'Post-processing', 'Interactive Effects'],
            },
        ],
    },
    {
        category: 'Digital Assets & Templates',
        description: 'Premium resources to speed up your workflow.',
        items: [
            {
                title: 'Ultimate 3D Icon Pack',
                description:
                    'A collection of 50+ high-quality 3D icons ready to drop into your React projects. Fully customizable colors and materials.',
                price: 49,
                rating: 5,
                reviews: 342,
                type: 'asset',
                color: '#8B5CF6',
                tags: ['Icons', '3D Models', 'GLTF'],
                features: ['50+ 3D Icons', 'GLTF & OBJ Formats', 'React Components', 'Commercial License'],
            },
            {
                title: 'Agency Website Template',
                description:
                    'The exact code base used for this website. Includes all animations, 3D components, and responsive layouts.',
                price: 79,
                rating: 4.7,
                reviews: 56,
                type: 'asset',
                color: '#EC4899',
                tags: ['Template', 'React', 'Tailwind'],
                features: ['Full Source Code', 'Documentation', 'Framer Motion Animations', '3D Components'],
            },
            {
                title: 'Motion Graphics Bundle',
                description:
                    'Pack of 20 smooth Framer Motion variants and transitions for React applications.',
                price: 29,
                rating: 4.9,
                reviews: 112,
                type: 'asset',
                color: '#F59E0B',
                tags: ['Animation', 'Framer Motion', 'UI'],
                features: ['20+ Animation Variants', 'Copy & Paste Code', 'TypeScript Support', 'Performance Optimized'],
            },
            {
                title: 'Abstract 3D Backgrounds',
                description: '10 stunning, looped 4K video backgrounds for hero sections.',
                price: 39,
                rating: 4.8,
                reviews: 89,
                type: 'asset',
                color: '#6366F1',
                tags: ['Video', 'Backgrounds', '3D'],
                features: ['10 4K Loops', 'MP4 & WebM Formats', 'Seamless Looping', 'Color Graded'],
            },
            {
                title: 'Minimalist Figma UI Kit',
                description: 'A clean, modern UI kit with over 200 components and auto-layout ready.',
                price: 59,
                rating: 4.9,
                reviews: 230,
                type: 'asset',
                color: '#10B981',
                tags: ['Figma', 'UI Kit', 'Design'],
                features: ['200+ Components', 'Auto Layout', 'Design System', 'Dark Mode'],
            },
        ],
    },
];

export const ALL_PRODUCTS = PRODUCT_CATEGORIES.flatMap((category) => category.items);
