import React, { useRef, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface SectionWrapperProps {
    children: React.ReactNode;
    theme?: 'dark' | 'light';
    className?: string;
    id?: string;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, theme = 'dark', className = '', id }) => {
    const ref = useRef<HTMLElement>(null);
    const { registerSection, unregisterSection } = useTheme();

    useEffect(() => {
        if (id) {
            registerSection({ id, theme, ref });
            return () => unregisterSection(id);
        }
    }, [id, theme, registerSection, unregisterSection]);

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
