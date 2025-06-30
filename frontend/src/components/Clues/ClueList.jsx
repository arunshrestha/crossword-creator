import React from 'react';
import ClueInput from './ClueInput';

const ClueList = ({ clues, direction, onClueChange }) => {
    // clues is an object { number: clueText, ... }
    return (
        <div>
            <h3 className="font-bold mb-2 capitalize">{direction} clues</h3>
            {Object.entries(clues).map(([number, clue]) => (
                <ClueInput
                    key={number}
                    number={number}
                    direction={direction}
                    clue={clue}
                    onChange={(newClue) => onClueChange(number, newClue)}
                />
            ))}
        </div>
    );
};

export default ClueList;
