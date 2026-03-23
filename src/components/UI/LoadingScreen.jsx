import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SmartImage from './SmartImage';

export default function LoadingScreen({ onComplete }) {
    const panelTopRef = useRef(null);
    const panelBotRef = useRef(null);
    const logoRef = useRef(null);
    const taglineRef = useRef(null);
    const lineLeftRef = useRef(null);
    const lineRightRef = useRef(null);
    const progressRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        // Decorative lines expand from center
        tl.fromTo([lineLeftRef.current, lineRightRef.current],
            { scaleX: 0 },
            { scaleX: 1, duration: 0.6, ease: 'power2.inOut', stagger: 0 }
        )
        // Logo and tagline reveal
        .fromTo(logoRef.current,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
            '-=0.2'
        )
        .fromTo(taglineRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
            '-=0.3'
        )
        // Progress bar fills
        .fromTo(progressRef.current,
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 2.0, ease: 'power1.inOut' },
            '-=0.3'
        );

        const minWait = new Promise(r => setTimeout(r, 2800));
        const mediaLoad = new Promise(r => {
            if (document.readyState === 'complete') return r();
            window.addEventListener('load', r, { once: true });
        });

        Promise.all([minWait, mediaLoad]).then(() => {
            gsap.timeline({ onComplete })
                .to([logoRef.current, taglineRef.current, lineLeftRef.current, lineRightRef.current, progressRef.current],
                    { opacity: 0, duration: 0.4, ease: 'power2.in', stagger: 0.04 }
                )
                .to(panelTopRef.current,
                    { yPercent: -100, duration: 0.85, ease: 'expo.inOut' },
                    '-=0.1'
                )
                .to(panelBotRef.current,
                    { yPercent: 100, duration: 0.85, ease: 'expo.inOut' },
                    '<'
                );
        });
    }, []);

    return (
        <div className="fixed inset-0 z-[9999] flex flex-col pointer-events-none">
            {/* Top half */}
            <div ref={panelTopRef} className="bg-primary h-1/2 flex items-end justify-center">
                <div className="flex flex-col items-center gap-5 pb-8">
                    {/* Decorative lines */}
                    <div className="flex items-center gap-4 w-56">
                        <div ref={lineLeftRef} className="h-[1px] flex-1 bg-accent/50 origin-right scale-x-0" />
                        <div ref={logoRef} className="opacity-0">
                            <SmartImage
                                src="/trip-2-island/assets/logo-light.png"
                                alt="Trip2Island"
                                className="h-12 w-auto object-contain"
                            />
                        </div>
                        <div ref={lineRightRef} className="h-[1px] flex-1 bg-accent/50 origin-left scale-x-0" />
                    </div>
                </div>
            </div>

            {/* Bottom half */}
            <div ref={panelBotRef} className="bg-primary h-1/2 flex items-start justify-center">
                <div className="flex flex-col items-center gap-4 pt-8">
                    <p ref={taglineRef} className="opacity-0 text-sand/50 text-xs tracking-[0.3em] uppercase font-sans">
                        Tours &amp; Excursions
                    </p>
                    {/* Progress bar */}
                    <div className="w-28 h-[1px] bg-sand/20 overflow-hidden">
                        <div ref={progressRef} className="h-full bg-accent origin-left scale-x-0" />
                    </div>
                </div>
            </div>
        </div>
    );
}
