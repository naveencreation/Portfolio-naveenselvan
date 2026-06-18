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
    const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

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
                        opacity: 1, // Keep fully opaque so content behind doesn't bleed through
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
            const scrollLength = numTransitions * 250; // Taller scroll budget (250vh per card transition) for much slower card movements

            const stepDuration = 1.0;
            const pauseDuration = 0.8; // Spaced out pauses between card transitions

            const mainTl = gsap.timeline({
                scrollTrigger: {
                    trigger: deckWrapperRef.current,
                    start: 'top 12%',      // Pin when the card wrapper is near the top of the viewport
                    end: `+=${scrollLength}vh`,
                    pin: true,
                    pinSpacing: true,      // adds pin-spacer to push downstream content down
                    scrub: 1.5,            // Luxurious, velvety scroll lag (1.5s catch-up) for buttery smoothness
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const time = progress * (numTransitions * stepDuration + (numTransitions - 1) * pauseDuration);
                        
                        let active = 0;
                        for (let i = 1; i < sortedProjects.length; i++) {
                            const startTime = (i - 1) * (stepDuration + pauseDuration);
                            // Switch dot indicator active state when incoming card is 50% transitioned
                            if (time >= startTime + (stepDuration * 0.5)) {
                                active = i;
                            }
                        }
                        setActiveIdx(active);
                    },
                },
            });

            // ─── Animate each card transition ───
            sortedProjects.forEach((_, idx) => {
                if (idx === 0) return; // card 0 is the starting card

                const incomingCard = cardRefs.current[idx];
                const startTime = (idx - 1) * (stepDuration + pauseDuration);

                // Slide incoming card up from below (fully opaque to prevent text bleed)
                mainTl.fromTo(
                    incomingCard,
                    {
                        yPercent: 110,
                        opacity: 1,
                        scale: 0.95
                    },
                    {
                        yPercent: 0,
                        scale: 1,
                        opacity: 1,
                        duration: stepDuration,
                        ease: 'power2.out', // Smoothly decelerates as the card settles into place
                    },
                    startTime
                );

                // Push previous cards into the background (scale down + move up slightly)
                for (let prevIdx = 0; prevIdx < idx; prevIdx++) {
                    const prevCard = cardRefs.current[prevIdx];
                    if (!prevCard) continue;

                    const depth = idx - prevIdx;
                    const scaleVal = Math.max(0.88, 1 - depth * 0.04);
                    const opacityVal = depth === 1 ? 1 : depth === 2 ? 0.6 : 0;
                    const yOffset = -(depth * 20); // Shifted slightly more up to show top stack edge clearly

                    mainTl.to(
                        prevCard,
                        {
                            scale: scaleVal,
                            opacity: opacityVal,
                            y: yOffset,
                            duration: stepDuration,
                            ease: 'power2.out',
                        },
                        startTime
                    );
                }
            });

            // Add dummy tween at the end to create a final pause/holding state for the last project
            const totalTimelineDuration = numTransitions * stepDuration + (numTransitions - 1) * pauseDuration;
            mainTl.to({}, { duration: pauseDuration }, totalTimelineDuration);
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
            {/* Modal Transition Styles */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleUp {
                    from { transform: scale(0.96); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-fade-in {
                    animation: fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .animate-scale-up {
                    animation: scaleUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}} />

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
                        {/* ── Card Deck (with asymmetrical clip-path to crop bottom but show top stack layers) ── */}
                        <div
                            ref={cardsContainerRef}
                            className="relative w-full max-w-4xl mx-auto"
                            style={{
                                height: 'clamp(520px, 64vh, 700px)',
                                clipPath: 'inset(-60px 0px 0px 0px)',
                                WebkitClipPath: 'inset(-60px 0px 0px 0px)',
                            }}
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
                                                    <button
                                                        onClick={() => setActiveModalProject(project)}
                                                        className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[var(--accent-current)]/30 hover:bg-white/10 text-[var(--text-secondary)] hover:text-white transition-all flex items-center justify-center"
                                                        aria-label="Expand Case Study Details"
                                                        title="Read Full Case Study"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                                                        </svg>
                                                    </button>
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
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 my-4 flex-grow overflow-visible">
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
                                                            {highlightsList.slice(0, 3).map((highlight, hIdx) => (
                                                                <li key={hIdx} className="flex gap-2 items-start">
                                                                    <span className="text-[var(--accent-current)] text-xs mt-1 shrink-0 transition-colors duration-500">✦</span>
                                                                    <span>{highlight}</span>
                                                                </li>
                                                            ))}
                                                            {highlightsList.length > 3 && (
                                                                <li className="pl-5 pt-1">
                                                                    <button
                                                                        onClick={() => setActiveModalProject(project)}
                                                                        className="text-xs text-[var(--accent-current)] font-medium hover:underline transition-all flex items-center gap-1 cursor-pointer"
                                                                    >
                                                                        <span>+ View {highlightsList.length - 3} more highlights</span>
                                                                    </button>
                                                                </li>
                                                            )}
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

            {/* ── Case Study Detail Modal ── */}
            {activeModalProject && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-10 bg-black/85 backdrop-blur-xl transition-all duration-300 animate-fade-in">
                    <div className="relative w-full max-w-4xl bg-[#0c0c12]/95 border border-white/10 rounded-3xl p-6 md:p-12 shadow-2xl flex flex-col justify-between max-h-[90vh] overflow-y-auto custom-scrollbar animate-scale-up">
                        {/* Close button */}
                        <button
                            onClick={() => setActiveModalProject(null)}
                            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 hover:border-red-500/30 hover:bg-red-500/10 text-[var(--text-secondary)] hover:text-white transition-all z-20"
                            aria-label="Close details"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Modal Content */}
                        <div className="space-y-8">
                            <div>
                                <span className="text-sm font-mono font-medium text-[var(--accent-current)] uppercase tracking-widest transition-colors duration-500">
                                    {activeModalProject.role || 'Developer'}
                                </span>
                                <h3 className="text-3xl md:text-5xl font-display font-medium text-[var(--text-primary)] mt-2">
                                    {activeModalProject.title}
                                </h3>
                            </div>

                            {/* Grid Content */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-4 border-t border-white/5">
                                {/* Left column */}
                                <div className="space-y-4">
                                    <h4 className="text-sm uppercase tracking-widest text-[#f59e0b] font-mono font-bold flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                                        The Challenge
                                    </h4>
                                    <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed font-light">
                                        {activeModalProject.description}
                                    </p>
                                </div>

                                {/* Right column */}
                                <div className="space-y-4">
                                    <h4 className="text-sm uppercase tracking-widest text-[#8b5cf6] font-mono font-bold flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-[#8b5cf6]" />
                                        Key Highlights
                                    </h4>
                                    {(() => {
                                        let highlights: string[] = [];
                                        if (activeModalProject.highlights) {
                                            try {
                                                highlights = JSON.parse(activeModalProject.highlights);
                                            } catch {
                                                highlights = activeModalProject.highlights.split('.').filter(h => h.trim());
                                            }
                                        }
                                        return highlights.length > 0 && (
                                            <ul className="space-y-3 text-sm md:text-base text-[var(--text-secondary)] font-light leading-relaxed list-none pl-0">
                                                {highlights.map((highlight, hIdx) => (
                                                    <li key={hIdx} className="flex gap-2.5 items-start">
                                                        <span className="text-[var(--accent-current)] text-sm mt-1 shrink-0">✦</span>
                                                        <span>{highlight}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        );
                                    })()}
                                </div>
                            </div>

                            {/* Footer links & Tech stack */}
                            <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                {/* Stack */}
                                <div className="flex flex-wrap gap-2 items-center">
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mr-2">
                                        Tech Stack:
                                    </span>
                                    {(activeModalProject.technologies?.split(',').map(t => t.trim()) || []).map((tech, tIdx) => (
                                        <span
                                            key={tIdx}
                                            className="px-2.5 py-1 text-xs font-mono bg-white/5 border border-white/10 rounded-md text-[var(--text-secondary)]"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Links */}
                                <div className="flex items-center gap-3 shrink-0">
                                    {activeModalProject.github && (
                                        <a
                                            href={activeModalProject.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[var(--accent-current)]/30 hover:bg-white/10 text-[var(--text-secondary)] hover:text-white transition-all flex items-center gap-2 text-sm font-medium"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                            <span>Repository</span>
                                        </a>
                                    )}
                                    {activeModalProject.link && (
                                        <a
                                            href={activeModalProject.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-5 py-2.5 rounded-full bg-[var(--accent-current)]/10 border border-[var(--accent-current)]/20 hover:bg-[var(--accent-current)]/20 hover:border-[var(--accent-current)]/40 text-[var(--accent-current)] transition-all flex items-center gap-2 text-sm font-medium"
                                        >
                                            <span>Live Demo</span>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
