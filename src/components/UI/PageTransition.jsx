import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import SmartImage from './SmartImage';

export default function PageTransition({ children }) {
    const location = useLocation();
    const [displayedChildren, setDisplayedChildren] = useState(children);
    const [pendingChildren, setPendingChildren] = useState(null);
    const overlayRef = useRef(null);
    const panelTopRef = useRef(null);
    const panelBotRef = useRef(null);
    const logoRef = useRef(null);
    const isFirstRender = useRef(true);

    useEffect(() => {
        // Skip on first mount — the initial LoadingScreen handles that
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        // Stage 1: animate overlay IN (curtain drops to cover old page)
        gsap.set(overlayRef.current, { display: 'flex' });
        gsap.set(panelTopRef.current, { yPercent: -100 });
        gsap.set(panelBotRef.current, { yPercent: 100 });
        gsap.set(logoRef.current, { opacity: 0, y: 10 });

        const tl = gsap.timeline();

        tl.to([panelTopRef.current, panelBotRef.current],
            { yPercent: 0, duration: 0.55, ease: 'expo.inOut', stagger: 0 }
        )
        .to(logoRef.current,
            { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
            '-=0.1'
        )
        // Brief pause on full-screen overlay
        .to({}, { duration: 0.35 })
        // Update the rendered children while overlay is covering
        .call(() => { setDisplayedChildren(children); })
        // Stage 2: animate out (curtain lifts to reveal new page)
        .to(logoRef.current,
            { opacity: 0, duration: 0.25, ease: 'power2.in' }
        )
        .to(panelTopRef.current,
            { yPercent: -100, duration: 0.55, ease: 'expo.inOut' }
        )
        .to(panelBotRef.current,
            { yPercent: 100, duration: 0.55, ease: 'expo.inOut' },
            '<'
        )
        .call(() => {
            gsap.set(overlayRef.current, { display: 'none' });
        });

    }, [location.pathname]);

    // Sync when location doesn't change
    useEffect(() => {
        if (isFirstRender.current) return;
        setDisplayedChildren(children);
    }, [children]);

    return (
        <>
            {displayedChildren}

            {/* Transition Curtain Overlay */}
            <div
                ref={overlayRef}
                className="fixed inset-0 z-[9998] flex flex-col pointer-events-none"
                style={{ display: 'none' }}
            >
                {/* Top curtain */}
                <div ref={panelTopRef} className="bg-primary h-1/2 flex items-end justify-center pb-6"
                    style={{ transform: 'translateY(-100%)' }}>
                    <div ref={logoRef} className="opacity-0">
                        <SmartImage
                            src="/trip-2-island/assets/logo-light.png"
                            alt="Trip2Island"
                            className="h-10 w-auto object-contain"
                        />
                    </div>
                </div>
                {/* Bottom curtain */}
                <div ref={panelBotRef} className="bg-primary h-1/2"
                    style={{ transform: 'translateY(100%)' }}>
                </div>
            </div>
        </>
    );
}
