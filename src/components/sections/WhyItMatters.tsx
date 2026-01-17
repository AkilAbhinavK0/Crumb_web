import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { SectionWrapper } from '../layout/SectionWrapper';

export const WhyItMatters: React.FC = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0.8, 1], [1, 0.95]);
    const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0.3]);

    return (
        <SectionWrapper id="why-it-matters" theme="dark" className="flex items-center justify-center min-h-[80vh]">
            <motion.div
                ref={ref}
                style={{ scale, opacity }}
                className="container mx-auto px-6 md:px-12 text-center"
            >
                <span className="mb-12 block font-mono text-sm uppercase tracking-widest text-blue-500">
                    Why It Matters
                </span>

                <div className="space-y-6">
                    <motion.h2
                        initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                        whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true, margin: "-10%" }}
                        className="text-4xl md:text-6xl lg:text-7xl font-medium leading-tight text-white"
                    >
                        Technology shapes how people work, think, and live.
                    </motion.h2>
                    <motion.h2
                        initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                        whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        viewport={{ once: true, margin: "-10%" }}
                        className="text-4xl md:text-6xl lg:text-7xl font-medium leading-tight text-white"
                    >
                        We believe it should be built carefully, responsibly, and with intent.
                    </motion.h2>
                </div>
            </motion.div>
        </SectionWrapper>
    );
};
