import React from 'react';

const GridCell = ({
    row,
    col,
    value,
    number,
    isBlock = false,
    onClick,
    onMouseEnter,
    onMouseLeave,
    isActive,
}) => {
    const baseClasses = isBlock
        ? 'bg-black'
        : 'bg-white hover:bg-blue-100 cursor-pointer';

    return (
        <div
            data-testid={`cell-${row}-${col}`}
            className={`w-10 h-10 flex items-center justify-center border border-gray-400 text-lg font-mono select-none relative ${baseClasses}`}
            onClick={() => onClick && onClick(row, col)}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            role="button"
            tabIndex={isBlock ? -1 : 0}
            aria-label={`Cell ${row + 1}, ${col + 1}`}
        >
            {!isBlock && number && (
                <div className="absolute top-0 left-0 text-[10px] text-gray-600 z-10 leading-none p-0.5">
                    {number}
                </div>
            )}
            {!isBlock && value}
            {!isBlock && (
                <div
                    className={`absolute inset-0 transition-colors ${isActive ? 'bg-yellow-200' : ''} z-0`}
                    data-testid="grid-cell-highlight"
                />
            )}
        </div>
    );
};

export default GridCell;