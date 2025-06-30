import { render, screen } from '@testing-library/react';
import ConstraintChecker from '../../components/Grid/ConstraintChecker';

describe('ConstraintChecker', () => {
    it('renders no errors message if constraints are met', () => {
        const grid = [
            [{ isBlocked: false }, { isBlocked: true }],
            [{ isBlocked: true }, { isBlocked: false }],
        ];
        render(<ConstraintChecker grid={grid} isSymmetric={true} />);
        expect(screen.getByText(/No constraint errors/i)).toBeInTheDocument();
    });

    it('renders error message when symmetry is violated', () => {
        const grid = [
            [{ isBlocked: false }, { isBlocked: true }],
            [{ isBlocked: false }, { isBlocked: false }],
        ];
        render(<ConstraintChecker grid={grid} isSymmetric={true} />);
        expect(screen.getByTestId('constraint-errors')).toHaveTextContent('Symmetry violated');
    });

    it('renders no errors if symmetry check is off', () => {
        const grid = [
            [{ isBlocked: false }, { isBlocked: true }],
            [{ isBlocked: false }, { isBlocked: false }],
        ];
        render(<ConstraintChecker grid={grid} isSymmetric={false} />);
        expect(screen.getByText(/No constraint errors/i)).toBeInTheDocument();
    });
});
