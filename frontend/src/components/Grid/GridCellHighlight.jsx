import React from 'react';

const GridCellHighlight = ({ isActive }) => {
    return (
        <div className={`absolute inset-0 ${isActive ? 'bg-yellow-200' : ''}`} />
    );
};

export default GridCellHighlight;
