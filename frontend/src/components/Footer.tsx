import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail, Code2 } from 'lucide-react';

interface FooterProps {
    linkedin?: string;
    github?: string;
    email?: string;
}

export function Footer({ linkedin, github, email }: FooterProps) {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: Linkedin, href: linkedin, label: 'LinkedIn' },
        { icon: Github, href: github, label: 'GitHub' },
        { icon: Mail, href: email ? `mailto:${email}` : undefined, label: 'Email' },
    ].filter(link => link.href);

    return (
        <footer className="py-12 border-t border-border/50 relative">
            {/* Background gradient */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute bottom-0 left-1/2 w-96 h-32 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo */}
                    <motion.a
                        href="#home"
                        className="flex items-center gap-2 group"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/50 to-accent/50 flex items-center justify-center">
                            <Code2 className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-display font-bold">
                            <span className="text-primary">Void</span>
                            <span className="text-foreground">Stack</span>
                        </span>
                    </motion.a>

                    {/* Social links */}
                    <div className="flex items-center gap-3">
                        {socialLinks.map((link, i) => (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                target={link.href?.startsWith('mailto') ? undefined : '_blank'}
                                rel="noopener noreferrer"
                                className="p-2.5 rounded-lg glass-card hover:border-primary/30 transition-all duration-300"
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                aria-label={link.label}
                            >
                                <link.icon className="w-4 h-4" />
                            </motion.a>
                        ))}
                    </div>

                    {/* Copyright */}
                    <motion.p
                        className="text-sm text-muted-foreground flex items-center gap-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Built with
                        <Heart className="w-4 h-4 text-red-400 fill-red-400 inline mx-1" />
                        © {currentYear}
                    </motion.p>
                </div>
            </div>
        </footer>
    );
}
