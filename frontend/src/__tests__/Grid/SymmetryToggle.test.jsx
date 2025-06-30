import { render, fireEvent } from '@testing-library/react';
import SymmetryToggle from '../../components/Grid/SymmetryToggle';

describe('SymmetryToggle', () => {
    it('renders with correct initial checked state', () => {
        const { getByTestId } = render(<SymmetryToggle isSymmetric={true} onToggle={() => { }} />);
        expect(getByTestId('symmetry-toggle')).toBeChecked();
    });

    it('calls onToggle when checkbox is clicked', () => {
        const onToggleMock = jest.fn();
        const { getByTestId } = render(<SymmetryToggle isSymmetric={false} onToggle={onToggleMock} />);
        fireEvent.click(getByTestId('symmetry-toggle'));
        expect(onToggleMock).toHaveBeenCalledWith(true);
    });
});
