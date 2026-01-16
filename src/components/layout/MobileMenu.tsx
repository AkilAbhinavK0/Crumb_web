import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const systemsLinks = [
    { label: "What we do", id: "what-we-do" },
    { label: "How we think", id: "how-we-think" },
    { label: "What we build", id: "what-we-build" },
    { label: "Our approach", id: "our-approach" },
    { label: "Why it matters", id: "why-it-matters" }
];

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
    const [showSystemsSubmenu, setShowSystemsSubmenu] = useState(false);
    const location = useLocation();

    const scrollToSection = (id: string) => {
        onClose();

        if (location.pathname !== '/') {
            window.location.href = `/#${id}`;
            return;
        }

        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 300);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center backdrop-blur-md"
                    style={{ backgroundColor: 'var(--atmosphere-base)' }}
                    onClick={onClose}
                >
                    {/* Menu Items */}
                    <nav className="flex flex-col items-center gap-8 md:gap-12" onClick={(e) => e.stopPropagation()}>
                        {/* Products */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: 0, duration: 0.4 }}
                        >
                            <Link
                                to="/products"
                                onClick={() => setTimeout(() => onClose(), 100)}
                                className="font-bold tracking-tighter text-white hover:text-white/70 transition-colors duration-300"
                                style={{ fontSize: 'var(--text-hero)' }}
                            >
                                PRODUCTS
                            </Link>
                        </motion.div>

                        {/* Systems with Submenu */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: 0.1, duration: 0.4 }}
                            className="flex flex-col items-center gap-4"
                        >
                            <button
                                onClick={() => setShowSystemsSubmenu(!showSystemsSubmenu)}
                                className="font-bold tracking-tighter text-white hover:text-white/70 transition-colors duration-300"
                                style={{ fontSize: 'var(--text-hero)' }}
                            >
                                SYSTEMS
                            </button>

                            <AnimatePresence>
                                {showSystemsSubmenu && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="flex flex-col items-center gap-3 overflow-hidden"
                                    >
                                        {systemsLinks.map((link) => (
                                            <button
                                                key={link.id}
                                                onClick={() => scrollToSection(link.id)}
                                                className="text-sm uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
                                            >
                                                {link.label}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Contact */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                        >
                            <button
                                onClick={() => scrollToSection('footer')}
                                className="font-bold tracking-tighter text-white hover:text-white/70 transition-colors duration-300"
                                style={{ fontSize: 'var(--text-hero)' }}
                            >
                                CONTACT
                            </button>
                        </motion.div>
                    </nav>

                    {/* Footer Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                        className="absolute bottom-12 text-center text-neutral-400"
                        style={{ fontSize: 'var(--text-small)' }}
                    >
                        <p>© 2024 Crumb Corp</p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
