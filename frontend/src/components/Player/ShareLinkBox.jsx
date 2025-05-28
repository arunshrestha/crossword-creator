import React from 'react';

const ShareLinkBox = () => {
    const url = window.location.href;

    const copyLink = () => {
        navigator.clipboard.writeText(url);
    };

    return (
        <div className="p-3 border rounded shadow-sm bg-white">
            <p className="text-sm text-gray-700 mb-2">Share this puzzle:</p>
            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    readOnly
                    value={url}
                    className="flex-1 border px-2 py-1 text-sm rounded"
                />
                <button
                    onClick={copyLink}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                    Copy
                </button>
            </div>
        </div>
    );
};

export default ShareLinkBox;
