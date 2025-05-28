import React from 'react';
import GridCell from './GridCell';

const CrosswordGrid = ({ grid, onCellClick }) => {
    return (
        <div className="grid gap-px bg-gray-400"
            style={{ gridTemplateColumns: `repeat(${grid[0]?.length || 0}, 1fr)` }}>
            {grid.map((row, rowIndex) =>
                row.map((value, colIndex) => (
                    <GridCell
                        key={`${rowIndex}-${colIndex}`}
                        row={rowIndex}
                        col={colIndex}
                        value={value}
                        onClick={onCellClick}
                    />
                ))
            )}
        </div>
    );
};

export default CrosswordGrid;
