import { motion } from 'framer-motion';
import type { Project } from '@/types/portfolio';
import { ExternalLink, Github, ArrowUpRight, Sparkles, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProjectsProps {
    projects: Project[];
}

function FeaturedProject({ project, index }: { project: Project; index: number }) {
    const technologies = project.technologies?.split(',').map(t => t.trim()) || [];
    const highlights = project.highlights ? JSON.parse(project.highlights) : [];
    const isEven = index % 2 === 0;

    return (
        <motion.div
            className="relative mb-24 last:mb-0"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
        >
            <div className={`grid lg:grid-cols-12 gap-8 items-center ${isEven ? '' : 'lg:text-right'}`}>
                {/* Project image/visual */}
                <motion.div
                    className={`lg:col-span-7 ${isEven ? '' : 'lg:order-2'}`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="relative group">
                        {/* Gradient background placeholder */}
                        <div className="aspect-video rounded-2xl overflow-hidden border border-white/10">
                            <div className="w-full h-full bg-gradient-to-br from-primary/20 via-card to-accent/20 flex items-center justify-center relative">
                                {/* Abstract pattern */}
                                <div className="absolute inset-0 opacity-30">
                                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/30 rounded-full blur-2xl" />
                                    <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-accent/30 rounded-full blur-2xl" />
                                </div>
                                <div className="relative z-10 text-center p-8">
                                    <Sparkles className="w-16 h-16 text-primary/50 mx-auto mb-4" />
                                    <span className="text-muted-foreground font-mono text-sm">
                                        {project.title}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Hover overlay */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6"
                        >
                            <div className="flex gap-3">
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 rounded-xl glass-card hover:border-primary/50 transition-colors"
                                    >
                                        <Github className="w-5 h-5" />
                                    </a>
                                )}
                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 rounded-xl glass-card hover:border-accent/50 transition-colors"
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Project info */}
                <div className={`lg:col-span-5 ${isEven ? '' : 'lg:order-1'}`}>
                    <span className="text-accent font-mono text-sm">Featured Project</span>
                    <h3 className="text-2xl md:text-3xl font-bold font-display mt-2 mb-4">
                        <a
                            href={project.link || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors inline-flex items-center gap-2 group"
                        >
                            {project.title}
                            <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                    </h3>

                    {/* Description card */}
                    <div className={`glass-card p-6 rounded-xl mb-4 ${isEven ? 'lg:-mr-12' : 'lg:-ml-12'} relative z-10`}>
                        <p className="text-muted-foreground leading-relaxed text-left">
                            {project.description}
                        </p>

                        {highlights.length > 0 && (
                            <ul className="mt-4 space-y-2 text-left">
                                {highlights.slice(0, 3).map((highlight: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Tech stack */}
                    <div className={`flex flex-wrap gap-2 ${isEven ? '' : 'lg:justify-end'}`}>
                        {technologies.map((tech, i) => (
                            <span
                                key={tech}
                                className="px-3 py-1 rounded-full text-xs font-mono text-primary bg-primary/10 border border-primary/20"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const technologies = project.technologies?.split(',').map(t => t.trim()) || [];

    return (
        <motion.div
            className="glass-card p-6 rounded-2xl h-full flex flex-col group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                    <Folder className="w-6 h-6 text-primary" />
                </div>
                <div className="flex gap-2">
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                    )}
                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ExternalLink className="w-5 h-5" />
                        </a>
                    )}
                </div>
            </div>

            {/* Content */}
            <h3 className="text-lg font-bold font-display mb-2 group-hover:text-primary transition-colors">
                {project.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                {project.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/50">
                {technologies.slice(0, 4).map((tech) => (
                    <span
                        key={tech}
                        className="text-xs font-mono text-muted-foreground"
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}

export function Projects({ projects }: ProjectsProps) {
    const featuredProjects = projects.filter(p => p.is_featured);
    const otherProjects = projects.filter(p => !p.is_featured);

    return (
        <section id="projects" className="py-24 relative">
            {/* Background accent */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-x-1/2" />
                <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl translate-x-1/2" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-accent font-mono text-sm tracking-wider">
                        03. Projects
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold font-display mt-4">
                        <span className="text-gradient-static">Things I've Built</span>
                    </h2>
                </motion.div>

                {/* Featured projects */}
                {featuredProjects.length > 0 && (
                    <div className="max-w-6xl mx-auto mb-20">
                        {featuredProjects.map((project, index) => (
                            <FeaturedProject
                                key={project.id || index}
                                project={project}
                                index={index}
                            />
                        ))}
                    </div>
                )}

                {/* Other projects grid */}
                {otherProjects.length > 0 && (
                    <div>
                        <motion.h3
                            className="text-xl font-semibold text-center mb-8"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            Other Noteworthy Projects
                        </motion.h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {otherProjects.map((project, index) => (
                                <ProjectCard
                                    key={project.id || index}
                                    project={project}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
