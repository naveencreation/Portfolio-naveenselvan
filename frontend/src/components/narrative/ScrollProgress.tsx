import { motion } from 'framer-motion';

interface ScrollProgressProps {
    currentAct: number;
}

const ACTS = [
    { num: 1, label: 'Curiosity' },
    { num: 2, label: 'Engineering' },
    { num: 3, label: 'Projects' },
    { num: 4, label: 'Thinking' },
    { num: 5, label: 'Human' },
    { num: 6, label: 'Future' },
];

export function ScrollProgress({ currentAct }: ScrollProgressProps) {
    return (
        <motion.div
            className="scroll-progress-container visible"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
        >
            {ACTS.map((act) => (
                <motion.div
                    key={act.num}
                    className="relative group"
                    whileHover={{ scale: 1.2 }}
                >
                    {/* Dot */}
                    <div
                        className={`scroll-dot ${currentAct >= act.num ? 'active' : ''}`}
                    />

                    {/* Label on hover */}
                    <motion.div
                        className="absolute right-6 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none"
                        initial={{ opacity: 0, x: 10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <span className="text-xs font-mono text-[var(--text-muted)] bg-[var(--color-surface)] px-2 py-1 rounded">
                            {act.label}
                        </span>
                    </motion.div>
                </motion.div>
            ))}
        </motion.div>
    );
}
