import { render, screen, fireEvent } from '@testing-library/react';
import GridToolbar from '../../components/Grid/GridToolbar';

describe('GridToolbar', () => {
    it('renders symmetry toggle button with correct label and style', () => {
        const { rerender } = render(
            <GridToolbar symmetryEnabled={false} onToggleSymmetry={() => { }} />
        );
        const button = screen.getByTestId('symmetry-toggle-button');
        expect(button).toHaveTextContent('Symmetry Off');
        expect(button).toHaveClass('bg-gray-200');

        rerender(
            <GridToolbar symmetryEnabled={true} onToggleSymmetry={() => { }} />
        );
        expect(screen.getByTestId('symmetry-toggle-button')).toHaveTextContent('Symmetry On');
        expect(screen.getByTestId('symmetry-toggle-button')).toHaveClass('bg-blue-500');
    });

    it('calls onToggleSymmetry when button is clicked', () => {
        const onToggleSymmetry = jest.fn();
        render(
            <GridToolbar symmetryEnabled={false} onToggleSymmetry={onToggleSymmetry} />
        );
        const button = screen.getByTestId('symmetry-toggle-button');
        fireEvent.click(button);
        expect(onToggleSymmetry).toHaveBeenCalledTimes(1);
    });

    it('renders block mode toggle button with correct label and style', () => {
        const { rerender } = render(
            <GridToolbar blockModeEnabled={false} onToggleBlockMode={() => { }} />
        );
        const button = screen.getByTestId('block-mode-toggle-button');
        expect(button).toHaveTextContent('Block Mode Off');
        expect(button).toHaveClass('bg-gray-200');

        rerender(
            <GridToolbar blockModeEnabled={true} onToggleBlockMode={() => { }} />
        );
        expect(screen.getByTestId('block-mode-toggle-button')).toHaveTextContent('Block Mode On');
        expect(screen.getByTestId('block-mode-toggle-button')).toHaveClass('bg-green-600');
    });

    it('calls onToggleBlockMode when button is clicked', () => {
        const onToggleBlockMode = jest.fn();
        render(
            <GridToolbar blockModeEnabled={false} onToggleBlockMode={onToggleBlockMode} />
        );
        const button = screen.getByTestId('block-mode-toggle-button');
        fireEvent.click(button);
        expect(onToggleBlockMode).toHaveBeenCalledTimes(1);
    });

    it('calls onClearGrid when clear grid button is clicked', () => {
        const onClearGrid = jest.fn();
        render(
            <GridToolbar onClearGrid={onClearGrid} />
        );
        const button = screen.getByTestId('clear-grid-button');
        fireEvent.click(button);
        expect(onClearGrid).toHaveBeenCalledTimes(1);
    });

    it('does not render undo/redo or word/error count sections', () => {
        render(<GridToolbar />);
        expect(screen.queryByText(/Undo/)).not.toBeInTheDocument();
        expect(screen.queryByText(/Redo/)).not.toBeInTheDocument();
        expect(screen.queryByText(/Words:/)).not.toBeInTheDocument();
        expect(screen.queryByText(/Errors:/)).not.toBeInTheDocument();
    });
});