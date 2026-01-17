import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MobileMenu } from './MobileMenu';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../../contexts/ThemeContext';

export const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSystemsHovered, setIsSystemsHovered] = useState(false);
    const location = useLocation();
    const { theme } = useTheme();

    const scrollToSection = (id: string) => {
        if (location.pathname !== '/') {
            window.location.href = `/#${id}`;
            return;
        }

        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const systemsLinks = [
        { label: "What we do", id: "what-we-do" },
        { label: "How we think", id: "how-we-think" },
        { label: "What we build", id: "what-we-build" }, // TODO: Map to section
        { label: "Our approach", id: "our-approach" },   // TODO: Map to section
        { label: "Why it matters", id: "why-it-matters" } // TODO: Map to section
    ];

    const textColor = theme === 'light'
        ? 'text-gray-900 hover:text-gray-600'
        : 'text-white hover:text-white/70';

    const navTextColor = theme === 'light'
        ? 'text-gray-700 hover:text-gray-900'
        : 'text-neutral-400 hover:text-white';

    const iconColor = theme === 'light' ? 'bg-gray-900' : 'bg-white';

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-[200] px-4 md:px-6 py-4 md:py-6 flex justify-between items-center">
                {/* Branding - Top Left */}
                <Link
                    to="/"
                    className={`text-sm font-normal tracking-tight transition-colors ${textColor}`}
                >
                    Crumb Corp
                </Link>

                {/* Desktop Navigation Links - Hidden on Mobile */}
                <div className={`hidden md:flex gap-6 lg:gap-8 items-center backdrop-blur-sm px-6 py-2 rounded-full border transition-colors ${theme === 'light' ? 'bg-white/20 border-gray-300/20' : 'bg-black/20 border-white/5'
                    }`}>
                    <Link
                        to="/products"
                        className={`text-xs uppercase tracking-widest transition-colors ${navTextColor}`}
                    >
                        Products
                    </Link>

                    {/* Systems Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => setIsSystemsHovered(true)}
                        onMouseLeave={() => setIsSystemsHovered(false)}
                    >
                        <button
                            className={`text-xs uppercase tracking-widest transition-colors cursor-pointer ${navTextColor}`}
                        >
                            Systems
                        </button>

                        <AnimatePresence>
                            {isSystemsHovered && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 min-w-[200px] backdrop-blur-md border rounded-sm p-2 flex flex-col gap-1 ${theme === 'light' ? 'bg-white/90 border-gray-300/30' : 'bg-black/80 border-white/10'
                                        }`}
                                >
                                    {systemsLinks.map((link) => (
                                        <button
                                            key={link.id}
                                            onClick={() => scrollToSection(link.id)}
                                            className={`text-left px-4 py-2 text-xs uppercase tracking-widest transition-all w-full whitespace-nowrap ${theme === 'light' ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50' : 'text-neutral-400 hover:text-white hover:bg-white/5'
                                                }`}
                                        >
                                            {link.label}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <button
                        onClick={() => scrollToSection('footer')}
                        className={`text-xs uppercase tracking-widest transition-colors ${navTextColor}`}
                    >
                        Contact
                    </button>
                </div>

                {/* Hamburger Menu - Visible on Mobile */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden flex flex-col gap-1.5 w-6 h-6 justify-center items-center group"
                    aria-label="Toggle menu"
                >
                    <motion.span
                        animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 6 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`w-full h-0.5 transition-colors origin-center ${iconColor} ${theme === 'light' ? 'group-hover:bg-gray-600' : 'group-hover:bg-white/70'}`}
                    />
                    <motion.span
                        animate={{ opacity: isMenuOpen ? 0 : 1 }}
                        transition={{ duration: 0.2 }}
                        className={`w-full h-0.5 transition-colors ${iconColor} ${theme === 'light' ? 'group-hover:bg-gray-600' : 'group-hover:bg-white/70'}`}
                    />
                    <motion.span
                        animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -6 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`w-full h-0.5 transition-colors origin-center ${iconColor} ${theme === 'light' ? 'group-hover:bg-gray-600' : 'group-hover:bg-white/70'}`}
                    />
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
};
