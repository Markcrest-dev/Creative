import { logger } from './logger';
import { apiClient } from '../api/client';
import { ENDPOINTS } from '../api/endpoints';
import type {
  PortfolioProject,
  ContactFormData,
  ContactFormResponse,
  TeamMember,
} from '../types/api';

// Toggle this to switch between Mock Data and Real API
const USE_MOCK_DATA = true;

export class ApiService {
  /**
   * Fetch portfolio projects
   */
  static async fetchPortfolioData(): Promise<PortfolioProject[]> {
    if (USE_MOCK_DATA) {
      // Mock Instructors
      const instructors = {
        alex: {
          id: 'inst_1',
          name: 'Alex Johnson',
          role: 'Creative Director',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
          bio: 'Award-winning designer with 10+ years of experience.',
        },
        sarah: {
          id: 'inst_2',
          name: 'Sarah Williams',
          role: 'Lead Developer',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
          bio: 'Full-stack wizard specializing in React and 3D.',
        },
        mike: {
          id: 'inst_3',
          name: 'Michael Chen',
          role: '3D Artist',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
          bio: 'Creating immersive digital worlds.',
        },
        emma: {
          id: 'inst_4',
          name: 'Emma Davis',
          role: 'UX Researcher',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
          bio: 'Understanding user needs to build better products.',
        },
      };

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: '1',
              title: 'E-commerce Platform',
              category: 'web',
              description: 'A modern e-commerce solution with 3D product visualization.',
              color: '#3B82F6',
              results: ['Increased user engagement by 45%', 'Reduced bounce rate by 30%'],
              instructor: instructors.sarah,
            },
            {
              id: '2',
              title: 'Brand Identity',
              category: 'branding',
              description: 'Complete brand identity for a tech startup.',
              color: '#EF4444',
              results: ['95% brand recognition increase', 'Award-winning design'],
              instructor: instructors.alex,
            },
            {
              id: '3',
              title: 'Mobile App',
              category: 'app',
              description: 'Fitness tracking application with gamification elements.',
              color: '#10B981',
              results: ['50K+ downloads', '4.8/5 star rating'],
              instructor: instructors.emma,
            },
            {
              id: '4',
              title: '3D Product Showcase',
              category: '3d',
              description: 'Interactive 3D product configurator for automotive industry.',
              color: '#F59E0B',
              results: ['35% increase in sales', 'Reduced return rate'],
              instructor: instructors.mike,
            },
            {
              id: '5',
              title: 'Fintech Dashboard',
              category: 'web',
              description: 'Real-time financial data visualization platform.',
              color: '#8B5CF6',
              results: ['Processed $1M+ transactions', 'Zero downtime'],
              instructor: instructors.sarah,
            },
            {
              id: '6',
              title: 'Luxury Hotel Site',
              category: 'web',
              description: 'Immersive booking experience for a 5-star resort.',
              color: '#EC4899',
              results: ['2x booking conversion', 'Best UI Award 2024'],
              instructor: instructors.alex,
            },
            {
              id: '7',
              title: 'AR Interior App',
              category: 'app',
              description: 'Augmented reality app for furniture placement.',
              color: '#6366F1',
              results: ['Featured in App Store', '100k active users'],
              instructor: instructors.mike,
            },
            {
              id: '8',
              title: 'Eco-Friendly Brand',
              category: 'branding',
              description: 'Sustainable packaging design and brand strategy.',
              color: '#14B8A6',
              results: ['Carbon neutral certification', 'Viral social campaign'],
              instructor: instructors.emma,
            },
          ]);
        }, 1000);
      });
    }

    const response = await apiClient.get<PortfolioProject[]>(ENDPOINTS.PORTFOLIO.LIST);
    return response.data;
  }

  /**
   * Submit contact form
   */
  static async submitContactForm(data: ContactFormData): Promise<ContactFormResponse> {
    if (USE_MOCK_DATA) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate random success/failure for demonstration
          if (Math.random() > 0.1) {
            // 90% success rate
            logger.info('Contact form submitted successfully', data, 'API');
            resolve({ success: true, message: 'Message sent successfully!' });
          } else {
            logger.error('Contact form submission failed', data, 'API');
            reject(new Error('Failed to send message. Please try again.'));
          }
        }, 1500);
      });
    }

    const response = await apiClient.post<ContactFormResponse>(ENDPOINTS.CONTACT.SUBMIT, data);
    return response.data;
  }

  /**
   * Fetch team members
   */
  static async fetchTeamData(): Promise<TeamMember[]> {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: '1',
              name: 'Alex Johnson',
              role: 'Creative Director',
              bio: '10+ years of experience in digital design and brand strategy.',
              social: {
                twitter: '#',
              },
            },
            {
              id: '2',
              name: 'Sarah Williams',
              role: 'Lead Developer',
              bio: 'Full-stack developer specializing in React and 3D web technologies.',
              social: {
                github: '#',
              },
            },
            {
              id: '3',
              name: 'Michael Chen',
              role: '3D Artist',
              bio: 'Specialist in creating immersive 3D experiences and animations.',
              social: {
                linkedin: '#',
              },
            },
          ]);
        }, 800);
      });
    }

    const response = await apiClient.get<TeamMember[]>(ENDPOINTS.TEAM.LIST);
    return response.data;
  }
}
