import React from 'react';
import { motion, type Variants } from 'motion/react';
import { cn } from '../../utils/cn';

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
}

const animation: Variants = {
    hidden: {
        opacity: 0,
        filter: 'blur(20px)',
        y: 40,
        scale: 1.1
    },
    visible: {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        scale: 1,
        transition: {
            duration: 1.2,
            ease: [0.2, 1, 0.4, 1], // Luxurious ease
        }
    }
};

export const TextReveal: React.FC<TextRevealProps> = ({ text, className, delay = 0 }) => {
    return (
        <motion.h1
            className={cn("flex overflow-hidden", className)}
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.12, delayChildren: delay }}
        >
            {text.split('').map((char, i) => (
                <motion.span key={i} variants={animation} className="inline-block origin-bottom">
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </motion.h1>
    );
};
