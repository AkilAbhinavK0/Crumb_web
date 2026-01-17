import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { generateNoise } from '../../utils/noise';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { useTheme } from '../../contexts/ThemeContext';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [noiseBg, setNoiseBg] = useState('');
    const location = useLocation();
    const { theme } = useTheme();

    useEffect(() => {
        setNoiseBg(generateNoise());
    }, []);

    // Initialize Lenis
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            // smoothWheel: true, // v1 uses auto-detect or options
            // smoothTouch: false,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    // Update document theme class
    useEffect(() => {
        document.documentElement.classList.remove('dark', 'light');
        document.documentElement.classList.add(theme);
    }, [theme]);

    return (
        <div className="relative min-h-screen w-full bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-700 ease-in-out font-sans overflow-x-hidden selection:bg-blue-500 selection:text-white">
            {/* Noise Overlay */}
            <div
                className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-overlay"
                style={{ backgroundImage: `url(${noiseBg})` }}
            />

            {/* Vignette */}
            <div className="pointer-events-none fixed inset-0 z-40 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

            {/* Navigation */}
            <Navbar />

            <main className="relative z-10 w-full">
                {children}
            </main>
        </div>
    );
};
