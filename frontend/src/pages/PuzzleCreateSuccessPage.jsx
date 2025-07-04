import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import usePuzzleStore from '../store/puzzleStore';

export default function SuccessPage() {
    const navigate = useNavigate();
    const { id: puzzleId } = useParams();
    const { title, resetPuzzle } = usePuzzleStore();
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => navigate('/'), 15000);
        return () => clearTimeout(timer);
    }, [navigate]);

    const handleCreateNew = () => {
        resetPuzzle();
        navigate('/setup');
    };

    const shareUrl = `${window.location.origin}/play/${puzzleId}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-6 text-center">
            <div className="max-w-lg w-full bg-white shadow-lg rounded-xl p-8">
                <h1 className="text-3xl font-bold text-green-700 mb-4 flex items-center justify-center gap-3" role="alert" aria-live="assertive">
                    <span aria-hidden="true" className="text-5xl animate-bounce">🎉</span>
                    Puzzle Saved Successfully!
                </h1>
                <p className="text-gray-700 text-lg mb-6">
                    Your puzzle <strong>{title || 'Untitled Puzzle'}</strong> has been saved.
                </p>
                {puzzleId && (
                    <div className="mb-6">
                        <p className="text-green-700 font-mono">
                            Puzzle ID: <span className="font-bold">{puzzleId}</span>
                        </p>
                        <div className="mt-2 flex flex-col items-center">
                            <span className="text-sm text-gray-600 mb-2">Share this link:</span>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={shareUrl}
                                    readOnly
                                    className="border px-2 py-1 rounded w-64 text-xs"
                                />
                                <button
                                    onClick={handleCopy}
                                    className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                                >
                                    {copied ? "Copied!" : "Copy"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <button
                    className="mt-4 px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                    onClick={handleCreateNew}
                >
                    Create New Puzzle
                </button>
            </div>
        </div>
    );
}