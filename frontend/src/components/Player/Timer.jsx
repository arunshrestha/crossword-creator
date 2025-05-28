import React, { useEffect, useState } from 'react';

const Timer = () => {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (secs) => {
        const m = String(Math.floor(secs / 60)).padStart(2, '0');
        const s = String(secs % 60).padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <div className="text-center text-sm text-gray-600">
            Solving Time: <span className="font-semibold">{formatTime(seconds)}</span>
        </div>
    );
};

export default Timer;
