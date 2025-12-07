import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import type { Profile, Education } from '@/types/portfolio';
import { GraduationCap, MapPin, Calendar, Award, Code, Briefcase, Zap } from 'lucide-react';

interface AboutProps {
    profile: Profile | null;
    education: Education[];
}

// Animated counter component
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            const duration = 2000;
            const steps = 60;
            const increment = value / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= value) {
                    setCount(value);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(current));
                }
            }, duration / steps);

            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return <span ref={ref}>{count}{suffix}</span>;
}

// Stat card component
function StatCard({
    icon: Icon,
    value,
    suffix = '',
    label,
    delay = 0,
    accent = false
}: {
    icon: any;
    value: number;
    suffix?: string;
    label: string;
    delay?: number;
    accent?: boolean;
}) {
    return (
        <motion.div
            className={`glass-card p-6 rounded-2xl group cursor-default ${accent ? 'border-accent/30' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -4, scale: 1.02 }}
        >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${accent ? 'bg-accent/20' : 'bg-primary/20'}`}>
                <Icon className={`w-6 h-6 ${accent ? 'text-accent' : 'text-primary'}`} />
            </div>
            <div className="text-3xl font-bold font-display text-foreground mb-1">
                <AnimatedCounter value={value} suffix={suffix} />
            </div>
            <div className="text-sm text-muted-foreground">{label}</div>
        </motion.div>
    );
}

export function About({ profile, education }: AboutProps) {
    if (!profile) return null;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section id="about" className="py-24 relative">
            {/* Background accent */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl translate-x-1/2" />
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
                    <motion.span
                        className="text-accent font-mono text-sm tracking-wider"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        01. About Me
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl font-bold font-display mt-4">
                        <span className="text-gradient-static">Get to Know Me</span>
                    </h2>
                </motion.div>

                {/* Bento Grid Layout */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {/* Main about text - spans 2 columns */}
                    <motion.div
                        className="glass-card p-8 rounded-2xl md:col-span-2 lg:row-span-2"
                        variants={itemVariants}
                        whileHover={{ scale: 1.01 }}
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-2 h-2 rounded-full bg-accent" />
                            <span className="text-accent font-mono text-sm">Introduction</span>
                        </div>
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                            {profile.about?.split('\n\n').map((paragraph, i) => (
                                <motion.p
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.2 }}
                                >
                                    {paragraph}
                                </motion.p>
                            ))}
                        </div>
                    </motion.div>

                    {/* Stat cards */}
                    <StatCard
                        icon={Briefcase}
                        value={1}
                        suffix="+"
                        label="Years Experience"
                        delay={0.1}
                    />
                    <StatCard
                        icon={Code}
                        value={10}
                        suffix="+"
                        label="Projects Built"
                        delay={0.2}
                    />
                    <StatCard
                        icon={Zap}
                        value={6}
                        suffix="+"
                        label="Tech Stacks"
                        delay={0.3}
                        accent
                    />
                    <StatCard
                        icon={Award}
                        value={4}
                        label="Certifications"
                        delay={0.4}
                    />

                    {/* Education card - spans 2 columns */}
                    <motion.div
                        className="glass-card p-8 rounded-2xl md:col-span-2"
                        variants={itemVariants}
                        whileHover={{ scale: 1.01 }}
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <GraduationCap className="w-5 h-5 text-primary" />
                            <span className="text-primary font-mono text-sm">Education</span>
                        </div>

                        {education.map((edu, index) => (
                            <motion.div
                                key={edu.id || index}
                                className="relative"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                                        <GraduationCap className="w-6 h-6 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-lg font-semibold text-foreground">
                                            {edu.degree}
                                        </h4>
                                        <p className="text-primary font-medium">{edu.institution}</p>
                                        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {edu.start_year} - {edu.end_year}
                                            </span>
                                            {edu.location && (
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="w-4 h-4" />
                                                    {edu.location}
                                                </span>
                                            )}
                                            {edu.cgpa && (
                                                <span className="px-2 py-1 rounded-full bg-success/20 text-success text-xs font-medium">
                                                    CGPA: {edu.cgpa}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
