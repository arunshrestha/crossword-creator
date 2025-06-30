import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../components/Shared/Modal';

describe('Modal component', () => {
    const title = 'Test Modal';
    const onClose = jest.fn();

    test('does not render when isOpen is false', () => {
        render(
            <Modal title={title} isOpen={false} onClose={onClose}>
                <p>Modal content</p>
            </Modal>
        );

        expect(screen.queryByText(title)).not.toBeInTheDocument();
    });

    test('renders when isOpen is true', () => {
        render(
            <Modal title={title} isOpen={true} onClose={onClose}>
                <p>Modal content</p>
            </Modal>
        );

        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText('Modal content')).toBeInTheDocument();
    });

    test('calls onClose when close button is clicked', () => {
        render(
            <Modal title={title} isOpen={true} onClose={onClose}>
                <p>Modal content</p>
            </Modal>
        );

        const closeButton = screen.getByLabelText('Close modal');
        fireEvent.click(closeButton);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    test('calls onClose when Escape key is pressed', () => {
        render(
            <Modal title={title} isOpen={true} onClose={onClose}>
                <p>Modal content</p>
            </Modal>
        );

        fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
        expect(onClose).toHaveBeenCalledTimes(1);
    });
});
