import React from 'react';

const GridCell = ({ row, col, value, onClick }) => {
    return (
        <div
            className="w-10 h-10 flex items-center justify-center border text-lg font-mono cursor-pointer bg-white hover:bg-blue-100"
            onClick={() => onClick(row, col)}
        >
            {value}
        </div>
    );
};

export default GridCell;
