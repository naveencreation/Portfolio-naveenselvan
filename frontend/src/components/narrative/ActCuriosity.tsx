import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

// Floating shape component for chaos animation
function ChaosShape({
    index,
    type
}: {
    index: number;
    type: 'square' | 'circle' | 'line'
}) {
    const shapeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!shapeRef.current) return;

        // Random initial position
        const randomX = Math.random() * 100 - 50;
        const randomY = Math.random() * 100 - 50;
        const randomRotation = Math.random() * 360;
        const randomScale = 0.5 + Math.random() * 1;

        gsap.set(shapeRef.current, {
            x: randomX + '%',
            y: randomY + '%',
            rotation: randomRotation,
            scale: randomScale,
            opacity: 0,
        });

        // Animate chaos to order
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.act-curiosity',
                start: 'top center',
                end: 'bottom center',
                scrub: 1,
            },
        });

        tl.to(shapeRef.current, {
            opacity: 0.6,
            duration: 0.3,
        })
            .to(shapeRef.current, {
                x: 0,
                y: 0,
                rotation: 0,
                scale: 1,
                opacity: 1,
                duration: 0.7,
                ease: 'power2.inOut',
            });

        // Continuous subtle float animation
        gsap.to(shapeRef.current, {
            y: '+=10',
            rotation: '+=5',
            duration: 3 + Math.random() * 2,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: Math.random() * 2,
        });
    }, []);

    const shapeStyles = {
        square: 'w-8 h-8 md:w-12 md:h-12 border border-current',
        circle: 'w-6 h-6 md:w-10 md:h-10 rounded-full border border-current',
        line: 'w-16 h-0.5 md:w-24 bg-current',
    };

    return (
        <div
            ref={shapeRef}
            className={`absolute ${shapeStyles[type]} text-[var(--accent-current)] opacity-0 will-change-transform`}
            style={{
                left: `${15 + (index % 5) * 17}%`,
                top: `${10 + Math.floor(index / 5) * 20}%`,
            }}
        />
    );
}

// Incomplete interface fragment
function InterfaceFragment({ index }: { index: number }) {
    const fragmentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!fragmentRef.current) return;

        gsap.fromTo(
            fragmentRef.current,
            {
                opacity: 0,
                scale: 0.8,
                y: 50,
            },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: fragmentRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
                delay: index * 0.15,
            }
        );
    }, [index]);

    const fragments = [
        // Incomplete search bar
        <div className="w-48 h-8 rounded-lg bg-[var(--color-surface)] border border-[var(--accent-current)]/20 flex items-center px-3 gap-2">
            <div className="w-3 h-3 rounded-full border border-current opacity-40" />
            <div className="w-16 h-2 rounded bg-current opacity-20" />
        </div>,
        // Incomplete button
        <div className="w-24 h-10 rounded-md bg-[var(--accent-current)]/10 border border-[var(--accent-current)]/30" />,
        // Incomplete card header
        <div className="w-32 h-20 rounded-lg bg-[var(--color-surface)] border border-current/10 p-3">
            <div className="w-full h-2 rounded bg-current opacity-30 mb-2" />
            <div className="w-2/3 h-2 rounded bg-current opacity-20" />
        </div>,
        // Navigation dots
        <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-current opacity-30" />
            ))}
        </div>,
        // Toggle switch
        <div className="w-12 h-6 rounded-full bg-[var(--color-surface)] border border-current/20 p-1">
            <div className="w-4 h-4 rounded-full bg-current opacity-40" />
        </div>,
    ];

    return (
        <div
            ref={fragmentRef}
            className="absolute opacity-0 text-[var(--accent-current)]"
            style={{
                left: `${10 + (index % 4) * 22}%`,
                top: `${20 + Math.floor(index / 4) * 25}%`,
            }}
        >
            {fragments[index % fragments.length]}
        </div>
    );
}

export function ActCuriosity() {
    const actRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!textRef.current) return;

        // Animate the main text
        gsap.fromTo(
            textRef.current,
            {
                opacity: 0,
                y: 60,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: textRef.current,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse',
                },
            }
        );
    }, []);

    // Generate shapes for chaos animation
    const shapes = Array.from({ length: 15 }, (_, i) => ({
        type: (['square', 'circle', 'line'] as const)[i % 3],
        index: i,
    }));

    return (
        <section
            ref={actRef}
            className="act-curiosity act-container act-container-hero relative overflow-hidden"
        >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-radial from-[var(--accent-current)]/5 via-transparent to-transparent opacity-50" />

            {/* Chaos shapes layer */}
            <div className="absolute inset-0 pointer-events-none">
                {shapes.map(({ type, index }) => (
                    <ChaosShape key={index} index={index} type={type} />
                ))}
            </div>

            {/* Interface fragments layer */}
            <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 5 }, (_, i) => (
                    <InterfaceFragment key={i} index={i} />
                ))}
            </div>

            {/* Main narrative text */}
            <div className="act-content narrative-center relative z-20">
                <div ref={textRef} className="max-w-3xl">
                    <motion.p
                        className="text-narrative-whisper mb-6 tracking-widest uppercase"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        Act I
                    </motion.p>

                    <h1 className="text-narrative-hero text-gradient-flow animate-gradient-flow mb-8">
                        Curiosity
                    </h1>

                    <p className="text-narrative-statement text-[var(--text-secondary)] leading-relaxed">
                        I started by asking
                        <br />
                        <span className="text-[var(--text-primary)]">how things work.</span>
                    </p>
                </div>
            </div>

            {/* Cinematic Pulse Indicator - Heartbeat rings + floating chevron */}
            <motion.div
                className="absolute bottom-20 left-1/2 -translate-x-1/2 w-16 h-16 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 1.5 }}
            >
                {/* Expanding pulse rings - like heartbeat/sonar */}
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full border"
                        style={{
                            width: 64,
                            height: 64,
                            borderColor: 'rgba(139, 92, 246, 0.4)',
                        }}
                        animate={{
                            scale: [1, 2.5, 3],
                            opacity: [0.6, 0.2, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 1,
                            ease: 'easeOut',
                        }}
                    />
                ))}

                {/* Central glowing orb with chevron */}
                <motion.div
                    className="relative flex items-center justify-center"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                    {/* Glow backdrop */}
                    <div
                        className="absolute w-14 h-14 rounded-full"
                        style={{
                            background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
                            filter: 'blur(8px)',
                        }}
                    />

                    {/* Chevron */}
                    <motion.svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="relative z-10"
                        animate={{
                            opacity: [0.5, 1, 0.5],
                            filter: [
                                'drop-shadow(0 0 4px rgba(139,92,246,0.4))',
                                'drop-shadow(0 0 12px rgba(139,92,246,0.8))',
                                'drop-shadow(0 0 4px rgba(139,92,246,0.4))'
                            ]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <path
                            d="M6 9l6 6 6-6"
                            stroke="rgba(139, 92, 246, 0.9)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </motion.svg>
                </motion.div>
            </motion.div>
        </section>
    );
}
