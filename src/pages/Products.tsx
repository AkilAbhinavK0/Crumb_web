import React from 'react';

import { Link } from 'react-router-dom';

const Products: React.FC = () => {
    // Force dark theme for products page
    React.useEffect(() => {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
    }, []);

    return (
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-6 text-center bg-[var(--color-brand-black)] text-[var(--color-brand-white)]">
            <h1 className="text-6xl md:text-9xl font-bold mb-8 tracking-tighter">
                PRODUCTS
            </h1>

            <div className="opacity-100 transform-none">
                <h2 className="text-2xl md:text-3xl font-light mb-4 text-[var(--color-brand-white)]">Coming soon.</h2>
                <p className="max-w-md mx-auto text-[var(--color-brand-white)]/60">
                    We're building thoughtful software products that solve real problems. Check back soon to see what we're working on.
                </p>
            </div>

            {/* Back to Home Button */}
            <div className="mt-12 opacity-100">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-neutral-400 hover:text-white transition-colors group"
                >
                    <svg
                        className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default Products;
