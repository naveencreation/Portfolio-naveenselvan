import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
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
    const highlights = project.highlights?.split('.').filter(h => h.trim()) || [];

    return (
        <div
            ref={projectRef}
            className="project-story mb-32 last:mb-0"
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
                            {projectDescription.length > 150
                                ? projectDescription.slice(0, 150) + '...'
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

export function ActProjects({ projects }: ActProjectsProps) {
    const actRef = useRef<HTMLElement>(null);

    // Filter featured projects first, then regular projects
    const sortedProjects = [...projects].sort((a, b) => b.is_featured - a.is_featured);
    // Take top 4 projects for the narrative
    const displayProjects = sortedProjects.slice(0, 4);

    return (
        <section
            ref={actRef}
            className="act-projects act-container relative"
            style={{ minHeight: displayProjects.length > 2 ? '300vh' : '200vh' }}
        >
            <div className="act-content">
                {/* Act header */}
                <div className="narrative-center mb-24">
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
                        className="text-narrative-body max-w-xl"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        Each project began with a problem worth solving,
                        a process of thinking through constraints,
                        and a solution that balanced ambition with practicality.
                    </motion.p>
                </div>

                {/* Projects */}
                {displayProjects.map((project, index) => (
                    <ProjectStory key={project.id} project={project} index={index} />
                ))}
            </div>
        </section>
    );
}
