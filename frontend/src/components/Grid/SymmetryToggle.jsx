import React from 'react';

const SymmetryToggle = ({ isSymmetric, onToggle }) => {
    return (
        <label>
            <input
                type="checkbox"
                checked={isSymmetric}
                onChange={(e) => onToggle(e.target.checked)}
                data-testid="symmetry-toggle"
            />
            Symmetric Puzzle
        </label>
    );
};

export default SymmetryToggle;
