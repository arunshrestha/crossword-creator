import React from 'react';

const GridCellHighlight = ({ isActive }) => {
    return (
        <div
            className={`absolute inset-0 transition-colors ${isActive ? 'bg-yellow-200' : ''
                }`}
            data-testid="grid-cell-highlight"
        />
    );
};

export default GridCellHighlight;
