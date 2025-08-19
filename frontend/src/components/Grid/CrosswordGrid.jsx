import React, { useState } from 'react';
import GridCell from './GridCell';

const CrosswordGrid = ({
    grid,
    numbers = {},
    blocks = new Set(),
    onCellClick,
    editable = false,
    showValues = true,
    className = "",
    variant = "default" // Add variant prop to distinguish editor from other pages
}) => {
    const [activeCell, setActiveCell] = useState({ row: null, col: null });

    const handleMouseEnter = (row, col) => {
        setActiveCell({ row, col });
    };

    const handleMouseLeave = () => {
        setActiveCell({ row: null, col: null });
    };

    // Use editor styling if variant is "editor", otherwise use player styling
    const gridClasses = variant === "editor"
        ? "grid select-none overflow-auto border border-black"
        : "grid";

    const gridTemplateColumns = variant === "editor"
        ? `repeat(${grid[0]?.length || 0}, minmax(2rem, 1fr))`
        : `repeat(${grid[0]?.length || 0}, 2.5rem)`;

    return (
        <div
            className={`${gridClasses} ${className}`}
            style={{ gridTemplateColumns: gridTemplateColumns }}
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
                            value={showValues ? value : ''}
                            number={number}
                            isBlock={isBlock}
                            onClick={onCellClick}
                            onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                            onMouseLeave={handleMouseLeave}
                            isActive={
                                activeCell.row === rowIndex && activeCell.col === colIndex
                            }
                            variant={variant}
                        />
                    );
                })
            )}
        </div>
    );
};

export default CrosswordGrid;