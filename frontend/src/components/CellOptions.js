import React from 'react';

const CellOptions = ({ selectedCell, onOptionSelect }) => {
    if (!selectedCell) {
        return <div className="cell-options">Select a cell to see options</div>;
    }

    const handleDarken = () => {
        onOptionSelect('darken');
    };

    const handleInput = () => {
        const value = prompt('Enter a letter:', selectedCell.value || '');
        onOptionSelect('input', value);
    };

    return (
        <div className="cell-options">
            <button onClick={handleDarken}>Darken Cell</button>
            <button onClick={handleInput}>Enter Input</button>
        </div>
    );
};

export default CellOptions;