import React, { useState } from 'react';
import GridCell from './GridCell';

const CrosswordGrid = ({ grid, numbers = {}, blocks = new Set(), onCellClick }) => {
    const [activeCell, setActiveCell] = useState({ row: null, col: null });

    const handleMouseEnter = (row, col) => {
        setActiveCell({ row, col });
    };

    const handleMouseLeave = () => {
        setActiveCell({ row: null, col: null });
    };

    return (
        <div
            className="grid gap-px bg-gray-400 select-none"
            style={{ gridTemplateColumns: `repeat(${grid[0]?.length || 0}, 1fr)` }}
            data-testid="crossword-grid"
        >
            {grid.map((row, rowIndex) =>
                row.map((value, colIndex) => {
                    const key = `${rowIndex}-${colIndex}`;
                    const number = numbers[key];
                    const isBlock = blocks.has(key);

                    return (
                        <GridCell
                            key={key}
                            row={rowIndex}
                            col={colIndex}
                            value={value}
                            number={number}
                            isBlock={isBlock}
                            onClick={onCellClick}
                            onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                            onMouseLeave={handleMouseLeave}
                            isActive={activeCell.row === rowIndex && activeCell.col === colIndex}
                        />
                    );
                })
            )}
        </div>
    );
};

export default CrosswordGrid;
