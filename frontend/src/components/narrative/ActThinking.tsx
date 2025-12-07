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
            // Master timeline pinned to container
            const masterTL = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: '+=300%',
                    pin: true,
                    scrub: 1,
                }
            });

            // Scene 1: The Question - Two circles approach
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

                // Fade out scene 1
                .to('.scene1', { opacity: 0, duration: 0.3 })

                // Scene 2: The Weighing - Scale animation
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

                // Fade out scene 2
                .to('.scene2', { opacity: 0, duration: 0.3 })

                // Scene 3: The Resolution - Convergence
                .fromTo('.scene3', { opacity: 0 }, { opacity: 1, duration: 0.3 })
                .fromTo('.scene3-shape-1',
                    { x: -100, y: -80, opacity: 0, rotation: -45 },
                    { x: 0, y: 0, opacity: 1, rotation: 0, duration: 1 }
                )
                .fromTo('.scene3-shape-2',
                    { x: 100, y: -80, opacity: 0, rotation: 45 },
                    { x: 0, y: 0, opacity: 1, rotation: 0, duration: 1 },
                    '<'
                )
                .fromTo('.scene3-shape-3',
                    { y: 100, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1 },
                    '<'
                )
                .fromTo('.scene3-text',
                    { opacity: 0, scale: 0.9 },
                    { opacity: 1, scale: 1, duration: 0.8 }
                )
                .fromTo('.scene3-final',
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.8 },
                    '+=0.2'
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
            <div
                ref={scene1Ref}
                className="scene1 absolute inset-0 flex items-center justify-center"
            >
                {/* Approaching circles */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                        className="scene1-circle-left absolute w-64 h-64 rounded-full opacity-0"
                        style={{
                            background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(139,92,246,0) 70%)',
                            left: 'calc(50% - 200px)',
                        }}
                    />
                    <div
                        className="scene1-circle-right absolute w-64 h-64 rounded-full opacity-0"
                        style={{
                            background: 'radial-gradient(circle, rgba(245,158,11,0.3) 0%, rgba(245,158,11,0) 70%)',
                            right: 'calc(50% - 200px)',
                        }}
                    />
                </div>

                {/* Text */}
                <div className="scene1-text text-center z-10 opacity-0">
                    <p className="text-narrative-whisper mb-6 tracking-widest uppercase text-[var(--text-muted)]">
                        Act IV
                    </p>
                    <h2 className="text-narrative-hero mb-6">
                        How I <span className="text-[var(--accent-current)]">Think</span>
                    </h2>
                    <p className="text-2xl md:text-3xl font-display text-[var(--text-secondary)]">
                        Every decision is a trade-off
                    </p>
                </div>
            </div>

            {/* Scene 2: The Weighing */}
            <div
                ref={scene2Ref}
                className="scene2 absolute inset-0 flex flex-col items-center justify-center opacity-0"
            >
                {/* The scale line */}
                <div
                    className="scene2-line w-80 h-1 bg-gradient-to-r from-[#8b5cf6] via-[var(--text-muted)] to-[#f59e0b] origin-center"
                    style={{ transformOrigin: 'center' }}
                />

                {/* The statements */}
                <div className="mt-16 space-y-4 text-center">
                    <p className="scene2-text-1 text-2xl font-display text-[var(--text-primary)] opacity-0">
                        Speed <span className="text-[var(--text-muted)] mx-4">vs</span> Craft
                    </p>
                    <p className="scene2-text-2 text-2xl font-display text-[var(--text-primary)] opacity-0">
                        Build <span className="text-[var(--text-muted)] mx-4">vs</span> Buy
                    </p>
                    <p className="scene2-text-3 text-2xl font-display text-[var(--text-primary)] opacity-0">
                        Simple <span className="text-[var(--text-muted)] mx-4">vs</span> Complex
                    </p>
                </div>
            </div>

            {/* Scene 3: The Resolution */}
            <div
                ref={scene3Ref}
                className="scene3 absolute inset-0 flex flex-col items-center justify-center opacity-0"
            >
                {/* Converging shapes */}
                <div className="relative w-48 h-48 mb-12">
                    <div
                        className="scene3-shape-1 absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 opacity-0"
                        style={{
                            background: 'linear-gradient(135deg, #8b5cf6 0%, transparent 100%)',
                            clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
                        }}
                    />
                    <div
                        className="scene3-shape-2 absolute top-1/4 right-0 w-16 h-16 opacity-0"
                        style={{
                            background: 'linear-gradient(225deg, #f59e0b 0%, transparent 100%)',
                            clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
                        }}
                    />
                    <div
                        className="scene3-shape-3 absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full opacity-0"
                        style={{
                            background: 'radial-gradient(circle, var(--accent-current) 0%, transparent 70%)',
                        }}
                    />
                </div>

                {/* Resolution text */}
                <p className="scene3-text text-2xl md:text-3xl font-display text-[var(--text-primary)] text-center opacity-0">
                    The answer depends on the <span className="text-[var(--accent-current)]">context</span>
                </p>

                {/* Final statement */}
                <p className="scene3-final text-narrative-whisper text-[var(--text-muted)] mt-8 text-center max-w-md opacity-0">
                    There are no universal truths in engineering—<br />
                    only informed choices.
                </p>
            </div>

            {/* Scroll progress indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                <div className="w-1 h-8 rounded-full bg-[var(--accent-current)]/20 overflow-hidden">
                    <div
                        className="w-full bg-[var(--accent-current)]"
                        style={{ height: '100%', transform: 'scaleY(0)', transformOrigin: 'bottom' }}
                    />
                </div>
            </div>
        </section>
    );
}
