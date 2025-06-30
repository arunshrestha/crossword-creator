import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import usePuzzleStore from '../store/puzzleStore';
import CrosswordGrid from "../components/Grid/CrosswordGrid";

export default function PuzzleEditorPage() {
    const navigate = useNavigate();
    const { rows, cols, grid, initializeGrid } = usePuzzleStore();

    useEffect(() => {
        // Initialize the grid only if empty or undefined
        if (!grid || grid.length === 0) {
            initializeGrid(rows, cols);
        }
    }, [rows, cols, grid, initializeGrid]);

    const handleNext = () => {
        navigate("/clues");
    };

    return (
        <div className="min-h-screen bg-white px-4 py-8 flex flex-col items-center">
            <h2 className="text-3xl font-semibold mb-6">Fill in Your Answers</h2>

            <div className="mb-6 w-full max-w-4xl">
                <CrosswordGrid />
            </div>

            <button
                onClick={handleNext}
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg text-lg shadow-md"
                aria-label="Proceed to Clue Entry"
            >
                Proceed to Clue Entry
            </button>
        </div>
    );
}
