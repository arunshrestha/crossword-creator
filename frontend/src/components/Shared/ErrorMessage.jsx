import React, { useState, useEffect } from 'react';

const ErrorMessage = ({ message, duration = null }) => {
    const [visible, setVisible] = useState(!!message);

    useEffect(() => {
        setVisible(!!message);
        if (message && duration) {
            const timer = setTimeout(() => setVisible(false), duration);
            return () => clearTimeout(timer);
        }
    }, [message, duration]);

    if (!visible) return null;

    return (
        <div className="bg-red-100 text-red-700 border border-red-300 rounded p-3 my-2 relative">
            ⚠️ {message}
            <button
                onClick={() => setVisible(false)}
                className="absolute top-1 right-2 text-red-500 hover:text-red-700 font-bold"
                aria-label="Dismiss error message"
            >
                ✕
            </button>
        </div>
    );
};

export default ErrorMessage;
