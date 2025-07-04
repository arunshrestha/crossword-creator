import { useNavigate } from 'react-router-dom';
import usePuzzleStore from '../store/puzzleStore';
import { autoNumberGrid } from '../utils/autoNumberGrid';
import { useState } from 'react';

const API_BASE = process.env.REACT_APP_API_URL;

export default function PreviewPage() {
    const navigate = useNavigate();
    const { title, rows, cols, gridData, acrossClues, downClues } = usePuzzleStore();
    const [saving, setSaving] = useState(false);

    if (!gridData || !acrossClues || !downClues) {
        return <p className="p-6 text-center">No puzzle data found.</p>;
    }

    // Generate cell numbers for the preview grid
    const { cellHasNumber } = autoNumberGrid(gridData);

    const renderCell = (r, c) => {
        const cell = gridData[r][c];
        const isBlock = cell?.isBlock;
        const number = cellHasNumber[r][c];
        const value = cell?.value || '';

        return (
            <div
                key={`${r}-${c}`}
                className={`w-10 h-10 border border-gray-400 relative text-lg font-mono flex items-center justify-center ${isBlock ? 'bg-black' : 'bg-white'}`}
            >
                {!isBlock && number && (
                    <div className="absolute top-0 left-0 text-[10px] text-gray-600 z-10 leading-none p-0.5">
                        {number}
                    </div>
                )}
                {!isBlock && value}
            </div>
        );
    };

    const renderClueList = (label, list) => (
        <div>
            <h3 className="text-xl font-semibold mb-2">{label}</h3>
            <ul className="space-y-1 max-h-[300px] overflow-auto pr-2">
                {list.map((clue) => (
                    <li key={`${label}-${clue.number}`}>
                        <strong>{clue.number}.</strong> {clue.text || <em>[No clue]</em>}
                    </li>
                ))}
            </ul>
        </div>
    );

    // Example: Fetch all puzzles (for testing)
    // fetch(`${API_BASE}/api/puzzles`)
    //   .then(res => res.json())
    //   .then(data => console.log(data));

    const handleSave = async () => {
        setSaving(true);
        try {
            const response = await fetch(`${API_BASE}/api/puzzles`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    rows,
                    cols,
                    gridData,
                    acrossClues,
                    downClues,
                }),
            });
            const data = await response.json();
            if (response.ok && data._id) {
                navigate('/success', { state: { puzzleId: data._id } });
            } else {
                alert('Failed to save puzzle.');
            }
        } catch (err) {
            alert('Error saving puzzle.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen p-6 bg-gray-50">
            <h1 className="text-3xl font-bold mb-6 text-center">{title || 'Puzzle Preview'}</h1>

            <div className="flex flex-col md:flex-row gap-8 mb-10 justify-center">
                {/* Puzzle Grid */}
                <div className="grid shadow-md rounded" style={{ gridTemplateColumns: `repeat(${cols}, 2.5rem)` }}>
                    {Array.from({ length: rows }).map((_, r) =>
                        Array.from({ length: cols }).map((_, c) => renderCell(r, c))
                    )}
                </div>

                {/* Clues */}
                <div className="flex-1 max-w-md">
                    {renderClueList('Across', acrossClues)}
                    <div className="mt-6" />
                    {renderClueList('Down', downClues)}
                </div>
            </div>

            <div className="text-center mt-8 space-x-4">
                <button
                    className="px-5 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
                    onClick={() => navigate('/clues')}
                >
                    Edit Clues
                </button>
                <button
                    className="px-5 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
                    onClick={handleSave}
                    disabled={saving}
                >
                    {saving ? 'Saving...' : 'Save Puzzle'}
                </button>
            </div>
        </div>
    );
}