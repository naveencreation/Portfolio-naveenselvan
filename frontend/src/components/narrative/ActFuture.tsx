import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface ActFutureProps {
    email?: string;
}

export function ActFuture({ email }: ActFutureProps) {
    const actRef = useRef<HTMLElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleEmailClick = () => {
        if (email) {
            window.location.href = `mailto:${email}?subject=Let's talk about building something meaningful`;
        }
    };

    return (
        <section
            ref={actRef}
            className="act-future act-container relative"
        >
            {/* Expansive background gradient */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0"
                    style={{
                        background: `
              radial-gradient(ellipse 80% 60% at 50% 120%, var(--accent-current) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 50% 50%, rgba(20, 184, 166, 0.05) 0%, transparent 70%)
            `,
                    }}
                />
            </div>

            <div className="act-content narrative-center relative z-10">
                {/* Act header */}
                <motion.p
                    className="text-narrative-whisper mb-6 tracking-widest uppercase"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                >
                    Act VI
                </motion.p>

                <motion.h2
                    className="text-narrative-hero mb-8"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    The
                    <br />
                    <span className="text-[var(--accent-current)]">Future</span>
                </motion.h2>

                {/* The invitation */}
                <motion.p
                    className="text-narrative-statement text-[var(--text-secondary)] max-w-xl mb-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                >
                    If you're building something
                    <br />
                    <span className="text-[var(--text-primary)]">meaningful,</span>
                    <br />
                    let's talk.
                </motion.p>

                {/* Single CTA - No contact form */}
                <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                >
                    <motion.button
                        className="magnetic-cta group"
                        onClick={handleEmailClick}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span>Start a conversation</span>
                        <motion.svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            animate={{
                                x: isHovered ? 4 : 0,
                            }}
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

                    {/* Subtle pulse ring */}
                    <motion.div
                        className="absolute inset-0 rounded-full border border-[var(--accent-current)] pointer-events-none"
                        animate={{
                            scale: [1, 1.2, 1.4],
                            opacity: [0.2, 0.1, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeOut',
                        }}
                    />
                </motion.div>

                {/* Footer note */}
                <motion.p
                    className="text-narrative-whisper text-[var(--text-muted)] mt-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 1 }}
                >
                    {email && (
                        <a
                            href={`mailto:${email}`}
                            className="hover:text-[var(--accent-current)] transition-colors"
                        >
                            {email}
                        </a>
                    )}
                </motion.p>
            </div>

            {/* End marker */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 1.2 }}
            >
                <div className="w-8 h-[1px] bg-[var(--accent-current)]/50" />
            </motion.div>
        </section>
    );
}
