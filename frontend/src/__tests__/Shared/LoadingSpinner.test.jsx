import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';

describe('LoadingSpinner component', () => {
    test('renders spinner with default size and color', () => {
        render(<LoadingSpinner />);
        const spinner = screen.getByRole('status');
        expect(spinner).toBeInTheDocument();
        expect(spinner).toHaveAttribute('aria-label', 'Loading');
    });

    test('applies custom size and color', () => {
        render(<LoadingSpinner size={10} color="red-600" />);
        const spinner = screen.getByRole('status');
        expect(spinner.className).toMatch(/w-10/);
        expect(spinner.className).toMatch(/h-10/);
        expect(spinner.className).toMatch(/border-red-600/);
    });

    test('accepts custom className', () => {
        render(<LoadingSpinner className="custom-spinner" />);
        const wrapper = screen.getByRole('status').parentElement;
        expect(wrapper.className).toMatch(/custom-spinner/);
    });
});
