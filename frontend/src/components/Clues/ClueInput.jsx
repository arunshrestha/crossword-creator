import React from 'react';

const ClueInput = ({ number, direction, clue, onChange }) => {
    const inputId = `clue-input-${number}-${direction}`;
    return (
        <div className="mb-2">
            <label
                className="block text-sm font-semibold mb-1"
                htmlFor={inputId}
            >
                {number}. {direction}
            </label>
            <input
                id={inputId}
                type="text"
                className="w-full border border-gray-300 rounded px-2 py-1"
                value={clue}
                onChange={(e) => onChange(e.target.value)}
                placeholder={`Enter ${direction} clue`}
                data-testid={inputId}
            />
        </div>
    );
};

export default ClueInput;