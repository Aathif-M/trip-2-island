import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import SmartImage from './SmartImage';

export default function PageTransition({ children }) {
    const location = useLocation();
    
    // The state that actually renders to the screen.
    const [displayChildren, setDisplayChildren] = useState(children);
    
    // Track latest children to swap in mid-transition
    const latestChildrenRef = useRef(children);
    latestChildrenRef.current = children;

    const overlayRef = useRef(null);
    const whiteScreenRef = useRef(null);
    const panelTopRef = useRef(null);
    const panelBotRef = useRef(null);
    const centerRef = useRef(null);
    
    // Center elements matching LoadingScreen
    const logoRef = useRef(null);
    const lineLeftRef = useRef(null);
    const lineRightRef = useRef(null);
    const progressTrackRef = useRef(null);
    const progressBarRef = useRef(null);
    
    const timelineRef = useRef(null);
    const prevPathRef = useRef(location.pathname);

    // Initial setup — hide everything
    useLayoutEffect(() => {
        gsap.set([overlayRef.current, whiteScreenRef.current], { autoAlpha: 0, pointerEvents: 'none' });
    }, []);

    useEffect(() => {
        if (prevPathRef.current === location.pathname) {
            setDisplayChildren(children);
            return;
        }

        prevPathRef.current = location.pathname;

        if (timelineRef.current) timelineRef.current.kill();

        const whiteScreen = whiteScreenRef.current;
        const panelTop = panelTopRef.current;
        const panelBot = panelBotRef.current;

        // Instantly show white screen
        gsap.set(whiteScreen, { autoAlpha: 1, pointerEvents: 'all' });
        
        // Reset panel positions
        gsap.set(panelTop, { yPercent: -100 });
        gsap.set(panelBot, { yPercent: 100 });
        
        // Reset center elements
        gsap.set(logoRef.current, { opacity: 0, y: 8 });
        gsap.set(lineLeftRef.current, { scaleX: 0 });
        gsap.set(lineRightRef.current, { scaleX: 0 });
        gsap.set(progressTrackRef.current, { opacity: 0, scaleX: 0.5 });
        gsap.set(progressBarRef.current, { scaleX: 0 });
        
        // Ensure overlay is active
        gsap.set(overlayRef.current, { autoAlpha: 1, pointerEvents: 'all' });

        const tl = gsap.timeline();
        timelineRef.current = tl;

        tl
            // 1. Curtains drop IN over the WHITE screen
            .to([panelTop, panelBot], {
                yPercent: 0,
                duration: 0.5,
                ease: 'expo.inOut',
                onComplete: () => {
                    // Update React DOM to NEW page behind the scenes once it's dark
                    setDisplayChildren(latestChildrenRef.current);
                }
            })
            // 2. Decorative lines and logo animate in
            .to([lineLeftRef.current, lineRightRef.current], {
                scaleX: 1,
                duration: 0.4,
                ease: 'power2.inOut',
            }, '+=0.05')
            .to(logoRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: 'power2.out',
            }, '<')
            // 3. Progress track fades in
            .to(progressTrackRef.current, {
                opacity: 1,
                scaleX: 1,
                duration: 0.3,
                ease: 'power2.out',
            }, '-=0.1')
            // 4. Progress bar fills (visual loading state)
            .to(progressBarRef.current, {
                scaleX: 1,
                duration: 0.8, // Fast but satisfying load duration for transitions
                ease: 'power1.inOut',
            })
            // 5. Fade out center elements and hide the white screen
            .to([logoRef.current, lineLeftRef.current, lineRightRef.current, progressTrackRef.current], {
                opacity: 0,
                duration: 0.2,
                ease: 'power2.in',
            })
            .set(whiteScreen, { autoAlpha: 0, pointerEvents: 'none' })
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
            .set(overlayRef.current, { autoAlpha: 0, pointerEvents: 'none' });

    }, [location.pathname]);

    return (
        <>
            {/* Buffers the page view until curtains shut */}
            {displayChildren}

            {/* Instant white screen overlay */}
            <div ref={whiteScreenRef} className="fixed inset-0 z-[9997] bg-white pointer-events-none" />

            {/* Transition curtain overlay */}
            <div ref={overlayRef} className="fixed inset-0 z-[9998] pointer-events-none">
                {/* Top curtain */}
                <div ref={panelTopRef} className="absolute top-0 left-0 right-0 h-1/2 bg-primary" />

                {/* Center Content (Logo + Loading Bar) */}
                <div ref={centerRef} className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6">
                    {/* Decorative lines + Logo row */}
                    <div className="flex items-center gap-4">
                        <div ref={lineLeftRef} className="h-[1px] w-20 bg-accent/50 origin-right scale-x-0" />
                        <div ref={logoRef} className="opacity-0 relative z-10">
                            <SmartImage
                                src="/trip-2-island/assets/logo-light.png"
                                alt="Trip2Island"
                                className="h-14 w-auto object-contain"
                            />
                        </div>
                        <div ref={lineRightRef} className="h-[1px] w-20 bg-accent/50 origin-left scale-x-0" />
                    </div>

                    {/* Progress bar */}
                    <div ref={progressTrackRef} className="w-36 h-[2px] bg-sand/20 overflow-hidden rounded-full opacity-0">
                        <div ref={progressBarRef} className="h-full bg-accent origin-left scale-x-0 rounded-full" />
                    </div>
                </div>

                {/* Bottom curtain */}
                <div ref={panelBotRef} className="absolute bottom-0 left-0 right-0 h-1/2 bg-primary" />
            </div>
        </>
    );
}
