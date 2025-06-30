import { render, screen } from '@testing-library/react';
import GridCellHighlight from '../../components/Grid/GridCellHighlight';

describe('GridCellHighlight', () => {
    it('renders highlight when isActive is true', () => {
        render(<GridCellHighlight isActive={true} />);
        const highlight = screen.getByTestId('grid-cell-highlight');
        expect(highlight).toHaveClass('bg-yellow-200');
    });

    it('does not render highlight when isActive is false', () => {
        render(<GridCellHighlight isActive={false} />);
        const highlight = screen.getByTestId('grid-cell-highlight');
        expect(highlight).not.toHaveClass('bg-yellow-200');
    });
});
