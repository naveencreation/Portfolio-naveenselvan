import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

// Trade-off configuration
const TRADEOFFS = [
    {
        id: 'speed-quality',
        left: { label: 'Ship Fast', icon: '⚡' },
        right: { label: 'Ship Perfect', icon: '✨' },
        insight: "Speed wins early markets. Quality wins lasting ones. The art is knowing which phase you're in.",
    },
    {
        id: 'build-buy',
        left: { label: 'Build It', icon: '🔨' },
        right: { label: 'Buy It', icon: '💳' },
        insight: "Building creates ownership and customization. Buying creates speed and focus. Neither is wrong—context is everything.",
    },
    {
        id: 'simple-powerful',
        left: { label: 'Simple', icon: '◯' },
        right: { label: 'Powerful', icon: '◈' },
        insight: "Simplicity scales. Power impresses. The best systems find the elegant intersection.",
    },
];

// Morphing UI component that responds to slider
function MorphingUI({ value }: { value: number }) {
    // Value from 0 (left) to 1 (right)
    const leftOpacity = 1 - value;
    const rightOpacity = value;

    // UI properties that morph
    const borderRadius = 4 + value * 20; // 4px to 24px
    const padding = 16 + value * 16; // 16px to 32px
    const fontSize = 14 + value * 4; // 14px to 18px
    const letterSpacing = value * 0.1; // 0 to 0.1em
    const gridCols = value < 0.5 ? 3 : 2;

    return (
        <div className="relative w-full max-w-md mx-auto">
            {/* The morphing container */}
            <motion.div
                className="relative overflow-hidden bg-[var(--color-surface)] border border-[var(--accent-current)]/20"
                animate={{
                    borderRadius: `${borderRadius}px`,
                    padding: `${padding}px`,
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
                {/* Header that morphs */}
                <motion.div
                    className="mb-4"
                    animate={{
                        fontSize: `${fontSize}px`,
                        letterSpacing: `${letterSpacing}em`,
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <div
                        className="font-display font-medium"
                        style={{
                            color: value < 0.5
                                ? 'var(--accent-amber)'
                                : 'var(--accent-teal)'
                        }}
                    >
                        {value < 0.5 ? 'Minimal Interface' : 'Rich Interface'}
                    </div>
                </motion.div>

                {/* Grid that morphs */}
                <motion.div
                    className="gap-2"
                    animate={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
                    }}
                    transition={{ duration: 0.3 }}
                >
                    {Array.from({ length: 6 }, (_, i) => (
                        <motion.div
                            key={i}
                            className="aspect-video rounded bg-[var(--accent-current)]"
                            animate={{
                                opacity: 0.1 + (value * 0.3) + (i * 0.05),
                                borderRadius: `${borderRadius / 2}px`,
                            }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                        />
                    ))}
                </motion.div>

                {/* Density indicator */}
                <div className="mt-4 flex justify-between items-center text-xs text-[var(--text-muted)]">
                    <span style={{ opacity: leftOpacity }}>Less is more</span>
                    <span style={{ opacity: rightOpacity }}>More is more</span>
                </div>
            </motion.div>
        </div>
    );
}

// The signature trade-off slider
function TradeoffSlider({
    tradeoff,
    value,
    onChange
}: {
    tradeoff: typeof TRADEOFFS[0];
    value: number;
    onChange: (value: number) => void;
}) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleMove = useCallback((clientX: number) => {
        if (!trackRef.current) return;

        const rect = trackRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const newValue = x / rect.width;
        onChange(newValue);
    }, [onChange]);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        handleMove(e.clientX);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
    };

    useEffect(() => {
        if (!isDragging) return;

        const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
        const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
        const handleEnd = () => setIsDragging(false);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleEnd);
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchend', handleEnd);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleEnd);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleEnd);
        };
    }, [isDragging, handleMove]);

    return (
        <div className="tradeoff-slider">
            {/* Labels */}
            <div className="flex justify-between mb-4">
                <div className={`flex items-center gap-2 transition-all duration-300 ${value < 0.5 ? 'opacity-100 scale-105' : 'opacity-50'}`}>
                    <span className="text-2xl">{tradeoff.left.icon}</span>
                    <span className="font-display font-medium">{tradeoff.left.label}</span>
                </div>
                <div className={`flex items-center gap-2 transition-all duration-300 ${value > 0.5 ? 'opacity-100 scale-105' : 'opacity-50'}`}>
                    <span className="font-display font-medium">{tradeoff.right.label}</span>
                    <span className="text-2xl">{tradeoff.right.icon}</span>
                </div>
            </div>

            {/* Track */}
            <div
                ref={trackRef}
                className="tradeoff-track cursor-pointer"
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
            >
                {/* Handle */}
                <motion.div
                    className="tradeoff-handle"
                    style={{ left: `${value * 100}%` }}
                    animate={{
                        scale: isDragging ? 1.3 : 1,
                        boxShadow: isDragging
                            ? '0 8px 30px rgba(0, 0, 0, 0.4)'
                            : '0 4px 20px rgba(0, 0, 0, 0.3)',
                    }}
                    transition={{ duration: 0.2 }}
                />
            </div>

            {/* Value indicator */}
            <div className="text-center mt-6">
                <p className="text-narrative-whisper text-[var(--text-muted)]">
                    {tradeoff.insight}
                </p>
            </div>
        </div>
    );
}

