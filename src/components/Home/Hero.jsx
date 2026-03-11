import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const slides = [
    { type: 'image', src: '/trip-2-island/assets/slider-1.jpg' },
    { type: 'image', src: '/trip-2-island/assets/slider-2.jpg' },
    { type: 'image', src: '/trip-2-island/assets/slider-3.jpg' },
    { type: 'image', src: '/trip-2-island/assets/slider-4.jpg' }
];

export default function Hero() {
    const container = useRef();
    const [currentSlide, setCurrentSlide] = useState(0);

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

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => {
            ctx.revert();
            clearInterval(timer);
        };
    }, []);

    return (
        <section ref={container} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-primary">
            {/* Slideshow Background */}
            <div className="absolute inset-0 z-0 bg-black">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-60' : 'opacity-0'
                            }`}
                    >
                        {slide.type === 'video' ? (
                            <video
                                src={slide.src}
                                poster={slide.poster}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover mix-blend-overlay"
                            />
                        ) : (
                            <img
                                src={slide.src}
                                alt={`Slide ${index}`}
                                className="w-full h-full object-cover mix-blend-overlay"
                            />
                        )}
                    </div>
                ))}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/60 to-primary/95 z-0 pointer-events-none"></div>
            </div>

            <div className="relative z-10 text-center px-6 mt-16 flex flex-col items-center max-w-5xl">
                <div className="overflow-hidden mb-4">
                    <span className="hero-text block text-accent font-semibold tracking-[0.3em] uppercase text-sm md:text-base drop-shadow-md">
                        Trip 2 Island
                    </span>
                </div>
                <div className="overflow-hidden mb-8">
                    <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-sand leading-tight drop-shadow-xl">
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
