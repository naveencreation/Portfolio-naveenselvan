import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import type { SkillCategory, Certification } from '@/types/portfolio';
import { Code2, Server, Database, Brain, Wrench, Award, ExternalLink } from 'lucide-react';

interface SkillsProps {
    skillCategories: SkillCategory[];
    certifications: Certification[];
}

// Icon mapping for categories
const categoryIcons: Record<string, any> = {
    'Languages': Code2,
    'Frameworks': Server,
    'Databases': Database,
    'AI & LLM': Brain,
    'Core Skills': Wrench,
    'Developer Tools': Wrench,
};

// Animated circular progress
function CircularProgress({ value, name, delay = 0 }: { value: number; name: string; delay?: number }) {
    const ref = useRef<SVGSVGElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const circumference = 2 * Math.PI * 40;
    const offset = circumference - (value / 100) * circumference;

    return (
        <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
        >
            <div className="relative w-24 h-24">
                <svg ref={ref} className="w-24 h-24 transform -rotate-90">
                    {/* Background circle */}
                    <circle
                        cx="48"
                        cy="48"
                        r="40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="6"
                        className="text-secondary"
                    />
                    {/* Progress circle */}
                    <motion.circle
                        cx="48"
                        cy="48"
                        r="40"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={isInView ? { strokeDashoffset: offset } : {}}
                        transition={{ duration: 1.5, delay, ease: "easeOut" }}
                    />
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                    </defs>
                </svg>
                {/* Percentage text */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                        className="text-lg font-bold font-display"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: delay + 0.5 }}
                    >
                        {value}%
                    </motion.span>
                </div>
            </div>
            <span className="text-sm text-muted-foreground mt-2 text-center">{name}</span>
        </motion.div>
    );
}

// Skill tag with glow effect
function SkillTag({ name, delay = 0 }: { name: string; delay?: number }) {
    return (
        <motion.span
            className="px-4 py-2 rounded-xl text-sm font-medium glass-card border-primary/20 hover:border-primary/50 cursor-default transition-all duration-300"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' }}
        >
            {name}
        </motion.span>
    );
}

// Skill category card
function SkillCategoryCard({ category, index }: { category: SkillCategory; index: number }) {
    const Icon = categoryIcons[category.name] || Code2;
    const isLanguages = category.name === 'Languages';

    return (
        <motion.div
            className="glass-card p-6 rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold font-display">{category.name}</h3>
            </div>

            {/* Skills */}
            {isLanguages ? (
                // For languages, show circular progress
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {category.skills.map((skill, i) => (
                        <CircularProgress
                            key={skill.id || i}
                            value={skill.proficiency || 80}
                            name={skill.name}
                            delay={i * 0.1}
                        />
                    ))}
                </div>
            ) : (
                // For others, show tags
                <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, i) => (
                        <SkillTag
                            key={skill.id || i}
                            name={skill.name}
                            delay={i * 0.03}
                        />
                    ))}
                </div>
            )}
        </motion.div>
    );
}

// Certification card
function CertificationCard({ cert, index }: { cert: Certification; index: number }) {
    return (
        <motion.div
            className="glass-card p-4 rounded-xl flex items-center gap-4 group"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, x: 4 }}
        >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                    {cert.title}
                </h4>
                <p className="text-xs text-muted-foreground">{cert.issuer}</p>
            </div>
            {cert.link && (
                <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                >
                    <ExternalLink className="w-4 h-4" />
                </a>
            )}
        </motion.div>
    );
}

export function Skills({ skillCategories, certifications }: SkillsProps) {
    // Prioritize AI & LLM category
    const sortedCategories = [...skillCategories].sort((a, b) => {
        if (a.name === 'AI & LLM') return -1;
        if (b.name === 'AI & LLM') return 1;
        if (a.name === 'Languages') return -1;
        if (b.name === 'Languages') return 1;
        return 0;
    });

    return (
        <section id="skills" className="py-24 relative">
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
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
                        04. Skills
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold font-display mt-4">
                        <span className="text-gradient-static">My Tech Stack</span>
                    </h2>
                </motion.div>

                {/* Skills grid */}
                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
                    {sortedCategories.map((category, index) => (
                        <SkillCategoryCard
                            key={category.id || index}
                            category={category}
                            index={index}
                        />
                    ))}
                </div>

                {/* Certifications */}
                {certifications.length > 0 && (
                    <motion.div
                        className="max-w-3xl mx-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-xl font-semibold text-center mb-8 flex items-center justify-center gap-2">
                            <Award className="w-5 h-5 text-accent" />
                            Certifications
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {certifications.map((cert, index) => (
                                <CertificationCard
                                    key={cert.id || index}
                                    cert={cert}
                                    index={index}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
