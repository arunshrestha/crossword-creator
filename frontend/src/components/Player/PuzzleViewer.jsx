import React from 'react';
import CrosswordSolver from './CrosswordSolver';
import ClueList from '../Clues/ClueList';
import Timer from './Timer';
import ShareLinkBox from './ShareLinkBox';

const PuzzleViewer = ({ grid, clues, onCellChange, selectedClue, setSelectedClue }) => {
    return (
        <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
                <CrosswordSolver
                    grid={grid}
                    clues={clues}
                    onCellChange={onCellChange}
                    selectedClue={selectedClue}
                    setSelectedClue={setSelectedClue}
                />
            </div>
            <div className="space-y-4">
                <Timer />
                <ClueList clues={clues} selected={selectedClue} onSelect={setSelectedClue} />
                <ShareLinkBox />
            </div>
        </div>
    );
};

export default PuzzleViewer;
