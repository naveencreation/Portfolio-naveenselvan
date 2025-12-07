import { useRef } from 'react';
import { motion } from 'framer-motion';
import type { Profile } from '@/types/portfolio';

interface ActHumanProps {
    profile: Profile | null;
}

export function ActHuman({ profile }: ActHumanProps) {
    const actRef = useRef<HTMLElement>(null);

    return (
        <section
            ref={actRef}
            className="act-human act-container relative"
        >
            {/* Subtle background breathing effect */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, var(--accent-current) 0%, transparent 70%)',
                        opacity: 0.05,
                    }}
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.03, 0.06, 0.03],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
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
                    Act V
                </motion.p>

                {/* Portrait placeholder */}
                <motion.div
                    className="relative mb-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-[var(--accent-current)]/30 flex items-center justify-center overflow-hidden">
                        {/* Stylized portrait placeholder */}
                        <div className="w-full h-full bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-background)] flex items-center justify-center">
                            <motion.div
                                className="text-5xl md:text-6xl"
                                animate={{
                                    opacity: [0.6, 1, 0.6],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                            >
                                👤
                            </motion.div>
                        </div>
                    </div>

                    {/* Gentle ring animation */}
                    <motion.div
                        className="absolute inset-0 rounded-full border border-[var(--accent-current)]"
                        animate={{
                            scale: [1, 1.3, 1.5],
                            opacity: [0.3, 0.1, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeOut',
                        }}
                    />
                </motion.div>

                {/* Name */}
                {profile?.name && (
                    <motion.h2
                        className="text-narrative-statement text-[var(--text-primary)] mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        {profile.name}
                    </motion.h2>
                )}

                {/* Minimal text */}
                <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                >
                    <p className="text-narrative-body text-[var(--text-secondary)]">
                        Still learning.
                    </p>
                    <p className="text-narrative-body text-[var(--text-secondary)]">
                        Still building.
                    </p>
                </motion.div>

                {/* Subtle tagline if available */}
                {profile?.tagline && (
                    <motion.p
                        className="text-narrative-whisper text-[var(--text-muted)] mt-8 max-w-md"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.8 }}
                    >
                        {profile.tagline}
                    </motion.p>
                )}
            </div>
        </section>
    );
}
