import React, { useState, useRef } from 'react';
import './CrosswordGrid.css';
import CellOptions from './CellOptions';

const CrosswordGrid = ({ grid, setGrid }) => {
    const [selectedCell, setSelectedCell] = useState(null);
    const containerRef = useRef(null);

    const toggleBlock = (row, col) => {
        if (selectedCell && selectedCell.row === row && selectedCell.col === col) {
            setSelectedCell(null);
            const updatedGrid = grid.map((r, rowIndex) =>
                r.map((cell, colIndex) => ({
                    ...cell,
                    isSelected: false
                }))
            );
            setGrid(updatedGrid);
        } else {
            setSelectedCell({ row, col, value: grid[row][col].value });
            const updatedGrid = grid.map((r, rowIndex) =>
                r.map((cell, colIndex) => ({
                    ...cell,
                    isSelected: rowIndex === row && colIndex === col
                }))
            );
            setGrid(updatedGrid);
        }
    };

    const handleOptionSelect = (option, value = '') => {
        const { row, col } = selectedCell;
        const updatedGrid = grid.map((r, rowIndex) =>
            r.map((cell, colIndex) => {
                if (rowIndex === row && colIndex === col) {
                    if (option === 'darken') {
                        return { ...cell, isDark: true, value: '', isSelected: false };
                    } else if (option === 'input') {
                        return { ...cell, isDark: false, value: value.toUpperCase(), isSelected: false };
                    }
                }
                return cell;
            })
        );
        setGrid(updatedGrid);
        setSelectedCell(null);
    };

    return (
        <div className="crossword-container" ref={containerRef}>
            <div className="grid">
                {grid.map((row, rowIndex) => (
                    <div className="grid-row" key={rowIndex}>
                        {row.map((cell, colIndex) => (
                            <div
                                className={`grid-cell ${cell.isDark ? 'dark' : ''} ${cell.isSelected ? 'selected' : ''}`}
                                key={colIndex}
                                onClick={() => toggleBlock(rowIndex, colIndex)}
                            >
                                {cell.value}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <CellOptions selectedCell={selectedCell} onOptionSelect={handleOptionSelect} />
            <div className="add-clues">
                {/* Add Clues section content here */}
            </div>
        </div>
    );
};

export default CrosswordGrid;