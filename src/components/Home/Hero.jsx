import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
    const container = useRef();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.hero-text', {
                y: 100,
                opacity: 0,
                duration: 1.5,
                stagger: 0.2,
                ease: 'power4.out',
                delay: 0.5
            });
        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-primary">
            {/* Video Placeholder */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1546708973-2475df18fc73?auto=format&fit=crop&q=80&w=2000"
                    alt="Sri Lanka landscape"
                    className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/20 to-primary/80 z-0"></div>
            </div>

            <div className="relative z-10 text-center px-6 mt-16 flex flex-col items-center max-w-5xl">
                <div className="overflow-hidden mb-4">
                    <span className="hero-text block text-accent font-semibold tracking-[0.3em] uppercase text-sm md:text-base">
                        Trip 2 Island
                    </span>
                </div>
                <div className="overflow-hidden mb-8">
                    <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-sand leading-tight">
                        Journeys of a<br /> <span className="italic text-gold">Thousand Lifetimes</span>
                    </h1>
                </div>
                <div className="overflow-hidden">
                    <button className="hero-text bg-accent text-sand px-8 py-4 rounded-full text-lg font-semibold hover:bg-accent/90 transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-accent/20">
                        Discover Your Island
                    </button>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 hero-text">
                <span className="text-sand/70 text-xs tracking-widest uppercase writing-vertical">Scroll</span>
                <div className="w-[1px] h-12 bg-sand/30 overflow-hidden">
                    <div className="w-full h-1/2 bg-sand animate-bounce"></div>
                </div>
            </div>
        </section>
    );
}
