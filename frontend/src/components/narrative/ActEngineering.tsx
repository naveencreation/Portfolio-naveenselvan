import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import type { Profile } from '@/types/portfolio';

gsap.registerPlugin(ScrollTrigger);

interface ActEngineeringProps {
    profile: Profile | null;
}

// Statement that animates with typing effect
function EngineeringStatement({
    text,
    delay = 0
}: {
    text: string;
    delay?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        gsap.fromTo(
            ref.current,
            {
                opacity: 0,
                x: -40,
                clipPath: 'inset(0 100% 0 0)',
            },
            {
                opacity: 1,
                x: 0,
                clipPath: 'inset(0 0% 0 0)',
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: ref.current,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse',
                },
                delay,
            }
        );
    }, [delay]);

    return (
        <div ref={ref} className="opacity-0">
            <p className="text-narrative-statement text-[var(--text-primary)] mb-2">
                {text.split('.')[0]}.
            </p>
            {text.includes('.') && text.split('.')[1] && (
                <p className="text-narrative-whisper text-[var(--text-muted)]">
                    {text.split('.').slice(1).join('.')}
                </p>
            )}
        </div>
    );
}

// Grid that materializes as user scrolls
function MaterializingGrid() {
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!gridRef.current) return;

        const cells = gridRef.current.querySelectorAll('.grid-cell');

        gsap.fromTo(
            cells,
            {
                opacity: 0,
                scale: 0,
            },
            {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                stagger: {
                    grid: [4, 4],
                    from: 'center',
                    amount: 1,
                },
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse',
                },
            }
        );
    }, []);

    return (
        <div
            ref={gridRef}
            className="grid grid-cols-4 gap-2 w-full max-w-xs mx-auto"
        >
            {Array.from({ length: 16 }, (_, i) => (
                <div
                    key={i}
                    className="grid-cell aspect-square rounded-sm"
                    style={{
                        background: `var(--accent-current)`,
                        opacity: 0.1 + (i % 4) * 0.15,
                    }}
                />
            ))}
        </div>
    );
}

// Code block that appears with syntax highlighting
function CodeReveal() {
    const codeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!codeRef.current) return;

        const lines = codeRef.current.querySelectorAll('.code-line');

        gsap.fromTo(
            lines,
            {
                opacity: 0,
                x: -20,
            },
            {
                opacity: 1,
                x: 0,
                duration: 0.4,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: codeRef.current,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse',
                },
            }
        );
    }, []);

    const codeLines = [
        { text: 'const', color: 'text-[#c792ea]' },
        { text: ' engineer', color: 'text-[#82aaff]' },
        { text: ' = {', color: 'text-[var(--text-secondary)]' },
        { text: '  think:', color: 'text-[#c3e88d]' },
        { text: ' systematically,', color: 'text-[var(--text-secondary)]' },
        { text: '  build:', color: 'text-[#c3e88d]' },
        { text: ' responsibly,', color: 'text-[var(--text-secondary)]' },
        { text: '  iterate:', color: 'text-[#c3e88d]' },
        { text: ' continuously', color: 'text-[var(--text-secondary)]' },
        { text: '};', color: 'text-[var(--text-secondary)]' },
    ];

    return (
        <div
            ref={codeRef}
            className="font-mono text-sm md:text-base p-6 rounded-lg bg-[var(--color-surface)] border border-[var(--accent-current)]/10"
        >
            {codeLines.map((line, i) => (
                <div key={i} className="code-line opacity-0 leading-relaxed">
                    <span className={line.color}>{line.text}</span>
                </div>
            ))}
        </div>
    );
}

export function ActEngineering({ profile }: ActEngineeringProps) {
    const actRef = useRef<HTMLElement>(null);

    return (
        <section
            ref={actRef}
            className="act-engineering act-container relative"
            style={{ minHeight: '200vh' }}
        >
            {/* Background grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `
            linear-gradient(var(--accent-current) 1px, transparent 1px),
            linear-gradient(90deg, var(--accent-current) 1px, transparent 1px)
          `,
                    backgroundSize: '60px 60px',
                }}
            />

            <div className="act-content space-y-[30vh]">
                {/* Act header */}
                <div className="narrative-center">
                    <motion.p
                        className="text-narrative-whisper mb-6 tracking-widest uppercase"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        Act II
                    </motion.p>

                    <motion.h2
                        className="text-narrative-hero mb-8"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="text-[var(--accent-current)]">Engineering</span>
                        <br />
                        <span className="text-[var(--text-secondary)]">Mindset</span>
                    </motion.h2>
                </div>

                {/* Statement 1: Frontend */}
                <div className="narrative-split">
                    <div className="space-y-6">
                        <EngineeringStatement
                            text="Frontend is perception. It shapes how users feel before they think."
                        />
                    </div>
                    <div className="flex justify-center">
                        <div className="w-48 h-32 rounded-lg glass-subtle flex items-center justify-center">
                            <div className="text-6xl">👁️</div>
                        </div>
                    </div>
                </div>

                {/* Statement 2: Backend */}
                <div className="narrative-split">
                    <div className="flex justify-center order-2 md:order-1">
                        <MaterializingGrid />
                    </div>
                    <div className="space-y-6 order-1 md:order-2">
                        <EngineeringStatement
                            text="Backend is truth. It's the foundation that holds everything together."
                            delay={0.2}
                        />
                    </div>
                </div>

                {/* Statement 3: Engineering */}
                <div className="narrative-center space-y-12">
                    <EngineeringStatement
                        text="Engineering is responsibility. Every decision carries weight."
                        delay={0.1}
                    />
                    <CodeReveal />
                </div>

                {/* Profile integration */}
                {profile && (
                    <motion.div
                        className="narrative-center pt-20"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <p className="text-narrative-whisper mb-4">Currently</p>
                        <p className="text-narrative-body text-[var(--text-primary)]">
                            {profile.title}
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
