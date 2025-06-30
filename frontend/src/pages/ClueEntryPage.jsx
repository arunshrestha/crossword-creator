import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import usePuzzleStore from '../store/puzzleStore';

// Move numberGrid outside the component to avoid hook dependency warnings
const numberGrid = (grid, rows, cols) => {
    const clues = { across: [], down: [] };
    let clueNumber = 1;
    const cellHasNumber = Array(rows)
        .fill(null)
        .map(() => Array(cols).fill(null));

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c]?.isBlock) continue;

            const startsAcross =
                (c === 0 || grid[r][c - 1]?.isBlock) &&
                c + 1 < cols &&
                !grid[r][c + 1]?.isBlock;

            const startsDown =
                (r === 0 || grid[r - 1][c]?.isBlock) &&
                r + 1 < rows &&
                !grid[r + 1][c]?.isBlock;

            if (startsAcross || startsDown) {
                cellHasNumber[r][c] = clueNumber;

                if (startsAcross) clues.across.push({ number: clueNumber, text: '' });
                if (startsDown) clues.down.push({ number: clueNumber, text: '' });

                clueNumber++;
            }
        }
    }

    return clues;
};

export default function ClueEntryPage() {
    const navigate = useNavigate();
    const { title, rows, cols, gridData, setClues } = usePuzzleStore();

    const [acrossClues, setAcrossClues] = useState([]);
    const [downClues, setDownClues] = useState([]);

    useEffect(() => {
        if (!gridData || !rows || !cols) {
            navigate('/setup');
            return;
        }

        const numbered = numberGrid(gridData, rows, cols);
        setAcrossClues(numbered.across);
        setDownClues(numbered.down);
    }, [gridData, rows, cols, navigate]);

    const handleClueChange = (setter, index, newText) => {
        setter((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], text: newText };
            return updated;
        });
    };

    const handlePreview = () => {
        setClues({ across: acrossClues, down: downClues });
        navigate('/preview');
    };

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-center">{title || 'Clue Entry'}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-xl font-semibold mb-2">Across</h3>
                    {acrossClues.map((clue, i) => (
                        <div key={`across-${clue.number}`} className="mb-2">
                            <label className="block font-medium">
                                {clue.number}.
                                <input
                                    type="text"
                                    value={clue.text}
                                    onChange={(e) =>
                                        handleClueChange(setAcrossClues, i, e.target.value)
                                    }
                                    className="w-full mt-1 px-2 py-1 border rounded-md"
                                    placeholder="Enter across clue"
                                />
                            </label>
                        </div>
                    ))}
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-2">Down</h3>
                    {downClues.map((clue, i) => (
                        <div key={`down-${clue.number}`} className="mb-2">
                            <label className="block font-medium">
                                {clue.number}.
                                <input
                                    type="text"
                                    value={clue.text}
                                    onChange={(e) =>
                                        handleClueChange(setDownClues, i, e.target.value)
                                    }
                                    className="w-full mt-1 px-2 py-1 border rounded-md"
                                    placeholder="Enter down clue"
                                />
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 text-center">
                <button
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    onClick={handlePreview}
                >
                    Preview Puzzle
                </button>
            </div>
        </div>
    );
}
