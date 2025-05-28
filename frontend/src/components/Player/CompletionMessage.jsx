import React from 'react';

const CompletionMessage = ({ timeTaken }) => {
    return (
        <div className="bg-green-100 border border-green-400 text-green-800 p-4 rounded text-center">
            🎉 Congratulations! You completed the puzzle in <strong>{timeTaken}</strong>.
        </div>
    );
};

export default CompletionMessage;
