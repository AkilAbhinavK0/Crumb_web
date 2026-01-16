import React from 'react';
import { motion } from 'motion/react';
import { SectionWrapper } from '../layout/SectionWrapper';

export const WhatWeDo: React.FC = () => {
    return (
        <SectionWrapper id="what-we-do" theme="dark" className="flex items-center justify-center">
            <div className="container mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="max-w-4xl"
                >
                    <span className="mb-8 block font-mono text-sm uppercase tracking-widest text-blue-500">
                        What We Do
                    </span>
                    <h3 className="mb-12 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                        Crumb is a technology company focused on building and rethinking software systems.
                    </h3>
                    <p className="max-w-2xl text-xl font-light leading-relaxed text-[var(--text-primary)]/70 md:text-2xl">
                        We work on products, platforms, and digital tools that improve how technology functions for people and organizations.
                    </p>
                </motion.div>
            </div>
        </SectionWrapper>
    );
};
