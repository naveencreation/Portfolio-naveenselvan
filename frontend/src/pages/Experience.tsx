import { motion } from 'framer-motion';
import { useState } from 'react';
import type { Experience as ExperienceType } from '@/types/portfolio';
import { Briefcase, MapPin, Calendar, ChevronDown, ExternalLink } from 'lucide-react';

interface ExperienceProps {
    experiences: ExperienceType[];
}

function ExperienceCard({ experience, index }: { experience: ExperienceType; index: number }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const technologies = experience.technologies?.split(',').map(t => t.trim()) || [];
    const isCurrentRole = experience.end_date === 'Present';

    return (
        <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
        >
            {/* Timeline connector */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent ml-6 md:ml-8" />

            {/* Timeline dot */}
            <motion.div
                className={`absolute left-4 md:left-6 top-8 w-4 h-4 rounded-full border-2 z-10 ${isCurrentRole
                        ? 'bg-primary border-primary animate-pulse-glow'
                        : 'bg-background border-primary/50'
                    }`}
                whileHover={{ scale: 1.3 }}
            >
                {isCurrentRole && (
                    <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
                )}
            </motion.div>

            {/* Card */}
            <motion.div
                className="ml-12 md:ml-16 glass-card p-6 md:p-8 rounded-2xl cursor-pointer group"
                whileHover={{ x: 4, scale: 1.01 }}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            {isCurrentRole && (
                                <span className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                                    Current
                                </span>
                            )}
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold font-display text-foreground group-hover:text-primary transition-colors">
                            {experience.title}
                        </h3>
                        <p className="text-lg text-primary font-medium mt-1">
                            {experience.company}
                        </p>
                    </div>

                    <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        className="p-2 rounded-lg bg-secondary/50"
                    >
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    </motion.div>
                </div>

                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-accent" />
                        {experience.start_date} — {experience.end_date}
                    </span>
                    {experience.location && (
                        <span className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-accent" />
                            {experience.location}
                        </span>
                    )}
                </div>

                {/* Description */}
                <p className="text-muted-foreground mt-4 leading-relaxed">
                    {experience.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mt-4">
                    {technologies.slice(0, isExpanded ? undefined : 5).map((tech, i) => (
                        <motion.span
                            key={tech}
                            className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-muted-foreground border border-border/50"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ scale: 1.05, borderColor: 'rgba(139, 92, 246, 0.5)' }}
                        >
                            {tech}
                        </motion.span>
                    ))}
                    {!isExpanded && technologies.length > 5 && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
                            +{technologies.length - 5} more
                        </span>
                    )}
                </div>

                {/* Expanded responsibilities */}
                <motion.div
                    initial={false}
                    animate={{
                        height: isExpanded ? 'auto' : 0,
                        opacity: isExpanded ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                >
                    {experience.responsibilities && experience.responsibilities.length > 0 && (
                        <div className="mt-6 pt-6 border-t border-border/50">
                            <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                                <div className="w-1 h-4 bg-gradient-to-b from-primary to-accent rounded-full" />
                                Key Responsibilities
                            </h4>
                            <ul className="space-y-3">
                                {experience.responsibilities.map((resp, i) => (
                                    <motion.li
                                        key={resp.id || i}
                                        className="flex items-start gap-3 text-muted-foreground text-sm"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                                        {resp.description}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export function Experience({ experiences }: ExperienceProps) {
    return (
        <section id="experience" className="py-24 relative">
            {/* Background accent */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2" />
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
                        02. Experience
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold font-display mt-4">
                        <span className="text-gradient-static">Where I've Worked</span>
                    </h2>
                </motion.div>

                {/* Timeline */}
                <div className="max-w-4xl mx-auto space-y-8">
                    {experiences.map((exp, index) => (
                        <ExperienceCard
                            key={exp.id || index}
                            experience={exp}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
