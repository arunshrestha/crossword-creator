import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/Shared/Header';

describe('Header Component', () => {
    test('renders the title', () => {
        render(<Header title="Crossword Creator" />);
        expect(screen.getByText(/crossword creator/i)).toBeInTheDocument();
    });

    test('renders subtitle if provided', () => {
        render(<Header title="Crossword Creator" subtitle="Make your own puzzles" />);
        expect(screen.getByText(/make your own puzzles/i)).toBeInTheDocument();
    });

    test('does not render subtitle if not provided', () => {
        render(<Header title="Crossword Creator" />);
        expect(screen.queryByText(/make your own puzzles/i)).not.toBeInTheDocument();
    });
});
