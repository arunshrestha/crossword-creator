import { render, screen, fireEvent } from '@testing-library/react';
import GridToolbar from '../../components/Grid/GridToolbar';

describe('GridToolbar', () => {
    it('renders symmetry toggle button with correct label', () => {
        const { rerender } = render(
            <GridToolbar symmetryEnabled={false} onToggleSymmetry={() => { }} />
        );
        expect(screen.getByTestId('symmetry-toggle-button')).toHaveTextContent(
            'Symmetry Off'
        );

        rerender(
            <GridToolbar symmetryEnabled={true} onToggleSymmetry={() => { }} />
        );
        expect(screen.getByTestId('symmetry-toggle-button')).toHaveTextContent(
            'Symmetry On'
        );
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
});
