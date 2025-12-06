import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Portfolio from '../components/Portfolio';
import { ApiService } from '../services/apiService';
import type { PortfolioProject } from '../types/api';

// Mock child components
vi.mock('../components/Navbar', () => ({ default: () => <div data-testid="navbar">Navbar</div> }));
vi.mock('../components/Footer', () => ({ default: () => <div data-testid="footer">Footer</div> }));
vi.mock('../components/Modal', () => ({
    default: ({ isOpen, children, title }: { isOpen: boolean; children: React.ReactNode; title: string }) =>
        isOpen ? (
            <div data-testid="modal" role="dialog" aria-label={title}>
                <div data-testid="modal-title">{title}</div>
                {children}
            </div>
        ) : null,
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
    motion: {
        h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
        p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock ApiService
vi.mock('../services/apiService', () => ({
    ApiService: {
        fetchPortfolioData: vi.fn(),
    },
}));

const mockProjects: PortfolioProject[] = [
    {
        id: '1',
        title: 'E-Commerce Platform',
        description: 'Modern online shopping experience',
        category: 'web',
        color: '#FF6B6B',
        results: ['50% increase in sales', 'Mobile-first design'],
    },
    {
        id: '2',
        title: 'Fitness Tracker App',
        description: 'Track your workouts and progress',
        category: 'app',
        color: '#4ECDC4',
        results: ['100k+ downloads', '4.8 star rating'],
    },
    {
        id: '3',
        title: 'Coffee Brand Identity',
        description: 'Complete brand refresh for artisan coffee shop',
        category: 'branding',
        color: '#95E1D3',
        results: ['Brand awareness +200%', 'New packaging design'],
    },
    {
        id: '4',
        title: 'Product Visualization',
        description: '3D models and animations for product showcase',
        category: '3d',
        color: '#F38181',
        results: ['Interactive 3D viewer', 'AR support'],
    },
    {
        id: '5',
        title: 'Corporate Website',
        description: 'Professional website for tech startup',
        category: 'web',
        color: '#AA96DA',
        results: ['SEO optimized', 'Fast loading times'],
    },
];

describe('Portfolio Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(ApiService.fetchPortfolioData).mockResolvedValue(mockProjects);
    });

    it('renders portfolio page with all elements', async () => {
        render(<Portfolio />);

        expect(screen.getByText('Our Work')).toBeInTheDocument();
        expect(
            screen.getByText(/A collection of digital experiences crafted with passion and precision/i)
        ).toBeInTheDocument();

        // Wait for projects to load
        await waitFor(() => {
            expect(screen.getByText('E-Commerce Platform')).toBeInTheDocument();
        });
    });

    it('displays loading state initially', () => {
        vi.mocked(ApiService.fetchPortfolioData).mockImplementation(
            () => new Promise(() => { }) // Never resolves
        );

        render(<Portfolio />);

        // Find by className since loading spinner doesn't have role="status"
        const loadingSpinner = document.querySelector('.animate-spin');
        expect(loadingSpinner).toBeInTheDocument();
    });

    it('loads and displays all projects', async () => {
        render(<Portfolio />);

        await waitFor(() => {
            expect(screen.getByText('E-Commerce Platform')).toBeInTheDocument();
            expect(screen.getByText('Fitness Tracker App')).toBeInTheDocument();
            expect(screen.getByText('Coffee Brand Identity')).toBeInTheDocument();
            expect(screen.getByText('Product Visualization')).toBeInTheDocument();
            expect(screen.getByText('Corporate Website')).toBeInTheDocument();
        });
    });

    describe('Category Filtering', () => {
        it('shows all projects by default', async () => {
            render(<Portfolio />);

            await waitFor(() => {
                expect(screen.getByText('E-Commerce Platform')).toBeInTheDocument();
            });

            const projects = screen.getAllByRole('generic').filter((el) =>
                el.className?.includes('bg-white')
            );
            expect(projects.length).toBeGreaterThanOrEqual(5);
        });

        it('filters projects by web category', async () => {
            const user = userEvent.setup();
            render(<Portfolio />);

            await waitFor(() => {
                expect(screen.getByText('E-Commerce Platform')).toBeInTheDocument();
            });

            const webButton = screen.getByRole('button', { name: /web design/i });
            await user.click(webButton);

            await waitFor(() => {
                expect(screen.getByText('E-Commerce Platform')).toBeInTheDocument();
                expect(screen.getByText('Corporate Website')).toBeInTheDocument();
                expect(screen.queryByText('Fitness Tracker App')).not.toBeInTheDocument();
            });
        });

        it('filters projects by app category', async () => {
            const user = userEvent.setup();
            render(<Portfolio />);

            await waitFor(() => {
                expect(screen.getByText('Fitness Tracker App')).toBeInTheDocument();
            });

            const appButton = screen.getByRole('button', { name: /mobile apps/i });
            await user.click(appButton);

            await waitFor(() => {
                expect(screen.getByText('Fitness Tracker App')).toBeInTheDocument();
                expect(screen.queryByText('E-Commerce Platform')).not.toBeInTheDocument();
            });
        });

        it('filters projects by branding category', async () => {
            const user = userEvent.setup();
            render(<Portfolio />);

            await waitFor(() => {
                expect(screen.getByText('Coffee Brand Identity')).toBeInTheDocument();
            });

            const brandingButton = screen.getByRole('button', { name: /branding/i });
            await user.click(brandingButton);

            await waitFor(() => {
                expect(screen.getByText('Coffee Brand Identity')).toBeInTheDocument();
                expect(screen.queryByText('E-Commerce Platform')).not.toBeInTheDocument();
            });
        });

        it('filters projects by 3D category', async () => {
            const user = userEvent.setup();
            render(<Portfolio />);

            await waitFor(() => {
                expect(screen.getByText('Product Visualization')).toBeInTheDocument();
            });

            const threeDButton = screen.getByRole('button', { name: /3d & motion/i });
            await user.click(threeDButton);

            await waitFor(() => {
                expect(screen.getByText('Product Visualization')).toBeInTheDocument();
                expect(screen.queryByText('E-Commerce Platform')).not.toBeInTheDocument();
            });
        });

        it('returns to all projects when "All Projects" is clicked', async () => {
            const user = userEvent.setup();
            render(<Portfolio />);

            await waitFor(() => {
                expect(screen.getByText('E-Commerce Platform')).toBeInTheDocument();
            });

            // Filter to web first
            const webButton = screen.getByRole('button', { name: /web design/i });
            await user.click(webButton);

            await waitFor(() => {
                expect(screen.queryByText('Fitness Tracker App')).not.toBeInTheDocument();
            });

            // Click "All Projects"
            const allButton = screen.getByRole('button', { name: /all projects/i });
            await user.click(allButton);

            await waitFor(() => {
                expect(screen.getByText('E-Commerce Platform')).toBeInTheDocument();
                expect(screen.getByText('Fitness Tracker App')).toBeInTheDocument();
            });
        });
    });

    describe('Search Functionality', () => {
        it('searches projects by title', async () => {
            const user = userEvent.setup();
            render(<Portfolio />);

            await waitFor(() => {
                expect(screen.getByText('E-Commerce Platform')).toBeInTheDocument();
            });

            const searchInput = screen.getByPlaceholderText(/search projects/i);
            await user.type(searchInput, 'fitness');

            await waitFor(() => {
                expect(screen.getByText('Fitness Tracker App')).toBeInTheDocument();
                expect(screen.queryByText('E-Commerce Platform')).not.toBeInTheDocument();
            });
        });

        it('searches projects by description', async () => {
            const user = userEvent.setup();
            render(<Portfolio />);

            await waitFor(() => {
                expect(screen.getByText('Coffee Brand Identity')).toBeInTheDocument();
            });

            const searchInput = screen.getByPlaceholderText(/search projects/i);
            await user.type(searchInput, 'coffee');

            await waitFor(() => {
                expect(screen.getByText('Coffee Brand Identity')).toBeInTheDocument();
                expect(screen.queryByText('Fitness Tracker App')).not.toBeInTheDocument();
            });
        });

        it('search is case-insensitive', async () => {
            const user = userEvent.setup();
            render(<Portfolio />);

            await waitFor(() => {
                expect(screen.getByText('E-Commerce Platform')).toBeInTheDocument();
            });

            const searchInput = screen.getByPlaceholderText(/search projects/i);
            await user.type(searchInput, 'E-COMMERCE');

            await waitFor(() => {
                expect(screen.getByText('E-Commerce Platform')).toBeInTheDocument();
            });
        });

        it('shows no results when search does not match', async () => {
            const user = userEvent.setup();
            render(<Portfolio />);

            await waitFor(() => {
                expect(screen.getByText('E-Commerce Platform')).toBeInTheDocument();
            });

            const searchInput = screen.getByPlaceholderText(/search projects/i);
            await user.type(searchInput, 'nonexistent project');

            await waitFor(() => {
                expect(screen.queryByText('E-Commerce Platform')).not.toBeInTheDocument();
                expect(screen.queryByText('Fitness Tracker App')).not.toBeInTheDocument();
            });
        });

        it('clears search results when input is cleared', async () => {
            const user = userEvent.setup();
            render(<Portfolio />);

            await waitFor(() => {
                expect(screen.getByText('E-Commerce Platform')).toBeInTheDocument();
            });

            const searchInput = screen.getByPlaceholderText(/search projects/i);
            await user.type(searchInput, 'fitness');

            await waitFor(() => {
                expect(screen.queryByText('E-Commerce Platform')).not.toBeInTheDocument();
            });

            await user.clear(searchInput);

            await waitFor(() => {
                expect(screen.getByText('E-Commerce Platform')).toBeInTheDocument();
                expect(screen.getByText('Fitness Tracker App')).toBeInTheDocument();
            });
        });
    });

    describe('Combined Filter and Search', () => {
        it('combines category filter with search', async () => {
            const user = userEvent.setup();
            render(<Portfolio />);

            await waitFor(() => {
                expect(screen.getByText('E-Commerce Platform')).toBeInTheDocument();
            });

            // Filter to web category
            const webButton = screen.getByRole('button', { name: /web design/i });
            await user.click(webButton);

            // Then search
            const searchInput = screen.getByPlaceholderText(/search projects/i);
            await user.type(searchInput, 'corporate');

            await waitFor(() => {
                expect(screen.getByText('Corporate Website')).toBeInTheDocument();
                expect(screen.queryByText('E-Commerce Platform')).not.toBeInTheDocument();
            });
        });

        it('maintains search when changing filters', async () => {
            const user = userEvent.setup();
            render(<Portfolio />);

            await waitFor(() => {
                expect(screen.getByText('E-Commerce Platform')).toBeInTheDocument();
            });

            // Search first
            const searchInput = screen.getByPlaceholderText(/search projects/i);
            await user.type(searchInput, 'platform');

            await waitFor(() => {
                expect(screen.getByText('E-Commerce Platform')).toBeInTheDocument();
            });

            // Then filter - should show no results since "platform" is only in web category
            const appButton = screen.getByRole('button', { name: /mobile apps/i });
            await user.click(appButton);

            await waitFor(() => {
                expect(screen.queryByText('E-Commerce Platform')).not.toBeInTheDocument();
            });
        });
    });

    describe('Project Modal', () => {
        it('opens modal when project is clicked', async () => {
            const user = userEvent.setup();
            render(<Portfolio />);

            await waitFor(() => {
                expect(screen.getByText('E-Commerce Platform')).toBeInTheDocument();
            });

            const projectCard = screen.getByText('E-Commerce Platform').closest('div');
            if (projectCard) {
                await user.click(projectCard);
            }

            await waitFor(() => {
                expect(screen.getByRole('dialog')).toBeInTheDocument();
                expect(screen.getByTestId('modal-title')).toHaveTextContent('E-Commerce Platform');
            });
        });

        it('displays project details in modal', async () => {
            const user = userEvent.setup();
            render(<Portfolio />);

            await waitFor(() => {
                expect(screen.getByText('Fitness Tracker App')).toBeInTheDocument();
            });

            const projectCard = screen.getByText('Fitness Tracker App').closest('div');
            if (projectCard) {
                await user.click(projectCard);
            }

            await waitFor(() => {
                const modal = screen.getByRole('dialog');
                expect(within(modal).getByText(/Track your workouts and progress/i)).toBeInTheDocument();
                expect(within(modal).getByText(/100k\+ downloads/i)).toBeInTheDocument();
            });
        });

        it('displays instructor information when available', async () => {
            const projectWithInstructor: PortfolioProject = {
                ...mockProjects[0],
                instructor: {
                    id: 'inst_1',
                    name: 'Alex Johnson',
                    role: 'Creative Director',
                    avatar: 'https://example.com/avatar.jpg',
                    bio: 'Award-winning designer',
                },
            };

            vi.mocked(ApiService.fetchPortfolioData).mockResolvedValue([projectWithInstructor]);

            const user = userEvent.setup();
            render(<Portfolio />);

            await waitFor(() => {
                expect(screen.getByText('E-Commerce Platform')).toBeInTheDocument();
            });

            const projectCard = screen.getByText('E-Commerce Platform').closest('div');
            if (projectCard) {
                await user.click(projectCard);
            }

            await waitFor(() => {
                const modal = screen.getByRole('dialog');
                expect(within(modal).getByText('Alex Johnson')).toBeInTheDocument();
                expect(within(modal).getByText('Creative Director')).toBeInTheDocument();
            });
        });
    });

    describe('Error Handling', () => {
        it('handles API error gracefully', async () => {
            vi.mocked(ApiService.fetchPortfolioData).mockRejectedValue(
                new Error('Failed to fetch portfolio data')
            );

            // Suppress console.error for this test
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

            render(<Portfolio />);

            await waitFor(() => {
                expect(ApiService.fetchPortfolioData).toHaveBeenCalled();
            });

            // Component should not crash
            expect(screen.getByText('Our Work')).toBeInTheDocument();

            consoleSpy.mockRestore();
        });
    });
});
