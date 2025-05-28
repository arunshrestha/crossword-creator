import React from 'react';

const CrosswordSolver = ({ grid, onCellChange }) => {
    return (
        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${grid[0]?.length || 0}, 2rem)` }}>
            {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                    <input
                        key={`${rowIndex}-${colIndex}`}
                        type="text"
                        maxLength={1}
                        value={cell || ''}
                        onChange={(e) => onCellChange(rowIndex, colIndex, e.target.value.toUpperCase())}
                        className="w-8 h-8 text-center border border-gray-300 uppercase font-mono"
                    />
                ))
            )}
        </div>
    );
};

export default CrosswordSolver;
