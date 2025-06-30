import React from 'react';
import { render, screen } from '@testing-library/react';
import PlayerClueList from '../../components/Clues/PlayerClueList';

describe('PlayerClueList', () => {
    const clues = {
        1: 'First clue',
        2: 'Second clue',
    };

    it('renders clues as a read-only list with correct numbers and direction', () => {
        render(<PlayerClueList clues={clues} direction="across" />);
        expect(screen.getByText(/across clues/i)).toBeInTheDocument();
        expect(screen.getByText('1.')).toBeInTheDocument();
        expect(screen.getByText('First clue')).toBeInTheDocument();
        expect(screen.getByText('2.')).toBeInTheDocument();
        expect(screen.getByText('Second clue')).toBeInTheDocument();
    });
});
