import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Project } from '@/types/portfolio';

gsap.registerPlugin(ScrollTrigger);

interface ActProjectsProps {
    projects: Project[];
}

export function ActProjects({ projects }: ActProjectsProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const deckWrapperRef = useRef<HTMLDivElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [activeIdx, setActiveIdx] = useState(0);

    // Sort: featured project first
    const sortedProjects = [...projects].sort((a, b) => b.is_featured - a.is_featured);

    useEffect(() => {
        if (!deckWrapperRef.current || sortedProjects.length === 0) return;

        cardRefs.current = cardRefs.current.slice(0, sortedProjects.length);

        const ctx = gsap.context(() => {
            // ─── Set all non-first cards below viewport initially ───
            sortedProjects.forEach((_, idx) => {
                if (idx > 0 && cardRefs.current[idx]) {
                    gsap.set(cardRefs.current[idx], {
                        yPercent: 110,
                        scale: 0.95,
                        opacity: 0,
                        transformOrigin: 'top center',
                    });
                } else if (idx === 0 && cardRefs.current[idx]) {
                    gsap.set(cardRefs.current[idx], {
                        yPercent: 0,
                        scale: 1,
                        opacity: 1,
                        transformOrigin: 'top center',
                    });
                }
            });

            // ─── Header: fade-in elements on scroll naturally (non-pinned) ───
            if (headerRef.current) {
                gsap.set(headerRef.current.querySelectorAll('.hdr-item'), {
                    opacity: 0,
                    y: 30,
                });
                gsap.to(headerRef.current.querySelectorAll('.hdr-item'), {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                });
            }

            // ─── PIN ONLY DECK WRAPPER ───
            const numTransitions = sortedProjects.length - 1;
            const scrollLength = numTransitions * 100; // in vh units

            const mainTl = gsap.timeline({
                scrollTrigger: {
                    trigger: deckWrapperRef.current,
                    start: 'top 12%',      // Pin when the card wrapper is near the top of the viewport
                    end: `+=${scrollLength}vh`,
                    pin: true,
                    pinSpacing: true,      // adds pin-spacer to push downstream content down
                    scrub: 0.6,            // smooth scrub
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const currentIdx = Math.min(
                            Math.floor(progress * numTransitions + 0.5),
                            sortedProjects.length - 1
                        );
                        setActiveIdx(currentIdx);
                    },
                },
            });

            // ─── Animate each card transition ───
            sortedProjects.forEach((_, idx) => {
                if (idx === 0) return; // card 0 is the starting card

                const incomingCard = cardRefs.current[idx];
                const segStart = `${((idx - 1) / numTransitions) * 100}%`;

                // Slide incoming card up from below and fade in
                mainTl.fromTo(
                    incomingCard,
                    {
                        yPercent: 110,
                        opacity: 0,
                        scale: 0.95
                    },
                    {
                        yPercent: 0,
                        scale: 1,
                        opacity: 1,
                        duration: 1,
                        ease: 'power2.inOut',
                    },
                    segStart
                );

                // Push previous cards into the background (scale down + move up slightly)
                for (let prevIdx = 0; prevIdx < idx; prevIdx++) {
                    const prevCard = cardRefs.current[prevIdx];
                    if (!prevCard) continue;

                    const depth = idx - prevIdx;
                    const scaleVal = Math.max(0.88, 1 - depth * 0.04);
                    const opacityVal = depth === 1 ? 1 : depth === 2 ? 0.5 : 0;
                    const yOffset = -(depth * 18);

                    mainTl.to(
                        prevCard,
                        {
                            scale: scaleVal,
                            opacity: opacityVal,
                            y: yOffset,
                            duration: 1,
                            ease: 'power2.inOut',
                        },
                        segStart
                    );
                }
            });
        }, deckWrapperRef);

        // Recalculate ScrollTrigger start/end values after pinning/spacer layout setup
        ScrollTrigger.refresh();

        return () => {
            if (ctx) ctx.revert();
        };
    }, [sortedProjects.length]);

    if (!projects || projects.length === 0) return null;

    return (
        <section
            ref={sectionRef}
            className="act-projects w-full bg-[var(--color-background)] py-20 relative block"
        >
            <div className="max-w-5xl mx-auto w-full px-6">
                
                {/* ── Act Header (Scrolls naturally) ── */}
                <div ref={headerRef} className="narrative-center mb-16">
                    <p className="hdr-item text-narrative-whisper mb-4 tracking-widest uppercase">
                        Act III
                    </p>

                    <h2 className="hdr-item text-narrative-hero mb-6">
                        Projects that
                        <br />
                        <span className="text-[var(--accent-current)] transition-colors duration-500">
                            tell stories
                        </span>
                    </h2>

                    <p className="hdr-item text-narrative-body max-w-xl text-center">
                        Each project began with a problem worth solving,
                        a process of thinking through constraints,
                        and a solution that balanced ambition with practicality.
                    </p>
                </div>

                {/* ── Pinned Wrapper (Block element for clean pinning) ── */}
                <div ref={deckWrapperRef} className="w-full block">
                    <div className="w-full flex flex-col items-center">
                        {/* ── Card Deck ── */}
                        <div
                            ref={cardsContainerRef}
                            className="relative w-full max-w-4xl mx-auto"
                            style={{ height: 'clamp(440px, 52vh, 580px)' }}
                        >
                            {sortedProjects.map((project, idx) => {
                                let highlightsList: string[] = [];
                                if (project.highlights) {
                                    try {
                                        highlightsList = JSON.parse(project.highlights);
                                    } catch {
                                        highlightsList = project.highlights.split('.').filter(h => h.trim());
                                    }
                                }
                                const technologies = project.technologies?.split(',').map(t => t.trim()) || [];

                                return (
                                    <div
                                        key={project.id}
                                        ref={(el) => { cardRefs.current[idx] = el; }}
                                        className="absolute inset-0 w-full h-full rounded-3xl bg-[#0c0c12] border border-white/10 p-6 md:p-10 flex flex-col justify-between overflow-hidden shadow-2xl"
                                        style={{
                                            zIndex: idx + 1,
                                            transformOrigin: 'top center',
                                            willChange: 'transform, opacity',
                                            backfaceVisibility: 'hidden',
                                        }}
                                    >
                                        {/* Background Watermark */}
                                        <div className="absolute right-6 bottom-4 text-[7rem] md:text-[10rem] font-display font-bold text-[var(--accent-current)]/[0.03] pointer-events-none select-none z-0 leading-none transition-colors duration-500">
                                            {String(idx + 1).padStart(2, '0')}
                                        </div>

                                        {/* Card Content */}
                                        <div className="relative z-10 flex flex-col h-full justify-between">
                                            {/* Header Row */}
                                            <div className="flex justify-between items-start gap-4">
                                                <div>
                                                    <span className="text-xs font-mono font-medium text-[var(--accent-current)] uppercase tracking-wider transition-colors duration-500">
                                                        {project.role || 'Developer'}
                                                    </span>
                                                    <h3 className="text-xl md:text-3xl font-display font-medium text-[var(--text-primary)] mt-1">
                                                        {project.title}
                                                    </h3>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex items-center gap-2 shrink-0">
                                                    {project.github && (
                                                        <a
                                                            href={project.github}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[var(--accent-current)]/30 hover:bg-white/10 text-[var(--text-secondary)] hover:text-white transition-all"
                                                            aria-label="GitHub Repository"
                                                        >
                                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                            </svg>
                                                        </a>
                                                    )}
                                                    {project.link && (
                                                        <a
                                                            href={project.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-2.5 rounded-full bg-[var(--accent-current)]/10 border border-[var(--accent-current)]/20 hover:bg-[var(--accent-current)]/20 hover:border-[var(--accent-current)]/40 text-[var(--accent-current)] transition-all"
                                                            aria-label="Live Demo"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                            </svg>
                                                        </a>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Middle Content */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 my-4 flex-grow overflow-y-auto max-h-[260px] md:max-h-[320px] pr-2 custom-scrollbar">
                                                {/* Left: The Challenge */}
                                                <div className="space-y-3">
                                                    <h4 className="text-xs uppercase tracking-widest text-[#f59e0b] font-mono font-bold flex items-center gap-1.5">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
                                                        The Challenge
                                                    </h4>
                                                    <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed font-light">
                                                        {project.description}
                                                    </p>
                                                </div>

                                                {/* Right: Key Highlights */}
                                                <div className="space-y-3">
                                                    <h4 className="text-xs uppercase tracking-widest text-[#8b5cf6] font-mono font-bold flex items-center gap-1.5">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
                                                        Key Highlights
                                                    </h4>
                                                    {highlightsList.length > 0 && (
                                                        <ul className="space-y-2 text-sm text-[var(--text-secondary)] font-light leading-relaxed list-none pl-0">
                                                            {highlightsList.map((highlight, hIdx) => (
                                                                <li key={hIdx} className="flex gap-2 items-start">
                                                                    <span className="text-[var(--accent-current)] text-xs mt-1 shrink-0 transition-colors duration-500">✦</span>
                                                                    <span>{highlight}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Footer: Tech Stack */}
                                            {technologies.length > 0 && (
                                                <div className="border-t border-white/5 pt-4 flex flex-wrap gap-2 items-center">
                                                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mr-2">
                                                        Stack:
                                                    </span>
                                                    {technologies.map((tech, tIdx) => (
                                                        <span
                                                            key={tIdx}
                                                            className="px-2 py-0.5 text-xs font-mono bg-white/5 border border-white/10 rounded-md text-[var(--text-secondary)]"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* ── Progress Dots ── */}
                        <div className="flex justify-center items-center gap-3 mt-8">
                            {sortedProjects.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`h-1.5 rounded-full transition-all duration-500 ${
                                        idx === activeIdx
                                            ? 'bg-[var(--accent-current)] w-8'
                                            : 'bg-white/10 w-2.5'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
