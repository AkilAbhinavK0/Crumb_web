import React, { useEffect, useRef, useState } from 'react';
import { useMouse } from '../../context/MouseMotionContext';
import { cn } from '../../utils/cn';

export const AntimetalCursor: React.FC = () => {
    const { x, y, isHovering, targetElement } = useMouse();
    const ringRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    // Physics state
    const pos = useRef({ x: 0, y: 0 });
    const target = useRef({ x: 0, y: 0 });

    // Detect touch device
    useEffect(() => {
        const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        setIsTouchDevice(hasTouch);
    }, []);

    useEffect(() => {
        let animationFrameId: number;

        const animate = () => {
            // Calculate magnetic pull if hovering over interactive element
            let targetX = x.current;
            let targetY = y.current;

            if (isHovering && targetElement) {
                const rect = targetElement.getBoundingClientRect();
                const elementCenterX = rect.left + rect.width / 2;
                const elementCenterY = rect.top + rect.height / 2;

                // Calculate distance to element center
                const dx = elementCenterX - x.current;
                const dy = elementCenterY - y.current;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Apply magnetic pull (stronger when closer, max 60px radius)
                const magneticRadius = 60;
                if (distance < magneticRadius) {
                    const pullStrength = 0.3 * (1 - distance / magneticRadius);
                    targetX += dx * pullStrength;
                    targetY += dy * pullStrength;
                }
            }

            target.current.x = targetX;
            target.current.y = targetY;

            // Smooth follow for the ring (lerp)
            const smoothness = isHovering ? 0.2 : 0.15;

            pos.current.x += (target.current.x - pos.current.x) * smoothness;
            pos.current.y += (target.current.y - pos.current.y) * smoothness;

            if (ringRef.current) {
                ringRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
            }

            if (dotRef.current) {
                // Dot follows the actual mouse position (no magnetic pull)
                dotRef.current.style.transform = `translate3d(${x.current}px, ${y.current}px, 0) translate(-50%, -50%)`;
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(animationFrameId);
    }, [x, y, isHovering, targetElement]);

    // Hide cursor on touch devices
    if (isTouchDevice) {
        return null;
    }

    return (
        <>
            {/* Container for mix-blend-mode */}
            <div className="pointer-events-none fixed inset-0 z-[9999] mix-blend-difference">

                {/* Ring - Expands and has magnetic pull */}
                <div
                    ref={ringRef}
                    className={cn(
                        "absolute left-0 top-0 rounded-full border border-white transition-[width,height,border-width] duration-300 ease-out will-change-transform",
                        isHovering ? "h-16 w-16 border-2" : "h-8 w-8 border"
                    )}
                />

                {/* Dot - Follows actual cursor, disappears on hover */}
                <div
                    ref={dotRef}
                    className={cn(
                        "absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-white transition-[transform,opacity] duration-200 ease-out will-change-transform",
                        isHovering ? "scale-0 opacity-0" : "scale-100 opacity-100"
                    )}
                />
            </div>
        </>
    );
};
