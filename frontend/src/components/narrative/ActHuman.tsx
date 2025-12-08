import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Profile } from '@/types/portfolio';

interface ActHumanProps {
    profile: Profile | null;
}

export function ActHuman({ profile }: ActHumanProps) {
    const containerRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
    const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.02, 1, 0.98]);

    return (
        <section
            ref={containerRef}
            className="act-human relative overflow-hidden"
            style={{
                minHeight: '100vh',
                background: '#08080a',
            }}
        >
            {/* ===== FULL-WIDTH CINEMATIC PORTRAIT - LEFT SIDE ===== */}

            {/* Portrait - 60-70% width, positioned LEFT (looking into content) */}
            <motion.div
                className="absolute inset-0"
                style={{ y: imageY, scale: imageScale }}
            >
                <div
                    className="absolute top-0 h-full"
                    style={{ width: '75%', left: '10%' }}
                >
                    <img
                        src="/profile.png"
                        alt=""
                        className="absolute top-1/2 left-0 -translate-y-1/2 h-[110%] w-auto max-w-none object-cover object-top"
                        style={{
                            filter: 'contrast(1.08) brightness(0.85) saturate(0.85)',
                            /* Single asymmetric radial mask - offset right so left edge fades more */
                            maskImage: `
                                radial-gradient(
                                    ellipse 55% 75% at 55% 50%,
                                    black 25%,
                                    rgba(0,0,0,0.9) 40%,
                                    rgba(0,0,0,0.6) 60%,
                                    rgba(0,0,0,0.3) 80%,
                                    transparent 100%
                                )
                            `,
                            WebkitMaskImage: `
                                radial-gradient(
                                    ellipse 55% 75% at 55% 50%,
                                    black 25%,
                                    rgba(0,0,0,0.9) 40%,
                                    rgba(0,0,0,0.6) 60%,
                                    rgba(0,0,0,0.3) 80%,
                                    transparent 100%
                                )
                            `,
                        }}
                    />
                </div>
            </motion.div>

            {/* Top vignette */}
            <div
                className="absolute inset-x-0 top-0 h-48 pointer-events-none"
                style={{
                    background: 'linear-gradient(to bottom, #08080a 0%, transparent 100%)',
                }}
            />

            {/* Bottom vignette */}
            <div
                className="absolute inset-x-0 bottom-0 h-80 pointer-events-none"
                style={{
                    background: 'linear-gradient(to top, #08080a 0%, rgba(8,8,10,0.8) 40%, transparent 100%)',
                }}
            />

            {/* Right side light falloff - fills negative space */}
            <div
                className="absolute right-0 top-0 bottom-0 pointer-events-none"
                style={{
                    width: '50%',
                    background: `
                        radial-gradient(ellipse 80% 60% at 80% 50%, rgba(30,25,40,0.15) 0%, transparent 70%),
                        linear-gradient(to left, rgba(8,8,10,0.3) 0%, transparent 100%)
                    `,
                }}
            />

            {/* Unified color grading overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'linear-gradient(135deg, rgba(50,40,70,0.08) 0%, transparent 50%, rgba(30,40,50,0.05) 100%)',
                    mixBlendMode: 'overlay',
                }}
            />

            {/* Cinematic grain */}
            <div
                className="absolute inset-0 opacity-[0.035] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* ===== TYPOGRAPHY - RIGHT SIDE ===== */}
            <div className="relative z-10 min-h-screen flex flex-col justify-center items-end text-right pr-[8%] md:pr-[10%] lg:pr-[12%] pl-8">

                {/* Act label */}
                <motion.span
                    className="text-[10px] tracking-[0.6em] uppercase mb-8"
                    style={{ color: 'rgba(160,150,180,0.4)' }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5 }}
                >
                    Act V
                </motion.span>

                {/* Name - Large, confident, editorial */}
                <motion.h2
                    className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-extralight tracking-tight mb-4"
                    style={{
                        color: '#f0f0f5',
                        textShadow: '0 0 120px rgba(100,80,140,0.25), 0 8px 40px rgba(0,0,0,0.6)',
                        lineHeight: 0.9,
                    }}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                >
                    {profile?.name || 'Naveen'}
                </motion.h2>

                {/* Role */}
                <motion.p
                    className="text-lg md:text-xl tracking-widest mb-10"
                    style={{ color: 'rgba(180,175,195,0.7)' }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.15 }}
                >
                    {profile?.title || 'Engineer & Creator'}
                </motion.p>

                {/* Philosophy */}
                <motion.p
                    className="text-sm md:text-base tracking-wide"
                    style={{ color: 'rgba(130,125,150,0.6)' }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                >
                    Still learning<span className="mx-2 opacity-40">·</span>Still building
                </motion.p>

                {/* Tagline */}
                {profile?.tagline && (
                    <motion.p
                        className="text-xs tracking-wide mt-6 max-w-sm"
                        style={{ color: 'rgba(100,95,120,0.5)' }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.45 }}
                    >
                        {profile.tagline}
                    </motion.p>
                )}
            </div>
        </section>
    );
}
