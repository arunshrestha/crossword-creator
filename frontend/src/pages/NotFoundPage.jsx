import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-6">
            <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
            <p className="text-gray-600 mb-6">
                Sorry, the page you're looking for doesn't exist.
            </p>
            <button
                onClick={() => navigate('/')}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Go to Home
            </button>
        </div>
    );
}
