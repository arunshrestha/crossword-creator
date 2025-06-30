import React from 'react';

const LoadingSpinner = ({
    size = 6,
    color = 'blue-500',
    className = '',
}) => {
    const spinnerSize = `w-${size} h-${size}`;
    const borderColor = `border-${color}`;

    return (
        <div className={`flex justify-center items-center py-4 ${className}`}>
            <div
                className={`border-4 ${borderColor} border-t-transparent rounded-full animate-spin ${spinnerSize}`}
                role="status"
                aria-label="Loading"
            />
        </div>
    );
};

export default LoadingSpinner;
