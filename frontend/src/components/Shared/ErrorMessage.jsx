import React from 'react';

const ErrorMessage = ({ message }) => {
    if (!message) return null;

    return (
        <div className="bg-red-100 text-red-700 border border-red-300 rounded p-3 my-2">
            ⚠️ {message}
        </div>
    );
};

export default ErrorMessage;
