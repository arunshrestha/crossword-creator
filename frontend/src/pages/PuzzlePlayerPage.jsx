import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { autoNumberGrid } from '../utils/autoNumberGrid';
import { exportToPDF } from '../utils/pdfExport';

export default function PuzzlePlayerPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // Try to get state if coming from inside the app
    const { grid, title, acrossClues, downClues } = location.state || {};

    const [puzzle, setPuzzle] = useState(
        grid && title && acrossClues && downClues
            ? { grid, title, acrossClues, downClues }
            : null
    );
    const [loading, setLoading] = useState(!puzzle);
    const [error, setError] = useState('');
    const [userGrid, setUserGrid] = useState([]);
    const [focusedCell, setFocusedCell] = useState({ row: null, col: null });
    const inputRefs = useRef([]);
    const [cellNumbers, setCellNumbers] = useState([]);
    const [exporting, setExporting] = useState(false);

    // Fetch puzzle if not in state
    useEffect(() => {
        if (puzzle) return;
        setLoading(true);
        fetch(`${process.env.REACT_APP_API_URL}/api/puzzles/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('Puzzle not found');
                return res.json();
            })
            .then(data => {
                setPuzzle({
                    grid: data.gridData,
                    title: data.title,
                    acrossClues: data.acrossClues,
                    downClues: data.downClues,
                });
                setLoading(false);
            })
            .catch(() => {
                setError('Puzzle not found.');
                setLoading(false);
            });
    }, [id, puzzle]);

    // Initialize userGrid and cellNumbers when puzzle is loaded
    useEffect(() => {
        if (!puzzle) return;
        const clone = puzzle.grid.map(row =>
            row.map(cell => ({
                ...cell,
                input: cell.isBlock ? null : '',
            }))
        );
        setUserGrid(clone);
        inputRefs.current = clone.flat().map(() => null);

        // Numbering logic
        const { cellHasNumber } = autoNumberGrid(puzzle.grid);
        setCellNumbers(cellHasNumber);
    }, [puzzle]);

    const cellIndex = (row, col) => row * (puzzle?.grid[0].length || 0) + col;

    const handleChange = (row, col, value) => {
        setUserGrid(prev => {
            const updated = prev.map(r => [...r]);
            updated[row][col].input = value.toUpperCase().slice(0, 1);
            return updated;
        });
    };

    const handleKeyDown = (e, row, col) => {
        if (!puzzle) return;
        const maxRow = puzzle.grid.length - 1;
        const maxCol = puzzle.grid[0].length - 1;

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

    const handleExportPDF = async () => {
        if (!puzzle) return;

        setExporting(true);
        try {
            // Convert puzzle grid to the format expected by pdfExport
            const grid = puzzle.grid.map(row => row.map(cell => cell.value || ''));
            const blocks = new Set();
            const numbers = {};

            // Build blocks and numbers from puzzle data
            puzzle.grid.forEach((row, rIdx) =>
                row.forEach((cell, cIdx) => {
                    if (cell.isBlock) {
                        blocks.add(`${rIdx}-${cIdx}`);
                    }
                })
            );

            // Add cell numbers
            cellNumbers.forEach((row, rIdx) =>
                row.forEach((num, cIdx) => {
                    if (num) {
                        numbers[`${rIdx}-${cIdx}`] = num;
                    }
                })
            );

            const puzzleData = {
                title: puzzle.title || 'Crossword Puzzle',
                grid: grid,
                numbers: numbers,
                blocks: blocks,
                acrossClues: puzzle.acrossClues,
                downClues: puzzle.downClues
            };

            exportToPDF(puzzleData, puzzle.title || 'crossword-puzzle');
        } catch (error) {
            console.error('Error exporting PDF:', error);
            alert('Failed to export PDF. Please try again.');
        } finally {
            setExporting(false);
        }
    };

    const handleSubmit = () => {
        // Calculate score
        let correctCells = 0;
        let totalCells = 0;
        userGrid.forEach((row, r) => {
            row.forEach((cell, c) => {
                if (!cell.isBlock) {
                    totalCells++;
                    // Compare user input to the correct answer (assuming puzzle.grid[r][c].value is the answer)
                    if (
                        cell.input &&
                        puzzle.grid[r][c].value &&
                        cell.input.toUpperCase() === puzzle.grid[r][c].value.toUpperCase()
                    ) {
                        correctCells++;
                    }
                }
            });
        });
        const score = totalCells > 0 ? Math.round((correctCells / totalCells) * 100) : 0;

        navigate(`/complete/${id}`, {
            state: {
                title: puzzle.title,
                userGrid,
                solutionGrid: puzzle.grid,
                score,
                totalCells,
                correctCells,
            },
        });
    };

    if (loading) return <div className="p-8 text-center">Loading puzzle...</div>;
    if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
    if (!userGrid.length || !puzzle) return null;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">{puzzle.title || 'Crossword Puzzle'}</h2>

            <div className="flex flex-col lg:flex-row justify-center items-start gap-12 max-w-6xl mx-auto">
                {/* Crossword Grid */}
                <div
                    className="grid"
                    style={{ gridTemplateColumns: `repeat(${puzzle.grid[0].length}, 2.5rem)` }}
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
                                    {/* Show clue number */}
                                    {!cell.isBlock && cellNumbers[rowIndex] && cellNumbers[rowIndex][colIndex] && (
                                        <div className="absolute top-0 left-0 text-[0.6rem] m-0.5 text-gray-600">
                                            {cellNumbers[rowIndex][colIndex]}
                                        </div>
                                    )}
                                    {!cell.isBlock && (
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
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Clues */}
                <div className="flex-1 max-w-md select-none mx-auto">
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-2">Across</h3>
                        <ul className="space-y-1 max-h-[300px] overflow-auto pr-2">
                            {puzzle.acrossClues.map((clue) => {
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
                                                const row = Math.floor(cellPos / puzzle.grid[0].length);
                                                const col = cellPos % puzzle.grid[0].length;
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
                            {puzzle.downClues.map((clue) => {
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
                                                const row = Math.floor(cellPos / puzzle.grid[0].length);
                                                const col = cellPos % puzzle.grid[0].length;
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

            {/* Buttons - Export PDF and Submit */}
            <div className="w-full flex justify-center gap-4 mt-10">
                <button
                    onClick={handleExportPDF}
                    disabled={exporting}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded transition disabled:opacity-50"
                >
                    {exporting ? 'Exporting...' : 'Export PDF'}
                </button>
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