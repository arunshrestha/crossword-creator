import { render, screen, fireEvent } from '@testing-library/react';
import CrosswordGrid from '../../components/Grid/CrosswordGrid';

const sampleGrid = [
    ['A', 'B', 'C'],
    ['D', 'E', 'F'],
    ['G', 'H', 'I'],
];

const sampleNumbers = {
    '0-0': 1,
    '1-1': 2,
};

const sampleBlocks = new Set(['0-1']); // cell at (0,1) is blocked

describe('CrosswordGrid', () => {
    it('renders grid cells with correct values, numbers, and blocks', () => {
        render(
            <CrosswordGrid
                grid={sampleGrid}
                numbers={sampleNumbers}
                blocks={sampleBlocks}
            />
        );

        // Check blocked cell has black background
        const blockedCell = screen.getByTestId('cell-0-1');
        expect(blockedCell).toHaveClass('bg-black');

        // Check numbered cell renders number
        const numberedCell = screen.getByTestId('cell-0-0');
        expect(numberedCell).toHaveTextContent('1');
        expect(numberedCell).toHaveTextContent('A');

        // Check normal cell renders letter only
        const normalCell = screen.getByTestId('cell-2-2');
        expect(normalCell).toHaveTextContent('I');
    });

    it('calls onCellClick when a non-block cell is clicked', () => {
        const onCellClick = jest.fn();
        render(
            <CrosswordGrid
                grid={sampleGrid}
                numbers={sampleNumbers}
                blocks={sampleBlocks}
                onCellClick={onCellClick}
            />
        );
        const cell = screen.getByTestId('cell-1-1');
        fireEvent.click(cell);
        expect(onCellClick).toHaveBeenCalledWith(1, 1);
    });

    it('calls onCellClick when a blocked cell is clicked', () => {
        const onCellClick = jest.fn();
        render(
            <CrosswordGrid
                grid={sampleGrid}
                numbers={sampleNumbers}
                blocks={sampleBlocks}
                onCellClick={onCellClick}
            />
        );
        const blockedCell = screen.getByTestId('cell-0-1');
        fireEvent.click(blockedCell);
        expect(onCellClick).not.toHaveBeenCalledWith(0, 1);
    });

    it('highlights cell on hover and removes highlight on mouse leave', () => {
        render(<CrosswordGrid grid={sampleGrid} numbers={sampleNumbers} blocks={sampleBlocks} />);
        const cell = screen.getByTestId('cell-0-0');

        fireEvent.mouseEnter(cell);
        const highlight = cell.querySelector('div[data-testid="grid-cell-highlight"]');
        expect(highlight).toHaveClass('bg-yellow-200');

        fireEvent.mouseLeave(cell);
        expect(highlight).not.toHaveClass('bg-yellow-200');
    });
});
