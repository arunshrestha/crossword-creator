import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import usePuzzleStore from '../store/puzzleStore';

export default function SuccessPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { title, resetPuzzle } = usePuzzleStore();
    const puzzleId = location.state?.puzzleId;

    useEffect(() => {
        const timer = setTimeout(() => navigate('/'), 15000);
        return () => clearTimeout(timer);
    }, [navigate]);

    const handleCreateNew = () => {
        resetPuzzle();
        navigate('/setup');
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
                        <p className="text-xs text-gray-500">Share this ID to let others access your puzzle.</p>
                    </div>
                )}
                {/* ...rest of your buttons and text... */}
            </div>
        </div>
    );
}