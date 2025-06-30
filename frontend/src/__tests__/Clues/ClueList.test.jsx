import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ClueList from '../../components/Clues/ClueList';

describe('ClueList', () => {
    const clues = {
        1: 'First clue',
        2: 'Second clue',
    };

    it('renders clues with correct direction and numbers', () => {
        render(<ClueList clues={clues} direction="across" onClueChange={() => { }} />);
        expect(screen.getByText(/across clues/i)).toBeInTheDocument();
        expect(screen.getByDisplayValue('First clue')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Second clue')).toBeInTheDocument();
    });

    it('calls onClueChange with number and new clue on input change', () => {
        const handleClueChange = jest.fn();
        render(<ClueList clues={clues} direction="down" onClueChange={handleClueChange} />);
        const input = screen.getByTestId('clue-input-1-down');
        fireEvent.change(input, { target: { value: 'Updated clue' } });
        expect(handleClueChange).toHaveBeenCalledWith('1', 'Updated clue');
    });
});
