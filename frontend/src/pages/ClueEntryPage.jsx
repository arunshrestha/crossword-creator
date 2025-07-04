import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import usePuzzleStore from '../store/puzzleStore';
import CrosswordGrid from '../components/Grid/CrosswordGrid';
import { autoNumberGrid } from '../utils/autoNumberGrid';

export default function ClueEntryPage() {
    const navigate = useNavigate();
    const { title, rows, cols, gridData, acrossClues: storeAcross, downClues: storeDown, setClues } = usePuzzleStore();

    const [acrossClues, setAcrossClues] = useState(() =>
        storeAcross && storeAcross.length > 0 ? storeAcross : []
    );
    const [downClues, setDownClues] = useState(() =>
        storeDown && storeDown.length > 0 ? storeDown : []
    );
    const [cellNumbers, setCellNumbers] = useState([]);

    useEffect(() => {
        if (!gridData || !rows || !cols) {
            navigate('/setup');
            return;
        }

        const numbered = autoNumberGrid(gridData);
        setCellNumbers(numbered.cellHasNumber);

        // Only initialize clues if local state is empty
        if (acrossClues.length === 0 && numbered.clues.across) {
            setAcrossClues(numbered.clues.across);
        }
        if (downClues.length === 0 && numbered.clues.down) {
            setDownClues(numbered.clues.down);
        }
        // eslint-disable-next-line
    }, [gridData, rows, cols, navigate]);

    // Persist clues to store whenever they change
    useEffect(() => {
        setClues({ across: acrossClues, down: downClues });
    }, [acrossClues, downClues, setClues]);

    const handleClueChange = (setter, index, newText) => {
        setter((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], text: newText };
            return updated;
        });
    };

    const handlePreview = () => {
        navigate('/preview');
    };

    // Prepare blocks and grid for CrosswordGrid
    const blocks = new Set();
    gridData?.forEach((row, rIdx) =>
        row.forEach((cell, cIdx) => {
            if (cell.isBlock) blocks.add(`${rIdx}-${cIdx}`);
        })
    );
    const grid = gridData?.map(row => row.map(cell => cell.value || '')) || [];

    // Prepare numbers prop for CrosswordGrid
    const numbers = {};
    cellNumbers.forEach((row, rIdx) =>
        row.forEach((num, cIdx) => {
            if (num) numbers[`${rIdx}-${cIdx}`] = num;
        })
    );

    const allCluesFilled =
        acrossClues.every(clue => clue.text && clue.text.trim() !== '') &&
        downClues.every(clue => clue.text && clue.text.trim() !== '');

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-center">{title || 'Clue Entry'}</h2>

            <div className="flex justify-center mb-8">
                <CrosswordGrid grid={grid} blocks={blocks} numbers={numbers} />
            </div>

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
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
                    onClick={handlePreview}
                    disabled={!allCluesFilled}
                >
                    Preview Puzzle
                </button>
            </div>
        </div>
    );
}