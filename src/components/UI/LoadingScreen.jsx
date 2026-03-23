import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SmartImage from './SmartImage';

export default function LoadingScreen({ onComplete }) {
    const panelTopRef = useRef(null);
    const panelBotRef = useRef(null);
    const logoRef = useRef(null);
    const lineLeftRef = useRef(null);
    const lineRightRef = useRef(null);
    const progressTrackRef = useRef(null);
    const progressBarRef = useRef(null);
    // This center strip holds the logo + bar and sits at z-index above both panels
    const centerRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        // Decorative lines expand outward from logo
        tl.fromTo([lineLeftRef.current, lineRightRef.current],
            { scaleX: 0 },
            { scaleX: 1, duration: 0.6, ease: 'power2.inOut' }
        )
        // Logo fades up
        .fromTo(logoRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
            '-=0.2'
        )
        // Progress track appears
        .fromTo(progressTrackRef.current,
            { opacity: 0, scaleX: 0.5 },
            { opacity: 1, scaleX: 1, duration: 0.4, ease: 'power2.out' },
            '-=0.2'
        )
        // Progress bar fills
        .fromTo(progressBarRef.current,
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 2.2, ease: 'power1.inOut' }
        );

        const minWait = new Promise(r => setTimeout(r, 2800));
        const mediaLoad = new Promise(r => {
            if (document.readyState === 'complete') return r();
            window.addEventListener('load', r, { once: true });
        });

        Promise.all([minWait, mediaLoad]).then(() => {
            const exitTl = gsap.timeline({ onComplete });

            // Fade out logo and bar first
            exitTl.to([logoRef.current, lineLeftRef.current, lineRightRef.current, progressTrackRef.current],
                { opacity: 0, duration: 0.3, ease: 'power2.in' }
            )
            // Then split: top panel slides up, bottom panel slides down from the split line
            .to(panelTopRef.current,
                { yPercent: -100, duration: 0.8, ease: 'expo.inOut' },
                '-=0.05'
            )
            .to(panelBotRef.current,
                { yPercent: 100, duration: 0.8, ease: 'expo.inOut' },
                '<'
            )
            .to(centerRef.current,
                { opacity: 0, duration: 0.1 },
                '<'
            );
        });
    }, []);

    return (
        // Full-screen overlay
        <div className="fixed inset-0 z-[9999] pointer-events-none">
            {/* Top Panel — fills top half */}
            <div ref={panelTopRef} className="absolute top-0 left-0 right-0 h-1/2 bg-primary" />

            {/* Center content — sits over the panel seam */}
            <div ref={centerRef} className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6">
                {/* Decorative lines + Logo row */}
                <div className="flex items-center gap-4">
                    <div ref={lineLeftRef} className="h-[1px] w-20 bg-accent/50 origin-right scale-x-0" />
                    <div ref={logoRef} className="opacity-0 overflow-hidden h-10 flex items-start">
                        <SmartImage
                            src="/trip-2-island/assets/logo-light.png"
                            alt="Trip2Island"
                            className="h-14 w-auto object-contain object-top"
                        />
                    </div>
                    <div ref={lineRightRef} className="h-[1px] w-20 bg-accent/50 origin-left scale-x-0" />
                </div>

                {/* Progress bar — sits right at the split seam */}
                <div ref={progressTrackRef} className="w-36 h-[2px] bg-sand/20 overflow-hidden rounded-full opacity-0">
                    <div ref={progressBarRef} className="h-full bg-accent origin-left scale-x-0 rounded-full" />
                </div>
            </div>

            {/* Bottom Panel — fills bottom half */}
            <div ref={panelBotRef} className="absolute bottom-0 left-0 right-0 h-1/2 bg-primary" />
        </div>
    );
}
