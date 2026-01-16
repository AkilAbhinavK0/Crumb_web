import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MobileMenu } from './MobileMenu';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSystemsHovered, setIsSystemsHovered] = useState(false);
    const location = useLocation();

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

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-[200] px-4 md:px-6 py-4 md:py-6 flex justify-between items-center">
                {/* Branding - Top Left */}
                <Link
                    to="/"
                    className="text-sm font-normal tracking-tight text-white hover:text-white/70 transition-colors"
                >
                    Crumb Corp
                </Link>

                {/* Desktop Navigation Links - Hidden on Mobile */}
                <div className="hidden md:flex gap-6 lg:gap-8 items-center bg-black/20 backdrop-blur-sm px-6 py-2 rounded-full border border-white/5">
                    <Link
                        to="/products"
                        className="text-xs uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
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
                            className="text-xs uppercase tracking-widest text-neutral-400 hover:text-white transition-colors cursor-pointer"
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
                                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 min-w-[200px] bg-black/80 backdrop-blur-md border border-white/10 rounded-sm p-2 flex flex-col gap-1"
                                >
                                    {systemsLinks.map((link) => (
                                        <button
                                            key={link.id}
                                            onClick={() => scrollToSection(link.id)}
                                            className="text-left px-4 py-2 text-xs uppercase tracking-widest text-neutral-400 hover:text-white hover:bg-white/5 transition-all w-full whitespace-nowrap"
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
                        className="text-xs uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
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
                        className="w-full h-0.5 bg-white group-hover:bg-white/70 transition-colors origin-center"
                    />
                    <motion.span
                        animate={{ opacity: isMenuOpen ? 0 : 1 }}
                        transition={{ duration: 0.2 }}
                        className="w-full h-0.5 bg-white group-hover:bg-white/70 transition-colors"
                    />
                    <motion.span
                        animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -6 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-0.5 bg-white group-hover:bg-white/70 transition-colors origin-center"
                    />
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
};
