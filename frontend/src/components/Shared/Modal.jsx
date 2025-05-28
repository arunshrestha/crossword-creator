import React from 'react';

const Modal = ({ title, isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-md p-6 relative">
                <h2 className="text-lg font-semibold mb-4">{title}</h2>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-black"
                >
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
