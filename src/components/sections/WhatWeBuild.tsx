import React from 'react';
import { motion } from 'motion/react';
import { SectionWrapper } from '../layout/SectionWrapper';

const items = [
    { title: "Software Systems & Tools", desc: "Core infrastructure and utilities that power modern applications." },
    { title: "Platform & Infrastructure Solutions", desc: "Scalable backend foundations built for growth and reliability." },
    { title: "Intelligent Interfaces", desc: "Human-centric interaction design that feels natural and intuitive." },
    { title: "Process Automation & Optimization", desc: "Streamlining complex workflows to save time and reduce errors." }
];

export const WhatWeBuild: React.FC = () => {
    return (
        <SectionWrapper id="what-we-build" theme="dark" className="flex items-center justify-center">
            <div className="container mx-auto px-6 md:px-12">
                <span className="mb-16 block font-mono text-sm uppercase tracking-widest text-blue-500">
                    What We Build
                </span>

                <div className="grid gap-x-12 gap-y-24 md:grid-cols-2">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true, margin: "-10%" }}
                            className="group"
                        >
                            <h3 className="mb-4 text-3xl font-bold text-[var(--color-brand-white)] group-hover:text-blue-400 transition-colors duration-300">
                                {item.title}
                            </h3>
                            <p className="text-lg text-[var(--text-primary)]/60 max-w-sm">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
};
