import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { submitContactForm } from '@/lib/api';
import { Mail, Linkedin, Github, Send, CheckCircle, MapPin, Phone, Sparkles } from 'lucide-react';

interface ContactProps {
    email?: string;
    linkedin?: string;
    github?: string;
    phone?: string;
}

// Contact info card
function ContactInfoCard({
    icon: Icon,
    title,
    value,
    href,
    delay = 0
}: {
    icon: any;
    title: string;
    value: string;
    href: string;
    delay?: number;
}) {
    return (
        <motion.a
            href={href}
            target={href.startsWith('mailto') || href.startsWith('tel') ? undefined : '_blank'}
            rel="noopener noreferrer"
            className="glass-card p-6 rounded-2xl flex items-center gap-4 group hover:border-primary/30 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ scale: 1.02, y: -4 }}
        >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
                <Icon className="w-6 h-6 text-primary" />
            </div>
            <div>
                <p className="text-sm text-muted-foreground">{title}</p>
                <p className="font-medium group-hover:text-primary transition-colors">{value}</p>
            </div>
        </motion.a>
    );
}

export function Contact({ email, linkedin, github, phone }: ContactProps) {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            await submitContactForm(formData);
            setIsSubmitted(true);
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            setError('Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-24 relative">
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
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
                        05. Contact
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold font-display mt-4">
                        <span className="text-gradient-static">Get In Touch</span>
                    </h2>
                    <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
                        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                    </p>
                </motion.div>

                <div className="max-w-5xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact info cards */}
                        <div className="space-y-4">
                            <motion.h3
                                className="text-xl font-semibold mb-6 flex items-center gap-2"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                            >
                                <Sparkles className="w-5 h-5 text-accent" />
                                Let's Connect
                            </motion.h3>

                            {email && (
                                <ContactInfoCard
                                    icon={Mail}
                                    title="Email"
                                    value={email}
                                    href={`mailto:${email}`}
                                    delay={0.1}
                                />
                            )}
                            {linkedin && (
                                <ContactInfoCard
                                    icon={Linkedin}
                                    title="LinkedIn"
                                    value="Connect with me"
                                    href={linkedin}
                                    delay={0.2}
                                />
                            )}
                            {github && (
                                <ContactInfoCard
                                    icon={Github}
                                    title="GitHub"
                                    value="Check my repos"
                                    href={github}
                                    delay={0.3}
                                />
                            )}
                            {phone && (
                                <ContactInfoCard
                                    icon={Phone}
                                    title="Phone"
                                    value={phone}
                                    href={`tel:${phone}`}
                                    delay={0.4}
                                />
                            )}
                        </div>

                        {/* Contact form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            {isSubmitted ? (
                                <motion.div
                                    className="glass-card p-12 rounded-2xl text-center"
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", duration: 0.5, delay: 0.2 }}
                                    >
                                        <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                                    </motion.div>
                                    <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                                    <p className="text-muted-foreground mb-6">
                                        Thank you for reaching out. I'll get back to you soon!
                                    </p>
                                    <Button
                                        variant="secondary"
                                        onClick={() => setIsSubmitted(false)}
                                    >
                                        Send Another Message
                                    </Button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 text-foreground placeholder:text-muted-foreground"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Email</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 text-foreground placeholder:text-muted-foreground"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Message</label>
                                        <textarea
                                            required
                                            rows={5}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 text-foreground placeholder:text-muted-foreground resize-none"
                                            placeholder="Your message..."
                                        />
                                    </div>

                                    {error && (
                                        <p className="text-red-400 text-sm">{error}</p>
                                    )}

                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full btn-glow group"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <motion.div
                                                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </Button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
