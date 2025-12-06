import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from '../components/Contact';
import { ApiService } from '../services/apiService';

// Mock child components
vi.mock('../components/Navbar', () => ({ default: () => <div data-testid="navbar">Navbar</div> }));
vi.mock('../components/Footer', () => ({ default: () => <div data-testid="footer">Footer</div> }));
vi.mock('../components/InteractiveMap', () => ({
  default: () => <div data-testid="map">Map</div>,
}));
vi.mock('../components/Modal', () => ({
  default: ({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) =>
    isOpen ? <div data-testid="modal">{children}</div> : null,
}));
vi.mock('../components/Tooltip', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock Three.js components
vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="canvas">{children}</div>
  ),
  useFrame: vi.fn(),
}));

vi.mock('@react-three/drei', () => ({
  OrbitControls: () => null,
  Sphere: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
  MeshDistortMaterial: () => null,
}));

// Mock ApiService
vi.mock('../services/apiService', () => ({
  ApiService: {
    submitContactForm: vi.fn(),
  },
}));

describe('Contact Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders contact form fields', () => {
    render(<Contact />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('validates inputs and shows errors', async () => {
    render(<Contact />);

    const submitBtn = screen.getByRole('button', { name: /send message/i });

    // Submit empty form
    fireEvent.click(submitBtn);

    // Check for validation errors
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/subject is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/message is required/i)).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    vi.mocked(ApiService.submitContactForm).mockResolvedValue({
      success: true,
      message: 'Success',
    });

    render(<Contact />);

    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await user.type(
      screen.getByLabelText(/message/i),
      'This is a test message longer than 10 chars'
    );

    const submitBtn = screen.getByRole('button', { name: /send message/i });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(ApiService.submitContactForm).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'This is a test message longer than 10 chars',
      });
    });

    expect(await screen.findByText(/thank you for your message/i)).toBeInTheDocument();
  });

  it('handles submission error', async () => {
    const user = userEvent.setup();
    vi.mocked(ApiService.submitContactForm).mockRejectedValue(new Error('API Error'));

    render(<Contact />);

    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await user.type(
      screen.getByLabelText(/message/i),
      'This is a test message longer than 10 chars'
    );

    const submitBtn = screen.getByRole('button', { name: /send message/i });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/an error occurred/i)).toBeInTheDocument();
    });
  });
});
