/**
 * Modal Component Tests
 * Tests modal open/close, keyboard interactions, and accessibility
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from '../components/Modal';

describe('Modal', () => {
    it('does not render when isOpen is false', () => {
        render(
            <Modal isOpen={false} onClose={() => { }} title="Test Modal">
                <div>Modal content</div>
            </Modal>
        );

        expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
    });

    it('renders when isOpen is true', () => {
        render(
            <Modal isOpen={true} onClose={() => { }} title="Test Modal">
                <div>Modal content</div>
            </Modal>
        );

        expect(screen.getByText('Test Modal')).toBeInTheDocument();
        expect(screen.getByText('Modal content')).toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', async () => {
        const user = userEvent.setup();
        const onClose = vi.fn();

        render(
            <Modal isOpen={true} onClose={onClose} title="Test Modal">
                <div>Content</div>
            </Modal>
        );

        const closeButton = screen.getByLabelText(/close modal/i);
        await user.click(closeButton);

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when backdrop is clicked', async () => {
        const user = userEvent.setup();
        const onClose = vi.fn();

        render(
            <Modal isOpen={true} onClose={onClose} title="Test Modal">
                <div>Content</div>
            </Modal>
        );

        // Find the backdrop (the outer div with onClick)
        const backdrop = screen.getByRole('dialog').parentElement;
        if (backdrop) {
            await user.click(backdrop);
            expect(onClose).toHaveBeenCalled();
        }
    });

    it('does not close when clicking modal content', async () => {
        const user = userEvent.setup();
        const onClose = vi.fn();

        render(
            <Modal isOpen={true} onClose={onClose} title="Test Modal">
                <div>Modal content</div>
            </Modal>
        );

        const content = screen.getByText('Modal content');
        await user.click(content);

        expect(onClose).not.toHaveBeenCalled();
    });

    it('renders with correct size class', () => {
        const { rerender } = render(
            <Modal isOpen={true} onClose={() => { }} title="Test" size="sm">
                <div>Content</div>
            </Modal>
        );

        let dialog = screen.getByRole('dialog');
        expect(dialog).toHaveClass('max-w-md');

        rerender(
            <Modal isOpen={true} onClose={() => { }} title="Test" size="lg">
                <div>Content</div>
            </Modal>
        );

        dialog = screen.getByRole('dialog');
        expect(dialog).toHaveClass('max-w-4xl');
    });

    it('has proper ARIA attributes', () => {
        render(
            <Modal isOpen={true} onClose={() => { }} title="Test Modal">
                <div>Content</div>
            </Modal>
        );

        const dialog = screen.getByRole('dialog');
        expect(dialog).toHaveAttribute('aria-modal', 'true');
        expect(dialog).toHaveAttribute('aria-labelledby');
    });

    it('closes on Escape key press', async () => {
        const user = userEvent.setup();
        const onClose = vi.fn();

        render(
            <Modal isOpen={true} onClose={onClose} title="Test Modal">
                <div>Content</div>
            </Modal>
        );

        await user.keyboard('{Escape}');
        expect(onClose).toHaveBeenCalled();
    });
});
