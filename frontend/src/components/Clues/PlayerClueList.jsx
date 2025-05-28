import React from 'react';

const PlayerClueList = ({ clues, selected, onSelect }) => {
    return (
        <div className="space-y-1">
            {clues.map((clue, idx) => (
                <div
                    key={idx}
                    className={`p-2 border rounded cursor-pointer hover:bg-gray-100 ${selected?.number === clue.number && selected?.direction === clue.direction
                            ? 'bg-blue-100 border-blue-400'
                            : ''
                        }`}
                    onClick={() => onSelect(clue)}
                >
                    <span className="font-semibold">{clue.number}. </span>{clue.clue}
                </div>
            ))}
        </div>
    );
};

export default PlayerClueList;