export function ActThinking() {
    const actRef = useRef<HTMLElement>(null);
    const [currentTradeoff, setCurrentTradeoff] = useState(0);
    const [sliderValue, setSliderValue] = useState(0.5);

    useEffect(() => {
        // Reset slider when changing tradeoff
        setSliderValue(0.5);
    }, [currentTradeoff]);

    return (
        <section
            ref={actRef}
            className="act-thinking act-container relative"
        >
            <div className="act-content">
                {/* Act header */}
                <div className="narrative-center mb-16">
                    <motion.p
                        className="text-narrative-whisper mb-6 tracking-widest uppercase"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        Act IV
                    </motion.p>

                    <motion.h2
                        className="text-narrative-hero mb-8"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        How I
                        <br />
                        <span className="text-[var(--accent-current)]">Think</span>
                    </motion.h2>

                    <motion.p
                        className="text-narrative-statement max-w-2xl text-[var(--text-secondary)]"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        Good engineering is choosing
                        <br />
                        <span className="text-[var(--text-primary)]">what not to build.</span>
                    </motion.p>
                </div>

                {/* Interactive Section */}
                <motion.div
                    className="max-w-3xl mx-auto space-y-12"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    {/* Tradeoff selector */}
                    <div className="flex justify-center gap-3">
                        {TRADEOFFS.map((tradeoff, index) => (
                            <button
                                key={tradeoff.id}
                                onClick={() => setCurrentTradeoff(index)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${currentTradeoff === index
                                    ? 'bg-[var(--accent-current)] text-[var(--color-background)]'
                                    : 'bg-[var(--color-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                    }`}
                            >
                                {tradeoff.left.icon} / {tradeoff.right.icon}
                            </button>
                        ))}
                    </div>

                    {/* The Slider */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentTradeoff}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <TradeoffSlider
                                tradeoff={TRADEOFFS[currentTradeoff]}
                                value={sliderValue}
                                onChange={setSliderValue}
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* Morphing UI demonstration */}
                    <motion.div
                        className="pt-8"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        <p className="text-center text-narrative-whisper text-[var(--text-muted)] mb-6">
                            Drag the slider and watch the UI respond
                        </p>
                        <MorphingUI value={sliderValue} />
                    </motion.div>
                </motion.div>

                {/* Closing thought */}
                <motion.div
                    className="narrative-center mt-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <p className="text-narrative-whisper text-[var(--text-muted)] max-w-lg">
                        Every slider position represents a valid choice.
                        The wisdom is in understanding why you chose it.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
