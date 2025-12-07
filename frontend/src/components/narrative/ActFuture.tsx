import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ActFutureProps {
    email?: string;
}

// Social link icons (inline SVGs)
const GitHubIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
);

const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
);

export function ActFuture({ email }: ActFutureProps) {
    const actRef = useRef<HTMLElement>(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Open mailto with form data
        const subject = `Message from ${formData.name}`;
        const body = `From: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`;
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    const socialLinks = [
        { icon: GitHubIcon, label: 'GitHub', url: 'https://github.com' },
        { icon: LinkedInIcon, label: 'LinkedIn', url: 'https://linkedin.com' },
        { icon: InstagramIcon, label: 'Instagram', url: 'https://instagram.com' },
    ];

    return (
        <section
            ref={actRef}
            className="act-future relative overflow-hidden"
            style={{ minHeight: '100vh', background: '#08080a' }}
        >
            {/* Background gradient */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0"
                    style={{
                        background: `
                            radial-gradient(ellipse 80% 60% at 50% 120%, rgba(139,92,246,0.15) 0%, transparent 50%),
                            radial-gradient(ellipse 60% 40% at 50% 50%, rgba(20, 184, 166, 0.05) 0%, transparent 70%)
                        `,
                    }}
                />
            </div>

            {/* Main container with sliding animation */}
            <div className="relative z-10 min-h-screen flex items-center">
                <div className="w-full flex">

                    {/* Left side: Original content */}
                    <motion.div
                        className="flex flex-col items-center justify-center px-8"
                        layout
                        animate={{
                            width: isPanelOpen ? '50%' : '100%',
                        }}
                        transition={{
                            type: 'spring',
                            stiffness: 200,
                            damping: 30,
                            mass: 1
                        }}
                    >
                        <motion.p
                            className="text-[10px] tracking-[0.5em] uppercase text-[#606070] mb-8"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1.5 }}
                        >
                            Act VI
                        </motion.p>

                        <motion.h2
                            className="text-5xl md:text-7xl font-display font-light text-white mb-6 text-center"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                            The<br />
                            <span className="text-[#8b5cf6]">Future</span>
                        </motion.h2>

                        <motion.p
                            className="text-xl md:text-2xl text-[#a0a0b0] text-center mb-10 max-w-md"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1.5, delay: 0.3 }}
                        >
                            If you're building something<br />
                            <span className="text-white">meaningful,</span><br />
                            let's talk.
                        </motion.p>

                        {/* CTA Button */}
                        <motion.button
                            className="group flex items-center gap-3 px-8 py-4 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white rounded-full font-medium transition-colors"
                            onClick={() => setIsPanelOpen(!isPanelOpen)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.6 }}
                        >
                            <span>{isPanelOpen ? 'Close' : 'Start a conversation'}</span>
                            <motion.svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                animate={{ rotate: isPanelOpen ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </motion.svg>
                        </motion.button>

                        {/* Email display */}
                        {email && (
                            <motion.p
                                className="text-sm text-[#505060] mt-8"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 1.5, delay: 1 }}
                            >
                                <a href={`mailto:${email}`} className="hover:text-[#8b5cf6] transition-colors">
                                    {email}
                                </a>
                            </motion.p>
                        )}
                    </motion.div>

                    {/* Right side: Contact Panel */}
                    <AnimatePresence mode="wait">
                        {isPanelOpen && (
                            <motion.div
                                key="contact-panel"
                                className="w-1/2 flex items-center justify-center px-8"
                                initial={{ x: '100%', opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: '50%', opacity: 0 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 150,
                                    damping: 25,
                                    mass: 0.8,
                                    opacity: { duration: 0.3 }
                                }}
                            >
                                <div className="w-full max-w-md">
                                    {/* Form */}
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Your name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-5 py-4 bg-[#12121a] border border-[#2a2a3a] rounded-lg text-white placeholder-[#606070] focus:border-[#8b5cf6] focus:outline-none transition-colors"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="email"
                                                placeholder="Your email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-5 py-4 bg-[#12121a] border border-[#2a2a3a] rounded-lg text-white placeholder-[#606070] focus:border-[#8b5cf6] focus:outline-none transition-colors"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <textarea
                                                placeholder="Your message"
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                rows={4}
                                                className="w-full px-5 py-4 bg-[#12121a] border border-[#2a2a3a] rounded-lg text-white placeholder-[#606070] focus:border-[#8b5cf6] focus:outline-none transition-colors resize-none"
                                                required
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full py-4 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white rounded-lg font-medium transition-colors"
                                        >
                                            Send Message
                                        </button>
                                    </form>

                                    {/* Social Links */}
                                    <div className="mt-10 pt-8 border-t border-[#2a2a3a]">
                                        <p className="text-sm text-[#606070] mb-4 text-center">Or find me on</p>
                                        <div className="flex justify-center gap-6">
                                            {socialLinks.map((link) => (
                                                <a
                                                    key={link.label}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-3 rounded-full bg-[#12121a] border border-[#2a2a3a] text-[#808090] hover:text-[#8b5cf6] hover:border-[#8b5cf6] transition-colors"
                                                    aria-label={link.label}
                                                >
                                                    <link.icon />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
