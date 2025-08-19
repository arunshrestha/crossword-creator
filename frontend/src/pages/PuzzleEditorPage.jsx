import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePuzzleStore from '../store/puzzleStore';
import CrosswordGrid from '../components/Grid/CrosswordGrid';
import GridToolbar from '../components/Grid/GridToolbar';

export default function PuzzleEditorPage() {
    const navigate = useNavigate();
    const { rows, cols, gridData, setGridData, initializeGrid } = usePuzzleStore();

    const [symmetryEnabled, setSymmetryEnabled] = useState(false);
    const [blockMode, setBlockMode] = useState(false);

    // Initialize grid on first render if needed
    useEffect(() => {
        if (!gridData || gridData.length === 0 || rows === 0 || cols === 0) {
            initializeGrid(rows, cols);
        }
    }, [rows, cols, gridData, initializeGrid]);

    // Generate blocks set for CrosswordGrid
    const blocks = new Set();
    gridData.forEach((row, rIdx) =>
        row.forEach((cell, cIdx) => {
            if (cell.isBlock) blocks.add(`${rIdx}-${cIdx}`);
        })
    );

    // Generate letter grid for CrosswordGrid
    const grid = gridData.map(row => row.map(cell => cell.value || ''));

    const handleCellClick = (row, col) => {
        const cell = gridData[row][col];
        const updatedGrid = [...gridData.map(r => [...r])];

        if (blockMode) {
            // Apply symmetry when toggling blocks
            const applySymmetry = (r, c, updateFn) => {
                updateFn(r, c);
                if (symmetryEnabled) {
                    const symR = rows - 1 - r;
                    const symC = cols - 1 - c;
                    if (symR !== r || symC !== c) {
                        updateFn(symR, symC);
                    }
                }
            };
            applySymmetry(row, col, (r, c) => {
                updatedGrid[r][c] = { ...updatedGrid[r][c], isBlock: !updatedGrid[r][c].isBlock, value: '' };
            });
            setGridData(updatedGrid);
        } else {
            // Only allow entering a value if the cell is not a block
            if (cell.isBlock) return;
            const letter = window.prompt('Enter a letter:', cell.value || '');
            if (letter && /^[A-Za-z]$/.test(letter)) {
                updatedGrid[row][col] = { ...updatedGrid[row][col], value: letter.toUpperCase(), isBlock: false };
                setGridData(updatedGrid);
            }
        }
    };

    const handleClearGrid = () => {
        const cleared = gridData.map(row =>
            row.map(() => ({ isBlock: false, value: '' }))
        );
        setGridData(cleared);
    };

    const handleToggleSymmetry = () => setSymmetryEnabled(prev => !prev);
    const handleToggleBlockMode = () => setBlockMode(prev => !prev);

    // TODO: Implement undo/redo
    const handleUndo = () => {
        console.log('Undo not implemented yet');
    };

    const handleRedo = () => {
        console.log('Redo not implemented yet');
    };

    const isGridReady = gridData && gridData.length === rows && rows > 0 && cols > 0;

    const allCellsFilledOrBlocked = gridData.every(row =>
        row.every(cell => cell.isBlock || cell.value)
    );

    return (
        <div className="min-h-screen bg-white px-4 py-8 flex flex-col items-center">
            <h2 className="text-3xl font-semibold mb-6">Fill in Your Answers</h2>

            <GridToolbar
                symmetryEnabled={symmetryEnabled}
                onToggleSymmetry={handleToggleSymmetry}
                blockModeEnabled={blockMode}
                onToggleBlockMode={handleToggleBlockMode}
                onClearGrid={handleClearGrid}
                onUndo={handleUndo}
                onRedo={handleRedo}
            />

            <div className="mb-6 w-full max-w-4xl flex justify-center">
                {isGridReady ? (
                    <CrosswordGrid
                        grid={grid}
                        blocks={blocks}
                        onCellClick={handleCellClick}
                        variant="editor" // Add this line
                    />
                ) : (
                    <p>Loading grid...</p>
                )}
            </div>

            <button
                onClick={() => navigate('/clues')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg text-lg shadow-md disabled:opacity-50"
                aria-label="Proceed to Clue Entry"
                disabled={!isGridReady || !allCellsFilledOrBlocked}
            >
                Proceed to Clue Entry
            </button>
        </div>
    );
}
