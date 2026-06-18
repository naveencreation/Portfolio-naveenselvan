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
                <div
                    key={act.num}
                    className="relative group cursor-pointer py-1"
                >
                    {/* Dot */}
                    <div
                        className={`scroll-dot ${currentAct >= act.num ? 'active' : ''}`}
                    />

                    {/* Label on hover */}
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-350">
                        <span className="text-[10px] font-mono text-[var(--text-secondary)] bg-[#0d0d14]/90 border border-white/5 px-2.5 py-1 rounded-md shadow-xl backdrop-blur-md">
                            {act.label}
                        </span>
                    </div>
                </div>
            ))}
        </motion.div>
    );
}
