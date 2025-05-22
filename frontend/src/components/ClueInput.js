import React, { useState } from 'react';

const ClueInput = ({ grid, clues, setClues }) => {
    const [currentClue, setCurrentClue] = useState('');
    const [cell, setCell] = useState({ row: 0, col: 0 });

    const handleAddClue = () => {
        const newClues = [...clues, { cell, clue: currentClue }];
        setClues(newClues);
        setCurrentClue('');
    };

    return (
        <div>
            <h2>Add Clues</h2>
            <label>
                Row:
                <input
                    type="number"
                    min="0"
                    max={grid.length - 1}
                    value={cell.row}
                    onChange={(e) => setCell({ ...cell, row: parseInt(e.target.value, 10) })}
                />
            </label>
            <label>
                Column:
                <input
                    type="number"
                    min="0"
                    max={grid[0].length - 1}
                    value={cell.col}
                    onChange={(e) => setCell({ ...cell, col: parseInt(e.target.value, 10) })}
                />
            </label>
            <label>
                Clue:
                <input
                    type="text"
                    value={currentClue}
                    onChange={(e) => setCurrentClue(e.target.value)}
                />
            </label>
            <button onClick={handleAddClue}>Add Clue</button>
            <ul>
                {clues.map((clue, index) => (
                    <li key={index}>
                        Row {clue.cell.row}, Col {clue.cell.col}: {clue.clue}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClueInput;
