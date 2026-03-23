import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SmartImage from './SmartImage';

export default function LoadingScreen({ onComplete }) {
    const overlayRef = useRef(null);
    const logoRef = useRef(null);
    const progressBarRef = useRef(null);
    const taglineRef = useRef(null);
    const panelTopRef = useRef(null);
    const panelBotRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        // Entrance: logo and tagline fade in
        tl.fromTo(logoRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        )
        .fromTo(taglineRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
            '-=0.3'
        )
        // Progress bar fills up
        .fromTo(progressBarRef.current,
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 1.8, ease: 'power1.inOut' },
            '-=0.4'
        );

        // Wait for all images to load OR a minimum of 2.5s (whichever is longer)
        const minWait = new Promise(resolve => setTimeout(resolve, 2500));
        const mediaLoad = new Promise(resolve => {
            if (document.readyState === 'complete') return resolve();
            window.addEventListener('load', resolve, { once: true });
        });

        Promise.all([minWait, mediaLoad]).then(() => {
            // Exit: split-panel wipe out
            gsap.timeline({ onComplete })
                .to(logoRef.current, { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' })
                .to(taglineRef.current, { opacity: 0, duration: 0.3 }, '<')
                .to(panelTopRef.current, { yPercent: -100, duration: 0.8, ease: 'power3.inOut' })
                .to(panelBotRef.current, { yPercent: 100, duration: 0.8, ease: 'power3.inOut' }, '<');
        });
    }, []);

    return (
        <div ref={overlayRef} className="fixed inset-0 z-[9999] flex flex-col pointer-events-none">
            {/* Top half */}
            <div ref={panelTopRef} className="bg-primary h-1/2 flex items-end justify-center pb-6">
                <div className="flex flex-col items-center gap-4">
                    <div ref={logoRef} className="opacity-0">
                        <SmartImage
                            src="/trip-2-island/assets/logo-light.png"
                            alt="Trip2Island"
                            className="h-14 w-auto object-contain"
                        />
                    </div>
                    {/* Progress bar */}
                    <div className="w-32 h-[2px] bg-sand/20 rounded-full overflow-hidden">
                        <div ref={progressBarRef} className="h-full bg-accent rounded-full scale-x-0 origin-left"></div>
                    </div>
                </div>
            </div>
            {/* Bottom half */}
            <div ref={panelBotRef} className="bg-primary h-1/2 flex items-start justify-center pt-6">
                <p ref={taglineRef} className="opacity-0 text-sand/60 text-sm tracking-widest uppercase font-sans">
                    Tours &amp; Excursions
                </p>
            </div>
        </div>
    );
}
