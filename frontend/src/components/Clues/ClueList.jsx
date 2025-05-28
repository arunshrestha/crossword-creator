import React from 'react';

const ClueList = ({ clues }) => {
    const across = clues.filter(clue => clue.direction === 'Across');
    const down = clues.filter(clue => clue.direction === 'Down');

    return (
        <div className="grid grid-cols-2 gap-4">
            <div>
                <h3 className="text-lg font-semibold mb-2">Across</h3>
                <ul className="space-y-1">
                    {across.map((clue, idx) => (
                        <li key={idx}>
                            <span className="font-bold">{clue.number}. </span>{clue.clue}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-2">Down</h3>
                <ul className="space-y-1">
                    {down.map((clue, idx) => (
                        <li key={idx}>
                            <span className="font-bold">{clue.number}. </span>{clue.clue}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ClueList;
