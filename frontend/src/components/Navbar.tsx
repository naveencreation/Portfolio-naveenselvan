import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const { scrollY } = useScroll();
    const bgOpacity = useTransform(scrollY, [0, 100], [0, 1]);

    // Track active section
    useEffect(() => {
        const handleScroll = () => {
            const sections = navLinks.map(link => link.href.replace('#', ''));
            const scrollPosition = window.scrollY + 100;

            for (const section of sections.reverse()) {
                const element = document.getElementById(section);
                if (element && element.offsetTop <= scrollPosition) {
                    setActiveSection(section);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Scroll progress indicator */}
            <motion.div
                className="scroll-progress"
                style={{
                    scaleX: useTransform(
                        scrollY,
                        [0, document.documentElement.scrollHeight - window.innerHeight],
                        [0, 1]
                    )
                }}
            />

            <motion.nav
                className="fixed top-0 left-0 right-0 z-50"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Background with blur */}
                <motion.div
                    className="absolute inset-0 backdrop-blur-xl border-b border-white/5"
                    style={{
                        opacity: bgOpacity,
                        backgroundColor: 'rgba(5, 5, 8, 0.8)'
                    }}
                />

                <div className="container mx-auto px-6 py-4 relative">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <motion.a
                            href="#home"
                            className="flex items-center gap-2 group"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                <Code2 className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-display font-bold text-xl">
                                <span className="text-gradient">Void</span>
                                <span className="text-foreground">Stack</span>
                            </span>
                        </motion.a>

                        {/* Desktop nav links */}
                        <div className="hidden md:flex items-center gap-1">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors relative ${activeSection === link.href.replace('#', '')
                                            ? 'text-primary'
                                            : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {activeSection === link.href.replace('#', '') && (
                                        <motion.span
                                            className="absolute inset-0 rounded-lg bg-primary/10"
                                            layoutId="activeSection"
                                            transition={{ type: "spring", duration: 0.5 }}
                                        />
                                    )}
                                    <span className="relative z-10">{link.name}</span>
                                </motion.a>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <motion.div
                            className="hidden md:block"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Button size="sm" className="btn-glow" asChild>
                                <a href="#contact">Let's Talk</a>
                            </Button>
                        </motion.div>

                        {/* Mobile menu button */}
                        <motion.button
                            className="md:hidden p-2 rounded-lg glass-card"
                            onClick={() => setIsOpen(!isOpen)}
                            whileTap={{ scale: 0.9 }}
                        >
                            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </motion.button>
                    </div>
                </div>

                {/* Mobile menu */}
                <motion.div
                    className="md:hidden absolute top-full left-0 right-0 glass"
                    initial={false}
                    animate={{
                        height: isOpen ? 'auto' : 0,
                        opacity: isOpen ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                >
                    <div className="container mx-auto px-6 py-4 space-y-2">
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                className={`block px-4 py-3 rounded-xl transition-colors ${activeSection === link.href.replace('#', '')
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                                    }`}
                                onClick={() => setIsOpen(false)}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                {link.name}
                            </motion.a>
                        ))}
                        <Button className="w-full mt-4" asChild>
                            <a href="#contact" onClick={() => setIsOpen(false)}>
                                Let's Talk
                            </a>
                        </Button>
                    </div>
                </motion.div>
            </motion.nav>
        </>
    );
}
