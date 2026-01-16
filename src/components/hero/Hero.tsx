import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export const Hero: React.FC = () => {
    const { scrollY } = useScroll();

    // Scroll effects - fade out at Y~300
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const blur = useTransform(scrollY, [0, 300], ['blur(0px)', 'blur(10px)']);
    const y = useTransform(scrollY, [0, 300], [0, 100]);
    const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

    return (
        <motion.section
            style={{ opacity, filter: blur, y, scale }}
            className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center px-4 md:px-6 text-center"
        >
            {/* Technical Corner Brackets - Top Left */}
            <motion.div
                initial={{ opacity: 0, x: -10, y: -10 }}
                animate={{ opacity: 0.3, x: 0, y: 0 }}
                transition={{ delay: 1.8, duration: 1 }}
                className="absolute top-8 left-8 md:top-12 md:left-12 flex flex-col gap-1 font-mono text-xs text-white/40"
            >
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-l-2 border-t-2 border-white/40" />
                    <span>v2.0.1</span>
                </div>
            </motion.div>

            {/* Technical Corner Brackets - Top Right */}
            <motion.div
                initial={{ opacity: 0, x: 10, y: -10 }}
                animate={{ opacity: 0.3, x: 0, y: 0 }}
                transition={{ delay: 1.8, duration: 1 }}
                className="absolute top-8 right-8 md:top-12 md:right-12 flex flex-col items-end gap-1 font-mono text-xs text-white/40"
            >
                <div className="flex items-center gap-2">
                    <span>ONLINE</span>
                    <div className="w-4 h-4 border-r-2 border-t-2 border-white/40" />
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="z-10 flex flex-col items-center max-w-5xl w-full">
                {/* Main Title - Fluid Typography */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.2, 1, 0.4, 1] }}
                    className="font-bold tracking-tighter text-white leading-none"
                    style={{ fontSize: 'var(--text-hero)' }}
                >
                    CRUMB
                </motion.h1>

                {/* Subtitle - Gradient White to 60% */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 1.0, ease: [0.2, 1, 0.4, 1] }}
                    className="mt-6 md:mt-8 font-light bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent leading-relaxed"
                    style={{ fontSize: 'var(--text-title)' }}
                >
                    We build software that makes technology work better.
                </motion.p>

                {/* Description - Neutral Grey */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 1.0, ease: [0.2, 1, 0.4, 1] }}
                    className="mt-3 md:mt-4 text-neutral-400 max-w-2xl leading-relaxed"
                    style={{ fontSize: 'var(--text-body)' }}
                >
                    Solving real-world problems through thoughtfully engineered software solutions.
                </motion.p>
            </div>

            {/* Scroll Indicator - Bottom Right */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 md:bottom-12 right-8 md:right-12 flex items-center gap-3 uppercase tracking-widest text-white/50"
                style={{ fontSize: 'var(--text-small)' }}
            >
                <span>Scroll to explore</span>
                <div className="w-4 h-4 border-r-2 border-b-2 border-white/40" />
            </motion.div>

            {/* Technical Corner Brackets - Bottom Left */}
            <motion.div
                initial={{ opacity: 0, x: -10, y: 10 }}
                animate={{ opacity: 0.3, x: 0, y: 0 }}
                transition={{ delay: 1.8, duration: 1 }}
                className="absolute bottom-8 left-8 md:bottom-12 md:left-12 flex flex-col gap-1 font-mono text-xs text-white/40"
            >
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-l-2 border-b-2 border-white/40" />
                    <span>EST. 2024</span>
                </div>
            </motion.div>
        </motion.section>
    );
};
