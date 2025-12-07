import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Profile } from '@/types/portfolio';

interface ActEngineeringProps {
    profile: Profile | null;
}

// Terminal command configuration
const TERMINAL_COMMANDS = [
    {
        command: 'whoami --mindset',
        output: 'engineer: systematic thinker, problem solver',
    },
    {
        command: 'cat philosophy.txt',
        output: [
            '→ Frontend is perception.',
            '→ Backend is truth.',
            '→ Engineering is responsibility.',
        ],
    },
    {
        command: 'ls skills/',
        output: 'react/  typescript/  python/  node/  postgres/',
    },
    {
        command: 'git log --oneline -1',
        output: '✓ Always learning. Always building.',
    },
];

// Simple typewriter effect using pure state
function Typewriter({
    text,
    speed = 50,
    delay = 0,
    onComplete
}: {
    text: string;
    speed?: number;
    delay?: number;
    onComplete?: () => void;
}) {
    const [displayed, setDisplayed] = useState('');
    const [started, setStarted] = useState(false);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        const startTimer = setTimeout(() => {
            setStarted(true);
        }, delay);

        return () => clearTimeout(startTimer);
    }, [delay]);

    useEffect(() => {
        if (!started || completed) return;

        if (displayed.length < text.length) {
            const timer = setTimeout(() => {
                setDisplayed(text.slice(0, displayed.length + 1));
            }, speed);
            return () => clearTimeout(timer);
        } else {
            setCompleted(true);
            onComplete?.();
        }
    }, [displayed, text, speed, started, completed, onComplete]);

    return (
        <>
            {displayed}
            {started && !completed && <span className="inline-block w-2 h-4 bg-current animate-pulse ml-0.5" />}
        </>
    );
}

// Single command line with typing effect
function CommandLine({
    command,
    output,
    startDelay,
    onComplete
}: {
    command: string;
    output: string | string[];
    startDelay: number;
    onComplete?: () => void;
}) {
    const [showOutput, setShowOutput] = useState(false);

    const handleCommandDone = () => {
        setTimeout(() => {
            setShowOutput(true);
            setTimeout(() => {
                onComplete?.();
            }, 300);
        }, 200);
    };

    return (
        <div className="mb-5">
            {/* Command prompt */}
            <div className="flex items-start gap-2 flex-wrap">
                <span className="text-[#14b8a6] shrink-0">➜</span>
                <span className="text-[#8b5cf6] shrink-0">~/engineering</span>
                <span className="text-[#475569] shrink-0">$</span>
                <span className="text-[#f8fafc]">
                    <Typewriter
                        text={command}
                        speed={45}
                        delay={startDelay}
                        onComplete={handleCommandDone}
                    />
                </span>
            </div>

            {/* Command output */}
            {showOutput && (
                <motion.div
                    className="mt-2 pl-6 text-[#94a3b8]"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {Array.isArray(output) ? (
                        output.map((line, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                {line}
                            </motion.div>
                        ))
                    ) : (
                        <div>{output}</div>
                    )}
                </motion.div>
            )}
        </div>
    );
}

export function ActEngineering({ profile }: ActEngineeringProps) {
    const terminalRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(terminalRef, { once: true, margin: "-100px" });
    const [visibleCommands, setVisibleCommands] = useState(0);

    // Start showing first command when in view
    useEffect(() => {
        if (isInView && visibleCommands === 0) {
            setVisibleCommands(1);
        }
    }, [isInView, visibleCommands]);

    const handleCommandComplete = (index: number) => {
        if (index < TERMINAL_COMMANDS.length - 1) {
            setVisibleCommands(index + 2);
        }
    };

    // Calculate delays - each command starts after previous one
    const getDelay = (index: number) => {
        if (index === 0) return 300; // Small initial delay
        return 0; // Subsequent commands start immediately when shown
    };

    return (
        <section className="act-engineering act-container relative">
            <div className="act-content">
                {/* Act header */}
                <div className="narrative-center mb-12">
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

                {/* Terminal Window */}
                <motion.div
                    ref={terminalRef}
                    className="max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Terminal chrome */}
                    <div className="rounded-t-lg bg-[#1a1a24] px-4 py-3 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                        <span className="ml-4 text-xs text-[#475569] font-mono">
                            terminal — zsh
                        </span>
                    </div>

                    {/* Terminal body */}
                    <div
                        className="relative bg-[#0a0a0f] rounded-b-lg p-6 font-mono text-sm md:text-base min-h-[350px]"
                        style={{
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
                            border: '1px solid #1a1a24',
                            borderTop: 'none',
                        }}
                    >
                        {/* Commands */}
                        {TERMINAL_COMMANDS.map((cmd, index) => (
                            index < visibleCommands && (
                                <CommandLine
                                    key={index}
                                    command={cmd.command}
                                    output={cmd.output}
                                    startDelay={getDelay(index)}
                                    onComplete={() => handleCommandComplete(index)}
                                />
                            )
                        ))}

                        {/* Waiting cursor at end */}
                        {visibleCommands > TERMINAL_COMMANDS.length - 1 && (
                            <motion.div
                                className="flex items-center gap-2 mt-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <span className="text-[#14b8a6]">➜</span>
                                <span className="text-[#8b5cf6]">~/engineering</span>
                                <span className="text-[#475569]">$</span>
                                <span className="inline-block w-2 h-4 bg-[#f8fafc] animate-pulse" />
                            </motion.div>
                        )}

                        {/* Empty state cursor */}
                        {visibleCommands === 0 && (
                            <div className="flex items-center gap-2">
                                <span className="text-[#14b8a6]">➜</span>
                                <span className="text-[#8b5cf6]">~/engineering</span>
                                <span className="text-[#475569]">$</span>
                                <span className="inline-block w-2 h-4 bg-[#f8fafc] animate-pulse" />
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Profile integration */}
                {profile && (
                    <motion.div
                        className="narrative-center mt-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <p className="text-narrative-whisper mb-2">Currently</p>
                        <p className="text-narrative-body text-[var(--text-primary)]">
                            {profile.title}
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
