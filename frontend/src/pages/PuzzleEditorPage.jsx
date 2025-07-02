import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import usePuzzleStore from '../store/puzzleStore';
import CrosswordGrid from '../components/Grid/CrosswordGrid';

export default function PuzzleEditorPage() {
    const navigate = useNavigate();
    const { rows, cols, gridData, setGridData, initializeGrid } = usePuzzleStore();

    // Ensure grid is initialized
    useEffect(() => {
        if (!gridData || gridData.length === 0 || rows === 0 || cols === 0) {
            initializeGrid(rows, cols);
        }
    }, [rows, cols, gridData, initializeGrid]);

    // Compute blocks set for CrosswordGrid
    const blocks = new Set();
    gridData.forEach((row, rIdx) =>
        row.forEach((cell, cIdx) => {
            if (cell.isBlock) blocks.add(`${rIdx}-${cIdx}`);
        })
    );

    // Compute grid of values for CrosswordGrid
    const grid = gridData.map(row => row.map(cell => cell.value || ''));

    // Handle cell click: block/unblock or input letter
    const handleCellClick = (row, col) => {
        const cell = gridData[row][col];
        if (cell.isBlock) {
            // Unblock cell
            const updated = gridData.map((r, rIdx) =>
                r.map((c, cIdx) =>
                    rIdx === row && cIdx === col ? { ...c, isBlock: false } : c
                )
            );
            setGridData(updated);
        } else {
            // Ask user: block or input letter
            const makeBlock = window.confirm('Block this cell? Click Cancel to enter a letter.');
            if (makeBlock) {
                const updated = gridData.map((r, rIdx) =>
                    r.map((c, cIdx) =>
                        rIdx === row && cIdx === col ? { ...c, isBlock: true, value: '' } : c
                    )
                );
                setGridData(updated);
            } else {
                const letter = window.prompt('Enter a letter:', cell.value || '');
                if (letter && /^[A-Za-z]$/.test(letter)) {
                    const updated = gridData.map((r, rIdx) =>
                        r.map((c, cIdx) =>
                            rIdx === row && cIdx === col
                                ? { ...c, value: letter.toUpperCase(), isBlock: false }
                                : c
                        )
                    );
                    setGridData(updated);
                }
            }
        }
    };

    const isGridReady = gridData && gridData.length === rows && rows > 0 && cols > 0;

    console.log('rows:', rows, 'cols:', cols, 'gridData:', gridData);

    return (
        <div className="min-h-screen bg-white px-4 py-8 flex flex-col items-center">
            <h2 className="text-3xl font-semibold mb-6">Fill in Your Answers</h2>
            <div className="mb-6 w-full max-w-4xl flex justify-center">
                {isGridReady ? (
                    <CrosswordGrid
                        grid={grid}
                        blocks={blocks}
                        onCellClick={handleCellClick}
                    />
                ) : (
                    <p>Loading grid...</p>
                )}
            </div>
            <button
                onClick={() => navigate('/clues')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg text-lg shadow-md disabled:opacity-50"
                aria-label="Proceed to Clue Entry"
                disabled={!isGridReady}
            >
                Proceed to Clue Entry
            </button>
        </div>
    );
}