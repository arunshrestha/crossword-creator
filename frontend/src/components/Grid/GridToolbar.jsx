import React from 'react';

const GridToolbar = ({
    onToggleSymmetry,
    symmetryEnabled,
    onToggleBlockMode,
    blockModeEnabled,
    onClearGrid,
    onUndo,
    onRedo,
    wordCount,
    errorCount,
}) => {
    return (
        <div className="flex flex-wrap gap-4 p-3 bg-gray-100 border-b items-center justify-between mb-6">
            {/* Toggle Symmetry */}
            <button
                type="button"
                onClick={onToggleSymmetry}
                className={`px-4 py-2 rounded ${symmetryEnabled ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                data-testid="symmetry-toggle-button"
            >
                {symmetryEnabled ? 'Symmetry On' : 'Symmetry Off'}
            </button>

            {/* Toggle Block Mode */}
            <button
                type="button"
                onClick={onToggleBlockMode}
                className={`px-4 py-2 rounded ${blockModeEnabled ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                data-testid="block-mode-toggle-button"
            >
                {blockModeEnabled ? 'Block Mode On' : 'Block Mode Off'}
            </button>

            {/* Clear Grid */}
            <button
                type="button"
                onClick={onClearGrid}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                data-testid="clear-grid-button"
            >
                Clear Grid
            </button>

            {/* Undo / Redo – skeleton only */}
            {false && (
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={onUndo}
                        className="px-3 py-2 bg-gray-200 rounded"
                        disabled
                    >
                        Undo (coming soon)
                    </button>
                    <button
                        type="button"
                        onClick={onRedo}
                        className="px-3 py-2 bg-gray-200 rounded"
                        disabled
                    >
                        Redo (coming soon)
                    </button>
                </div>
            )}


            {/* Word Count / Error Display – skeleton only */}
            {false && (
                <div className="text-sm text-gray-700">
                    Words: {wordCount ?? '--'} | Errors: {errorCount ?? '--'}
                </div>
            )}
        </div>
    );
};

export default GridToolbar;
