import React from 'react';
import { motion } from 'motion/react';
import { SectionWrapper } from '../layout/SectionWrapper';

const philosophies = [
    "We start with the problem, not the product.",
    "We break complex systems into smaller, usable parts.",
    "We optimize for efficiency, reliability, and longevity.",
    "We believe good software should feel effortless to use."
];

export const HowWeThink: React.FC = () => {
    return (
        <SectionWrapper id="how-we-think" theme="light" className="flex flex-col justify-center">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-12">

                    {/* Sticky Header - Left Column */}
                    <div className="md:col-span-4 lg:col-span-3 relative">
                        <motion.div
                            className="sticky top-32 flex flex-col gap-4"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <span className="font-mono text-xs md:text-sm uppercase tracking-widest text-blue-600">

                            </span>
                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                                HOW WE<br />THINK
                            </h2>
                            <div className="h-[1px] w-12 bg-blue-600 mt-2" />
                        </motion.div>
                    </div>

                    {/* Content List - Right Column */}
                    <div className="md:col-span-8 lg:col-span-9 flex flex-col gap-16 md:gap-24">
                        {philosophies.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                viewport={{ margin: "-10% 0px -10% 0px" }}
                                className="group flex flex-col gap-6 relative"
                            >
                                {/* Top Border & Index */}
                                <div className="flex items-center justify-between border-t border-neutral-300 pt-6">
                                    <span className="font-mono text-xs text-neutral-400 group-hover:text-blue-600 transition-colors duration-300">
                                        {`0${index + 1}`}
                                    </span>
                                    <div className="h-[1px] w-0 group-hover:w-full bg-blue-600 transition-all duration-700 ease-out absolute top-0 left-0" />
                                </div>

                                {/* Main Text */}
                                <p
                                    className="font-medium leading-tight text-black md:text-black/80 group-hover:text-black transition-colors duration-300 max-w-3xl"
                                    style={{ fontSize: 'var(--text-display)' }}
                                >
                                    {item}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};
