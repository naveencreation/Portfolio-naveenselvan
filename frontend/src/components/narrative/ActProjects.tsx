import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '@/types/portfolio';

gsap.registerPlugin(ScrollTrigger);

interface ActProjectsProps {
    projects: Project[];
}

// Single project story component
function ProjectStory({
    project,
    index
}: {
    project: Project;
    index: number;
}) {
    const projectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!projectRef.current) return;

        const sections = projectRef.current.querySelectorAll('.project-section');

        gsap.fromTo(
            sections,
            {
                opacity: 0,
                y: 60,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: projectRef.current,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse',
                },
            }
        );
    }, []);

    // Parse project data for problem/thinking/solution structure
    const projectDescription = project.description || '';
    const technologies = project.technologies?.split(',').map(t => t.trim()) || [];
    
    let highlights: string[] = [];
    if (project.highlights) {
        try {
            highlights = JSON.parse(project.highlights);
        } catch (e) {
            highlights = project.highlights.split('.').filter(h => h.trim());
        }
    }

    return (
        <div
            ref={projectRef}
            className="project-story mb-16 last:mb-0"
        >
            {/* Project Number */}
            <motion.div
                className="flex items-center gap-4 mb-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
            >
                <span className="text-7xl md:text-9xl font-display font-bold text-[var(--accent-current)]/10">
                    {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                    <h3 className="text-narrative-statement text-[var(--text-primary)]">
                        {project.title}
                    </h3>
                    {project.is_featured === 1 && (
                        <span className="text-xs uppercase tracking-widest text-[var(--accent-current)]">
                            Featured Project
                        </span>
                    )}
                </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                {/* Left: The Story */}
                <div className="space-y-8">
                    {/* The Problem */}
                    <div className="project-section project-problem opacity-0">
                        <p className="text-xs uppercase tracking-widest text-[var(--accent-amber)] mb-3">
                            The Problem
                        </p>
                        <p className="text-narrative-body">
                            {projectDescription.length > 250
                                ? projectDescription.slice(0, 250) + '...'
                                : projectDescription || 'A challenge that needed solving.'}
                        </p>
                    </div>

                    {/* The Thinking */}
                    <div className="project-section project-thinking opacity-0">
                        <p className="text-xs uppercase tracking-widest text-[var(--accent-violet)] mb-3">
                            The Thinking
                        </p>
                        <p className="text-narrative-body">
                            {highlights[0] || 'Approaching the problem with systematic thinking and user-centered design.'}
                        </p>
                    </div>

                    {/* The Solution */}
                    <div className="project-section project-solution opacity-0">
                        <p className="text-xs uppercase tracking-widest text-[var(--accent-teal)] mb-3">
                            The Solution
                        </p>
                        <p className="text-narrative-body">
                            {highlights[1] || highlights[0] || 'A thoughtful implementation that balanced complexity with usability.'}
                        </p>
                    </div>
                </div>

                {/* Right: Technical Details */}
                <div className="space-y-6">
                    {/* Tech stack */}
                    {technologies.length > 0 && (
                        <motion.div
                            className="project-section opacity-0"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-4">
                                Built With
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {technologies.map((tech, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1.5 text-sm font-mono bg-[var(--color-surface)] border border-[var(--accent-current)]/20 rounded-md text-[var(--text-secondary)]"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Links */}
                    <motion.div
                        className="flex gap-4 pt-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-[var(--text-muted)] hover:text-[var(--accent-current)] transition-colors flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
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
                                className="text-sm text-[var(--text-muted)] hover:text-[var(--accent-current)] transition-colors flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                View Live
                            </a>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

interface ProjectCardProps {
    project: Project;
}

// Compact card component for secondary projects
function ProjectCard({ project }: ProjectCardProps) {
    const technologies = project.technologies?.split(',').map(t => t.trim()) || [];

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="group relative flex flex-col justify-between h-full p-6 rounded-2xl glass-subtle hover:border-[var(--accent-current)]/30 transition-all duration-300 overflow-hidden"
        >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-current)]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                        <h4 className="text-xl font-display font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-current)] transition-colors duration-300 line-clamp-2">
                            {project.title}
                        </h4>
                        {project.role && (
                            <p className="text-xs text-[var(--accent-current)] font-medium mt-1 uppercase tracking-wider font-mono">
                                {project.role}
                            </p>
                        )}
                    </div>
                </div>

                {/* Description */}
                <p className="text-sm text-[var(--text-secondary)] mb-6 line-clamp-3 leading-relaxed">
                    {project.description}
                </p>
            </div>

            <div>
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

                {/* Links */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-[var(--text-muted)] hover:text-[var(--accent-current)] transition-colors flex items-center gap-1.5 font-medium"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
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
                            className="text-xs text-[var(--text-muted)] hover:text-[var(--accent-current)] transition-colors flex items-center gap-1.5 font-medium"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Demo
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export function ActProjects({ projects }: ActProjectsProps) {
    const actRef = useRef<HTMLElement>(null);
    const [showAll, setShowAll] = useState(false);

    if (!projects || projects.length === 0) return null;

    // The first project AI Notetaker (Prayag.ai) is featured, others are secondary.
    // Ensure we handle case where is_featured = 1 is not found.
    const featuredProject = projects.find(p => p.is_featured === 1) || projects[0];
    const secondaryProjects = projects.filter(p => p.id !== featuredProject.id);

    // Limit secondary projects display to 4 initially (2 rows of 2 cards)
    const visibleSecondary = showAll ? secondaryProjects : secondaryProjects.slice(0, 4);
    const hasMore = secondaryProjects.length > 4;

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

                {/* Featured Project */}
                {featuredProject && (
                    <ProjectStory project={featuredProject} index={0} />
                )}

                {/* Secondary Projects */}
                {secondaryProjects.length > 0 && (
                    <div className="mt-24">
                        <motion.h3
                            className="text-3xl font-display font-medium text-[var(--text-primary)] mb-8 text-center md:text-left"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            More Works
                        </motion.h3>

                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 gap-8"
                            onLayoutAnimationComplete={() => ScrollTrigger.refresh()}
                        >
                            <AnimatePresence mode="popLayout">
                                {visibleSecondary.map((project) => (
                                    <ProjectCard key={project.id} project={project} />
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
                )}
            </div>
        </section>
    );
}
