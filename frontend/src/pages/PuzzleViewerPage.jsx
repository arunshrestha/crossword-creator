import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

export default function PuzzleViewerPage() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { grid, title, acrossClues, downClues } = state || {};

    const [userGrid, setUserGrid] = useState([]);
    const [focusedCell, setFocusedCell] = useState({ row: null, col: null });
    const inputRefs = useRef([]);

    useEffect(() => {
        if (!grid || !acrossClues || !downClues) {
            navigate('/'); // redirect if data missing
            return;
        }

        const clone = grid.map(row =>
            row.map(cell => ({
                ...cell,
                input: cell.isBlock ? null : '',
            }))
        );
        setUserGrid(clone);

        // Initialize refs array size
        inputRefs.current = clone.flat().map(() => null);
    }, [grid, acrossClues, downClues, navigate]);

    const cellIndex = (row, col) => row * grid[0].length + col;

    const handleChange = (row, col, value) => {
        setUserGrid(prev => {
            const updated = prev.map(r => [...r]);
            updated[row][col].input = value.toUpperCase().slice(0, 1);
            return updated;
        });
    };

    // Handle arrow key navigation within the grid inputs
    const handleKeyDown = (e, row, col) => {
        const maxRow = grid.length - 1;
        const maxCol = grid[0].length - 1;

        let newRow = row;
        let newCol = col;

        switch (e.key) {
            case 'ArrowUp':
                e.preventDefault();
                newRow = row > 0 ? row - 1 : row;
                break;
            case 'ArrowDown':
                e.preventDefault();
                newRow = row < maxRow ? row + 1 : row;
                break;
            case 'ArrowLeft':
                e.preventDefault();
                newCol = col > 0 ? col - 1 : col;
                break;
            case 'ArrowRight':
                e.preventDefault();
                newCol = col < maxCol ? col + 1 : col;
                break;
            default:
                return;
        }

        // Skip blocks on navigation
        while (
            userGrid[newRow] &&
            userGrid[newRow][newCol] &&
            userGrid[newRow][newCol].isBlock
        ) {
            if (e.key === 'ArrowUp' && newRow > 0) newRow--;
            else if (e.key === 'ArrowDown' && newRow < maxRow) newRow++;
            else if (e.key === 'ArrowLeft' && newCol > 0) newCol--;
            else if (e.key === 'ArrowRight' && newCol < maxCol) newCol++;
            else break;
        }

        const idx = cellIndex(newRow, newCol);
        inputRefs.current[idx]?.focus();
        setFocusedCell({ row: newRow, col: newCol });
    };

    // Get clue numbers for a focused cell
    const getCluesForCell = (row, col) => {
        if (!userGrid[row] || !userGrid[row][col]) return { across: null, down: null };
        const cell = userGrid[row][col];
        return {
            across: cell.acrossNumber || null,
            down: cell.downNumber || null,
        };
    };

    const { across: focusedAcross, down: focusedDown } = getCluesForCell(
        focusedCell.row,
        focusedCell.col
    );

    const handleSubmit = () => {
        alert('Submission logic not implemented yet.');
        navigate('/completed');
    };

    if (!userGrid.length) return null;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">{title || 'Crossword Puzzle'}</h2>

            <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
                {/* Crossword Grid */}
                <div
                    className="grid"
                    style={{ gridTemplateColumns: `repeat(${grid[0].length}, 2.5rem)` }}
                    role="grid"
                    aria-label="Crossword puzzle grid"
                >
                    {userGrid.map((row, rowIndex) =>
                        row.map((cell, colIndex) => {
                            const idx = cellIndex(rowIndex, colIndex);
                            const isFocused =
                                focusedCell.row === rowIndex && focusedCell.col === colIndex;

                            return (
                                <div
                                    key={`${rowIndex}-${colIndex}`}
                                    role="gridcell"
                                    aria-label={
                                        cell.isBlock
                                            ? 'Black cell'
                                            : `Cell at row ${rowIndex + 1}, column ${colIndex + 1}`
                                    }
                                    className={`w-10 h-10 border border-gray-400 text-center flex items-center justify-center relative
                                        ${cell.isBlock ? 'bg-black' : 'bg-white'}
                                        ${isFocused ? 'ring-2 ring-blue-500' : ''}
                                    `}
                                    onClick={() => {
                                        if (!cell.isBlock) {
                                            inputRefs.current[idx]?.focus();
                                            setFocusedCell({ row: rowIndex, col: colIndex });
                                        }
                                    }}
                                >
                                    {!cell.isBlock && (
                                        <>
                                            {cell.number && (
                                                <div className="absolute top-0 left-0 text-[0.6rem] m-0.5 text-gray-600">
                                                    {cell.number}
                                                </div>
                                            )}
                                            <input
                                                type="text"
                                                ref={(el) => (inputRefs.current[idx] = el)}
                                                value={cell.input}
                                                onChange={(e) =>
                                                    handleChange(rowIndex, colIndex, e.target.value)
                                                }
                                                onFocus={() =>
                                                    setFocusedCell({ row: rowIndex, col: colIndex })
                                                }
                                                onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                                                className="w-full h-full text-center uppercase text-lg font-semibold outline-none"
                                                maxLength={1}
                                                spellCheck={false}
                                                aria-describedby={
                                                    cell.number
                                                        ? `clue-across-${cell.acrossNumber} clue-down-${cell.downNumber}`
                                                        : undefined
                                                }
                                            />
                                        </>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Clues */}
                <div className="flex-1 max-w-md select-none">
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-2">Across</h3>
                        <ul className="space-y-1 max-h-[300px] overflow-auto pr-2">
                            {acrossClues.map((clue) => {
                                const isActive = clue.number === focusedAcross;
                                return (
                                    <li
                                        key={`across-${clue.number}`}
                                        className={`cursor-pointer px-1 rounded ${isActive ? 'bg-blue-200 font-semibold' : ''
                                            }`}
                                        onClick={() => {
                                            // Focus first cell of this clue
                                            const cellPos = userGrid.flat().findIndex(
                                                (c) => c.acrossNumber === clue.number
                                            );
                                            if (cellPos !== -1) {
                                                const row = Math.floor(cellPos / grid[0].length);
                                                const col = cellPos % grid[0].length;
                                                inputRefs.current[cellPos]?.focus();
                                                setFocusedCell({ row, col });
                                            }
                                        }}
                                    >
                                        <strong>{clue.number}.</strong> {clue.text}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2">Down</h3>
                        <ul className="space-y-1 max-h-[300px] overflow-auto pr-2">
                            {downClues.map((clue) => {
                                const isActive = clue.number === focusedDown;
                                return (
                                    <li
                                        key={`down-${clue.number}`}
                                        className={`cursor-pointer px-1 rounded ${isActive ? 'bg-blue-200 font-semibold' : ''
                                            }`}
                                        onClick={() => {
                                            // Focus first cell of this clue
                                            const cellPos = userGrid.flat().findIndex(
                                                (c) => c.downNumber === clue.number
                                            );
                                            if (cellPos !== -1) {
                                                const row = Math.floor(cellPos / grid[0].length);
                                                const col = cellPos % grid[0].length;
                                                inputRefs.current[cellPos]?.focus();
                                                setFocusedCell({ row, col });
                                            }
                                        }}
                                    >
                                        <strong>{clue.number}.</strong> {clue.text}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 text-center">
                <button
                    onClick={handleSubmit}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded transition"
                >
                    Submit Puzzle
                </button>
            </div>
        </div>
    );
}
