import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LandingPage() {
    const navigate = useNavigate();
    const [playId, setPlayId] = useState("");

    const handlePlay = () => {
        if (playId.trim()) {
            navigate(`/play/${encodeURIComponent(playId.trim())}`);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
            <h1 className="text-4xl font-bold mb-4 text-center">Crossword Creator</h1>
            <p className="text-lg text-gray-700 mb-8 text-center max-w-xl">
                Design your own custom crosswords or challenge yourself with puzzles made by others.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
                <button
                    onClick={() => navigate("/setup")}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-lg shadow-md transition duration-200 ease-in-out"
                    aria-label="Create a Crossword"
                >
                    Create a Crossword
                </button>

                <div className="flex gap-2 items-center">
                    <input
                        type="text"
                        aria-label="Enter crossword ID to play"
                        placeholder="Enter crossword ID"
                        value={playId}
                        onChange={(e) => setPlayId(e.target.value)}
                        className="border border-indigo-500 rounded-lg px-4 py-2 text-indigo-700 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    <button
                        onClick={handlePlay}
                        disabled={!playId.trim()}
                        className={`bg-white hover:bg-gray-100 text-indigo-700 border border-indigo-500 px-6 py-3 rounded-lg text-lg shadow-md transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed`}
                        aria-label="Play a Crossword"
                    >
                        Play
                    </button>
                </div>
            </div>
        </div>
    );
}
