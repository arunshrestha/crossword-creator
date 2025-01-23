import React from 'react';
import './CrosswordGrid.css';

const CrosswordGrid = ({ grid, setGrid }) => {
    const toggleBlock = (row, col) => {
        const updatedGrid = grid.map((r, rowIndex) =>
            r.map((cell, colIndex) =>
                rowIndex === row && colIndex === col
                    ? { ...cell, isDark: !cell.isDark }
                    : cell
            )
        );
        setGrid(updatedGrid);
    };

    return (
        <div className="grid">
            {grid.map((row, rowIndex) => (
                <div className="grid-row" key={rowIndex}>
                    {row.map((cell, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className={`grid-cell ${cell.isDark ? "dark" : ""}`}
                            onClick={() => toggleBlock(rowIndex, colIndex)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default CrosswordGrid;
