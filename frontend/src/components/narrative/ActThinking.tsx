import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ActThinking() {
    const containerRef = useRef<HTMLElement>(null);
    const scene1Ref = useRef<HTMLDivElement>(null);
    const scene2Ref = useRef<HTMLDivElement>(null);
    const scene3Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            const masterTL = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: '+=300%',
                    pin: true,
                    scrub: 1,
                }
            });

            // Scene 1: The Question
            masterTL
                .fromTo('.scene1-circle-left',
                    { x: '-50vw', opacity: 0 },
                    { x: '0vw', opacity: 1, duration: 1, ease: 'power2.out' }
                )
                .fromTo('.scene1-circle-right',
                    { x: '50vw', opacity: 0 },
                    { x: '0vw', opacity: 1, duration: 1, ease: 'power2.out' },
                    '<'
                )
                .fromTo('.scene1-text',
                    { opacity: 0, y: 40 },
                    { opacity: 1, y: 0, duration: 0.8 },
                    '-=0.3'
                )
                .to('.scene1-circle-left', { x: '-5vw', duration: 0.5 })
                .to('.scene1-circle-right', { x: '5vw', duration: 0.5 }, '<')
                .to('.scene1', { opacity: 0, duration: 0.3 })

            // Scene 2: The Weighing
                .fromTo('.scene2', { opacity: 0 }, { opacity: 1, duration: 0.3 })
                .fromTo('.scene2-line',
                    { scaleX: 0 },
                    { scaleX: 1, duration: 0.8, ease: 'power3.out' }
                )
                .fromTo('.scene2-text-1',
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5 }
                )
                .to('.scene2-line', { rotation: -15, duration: 0.6 })
                .to('.scene2-text-1', { opacity: 0.3, duration: 0.3 })
                .fromTo('.scene2-text-2',
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5 }
                )
                .to('.scene2-line', { rotation: 15, duration: 0.6 })
                .to('.scene2-text-2', { opacity: 0.3, duration: 0.3 })
                .fromTo('.scene2-text-3',
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5 }
                )
                .to('.scene2-line', { rotation: 0, duration: 0.6 })
                .to('.scene2', { opacity: 0, duration: 0.3 })

            // Scene 3: The Resolution - Convergence
                .fromTo('.scene3', { opacity: 0 }, { opacity: 1, duration: 0.3 })
                
                // 1. Gather Phase (Float in slowly from distance with rotation)
                .fromTo('.piece-left',
                    { x: -300, y: -200, rotation: -90, scale: 0.6, opacity: 0 },
                    { x: -40, y: -20, rotation: -15, scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' }
                )
                .fromTo('.piece-right',
                    { x: 300, y: -200, rotation: 90, scale: 0.6, opacity: 0 },
                    { x: 40, y: -20, rotation: 15, scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' },
                    '<'
                )
                .fromTo('.piece-bottom',
                    { x: 0, y: 300, rotation: 45, scale: 0.6, opacity: 0 },
                    { x: 0, y: 40, rotation: 0, scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' },
                    '<'
                )

                // 2. Anticipation & Magnetic Snap
                .addLabel('snap', '+=0.1')
                .to(['.piece-left', '.piece-right', '.piece-bottom'], { 
                    x: 0, y: 0, rotation: 0, 
                    duration: 0.8, 
                    ease: 'back.out(2.5)' // Highly magnetic snap 
                }, 'snap')

                // 3. Impact Effects (Group Bounce, Shockwave, and Core Glow)
                .to('.puzzle-group', { scale: 1.15, duration: 0.3, ease: 'power2.out' }, 'snap')
                .to('.puzzle-group', { scale: 1, duration: 0.6, ease: 'bounce.out' }, 'snap+=0.3')
                
                .fromTo('.burst-ring',
                    { scale: 0.5, opacity: 1, borderWidth: '12px' },
                    { scale: 2.5, opacity: 0, borderWidth: '1px', duration: 1, ease: 'power3.out' },
                    'snap'
                )
                .fromTo('.puzzle-glow',
                    { opacity: 0, scale: 0.5 },
                    { opacity: 1, scale: 1.2, duration: 0.4, ease: 'power2.out' },
                    'snap'
                )
                .to('.puzzle-glow', { opacity: 0.4, scale: 1, duration: 0.6 }, 'snap+=0.4')

                // 4. Cinematic Text Reveal
                .fromTo('.scene3-text',
                    { opacity: 0, y: 30, filter: 'blur(10px)' },
                    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' },
                    'snap+=0.2'
                )
                .fromTo('.scene3-final',
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
                    'snap+=0.6'
                );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="act-thinking relative bg-[var(--color-background)] overflow-hidden"
            style={{ minHeight: '100vh' }}
        >
            {/* Scene 1: The Question */}
            <div ref={scene1Ref} className="scene1 absolute inset-0 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="scene1-circle-left absolute w-64 h-64 rounded-full opacity-0"
                         style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(139,92,246,0) 70%)', left: 'calc(50% - 200px)' }} />
                    <div className="scene1-circle-right absolute w-64 h-64 rounded-full opacity-0"
                         style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.3) 0%, rgba(245,158,11,0) 70%)', right: 'calc(50% - 200px)' }} />
                </div>
                <div className="scene1-text text-center z-10 opacity-0">
                    <p className="text-narrative-whisper mb-6 tracking-widest uppercase text-[var(--text-muted)]">Act IV</p>
                    <h2 className="text-narrative-hero mb-6">How I <span className="text-[var(--accent-current)]">Think</span></h2>
                    <p className="text-2xl md:text-3xl font-display text-[var(--text-secondary)]">Every decision is a trade-off</p>
                </div>
            </div>

            {/* Scene 2: The Weighing */}
            <div ref={scene2Ref} className="scene2 absolute inset-0 flex flex-col items-center justify-center opacity-0">
                <div className="scene2-line w-80 h-1 bg-gradient-to-r from-[#8b5cf6] via-[var(--text-muted)] to-[#f59e0b] origin-center" />
                <div className="mt-16 space-y-4 text-center">
                    <p className="scene2-text-1 text-2xl font-display text-[var(--text-primary)] opacity-0">Speed <span className="text-[var(--text-muted)] mx-4">vs</span> Craft</p>
                    <p className="scene2-text-2 text-2xl font-display text-[var(--text-primary)] opacity-0">Build <span className="text-[var(--text-muted)] mx-4">vs</span> Buy</p>
                    <p className="scene2-text-3 text-2xl font-display text-[var(--text-primary)] opacity-0">Simple <span className="text-[var(--text-muted)] mx-4">vs</span> Complex</p>
                </div>
            </div>

            {/* Scene 3: The Resolution */}
            <div ref={scene3Ref} className="scene3 absolute inset-0 flex flex-col items-center justify-center opacity-0">
                <style dangerouslySetInnerHTML={{ __html: `
                    @keyframes coreGlowPulse {
                        0%, 100% { opacity: 0.6; transform: scale(0.9); }
                        50% { opacity: 1; transform: scale(1.1); filter: brightness(1.2) blur(10px); }
                    }
                    .animate-glow-pulse {
                        animation: coreGlowPulse 3s infinite ease-in-out;
                    }
                `}} />

                {/* Glassmorphic Venn Diagram Group */}
                <div className="puzzle-group relative w-[260px] h-[260px] mb-16 flex items-center justify-center origin-center">
                    
                    {/* Shockwave Burst (Triggers on Snap) */}
                    <div className="burst-ring absolute inset-0 rounded-full border-solid border-[color:var(--accent-current)] z-0 opacity-0 pointer-events-none" />

                    {/* Ambient Core Glow */}
                    <div className="puzzle-glow absolute inset-0 z-0 opacity-0 flex items-center justify-center pointer-events-none">
                        <div className="w-32 h-32 rounded-full animate-glow-pulse"
                             style={{
                                 background: 'radial-gradient(circle, var(--accent-current) 0%, transparent 70%)',
                                 mixBlendMode: 'screen',
                                 filter: 'blur(12px)'
                             }}
                        />
                    </div>

                    {/* Speed Orb */}
                    <div className="piece-left absolute w-32 h-32 rounded-full flex items-center justify-center backdrop-blur-md border border-purple-500/40 shadow-[0_0_30px_rgba(139,92,246,0.15)] z-10"
                         style={{ 
                             top: '20px', left: '20px', 
                             background: 'linear-gradient(135deg, rgba(139,92,246,0.4) 0%, rgba(139,92,246,0.05) 100%)' 
                         }}>
                        <span className="text-xs font-semibold tracking-widest uppercase text-purple-100 font-display drop-shadow-md">Speed</span>
                    </div>

                    {/* Quality Orb */}
                    <div className="piece-right absolute w-32 h-32 rounded-full flex items-center justify-center backdrop-blur-md border border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.15)] z-10"
                         style={{ 
                             top: '20px', right: '20px', 
                             background: 'linear-gradient(135deg, rgba(245,158,11,0.4) 0%, rgba(245,158,11,0.05) 100%)' 
                         }}>
                        <span className="text-xs font-semibold tracking-widest uppercase text-amber-100 font-display drop-shadow-md">Quality</span>
                    </div>

                    {/* Simple Orb */}
                    <div className="piece-bottom absolute w-32 h-32 rounded-full flex items-center justify-center backdrop-blur-md border border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.15)] z-20"
                         style={{ 
                             bottom: '20px', left: 'calc(50% - 64px)',
                             background: 'linear-gradient(135deg, rgba(6,182,212,0.4) 0%, rgba(6,182,212,0.05) 100%)' 
                         }}>
                        <span className="text-xs font-semibold tracking-widest uppercase text-cyan-100 font-display drop-shadow-md">Simple</span>
                    </div>
                </div>

                {/* Resolution Text */}
                <p className="scene3-text text-2xl md:text-3xl font-display text-[var(--text-primary)] text-center opacity-0">
                    The answer depends on the <span className="text-[var(--accent-current)]">context</span>
                </p>
                <p className="scene3-final text-narrative-whisper text-[var(--text-muted)] mt-8 text-center max-w-md opacity-0">
                    There are no universal truths in engineering—<br />
                    only informed choices.
                </p>
            </div>

            {/* Scroll Progress Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                <div className="w-1 h-8 rounded-full bg-[var(--accent-current)]/20 overflow-hidden">
                    <div className="w-full bg-[var(--accent-current)]" style={{ height: '100%', transform: 'scaleY(0)', transformOrigin: 'bottom' }} />
                </div>
            </div>
        </section>
    );
}
