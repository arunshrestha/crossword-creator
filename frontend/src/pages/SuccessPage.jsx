import { useNavigate } from 'react-router-dom';
import usePuzzleStore from '../store/puzzleStore';

export default function SuccessPage() {
    const navigate = useNavigate();
    const { title, resetPuzzle } = usePuzzleStore();

    const handleCreateNew = () => {
        resetPuzzle(); // Clear current puzzle data
        navigate('/setup');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-6 text-center">
            <div className="max-w-lg w-full bg-white shadow-lg rounded-xl p-8">
                <h1 className="text-3xl font-bold text-green-700 mb-4">🎉 Puzzle Saved Successfully!</h1>
                <p className="text-gray-700 text-lg mb-6">
                    Your puzzle <strong>{title || 'Untitled Puzzle'}</strong> has been saved.
                </p>

                <div className="space-y-4">
                    <button
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        onClick={() => navigate('/preview')}
                    >
                        View Puzzle Again
                    </button>
                    <button
                        className="w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                        onClick={handleCreateNew}
                    >
                        Create Another Puzzle
                    </button>
                    <button
                        className="w-full px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                        onClick={() => navigate('/')}
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}
