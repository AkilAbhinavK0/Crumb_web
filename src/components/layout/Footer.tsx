import React from 'react';
import { SectionWrapper } from '../layout/SectionWrapper';
import { ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
    const socials = [
        { name: "Twitter / X", url: "https://x.com/CrumbCorp" },
        { name: "LinkedIn", url: "https://www.linkedin.com/in/crumb-corp-7334033a3" },
        { name: "GitHub", url: "https://github.com/crumbcorp" },
        { name: "Instagram", url: "https://www.instagram.com/crumb.corp/" }
    ];

    const contacts = [
        { email: "crumb.corp.in@gmail.com", sub: "Official Mail" },
        { email: "crumb.careers@gmail.com", sub: "Join the Team" },
        { email: "crumb.inbox@gmail.com", sub: "General Enquiries" }
    ];

    return (
        <SectionWrapper id="footer" theme="dark" className="min-h-[50vh] flex flex-col justify-between py-12 md:py-24">
            <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 md:gap-24 mb-24">
                {/* Socials */}
                <div>
                    <h3 className="text-sm font-mono uppercase text-gray-400 mb-8 tracking-widest">Connect</h3>
                    <div className="flex flex-col gap-4">
                        {socials.map((social, idx) => (
                            <a
                                key={idx}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-2 text-2xl md:text-3xl font-medium text-[var(--color-brand-white)] hover:text-blue-400 transition-colors"
                            >
                                {social.name}
                                <ArrowUpRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-sm font-mono uppercase text-gray-400 mb-8 tracking-widest">Contact</h3>
                    <div className="flex flex-col gap-8">
                        {contacts.map((contact, idx) => (
                            <a key={idx} href={`mailto:${contact.email}`} className="group block">
                                <div className="text-xl md:text-2xl font-medium text-[var(--color-brand-white)] group-hover:text-blue-400 transition-colors">
                                    {contact.email}
                                </div>
                                <div className="text-sm text-gray-500 mt-1">{contact.sub}</div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-end md:items-center gap-6 border-t border-white/10 pt-8">
                <div>
                    <h2 className="text-3xl font-bold mb-2">Let's work together.</h2>
                    <p className="text-gray-500">Building the future of technology systems, one component at a time.</p>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 text-sm text-gray-500">
                    <span>© {new Date().getFullYear()} Crumb Corp.</span>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};
