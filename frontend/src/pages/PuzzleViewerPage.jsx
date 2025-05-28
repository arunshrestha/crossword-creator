import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function PuzzleViewerPage() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { grid, title, acrossClues, downClues } = state || {};

    const [userGrid, setUserGrid] = useState([]);

    useEffect(() => {
        if (!grid || !acrossClues || !downClues) {
            navigate('/'); // redirect if data missing
            return;
        }

        // Create user input grid based on puzzle structure
        const clone = grid.map(row =>
            row.map(cell => ({
                ...cell,
                input: cell.isBlock ? null : '',
            }))
        );
        setUserGrid(clone);
    }, [grid, acrossClues, downClues, navigate]);

    const handleChange = (row, col, value) => {
        setUserGrid(prev => {
            const updated = prev.map(r => [...r]);
            updated[row][col].input = value.toUpperCase().slice(0, 1);
            return updated;
        });
    };

    const handleSubmit = () => {
        // Simple placeholder logic: real checking would compare to answers
        alert('Submission logic not implemented yet.');
        navigate('/completed');
    };

    if (!userGrid.length) return null;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">{title || 'Crossword Puzzle'}</h2>

            <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
                {/* Crossword Grid */}
                <div className="grid" style={{ gridTemplateColumns: `repeat(${grid[0].length}, 2rem)` }}>
                    {userGrid.map((row, rowIndex) =>
                        row.map((cell, colIndex) => (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                className={`w-8 h-8 border border-gray-400 text-center flex items-center justify-center ${cell.isBlock ? 'bg-black' : 'bg-white'
                                    }`}
                            >
                                {!cell.isBlock && (
                                    <input
                                        value={cell.input}
                                        onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                                        className="w-full h-full text-center outline-none"
                                        maxLength={1}
                                    />
                                )}
                            </div>
                        ))
                    )}
                </div>

                {/* Clues */}
                <div className="flex-1">
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-2">Across</h3>
                        <ul className="space-y-1">
                            {acrossClues.map(clue => (
                                <li key={`across-${clue.number}`}>
                                    <strong>{clue.number}.</strong> {clue.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Down</h3>
                        <ul className="space-y-1">
                            {downClues.map(clue => (
                                <li key={`down-${clue.number}`}>
                                    <strong>{clue.number}.</strong> {clue.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 text-center">
                <button
                    onClick={handleSubmit}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded"
                >
                    Submit Puzzle
                </button>
            </div>
        </div>
    );
}
