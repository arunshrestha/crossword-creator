import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePuzzleStore from '../store/puzzleStore';

export default function PuzzleSetupPage() {
    const navigate = useNavigate();
    const initializePuzzle = usePuzzleStore((state) => state.initializePuzzle);

    const [rows, setRows] = useState(15);
    const [cols, setCols] = useState(15);
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');

    // Validation: all fields required, min/max for rows/cols
    const isInvalid =
        !rows ||
        !cols ||
        !title.trim() ||
        rows < 5 ||
        cols < 5 ||
        rows > 25 ||
        cols > 25;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isInvalid) {
            setError('Please fill out all fields with valid values.');
            return;
        }
        setError('');
        // Save to store for use in the editor page
        initializePuzzle({ title: title.trim(), rows, cols });
        navigate('/editor');
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <form
                className="w-full max-w-md space-y-6"
                onSubmit={handleSubmit}
                autoComplete="off"
            >
                <h2 className="text-3xl font-bold text-gray-800 text-center">Puzzle Setup</h2>

                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-600">
                        Puzzle Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="E.g. Weekend Challenge"
                        className="w-full px-4 py-2 border rounded-xl"
                        required
                    />
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <label htmlFor="rows" className="block text-sm font-medium text-gray-600">
                            Rows <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="rows"
                            type="number"
                            min={5}
                            max={25}
                            value={rows}
                            onChange={(e) => setRows(Number(e.target.value))}
                            className="w-full px-4 py-2 border rounded-xl"
                            required
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="cols" className="block text-sm font-medium text-gray-600">
                            Columns <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="cols"
                            type="number"
                            min={5}
                            max={25}
                            value={cols}
                            onChange={(e) => setCols(Number(e.target.value))}
                            className="w-full px-4 py-2 border rounded-xl"
                            required
                        />
                    </div>
                </div>

                {error && (
                    <div className="text-red-600 text-center font-medium">{error}</div>
                )}

                <button
                    type="submit"
                    className={`w-full py-3 rounded-xl transition ${isInvalid
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                    aria-label="Continue to Editor"
                    disabled={isInvalid}
                >
                    Continue to Editor
                </button>
            </form>
        </div>
    );
}