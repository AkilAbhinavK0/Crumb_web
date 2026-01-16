import React, { useRef, useEffect } from 'react';
import { useInView } from 'motion/react';

interface SectionWrapperProps {
    children: React.ReactNode;
    theme?: 'dark' | 'light';
    className?: string;
    id?: string;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, theme = 'dark', className = '', id }) => {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" }); // Trigger when element overlaps the middle 20% of view

    useEffect(() => {
        if (isInView) {
            document.documentElement.classList.remove('dark', 'light');
            document.documentElement.classList.add(theme);

            // Also update background colors directly if using variables that depend on class
            // Our index.css handles html.light variables.
        }
    }, [isInView, theme]);

    return (
        <section
            ref={ref}
            id={id}
            className={`relative min-h-screen w-full overflow-hidden ${className}`}
            style={{
                paddingTop: 'var(--space-section)',
                paddingBottom: 'var(--space-section)',
                paddingLeft: 'var(--space-container)',
                paddingRight: 'var(--space-container)'
            }}
        >
            {children}
        </section>
    );
};
