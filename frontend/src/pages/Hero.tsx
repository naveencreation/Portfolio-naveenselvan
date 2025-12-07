import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import type { Profile } from '@/types/portfolio';
import { Github, Linkedin, Mail, ArrowRight, Download, Sparkles } from 'lucide-react';

interface HeroProps {
    profile: Profile | null;
}

// Floating particles component
function FloatingParticles() {
    const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
        color: i % 3 === 0 ? '#8b5cf6' : i % 3 === 1 ? '#06b6d4' : '#c084fc'
    }));

    return (
        <div className="particles">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="particle"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        background: p.color,
                    }}
                    animate={{
                        y: [-20, 20, -20],
                        x: [-10, 10, -10],
                        opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
}

// Animated terminal component with typing effect
function AnimatedTerminal({ name }: { name: string }) {
    const lines = [
        { text: 'class ', color: 'text-purple-400' },
        { text: 'AIEngineer', color: 'text-yellow-400' },
        { text: ':', color: 'text-white' },
    ];

    return (
        <motion.div
            className="terminal rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20, rotateX: -10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileHover={{ scale: 1.02, rotateY: 2 }}
            style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
        >
            {/* Terminal header */}
            <div className="terminal-header flex items-center gap-2 px-4 py-3">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs text-muted-foreground font-mono ml-2 flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-primary" />
                    ai_engineer.py
                </span>
            </div>

            {/* Terminal content */}
            <div className="p-6 font-mono text-sm">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <span className="text-purple-400">class</span>{' '}
                    <span className="text-yellow-400">AIEngineer</span>
                    <span className="text-white">:</span>
                </motion.div>

                <motion.div
                    className="ml-4 mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <span className="text-purple-400">def</span>{' '}
                    <span className="text-blue-400">__init__</span>
                    <span className="text-muted-foreground">(self):</span>
                </motion.div>

                <motion.div
                    className="ml-8 mt-1 space-y-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                >
                    <div>
                        <span className="text-white">self.</span>
                        <span className="text-cyan-400">name</span>
                        <span className="text-white"> = </span>
                        <span className="text-green-400">"{name}"</span>
                    </div>
                    <div>
                        <span className="text-white">self.</span>
                        <span className="text-cyan-400">role</span>
                        <span className="text-white"> = </span>
                        <span className="text-green-400">"AI Engineer"</span>
                    </div>
                    <div>
                        <span className="text-white">self.</span>
                        <span className="text-cyan-400">skills</span>
                        <span className="text-white"> = [</span>
                    </div>
                    <div className="ml-4">
                        <span className="text-green-400">"Python"</span>
                        <span className="text-white">, </span>
                        <span className="text-green-400">"FastAPI"</span>
                        <span className="text-white">,</span>
                    </div>
                    <div className="ml-4">
                        <span className="text-green-400">"React"</span>
                        <span className="text-white">, </span>
                        <span className="text-green-400">"LLMs"</span>
                        <span className="text-white">,</span>
                    </div>
                    <div className="text-white">]</div>
                </motion.div>

                <motion.div
                    className="ml-4 mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    <span className="text-purple-400">def</span>{' '}
                    <span className="text-blue-400">build</span>
                    <span className="text-muted-foreground">(self, idea):</span>
                </motion.div>

                <motion.div
                    className="ml-8 mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.7 }}
                >
                    <span className="text-purple-400">return</span>{' '}
                    <span className="text-green-400">f"🚀 {'{idea}'}"</span>
                    <motion.span
                        className="inline-block w-2 h-4 bg-primary ml-1"
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                    />
                </motion.div>
            </div>
        </motion.div>
    );
}

export function Hero({ profile }: HeroProps) {
    if (!profile) return null;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        }
    };

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0">
                {/* Gradient orbs */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [-20, 20, -20],
                        y: [-10, 10, -10]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        x: [20, -20, 20],
                        y: [10, -10, 10]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px'
                    }}
                />

                {/* Floating particles */}
                <FloatingParticles />
            </div>

            <div className="container mx-auto px-6 py-20 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Text content */}
                    <motion.div
                        className="space-y-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="space-y-4">
                            <motion.p
                                className="text-accent font-mono text-sm tracking-wider flex items-center gap-2"
                                variants={itemVariants}
                            >
                                <span className="w-8 h-[2px] bg-accent" />
                                Hello, I'm
                            </motion.p>

                            <motion.h1
                                className="text-5xl md:text-7xl font-bold tracking-tight font-display"
                                variants={itemVariants}
                            >
                                <span className="text-gradient">{profile.name}</span>
                            </motion.h1>

                            <motion.div
                                className="flex flex-wrap items-center gap-3 text-xl md:text-2xl text-muted-foreground"
                                variants={itemVariants}
                            >
                                <span className="text-foreground font-medium">AI Engineer</span>
                                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                <span className="text-foreground font-medium">Full-Stack Developer</span>
                            </motion.div>
                        </div>

                        <motion.p
                            className="text-lg text-muted-foreground max-w-lg leading-relaxed"
                            variants={itemVariants}
                        >
                            {profile.tagline}
                        </motion.p>

                        <motion.div
                            className="flex flex-wrap gap-4"
                            variants={itemVariants}
                        >
                            <Button size="lg" className="btn-glow group" asChild>
                                <a href="#projects">
                                    View My Work
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </Button>
                            <Button variant="secondary" size="lg" className="glass" asChild>
                                <a href="#contact">
                                    <Mail className="w-5 h-5 mr-2" />
                                    Get In Touch
                                </a>
                            </Button>
                        </motion.div>

                        {/* Social links */}
                        <motion.div
                            className="flex items-center gap-3 pt-4"
                            variants={itemVariants}
                        >
                            {profile.linkedin && (
                                <motion.a
                                    href={profile.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-xl glass-card hover:border-primary/50 transition-all duration-300"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </motion.a>
                            )}
                            {profile.github && (
                                <motion.a
                                    href={profile.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-xl glass-card hover:border-primary/50 transition-all duration-300"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label="GitHub"
                                >
                                    <Github className="w-5 h-5" />
                                </motion.a>
                            )}
                            {profile.email && (
                                <motion.a
                                    href={`mailto:${profile.email}`}
                                    className="p-3 rounded-xl glass-card hover:border-primary/50 transition-all duration-300"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label="Email"
                                >
                                    <Mail className="w-5 h-5" />
                                </motion.a>
                            )}
                        </motion.div>
                    </motion.div>

                    {/* Animated terminal */}
                    <div className="hidden lg:block">
                        <AnimatedTerminal name={profile.name} />
                    </div>
                </div>
            </div>

            {/* Scroll indicator - Animated Chevrons */}
            <motion.a
                href="#about"
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.6 }}
            >
                <div className="flex flex-col items-center">
                    <svg
                        className="w-6 h-6 text-primary/60 animate-chevron-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    <svg
                        className="w-6 h-6 text-primary/40 -mt-3 animate-chevron-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    <svg
                        className="w-6 h-6 text-primary/20 -mt-3 animate-chevron-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </motion.a>
        </section>
    );
}
