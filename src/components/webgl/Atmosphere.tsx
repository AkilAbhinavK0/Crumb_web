import React from 'react';

export const Atmosphere: React.FC = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none transition-colors duration-700 ease-in-out">
            {/* Base Background - Uses CSS Variable from theme */}
            <div
                className="absolute inset-0 transition-colors duration-700"
                style={{ backgroundColor: 'var(--atmosphere-base, #000000)' }}
            />

            {/* Glow from Center - Uses CSS Variable from theme */}
            <div
                className="absolute inset-0 transition-opacity duration-700"
                style={{
                    background: 'radial-gradient(circle at center, var(--atmosphere-glow, rgba(30, 58, 138, 0.1)) 0%, transparent 50%)'
                }}
            />
        </div>
    );
};
