import React from 'react';
import Button from '../Shared/Button';

const GridToolbar = ({ onClear, onFill, onSymmetryToggle }) => {
    return (
        <div className="flex gap-2 mb-4">
            <Button onClick={onClear}>Clear</Button>
            <Button onClick={onFill}>Fill</Button>
            <Button onClick={onSymmetryToggle}>Toggle Symmetry</Button>
        </div>
    );
};

export default GridToolbar;
