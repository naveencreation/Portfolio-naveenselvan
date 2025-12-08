import { useEffect, useRef, useState, createContext, useContext } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Portfolio } from '@/types/portfolio';

// ACT Components
import { ActCuriosity } from './ActCuriosity';
import { ActEngineering } from './ActEngineering';
import { ActProjects } from './ActProjects';
import { ActThinking } from './ActThinking';
import { ActHuman } from './ActHuman';
import { ActFuture } from './ActFuture';
import { ScrollProgress } from './ScrollProgress';

gsap.registerPlugin(ScrollTrigger);

// Performance optimizations for GSAP
gsap.config({
    force3D: true,
    nullTargetWarn: false,
});

// Reduce ScrollTrigger refresh rate for better performance
ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true,
});

// Accent color context for scroll-driven color evolution
interface AccentContextType {
    accentColor: string;
    scrollProgress: number;
}

const AccentContext = createContext<AccentContextType>({
    accentColor: '#64748b',
    scrollProgress: 0,
});

export const useAccent = () => useContext(AccentContext);

// Color interpolation helper
function interpolateColor(color1: string, color2: string, factor: number): string {
    const hex = (c: string) => parseInt(c, 16);
    const r1 = hex(color1.slice(1, 3));
    const g1 = hex(color1.slice(3, 5));
    const b1 = hex(color1.slice(5, 7));
    const r2 = hex(color2.slice(1, 3));
    const g2 = hex(color2.slice(3, 5));
    const b2 = hex(color2.slice(5, 7));

    const r = Math.round(r1 + (r2 - r1) * factor);
    const g = Math.round(g1 + (g2 - g1) * factor);
    const b = Math.round(b1 + (b2 - b1) * factor);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// Get accent color based on scroll position
function getAccentForProgress(progress: number): string {
    const colors = {
        slate: '#64748b',
        violet: '#8b5cf6',
        amber: '#f59e0b',
        teal: '#14b8a6',
    };

    if (progress < 0.2) {
        return interpolateColor(colors.slate, colors.violet, progress / 0.2);
    } else if (progress < 0.5) {
        return interpolateColor(colors.violet, colors.amber, (progress - 0.2) / 0.3);
    } else if (progress < 0.8) {
        return interpolateColor(colors.amber, colors.teal, (progress - 0.5) / 0.3);
    } else {
        return colors.teal;
    }
}

interface NarrativeJourneyProps {
    data: Portfolio | null;
}

export function NarrativeJourney({ data }: NarrativeJourneyProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [accentColor, setAccentColor] = useState('#64748b');

    useEffect(() => {
        if (!containerRef.current) return;

        // Main scroll progress tracker
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: (self) => {
                const progress = self.progress;
                setScrollProgress(progress);

                const newAccent = getAccentForProgress(progress);
                setAccentColor(newAccent);

                // Update CSS custom property for global accent
                document.documentElement.style.setProperty('--accent-current', newAccent);
                document.documentElement.style.setProperty(
                    '--accent-current-dim',
                    `${newAccent}33`
                );
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <AccentContext.Provider value={{ accentColor, scrollProgress }}>
            <div ref={containerRef} className="narrative-journey">
                {/* Scroll Progress Indicator */}
                <ScrollProgress currentAct={Math.floor(scrollProgress * 6) + 1} />

                {/* ACT 1: Curiosity - Visual chaos forming into clarity */}
                <ActCuriosity />

                {/* ACT 2: Engineering Mindset - Grid systems, sharp typography */}
                <ActEngineering profile={data?.profile || null} />

                {/* ACT 3: Real Projects - Story-driven reveals */}
                <ActProjects projects={data?.projects || []} />

                {/* ACT 4: How I Think - Interactive decision UI */}
                <ActThinking />

                {/* ACT 5: Human Layer - Minimal, calm */}
                <ActHuman profile={data?.profile || null} />

                {/* ACT 6: The Future - Single invitation */}
                <ActFuture email={data?.profile?.email} />
            </div>
        </AccentContext.Provider>
    );
}
