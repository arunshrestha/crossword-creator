import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ErrorMessage from '../../components/Shared/ErrorMessage';

describe('ErrorMessage Component', () => {
    test('does not render when message is not provided', () => {
        const { container } = render(<ErrorMessage message="" />);
        expect(container.firstChild).toBeNull();
    });

    test('renders message when provided', () => {
        render(<ErrorMessage message="This is an error!" />);
        expect(screen.getByText(/this is an error!/i)).toBeInTheDocument();
    });

    test('can be dismissed manually', () => {
        render(<ErrorMessage message="Dismiss me!" />);
        const closeButton = screen.getByLabelText(/dismiss error message/i);
        fireEvent.click(closeButton);
        expect(screen.queryByText(/dismiss me!/i)).toBeNull();
    });

    test('auto-dismisses after duration', async () => {
        render(<ErrorMessage message="Timeout error!" duration={1000} />);
        expect(screen.getByText(/timeout error!/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByText(/timeout error!/i)).toBeNull();
        }, { timeout: 2000 });
    });
});
