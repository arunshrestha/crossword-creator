import React from 'react';

const Header = ({ title }) => {
    return (
        <header className="text-center py-4 border-b border-gray-200 mb-4">
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        </header>
    );
};

export default Header;
