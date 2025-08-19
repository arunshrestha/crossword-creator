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
    variant = "default"
}) => {
    // Editor variant styling (original)
    if (variant === "editor") {
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
    }

    // Player variant styling (for all other pages)
    return (
        <div
            data-testid={`cell-${row}-${col}`}
            className={`w-10 h-10 border border-gray-400 text-center flex items-center justify-center relative
                ${isBlock ? 'bg-black' : 'bg-white'}
                ${!isBlock ? 'cursor-pointer' : ''}
            `}
            onClick={() => onClick && onClick(row, col)}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            role="button"
            tabIndex={isBlock ? -1 : 0}
            aria-label={`Cell ${row + 1}, ${col + 1}`}
        >
            {/* Cell number - player style */}
            {!isBlock && number && (
                <div className="absolute top-0 left-0 text-[0.6rem] m-0.5 text-gray-600">
                    {number}
                </div>
            )}

            {/* Cell value - player style */}
            {!isBlock && value && (
                <span className="text-lg font-semibold uppercase">
                    {value}
                </span>
            )}
        </div>
    );
};

export default GridCell;