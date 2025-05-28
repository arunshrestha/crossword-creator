import React from 'react';

const Input = ({ label, value, onChange, type = 'text', placeholder = '', className = '' }) => {
    return (
        <div className="mb-4">
            {label && <label className="block text-sm font-medium mb-1">{label}</label>}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
            />
        </div>
    );
};

export default Input;
