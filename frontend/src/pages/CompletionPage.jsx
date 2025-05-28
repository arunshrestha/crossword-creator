import { useLocation, useNavigate } from 'react-router-dom';

export default function CompletionPage() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { title = 'Crossword Puzzle', timeTaken = null, score = null } = state || {};

    return (
        <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-6">
            <div className="bg-white shadow-lg rounded-xl p-8 max-w-md text-center">
                <h1 className="text-3xl font-bold text-green-700 mb-4">🎉 Puzzle Completed!</h1>
                <h2 className="text-xl font-semibold mb-2">{title}</h2>

                {timeTaken && (
                    <p className="text-gray-700 mb-1">⏱ Time Taken: {timeTaken} seconds</p>
                )}
                {score !== null && (
                    <p className="text-gray-700 mb-4">✅ Score: {score}%</p>
                )}

                <div className="mt-6 flex flex-col gap-3">
                    <button
                        onClick={() => navigate('/')}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Back to Home
                    </button>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        View Puzzle
                    </button>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                    >
                        Retry Puzzle
                    </button>
                </div>
            </div>
        </div>
    );
}
