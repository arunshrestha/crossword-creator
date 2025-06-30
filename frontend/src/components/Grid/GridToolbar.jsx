import React from 'react';

const GridToolbar = ({ onToggleSymmetry, symmetryEnabled }) => {
    return (
        <div className="flex space-x-4 p-2 bg-gray-100 border-b">
            <button
                type="button"
                onClick={onToggleSymmetry}
                className={`px-3 py-1 rounded ${symmetryEnabled ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                data-testid="symmetry-toggle-button"
            >
                {symmetryEnabled ? 'Symmetry On' : 'Symmetry Off'}
            </button>

            {/* Add more toolbar buttons here if needed */}
        </div>
    );
};

export default GridToolbar;
