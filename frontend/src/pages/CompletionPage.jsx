import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export default function CompletionPage() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { id } = useParams();
    const {
        title = 'Crossword Puzzle',
        userGrid = [],
        solutionGrid = [],
        score = null,
        totalCells = null,
        correctCells = null,
    } = state || {};

    const headingRef = useRef(null);

    useEffect(() => {
        headingRef.current?.focus();
    }, []);

    const getFeedback = () => {
        if (score === null) return null;
        if (score >= 90) return 'Excellent work! 🎉';
        if (score >= 70) return 'Good job! Keep practicing!';
        if (score >= 50) return 'Nice effort! You can improve.';
        return 'Keep trying! Practice makes perfect.';
    };

    // Render the grid with feedback
    const renderGrid = () => {
        if (!userGrid.length || !solutionGrid.length) return null;
        return (
            <div
                className="grid mx-auto my-6"
                style={{
                    gridTemplateColumns: `repeat(${solutionGrid[0].length}, 2.5rem)`,
                    width: 'fit-content',
                }}
            >
                {userGrid.map((row, r) =>
                    row.map((cell, c) => {
                        if (cell.isBlock) {
                            return (
                                <div
                                    key={`${r}-${c}`}
                                    className="w-10 h-10 bg-black border border-gray-400"
                                />
                            );
                        }
                        const isCorrect =
                            cell.input &&
                            solutionGrid[r][c].value &&
                            cell.input.toUpperCase() === solutionGrid[r][c].value.toUpperCase();
                        return (
                            <div
                                key={`${r}-${c}`}
                                className={`w-10 h-10 border border-gray-400 flex items-center justify-center text-lg font-mono relative
                                    ${isCorrect ? 'bg-green-100' : 'bg-red-100'}
                                `}
                                title={
                                    isCorrect
                                        ? 'Correct'
                                        : `Incorrect, correct answer: ${solutionGrid[r][c].value || ''}`
                                }
                            >
                                <span className="font-bold">{cell.input || ''}</span>
                                {!isCorrect && solutionGrid[r][c].value && (
                                    <span className="absolute bottom-0 right-0 text-xs text-gray-500 px-1">
                                        {solutionGrid[r][c].value}
                                    </span>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        );
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

                {/* Show the filled grid with feedback */}
                {renderGrid()}

                <div className="mt-6 flex flex-col gap-3">
                    <button
                        onClick={() => navigate('/')}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Back to Home
                    </button>
                    <button
                        onClick={() => navigate(`/play/${id}`)}
                        className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                    >
                        Retry Puzzle
                    </button>
                    <button
                        onClick={() => navigate('/setup')}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Create Puzzle
                    </button>
                </div>
            </div>
        </div>
    );
}