import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PuzzleSetupPage() {
    const navigate = useNavigate();

    const [rows, setRows] = useState(15);
    const [cols, setCols] = useState(15);
    const [symmetry, setSymmetry] = useState(true);
    const [minLength, setMinLength] = useState(3);
    const [title, setTitle] = useState('');

    const handleSubmit = () => {
        const config = {
            rows,
            cols,
            symmetry,
            minLength,
            title: title.trim(),
        };
        navigate('/editor', { state: config });
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="w-full max-w-xl space-y-6">
                <h2 className="text-3xl font-bold text-gray-800 text-center">Puzzle Setup</h2>

                <div className="space-y-4">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label htmlFor="rows" className="block text-sm font-medium text-gray-600">Rows</label>
                            <input
                                id="rows"
                                type="number"
                                min={5}
                                max={25}
                                value={rows}
                                onChange={(e) => setRows(Number(e.target.value))}
                                className="w-full px-4 py-2 border rounded-xl"
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="cols" className="block text-sm font-medium text-gray-600">Columns</label>
                            <input
                                id="cols"
                                type="number"
                                min={5}
                                max={25}
                                value={cols}
                                onChange={(e) => setCols(Number(e.target.value))}
                                className="w-full px-4 py-2 border rounded-xl"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="minLength" className="block text-sm font-medium text-gray-600">Minimum Word Length</label>
                        <input
                            id="minLength"
                            type="number"
                            min={2}
                            max={10}
                            value={minLength}
                            onChange={(e) => setMinLength(Number(e.target.value))}
                            className="w-full px-4 py-2 border rounded-xl"
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            id="symmetry"
                            type="checkbox"
                            checked={symmetry}
                            onChange={() => setSymmetry(!symmetry)}
                            className="h-5 w-5"
                        />
                        <label htmlFor="symmetry" className="text-gray-700">Enable symmetry</label>
                    </div>

                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-600">Puzzle Title (optional)</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="E.g. Weekend Challenge"
                            className="w-full px-4 py-2 border rounded-xl"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
                        aria-label="Continue to Editor"
                    >
                        Continue to Editor
                    </button>
                </div>
            </div>
        </div>
    );
}
