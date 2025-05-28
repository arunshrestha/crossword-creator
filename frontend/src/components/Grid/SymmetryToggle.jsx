import React from 'react';

const SymmetryToggle = ({ enabled, onToggle }) => {
    return (
        <button
            onClick={onToggle}
            className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
        >
            {enabled ? 'Disable' : 'Enable'} Symmetry
        </button>
    );
};

export default SymmetryToggle;
