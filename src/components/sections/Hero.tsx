import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export const Hero: React.FC = () => {
    // Animation configuration
    const INITIAL_DELAY = 2.3; // Seconds after website starts
    const STAGGER_DELAY = 0.2; // Seconds between elements

    const { scrollY } = useScroll();

    // Scroll effects - fade out at Y~300
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const blur = useTransform(scrollY, [0, 300], ['blur(0px)', 'blur(10px)']);
    const y = useTransform(scrollY, [0, 300], [0, 100]);
    const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

    return (
        <motion.section
            style={{ opacity, filter: blur, y, scale }}
            className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center px-4 md:px-6 text-center overflow-hidden"
        >




            {/* Main Content */}
            <div className="z-10 flex flex-col items-center max-w-7xl w-full">
                {/* Main Title - Animated Video Logo (Pre-processed WebM) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.2, 1, 0.4, 1] }}
                    className="relative w-full"
                >
                    <video
                        autoPlay
                        muted
                        playsInline
                        className="w-full h-auto scale-[1.5] md:scale-100 origin-center mx-auto object-center -translate-x-[15px] md:-translate-x-[31px] -translate-y-[20px] md:-translate-y-[120px]"
                    >
                        {/* WebM with Alpha Transparency */}
                        <source src="/Crumb-Branding.webm" type="video/webm" />
                        {/* Fallback to MP4 (no alpha, but functional) */}
                        <source src="/Crumb-Branding.mp4" type="video/mp4" />
                    </video>
                </motion.div>

                {/* Subtitle - Gradient White to 60% */}
                <motion.p
                    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ delay: INITIAL_DELAY, duration: 1.0, ease: [0.2, 1, 0.4, 1] }}
                    className="-mt-5 md:-mt-55 font-medium bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent leading-relaxed relative z-10"
                    style={{ fontSize: 'var(--text-title)' }}
                >
                    We build software that makes technology work better.
                </motion.p>

                {/* Description - Neutral Grey */}
                <motion.p
                    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ delay: INITIAL_DELAY + STAGGER_DELAY, duration: 1.0, ease: [0.2, 1, 0.4, 1] }}
                    className="mt-3 md:mt-4 font-medium text-neutral-400 max-w-2xl leading-relaxed"
                    style={{ fontSize: 'var(--text-body)' }}
                >
                    Solving real-world problems through thoughtfully engineered software solutions.
                </motion.p>
            </div>




        </motion.section>
    );
};
