import React from 'react';
import { motion } from 'motion/react';
import { SectionWrapper } from '../layout/SectionWrapper';

const steps = ["Understand", "Design", "Build", "Refine"];

export const OurApproach: React.FC = () => {
    return (
        <SectionWrapper id="our-approach" theme="light" className="flex items-center justify-center">
            {/* Laser Edge separator at top */}
            <div className="absolute top-0 left-0 h-[1px] w-full bg-black/10" />

            <div className="container mx-auto px-6 md:px-12">
                <span className="mb-24 block font-mono text-sm uppercase tracking-widest text-blue-600">
                    Our Approach
                </span>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between relative">
                    {/* Connecting Line (Horizontal on Desktop) */}
                    <motion.div
                        className="hidden md:block absolute top-[2.5rem] left-0 h-[1px] bg-black/20 -z-0"
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        viewport={{ once: true }}
                    />

                    {/* Connecting Line (Vertical on Mobile) */}
                    <motion.div
                        className="md:hidden absolute left-[1rem] top-0 w-[1px] bg-black/20 -z-0"
                        initial={{ height: 0 }}
                        whileInView={{ height: '100%' }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        viewport={{ once: true }}
                    />

                    {steps.map((step, index) => (
                        <div key={index} className="relative z-10 flex md:flex-col items-center mb-12 md:mb-0 gap-6 md:gap-8 w-full md:w-auto">
                            {/* Circle Node */}
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.3 }}
                                viewport={{ once: true }}
                                className="h-8 w-8 rounded-full bg-white border border-black/20 flex items-center justify-center shadow-sm"
                            >
                                <div className="h-2 w-2 rounded-full bg-blue-500" />
                            </motion.div>

                            {/* Text */}
                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.3 + 0.2 }}
                                viewport={{ once: true }}
                                className="text-4xl md:text-5xl font-bold text-black"
                            >
                                {step}
                            </motion.h3>
                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
};
