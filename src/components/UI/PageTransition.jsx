import { useEffect, useRef } from 'react';
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

    // Track the previous path — only animate when the path genuinely changes
    const prevPathRef = useRef(location.pathname);

    useEffect(() => {
        // If the path hasn't actually changed (initial mount or Strict Mode double-invoke), skip
        if (prevPathRef.current === location.pathname) {
            return;
        }

        // Update previous path
        prevPathRef.current = location.pathname;

        // Kill any previous animation to prevent overlap
        if (timelineRef.current) timelineRef.current.kill();

        const overlay = overlayRef.current;
        const panelTop = panelTopRef.current;
        const panelBot = panelBotRef.current;
        const logo = logoRef.current;

        // Reset positions
        gsap.set(overlay, { display: 'block', pointerEvents: 'all' });
        gsap.set(panelTop, { yPercent: -100 });
        gsap.set(panelBot, { yPercent: 100 });
        gsap.set(logo, { opacity: 0, y: 8 });

        const tl = gsap.timeline();
        timelineRef.current = tl;

        tl
            // Curtains close in
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
            // Brief hold for new page to render
            .to({}, { duration: 0.3 })
            // Logo fades out
            .to(logo, {
                opacity: 0,
                duration: 0.2,
                ease: 'power2.in',
            })
            // Curtains split open
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
            .call(() => {
                gsap.set(overlay, { display: 'none', pointerEvents: 'none' });
            });

    }, [location.pathname]);

    return (
        <>
            {children}

            {/* Transition curtain overlay */}
            <div
                ref={overlayRef}
                className="fixed inset-0 z-[9998] pointer-events-none"
                style={{ display: 'none' }}
            >
                {/* Top curtain */}
                <div
                    ref={panelTopRef}
                    className="absolute top-0 left-0 right-0 h-1/2 bg-primary flex items-end justify-center pb-4"
                    style={{ transform: 'translateY(-100%)' }}
                >
                    <div ref={logoRef} className="opacity-0 z-10 relative">
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
                    style={{ transform: 'translateY(100%)' }}
                />
            </div>
        </>
    );
}
