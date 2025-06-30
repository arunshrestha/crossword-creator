import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export default function CompletionPage() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { title = 'Crossword Puzzle', timeTaken = null, score = null, totalCells = null, correctCells = null } = state || {};

    const headingRef = useRef(null);

    useEffect(() => {
        // Set focus to heading for accessibility when page loads
        headingRef.current?.focus();
    }, []);

    // Generate feedback based on score
    const getFeedback = () => {
        if (score === null) return null;
        if (score >= 90) return 'Excellent work! 🎉';
        if (score >= 70) return 'Good job! Keep practicing!';
        if (score >= 50) return 'Nice effort! You can improve.';
        return 'Keep trying! Practice makes perfect.';
    };

    // Share results text for clipboard or social
    const shareText = () => {
        let text = `I completed "${title}"`;
        if (score !== null) text += ` with a score of ${score}%`;
        if (timeTaken !== null) text += ` in ${timeTaken} seconds`;
        text += '!';
        return text;
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareText());
        alert('Results copied to clipboard!');
    };

    return (
        <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-6">
            <div
                className="bg-white shadow-lg rounded-xl p-8 max-w-md text-center"
                role="region"
                aria-labelledby="completion-heading"
            >
                <h1
                    id="completion-heading"
                    className="text-3xl font-bold text-green-700 mb-4"
                    tabIndex={-1}
                    ref={headingRef}
                >
                    🎉 Puzzle Completed!
                </h1>

                <h2 className="text-xl font-semibold mb-2">{title}</h2>

                {timeTaken !== null && (
                    <p className="text-gray-700 mb-1">⏱ Time Taken: {timeTaken} seconds</p>
                )}

                {score !== null && (
                    <>
                        <p className="text-gray-700 mb-1">✅ Score: {score}%</p>
                        {totalCells !== null && correctCells !== null && (
                            <p className="text-gray-700 mb-2">
                                Correct Cells: {correctCells} / {totalCells}
                            </p>
                        )}
                        <p className="text-green-800 font-semibold mb-4">{getFeedback()}</p>
                    </>
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
                    <button
                        onClick={copyToClipboard}
                        className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500"
                    >
                        Copy Results
                    </button>
                </div>
            </div>
        </div>
    );
}
