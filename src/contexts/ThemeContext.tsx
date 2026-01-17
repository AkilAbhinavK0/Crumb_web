import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

type Theme = 'dark' | 'light';

interface SectionInfo {
    id: string;
    theme: Theme;
    ref: React.RefObject<HTMLElement | null>;
}

interface CachedSectionGeometry {
    id: string;
    theme: Theme;
    top: number;
    bottom: number;
}

interface ThemeContextType {
    theme: Theme;
    registerSection: (section: SectionInfo) => void;
    unregisterSection: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>('dark');
    const sectionsRef = useRef<Map<string, SectionInfo>>(new Map());
    const cachedGeometryRef = useRef<CachedSectionGeometry[]>([]);
    const rafRef = useRef<number | undefined>();

    // Measure and cache section geometry
    const updateGeometryCache = useCallback(() => {
        const sections = Array.from(sectionsRef.current.values());
        const newCache: CachedSectionGeometry[] = [];

        sections.forEach(s => {
            const element = s.ref.current;
            if (element) {
                newCache.push({
                    id: s.id,
                    theme: s.theme,
                    top: element.offsetTop,
                    bottom: element.offsetTop + element.offsetHeight
                });
            }
        });

        // Sort by top position for efficient lookup
        newCache.sort((a, b) => a.top - b.top);
        cachedGeometryRef.current = newCache;
    }, []);

    const registerSection = useCallback((section: SectionInfo) => {
        sectionsRef.current.set(section.id, section);
        updateGeometryCache();
    }, [updateGeometryCache]);

    const unregisterSection = useCallback((id: string) => {
        sectionsRef.current.delete(id);
        updateGeometryCache();
    }, [updateGeometryCache]);

    const calculateActiveSection = useCallback(() => {
        const cache = cachedGeometryRef.current;
        if (cache.length === 0) return;

        // Calculate viewport center
        const center = window.scrollY + window.innerHeight / 2;

        // Find section that contains the center point (pure math, no DOM reads)
        let activeSection = cache.find(s => s.top <= center && center < s.bottom);

        // Fallback: if center is in a gap, find closest section
        if (!activeSection) {
            let closestDistance = Infinity;
            cache.forEach(s => {
                const sectionCenter = (s.top + s.bottom) / 2;
                const distance = Math.abs(sectionCenter - center);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    activeSection = s;
                }
            });
        }

        if (activeSection && activeSection.theme !== theme) {
            setTheme(activeSection.theme);
        }
    }, [theme]);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                rafRef.current = requestAnimationFrame(() => {
                    calculateActiveSection();
                    ticking = false;
                });
                ticking = true;
            }
        };

        const handleResize = () => {
            updateGeometryCache();
            calculateActiveSection();
        };

        // Initial calculation
        calculateActiveSection();

        // Listen to scroll and resize
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [calculateActiveSection, updateGeometryCache]);

    return (
        <ThemeContext.Provider value={{ theme, registerSection, unregisterSection }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};
