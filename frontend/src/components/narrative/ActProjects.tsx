import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '@/types/portfolio';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

let refreshTimeout: number | undefined;
const debouncedScrollTriggerRefresh = () => {
    if (refreshTimeout) {
        clearTimeout(refreshTimeout);
    }
    refreshTimeout = window.setTimeout(() => {
        ScrollTrigger.refresh();
    }, 150);
};

interface ActProjectsProps {
    projects: Project[];
}

// Unified project card component combining compact and expanded states
function ProjectCard({
    project,
    number,
    isExpanded,
    onToggle
}: {
    project: Project;
    number: string;
    isExpanded: boolean;
    onToggle: () => void;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInitialMount = useRef(true);
    const technologies = project.technologies?.split(',').map(t => t.trim()) || [];
    const [isTransitioning, setIsTransitioning] = useState(false);
    const prevExpanded = useRef(isExpanded);

    let highlights: string[] = [];
    if (project.highlights) {
        try {
            highlights = JSON.parse(project.highlights);
        } catch {
            highlights = project.highlights.split('.').filter(h => h.trim());
        }
    }

    const handleCardClick = (e: React.MouseEvent) => {
        // If user clicked inside links or buttons, let those handle the click
        if ((e.target as HTMLElement).closest('a') || (e.target as HTMLElement).closest('button')) {
            return;
        }
        // If the card is collapsed, clicking anywhere on it will expand it
        if (!isExpanded) {
            onToggle();
        }
    };

    useEffect(() => {
        if (prevExpanded.current !== isExpanded) {
            setIsTransitioning(true);
            prevExpanded.current = isExpanded;
            
            // Safety timeout to ensure content is never stuck invisible
            const safetyTimer = setTimeout(() => {
                setIsTransitioning(false);
            }, 800);
            return () => clearTimeout(safetyTimer);
        }
    }, [isExpanded]);

    useEffect(() => {
        if (isExpanded) {
            if (isInitialMount.current) {
                isInitialMount.current = false;
                return;
            }
            const timer = setTimeout(() => {
                if (cardRef.current) {
                    gsap.to(window, {
                        duration: 0.6,
                        scrollTo: { y: cardRef.current, offsetY: 80 },
                        ease: 'power2.out',
                        overwrite: 'auto'
                    });
                }
            }, 150);
            return () => clearTimeout(timer);
        } else {
            isInitialMount.current = false;
        }
    }, [isExpanded]);

    return (
        <motion.div
            ref={cardRef}
            layout
            onClick={handleCardClick}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
                layout: { type: 'spring', bounce: 0, duration: 0.6 },
                opacity: { duration: 0.3 },
                default: { duration: 0.5, ease: [0.25, 1, 0.5, 1] }
            }}
            whileHover={!isExpanded ? { y: -6, transition: { duration: 0.2 } } : undefined}
            onLayoutAnimationComplete={() => {
                setIsTransitioning(false);
                debouncedScrollTriggerRefresh();
            }}
            className={`group relative flex flex-col justify-between rounded-2xl glass-subtle transition-[border-color,background-color,box-shadow,opacity] duration-300 overflow-hidden ${
                isExpanded 
                    ? 'md:col-span-2 p-5 md:p-8 lg:p-10 border-[var(--accent-current)]/30 bg-white/[0.02] shadow-2xl shadow-[var(--accent-current)]/[0.02]' 
                    : 'p-5 md:p-8 lg:p-10 hover:border-[var(--accent-current)]/20 cursor-pointer min-h-[220px] md:min-h-[300px]'
            }`}
        >
            {/* Hover Glow Effect */}
            {!isExpanded && (
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-current)]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            )}

            {/* Absolute Watermark Number */}
            <div className="absolute right-4 bottom-2 text-[7rem] md:text-[10rem] font-display font-bold text-[var(--accent-current)]/[0.03] pointer-events-none select-none z-0 transition-all duration-500 group-hover:text-[var(--accent-current)]/[0.06] leading-none">
                {number}
            </div>

            <motion.div 
                animate={{ opacity: isTransitioning ? 0 : 1 }}
                transition={{ duration: isTransitioning ? 0.1 : 0.25 }}
                className={`relative z-10 flex flex-col h-full w-full ${isTransitioning ? 'pointer-events-none' : ''}`}
            >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex-grow">
                        <h4 className={`font-display font-medium text-[var(--text-primary)] transition-all duration-300 ${
                            isExpanded ? 'text-2xl md:text-3xl text-[var(--accent-current)]' : 'text-xl group-hover:text-[var(--accent-current)] line-clamp-2'
                        }`}>
                            {project.title}
                        </h4>
                        {project.role && (
                            <p className="text-xs text-[var(--accent-current)] font-medium mt-1 uppercase tracking-wider font-mono">
                                {project.role}
                            </p>
                        )}
                    </div>
                    {/* Toggle indicator / Close button */}
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggle();
                        }}
                        className="flex-shrink-0 mt-1 text-[var(--text-muted)] hover:text-[var(--accent-current)] transition-colors p-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[var(--accent-current)]/30 hover:bg-white/10"
                        aria-label={isExpanded ? "Collapse project details" : "Expand project details"}
                    >
                        {isExpanded ? (
                            <svg className="w-4 h-4 md:w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4 md:w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        )}
                    </button>
                </div>

                <div className="relative w-full flex-grow flex flex-col">
                    <AnimatePresence initial={false} mode="popLayout">
                        {isExpanded ? (
                            <motion.div
                                key="expanded"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 pt-6 border-t border-[var(--accent-current)]/10"
                            >
                                {/* Left: The Story */}
                                 <div className="space-y-6">
                                    <div>
                                        <p className="text-base md:text-lg uppercase tracking-wider text-[var(--accent-amber)] mb-2 font-mono font-bold">
                                            The Problem
                                        </p>
                                        <p className="text-[1.05rem] md:text-xl text-[var(--text-secondary)] leading-relaxed font-light">
                                            {project.description}
                                        </p>
                                    </div>
                                    {highlights[0] && (
                                        <div>
                                            <p className="text-base md:text-lg uppercase tracking-wider text-[var(--accent-violet)] mb-2 font-mono font-bold">
                                                The Thinking
                                            </p>
                                            <p className="text-[1.05rem] md:text-xl text-[var(--text-secondary)] leading-relaxed font-light">
                                                {highlights[0]}
                                            </p>
                                        </div>
                                    )}
                                    {(highlights[1] || highlights[0]) && (
                                        <div>
                                            <p className="text-base md:text-lg uppercase tracking-wider text-[var(--accent-teal)] mb-2 font-mono font-bold">
                                                The Solution
                                            </p>
                                            <p className="text-[1.05rem] md:text-xl text-[var(--text-secondary)] leading-relaxed font-light">
                                                {highlights[1] || highlights[0]}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Right: Technical Details & Links */}
                                <div className="flex flex-col justify-between space-y-6">
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-3 font-mono font-semibold">
                                            Built With
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {technologies.map((tech, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1.5 text-xs font-mono bg-[var(--color-surface)] border border-[var(--accent-current)]/20 rounded-md text-[var(--text-secondary)]"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="pt-6 border-t border-white/5 grid grid-cols-1 sm:flex sm:flex-wrap gap-3 mt-auto">
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[var(--accent-current)]/30 transition-all duration-300 text-[var(--text-primary)] w-full sm:w-auto"
                                            >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                </svg>
                                                Source Code
                                            </a>
                                        )}
                                        {project.link && (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-[var(--accent-current)]/10 border border-[var(--accent-current)]/30 hover:bg-[var(--accent-current)]/20 transition-all duration-300 text-[var(--accent-current)] w-full sm:w-auto"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                                Live Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="collapsed"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col justify-between flex-grow"
                            >
                                <p className="text-sm text-[var(--text-secondary)] mb-6 line-clamp-3 leading-relaxed">
                                    {project.description}
                                </p>

                                <div className="mt-auto">
                                    {/* Tech Tags */}
                                    {technologies.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mb-6">
                                            {technologies.slice(0, 3).map((tech, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-2 py-0.5 text-xs font-mono bg-white/5 border border-white/10 rounded-md text-[var(--text-secondary)]"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {technologies.length > 3 && (
                                                <span className="px-2 py-0.5 text-xs font-mono text-[var(--text-muted)]">
                                                    +{technologies.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {/* Collapsed Footer Links */}
                                    <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="text-xs text-[var(--text-muted)] hover:text-[var(--accent-current)] transition-colors flex items-center gap-1.5 font-medium"
                                            >
                                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                </svg>
                                                Source
                                            </a>
                                        )}
                                        {project.link && (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="text-xs text-[var(--text-muted)] hover:text-[var(--accent-current)] transition-colors flex items-center gap-1.5 font-medium"
                                            >
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                                Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
}

export function ActProjects({ projects }: ActProjectsProps) {
    const actRef = useRef<HTMLElement>(null);
    const [showAll, setShowAll] = useState(false);

    // Sort projects so the featured project (AI Notetaker) is always index 0
    const sortedProjects = [...projects].sort((a, b) => b.is_featured - a.is_featured);

    // Manage expanded project state. Default to first project (AI Notetaker)
    const [expandedProjectId, setExpandedProjectId] = useState<number | null>(
        sortedProjects[0]?.id || null
    );

    if (!projects || projects.length === 0) return null;

    // Limit display to 5 initially (1 expanded row + 2 rows of 2 cards)
    const visibleProjects = showAll ? sortedProjects : sortedProjects.slice(0, 5);
    const hasMore = sortedProjects.length > 5;

    const handleToggle = (id: number) => {
        setExpandedProjectId(prev => prev === id ? null : id);
    };

    return (
        <section
            ref={actRef}
            className="act-projects act-container relative"
        >
            <div className="act-content">
                {/* Act header */}
                <div className="narrative-center mb-12">
                    <motion.p
                        className="text-narrative-whisper mb-6 tracking-widest uppercase"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        Act III
                    </motion.p>

                    <motion.h2
                        className="text-narrative-hero mb-8"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Projects that
                        <br />
                        <span className="text-[var(--accent-current)]">tell stories</span>
                    </motion.h2>

                    <motion.p
                        className="text-narrative-body max-w-xl text-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        Each project began with a problem worth solving,
                        a process of thinking through constraints,
                        and a solution that balanced ambition with practicality.
                    </motion.p>
                </div>

                {/* Unified Interactive Grid */}
                <div className="mt-16">
                    <motion.div
                        layout
                        transition={{ layout: { type: 'spring', bounce: 0, duration: 0.6 } }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 grid-flow-row-dense"
                        onLayoutAnimationComplete={debouncedScrollTriggerRefresh}
                    >
                        <AnimatePresence mode="popLayout">
                            {visibleProjects.map((project, index) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    number={String(index + 1).padStart(2, '0')}
                                    isExpanded={expandedProjectId === project.id}
                                    onToggle={() => handleToggle(project.id)}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {hasMore && (
                        <div className="flex justify-center mt-12">
                            <motion.button
                                onClick={() => setShowAll(!showAll)}
                                className="magnetic-cta group/btn inline-flex items-center gap-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                layout
                            >
                                <span>{showAll ? 'Show Less' : 'View All Projects'}</span>
                                <svg
                                    className={`w-4 h-4 transform transition-transform duration-300 ${showAll ? 'rotate-180' : 'group-hover/btn:translate-y-0.5'}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </motion.button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

