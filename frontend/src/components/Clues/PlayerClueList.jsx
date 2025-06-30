import React from 'react';

const PlayerClueList = ({ clues, direction }) => {
    return (
        <div>
            <h3 className="font-bold mb-2 capitalize">{direction} clues</h3>
            <ul className="list-disc pl-5 text-sm">
                {Object.entries(clues).map(([number, clue]) => (
                    <li key={number} data-testid={`player-clue-${direction}-${number}`}>
                        <strong>{number}.</strong> {clue}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlayerClueList;
