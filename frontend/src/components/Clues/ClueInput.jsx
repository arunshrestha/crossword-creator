import React from 'react';

const ClueInput = ({ number, direction, clue, onChange }) => {
    return (
        <div className="mb-2">
            <label className="block text-sm font-semibold mb-1">
                {number}. {direction}
            </label>
            <input
                type="text"
                className="w-full border border-gray-300 rounded px-2 py-1"
                value={clue}
                onChange={(e) => onChange(e.target.value)}
                placeholder={`Enter ${direction} clue`}
                data-testid={`clue-input-${number}-${direction}`}
            />
        </div>
    );
};

export default ClueInput;
