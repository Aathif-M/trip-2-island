import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import SmartImage from './SmartImage';

export default function PageTransition({ children }) {
    const location = useLocation();
    const overlayRef = useRef(null);
    const panelTopRef = useRef(null);
    const panelBotRef = useRef(null);
    const logoRef = useRef(null);
    const timelineRef = useRef(null);
    const prevPathRef = useRef(location.pathname);

    // Hide the overlay immediately before first paint — GSAP owns `visibility` from here on.
    // We do NOT put visibility/display in the React style prop, otherwise React re-renders
    // will reset any GSAP changes made during the animation.
    useLayoutEffect(() => {
        gsap.set(overlayRef.current, { autoAlpha: 0, pointerEvents: 'none' });
    }, []);

    useEffect(() => {
        // Skip if the path hasn't genuinely changed (initial mount / StrictMode double-invoke)
        if (prevPathRef.current === location.pathname) return;
        prevPathRef.current = location.pathname;

        // Kill any currently running transition
        if (timelineRef.current) timelineRef.current.kill();

        const overlay = overlayRef.current;
        const panelTop = panelTopRef.current;
        const panelBot = panelBotRef.current;
        const logo = logoRef.current;

        // Reset panel and logo positions, make overlay interactive
        gsap.set(panelTop, { yPercent: -100 });
        gsap.set(panelBot, { yPercent: 100 });
        gsap.set(logo, { opacity: 0, y: 8 });
        gsap.set(overlay, { autoAlpha: 1, pointerEvents: 'all' });

        const tl = gsap.timeline();
        timelineRef.current = tl;

        tl
            // Curtains close in from top and bottom
            .to([panelTop, panelBot], {
                yPercent: 0,
                duration: 0.5,
                ease: 'expo.inOut',
            })
            // Logo appears at the center seam
            .to(logo, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: 'power2.out',
            }, '-=0.1')
            // Brief hold while new page renders behind
            .to({}, { duration: 0.3 })
            // Logo fades out
            .to(logo, {
                opacity: 0,
                duration: 0.2,
                ease: 'power2.in',
            })
            // Curtains split back open
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
            // Hide overlay again — GSAP-managed, not React-managed
            .set(overlay, { autoAlpha: 0, pointerEvents: 'none' });

    }, [location.pathname]);

    return (
        <>
            {children}

            {/* 
                Transition curtain — visibility is managed entirely by GSAP.
                No display/visibility in React style props to avoid React overriding GSAP.
            */}
            <div ref={overlayRef} className="fixed inset-0 z-[9998]">
                {/* Top curtain */}
                <div
                    ref={panelTopRef}
                    className="absolute top-0 left-0 right-0 h-1/2 bg-primary flex items-end justify-center pb-4"
                >
                    <div ref={logoRef} className="relative z-10">
                        <SmartImage
                            src="/trip-2-island/assets/logo-light.png"
                            alt="Trip2Island"
                            className="h-10 w-auto object-contain"
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
