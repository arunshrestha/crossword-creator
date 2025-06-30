import React, { useEffect } from 'react';

const Modal = ({ title, isOpen, onClose, children }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div
                className="bg-white rounded-lg shadow-xl w-11/12 max-w-md p-6 relative"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <h2 id="modal-title" className="text-lg font-semibold mb-4">
                    {title}
                </h2>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-black"
                    aria-label="Close modal"
                >
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
