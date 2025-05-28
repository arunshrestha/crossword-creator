import React from 'react';

const ClueInput = ({ number, direction, clue, answer, onChange }) => {
    return (
        <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">
                {number} {direction}
            </label>
            <input
                type="text"
                placeholder="Enter clue"
                value={clue}
                onChange={(e) => onChange('clue', e.target.value)}
                className="w-full border px-3 py-2 rounded mb-1"
            />
            <input
                type="text"
                placeholder="Enter answer"
                value={answer}
                onChange={(e) => onChange('answer', e.target.value)}
                className="w-full border px-3 py-2 rounded"
            />
        </div>
    );
};

export default ClueInput;
