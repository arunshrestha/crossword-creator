import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../../components/Shared/Input';

describe('Input component', () => {
    test('renders with label and placeholder', () => {
        render(
            <Input
                label="Username"
                value=""
                onChange={() => { }}
                placeholder="Enter your username"
            />
        );

        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/enter your username/i)).toBeInTheDocument();
    });

    test('calls onChange when typed into', () => {
        const handleChange = jest.fn();
        render(
            <Input
                label="Email"
                value=""
                onChange={handleChange}
                placeholder="Enter your email"
            />
        );

        const input = screen.getByLabelText(/email/i);
        fireEvent.change(input, { target: { value: 'test@example.com' } });
        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    test('displays error message if provided', () => {
        render(
            <Input
                label="Password"
                value=""
                onChange={() => { }}
                error="Password is required"
            />
        );

        expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });

    test('applies disabled attribute when set', () => {
        render(
            <Input
                label="Disabled"
                value=""
                onChange={() => { }}
                disabled
            />
        );

        const input = screen.getByLabelText(/disabled/i);
        expect(input).toBeDisabled();
    });
});
