import React from 'react';

export const Atmosphere: React.FC = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none transition-colors duration-700 ease-in-out">
            {/* Base Background - Uses CSS Variable from theme */}
            <div
                className="absolute inset-0 transition-colors duration-700"
                style={{ backgroundColor: 'var(--atmosphere-base, #000000)' }}
            />

            {/* Dual-Sided Ambient Glow */}
            <div className="absolute inset-0 transition-opacity duration-700">
                {/* Left Glow */}
                <div
                    className="absolute inset-y-0 left-0 w-[50vw] h-full"
                    style={{
                        background: 'radial-gradient(circle at -20% 50%, rgba(60, 120, 255, 0.25) 0%, transparent 70%)',
                        opacity: 0.8
                    }}
                />

                {/* Right Glow */}
                <div
                    className="absolute inset-y-0 right-0 w-[50vw] h-full"
                    style={{
                        background: 'radial-gradient(circle at 120% 50%, rgba(60, 120, 255, 0.25) 0%, transparent 70%)',
                        opacity: 0.8
                    }}
                />
            </div>
        </div>
    );
};
