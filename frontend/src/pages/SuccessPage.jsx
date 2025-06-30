import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import usePuzzleStore from '../store/puzzleStore';

export default function SuccessPage() {
    const navigate = useNavigate();
    const { title, resetPuzzle } = usePuzzleStore();

    // Optional: auto-redirect to home after 15 seconds
    useEffect(() => {
        const timer = setTimeout(() => navigate('/'), 15000);
        return () => clearTimeout(timer);
    }, [navigate]);

    const handleCreateNew = () => {
        resetPuzzle(); // Clear current puzzle data
        navigate('/setup');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-6 text-center">
            <div className="max-w-lg w-full bg-white shadow-lg rounded-xl p-8">
                <h1
                    className="text-3xl font-bold text-green-700 mb-4 flex items-center justify-center gap-3"
                    role="alert"
                    aria-live="assertive"
                >
                    <span aria-hidden="true" className="text-5xl animate-bounce">🎉</span>
                    Puzzle Saved Successfully!
                </h1>
                <p className="text-gray-700 text-lg mb-6">
                    Your puzzle <strong>{title || 'Untitled Puzzle'}</strong> has been saved.
                </p>

                <div className="space-y-4">
                    <button
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        onClick={() => navigate('/preview')}
                        aria-label="View saved puzzle again"
                    >
                        View Puzzle Again
                    </button>
                    <button
                        className="w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                        onClick={handleCreateNew}
                        aria-label="Create a new puzzle"
                    >
                        Create Another Puzzle
                    </button>
                    <button
                        className="w-full px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                        onClick={() => navigate('/')}
                        aria-label="Back to home"
                    >
                        Back to Home
                    </button>
                </div>

                <p className="mt-6 text-sm text-gray-500">
                    You will be redirected to the home page automatically in 15 seconds.
                </p>
            </div>
        </div>
    );
}
