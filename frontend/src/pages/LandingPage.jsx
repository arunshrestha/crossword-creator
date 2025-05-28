import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
            <h1 className="text-4xl font-bold mb-4 text-center">Crossword Creator</h1>
            <p className="text-lg text-gray-700 mb-8 text-center max-w-xl">
                Design your own custom crosswords or challenge yourself with puzzles made by others.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={() => navigate("/setup")}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-lg shadow-md"
                >
                    Create a Crossword
                </button>
                <button
                    onClick={() => navigate("/view/sample-id")} // update this to a proper search/input route later
                    className="bg-white hover:bg-gray-100 text-indigo-700 border border-indigo-500 px-6 py-3 rounded-lg text-lg shadow-md"
                >
                    Play a Crossword
                </button>
            </div>
        </div>
    );
}
