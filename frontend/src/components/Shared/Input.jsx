import React from 'react';

const Input = ({
    id,
    label,
    value,
    onChange,
    type = 'text',
    placeholder = '',
    name,
    required = false,
    disabled = false,
    error = '',
    className = '',
}) => {
    const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;

    return (
        <div className="mb-4">
            {label && (
                <label htmlFor={inputId} className="block text-sm font-medium mb-1">
                    {label}
                </label>
            )}
            <input
                id={inputId}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                aria-invalid={!!error}
                className={`w-full border ${error ? 'border-red-500' : 'border-gray-300'
                    } rounded px-3 py-2 focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-400' : 'focus:ring-blue-400'
                    } ${className}`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default Input;
