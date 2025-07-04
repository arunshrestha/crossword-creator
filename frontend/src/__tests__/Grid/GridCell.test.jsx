import { render, screen, fireEvent } from '@testing-library/react';
import GridCell from '../../components/Grid/GridCell';

describe('GridCell', () => {
    it('renders a block cell with black background', () => {
        render(<GridCell row={0} col={0} value="" isBlock={true} />);
        const cell = screen.getByTestId('cell-0-0');
        expect(cell).toHaveClass('bg-black');
    });

    it('renders a non-block cell with value and number', () => {
        render(
            <GridCell row={1} col={1} value="A" number={5} isBlock={false} />
        );
        expect(screen.getByText('A')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('calls onClick when clicked on non-block cell', () => {
        const onClick = jest.fn();
        render(
            <GridCell
                row={2}
                col={2}
                value="B"
                isBlock={false}
                onClick={onClick}
            />
        );
        const cell = screen.getByTestId('cell-2-2');
        fireEvent.click(cell);
        expect(onClick).toHaveBeenCalledWith(2, 2);
    });

    it('calls onClick when clicked on block cell', () => {
        const onClick = jest.fn();
        render(
            <GridCell row={3} col={3} value="" isBlock={true} onClick={onClick} />
        );
        const cell = screen.getByTestId('cell-3-3');
        fireEvent.click(cell);
        expect(onClick).toHaveBeenCalledWith(3, 3);
    });

    it('renders highlight when isActive is true', () => {
        render(
            <GridCell row={5} col={5} value="C" isBlock={false} isActive={true} />
        );
        const highlight = screen.getByTestId('grid-cell-highlight');
        expect(highlight).toBeInTheDocument();
    });

    it('does not render highlight when isActive is false', () => {
        render(
            <GridCell row={6} col={6} value="D" isBlock={false} isActive={false} />
        );
        const highlight = screen.queryByTestId('grid-cell-highlight');
        // It renders always but without highlight class
        expect(highlight).toBeInTheDocument();
        expect(highlight).not.toHaveClass('bg-yellow-200');
    });
});

describe('GridCell highlight', () => {
    it('renders highlight with yellow background when isActive is true', () => {
        render(
            <GridCell
                row={0}
                col={0}
                value="A"
                isBlock={false}
                isActive={true}
            />
        );
        const highlight = screen.getByTestId('grid-cell-highlight');
        expect(highlight).toBeInTheDocument();
        expect(highlight).toHaveClass('bg-yellow-200');
    });

    it('renders highlight without yellow background when isActive is false', () => {
        render(
            <GridCell
                row={0}
                col={0}
                value="A"
                isBlock={false}
                isActive={false}
            />
        );
        const highlight = screen.getByTestId('grid-cell-highlight');
        expect(highlight).toBeInTheDocument();
        expect(highlight).not.toHaveClass('bg-yellow-200');
    });

    it('does not render highlight for block cells', () => {
        render(
            <GridCell
                row={0}
                col={0}
                value=""
                isBlock={true}
                isActive={true}
            />
        );
        const highlight = screen.queryByTestId('grid-cell-highlight');
        expect(highlight).not.toBeInTheDocument();
    });
});