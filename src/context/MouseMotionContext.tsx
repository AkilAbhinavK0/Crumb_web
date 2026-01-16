import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface MouseContextType {
    x: React.MutableRefObject<number>;
    y: React.MutableRefObject<number>;
    isHovering: boolean;
    setIsHovering: (hover: boolean) => void;
    targetElement: HTMLElement | null;
}

const MouseMotionContext = createContext<MouseContextType | null>(null);

export const useMouse = () => {
    const context = useContext(MouseMotionContext);
    if (!context) {
        throw new Error('useMouse must be used within a MouseMotionProvider');
    }
    return context;
};

export const MouseMotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const x = useRef(0);
    const y = useRef(0);
    const [isHovering, setIsHovering] = useState(false);
    const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            x.current = e.clientX;
            y.current = e.clientY;

            // Detect if hovering over interactive elements
            const target = e.target as HTMLElement;
            const isInteractive =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.classList.contains('interactive') ||
                target.closest('a, button, .interactive') !== null;

            setIsHovering(isInteractive);
            setTargetElement(isInteractive ? (target.closest('a, button, .interactive') as HTMLElement || target) : null);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <MouseMotionContext.Provider value={{ x, y, isHovering, setIsHovering, targetElement }}>
            {children}
        </MouseMotionContext.Provider>
    );
};
