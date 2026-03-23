import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import SmartImage from './SmartImage';

export default function PageTransition({ children }) {
    const location = useLocation();
    
    // The state that actually renders to the screen.
    // Initialized with whatever children are provided on mount.
    const [displayChildren, setDisplayChildren] = useState(children);
    
    // We use a ref to keep track of the LATEST children passed from App.jsx,
    // but we ONLY sync them to the `displayChildren` state when the curtains are closed.
    const latestChildrenRef = useRef(children);
    latestChildrenRef.current = children;

    const overlayRef = useRef(null);
    const whiteScreenRef = useRef(null);
    const panelTopRef = useRef(null);
    const panelBotRef = useRef(null);
    const logoRef = useRef(null);
    const timelineRef = useRef(null);
    const prevPathRef = useRef(location.pathname);

    // Initial setup — hide over to GSAP control
    useLayoutEffect(() => {
        gsap.set([overlayRef.current, whiteScreenRef.current], { autoAlpha: 0, pointerEvents: 'none' });
    }, []);

    useEffect(() => {
        // If the route hasn't genuinely changed, just sync the content immediately 
        // (to handle internal re-renders or state updates within the current page)
        if (prevPathRef.current === location.pathname) {
            setDisplayChildren(children);
            return;
        }

        // Start the transition
        prevPathRef.current = location.pathname;

        if (timelineRef.current) timelineRef.current.kill();

        const overlay = overlayRef.current;
        const panelTop = panelTopRef.current;
        const panelBot = panelBotRef.current;
        const logo = logoRef.current;
        const whiteScreen = whiteScreenRef.current;

        // Immediately show the white screen, reset panels and logo
        gsap.set(whiteScreen, { autoAlpha: 1, pointerEvents: 'all' });
        gsap.set(panelTop, { yPercent: -100 });
        gsap.set(panelBot, { yPercent: 100 });
        gsap.set(logo, { opacity: 0, y: 8 });
        gsap.set(overlay, { autoAlpha: 1, pointerEvents: 'all' });

        const tl = gsap.timeline();
        timelineRef.current = tl;

        tl
            // 1. Curtains drop IN, covering the WHITE screen
            .to([panelTop, panelBot], {
                yPercent: 0,
                duration: 0.5,
                ease: 'expo.inOut',
                onComplete: () => {
                    // Update the React DOM to the NEW page behind the curtains
                    setDisplayChildren(latestChildrenRef.current);
                    // Hide the white screen so the new page is waiting when curtains open
                    gsap.set(whiteScreen, { autoAlpha: 0, pointerEvents: 'none' });
                }
            })
            // 2. Logo appears while the new page finishes painting behind the curtain
            .to(logo, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: 'power2.out',
            }, '+=0.05')
            // 4. Brief hold
            .to({}, { duration: 0.4 })
            // 5. Logo fades out
            .to(logo, {
                opacity: 0,
                duration: 0.2,
                ease: 'power2.in',
            })
            // 6. Curtains split OUT, revealing the NEW page flawlessly
            .to(panelTop, {
                yPercent: -100,
                duration: 0.55,
                ease: 'expo.inOut',
            })
            .to(panelBot, {
                yPercent: 100,
                duration: 0.55,
                ease: 'expo.inOut',
            }, '<')
            .set(overlay, { autoAlpha: 0, pointerEvents: 'none' });

    }, [location.pathname]); // We ONLY trigger on path change

    return (
        <>
            {/* The actual page content — buffered in state until curtains shut! */}
            {displayChildren}

            {/* Instant white screen overlay */}
            <div ref={whiteScreenRef} className="fixed inset-0 z-[9997] bg-white pointer-events-none" />

            {/* Transition curtain overlay */}
            <div ref={overlayRef} className="fixed inset-0 z-[9998] pointer-events-none">
                {/* Top curtain */}
                <div
                    ref={panelTopRef}
                    className="absolute top-0 left-0 right-0 h-1/2 bg-primary flex items-end justify-center pb-4"
                >
                    <div ref={logoRef} className="relative z-10">
                        <SmartImage
                            src="/trip-2-island/assets/logo-light.png"
                            alt="Trip2Island"
                            className="h-14 w-auto object-contain"
                        />
                    </div>
                </div>

                {/* Bottom curtain */}
                <div
                    ref={panelBotRef}
                    className="absolute bottom-0 left-0 right-0 h-1/2 bg-primary"
                />
            </div>
        </>
    );
}
