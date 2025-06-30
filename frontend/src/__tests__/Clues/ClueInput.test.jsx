import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ClueInput from '../../components/Clues/ClueInput';

describe('ClueInput', () => {
    it('renders label and input with correct initial value', () => {
        render(<ClueInput number="1" direction="across" clue="Test clue" onChange={() => { }} />);
        expect(screen.getByLabelText(/1. across/i)).toBeInTheDocument();
        expect(screen.getByDisplayValue('Test clue')).toBeInTheDocument();
    });

    it('calls onChange when input value changes', () => {
        const handleChange = jest.fn();
        render(<ClueInput number="2" direction="down" clue="" onChange={handleChange} />);
        const input = screen.getByTestId('clue-input-2-down');
        fireEvent.change(input, { target: { value: 'New clue' } });
        expect(handleChange).toHaveBeenCalledWith('New clue');
    });
});
