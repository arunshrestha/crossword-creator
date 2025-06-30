import { useNavigate } from 'react-router-dom';
import usePuzzleStore from '../store/puzzleStore';

export default function PreviewPage() {
    const navigate = useNavigate();
    const { title, rows, cols, gridData, clues } = usePuzzleStore();

    if (!gridData || !clues) return <p className="p-6 text-center">No puzzle data found.</p>;

    const renderCell = (r, c) => {
        const cell = gridData[r][c];
        const isBlock = cell?.isBlock;

        return (
            <div
                key={`${r}-${c}`}
                className={`w-10 h-10 border border-gray-400 relative text-xs flex items-center justify-center ${isBlock ? 'bg-black' : 'bg-white'
                    }`}
            >
                {!isBlock && cell?.number && (
                    <div className="absolute top-0 left-0 text-[0.5rem] m-1 text-gray-700">
                        {cell.number}
                    </div>
                )}
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
                    {renderClueList('Across', clues.across)}
                    <div className="mt-6" />
                    {renderClueList('Down', clues.down)}
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
                    onClick={() => alert('Saving logic goes here')}
                >
                    Save Puzzle
                </button>
            </div>
        </div>
    );
}
