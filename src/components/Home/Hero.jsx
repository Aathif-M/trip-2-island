import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import SmartImage from '../UI/SmartImage';
import SmartVideo from '../UI/SmartVideo';

const slides = [
    { type: 'image', src: '/trip-2-island/assets/slider-1.jpg' },
    { type: 'image', src: '/trip-2-island/assets/slider-2.jpg' },
    { type: 'image', src: '/trip-2-island/assets/slider-3.jpg' },
    { type: 'image', src: '/trip-2-island/assets/slider-4.jpg' }
];

// Inject Ken Burns keyframe CSS once into the document head
const kenburnsStyle = document.createElement('style');
kenburnsStyle.id = 'hero-kenburns';
kenburnsStyle.textContent = `
  @keyframes kenburns {
    0%   { transform: scale(1)    translateX(0%)    translateY(0%); }
    100% { transform: scale(1.12) translateX(-1.5%) translateY(-1%); }
  }
  .slide-zoom {
    animation: kenburns 6s ease-out forwards;
  }
`;
if (!document.head.querySelector('#hero-kenburns')) {
    document.head.appendChild(kenburnsStyle);
}

export default function Hero() {
    const container = useRef();
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(['.hero-span', '.hero-title', '.hero-button', '.hero-scroll'], {
                y: 50,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: 'power3.out',
                delay: 0.8
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
        <section ref={container} className="relative h-screen w-full flex items-end justify-center overflow-hidden bg-primary">
            {/* Slideshow Background */}
            <div className="absolute inset-0 z-0 bg-black">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out overflow-hidden ${index === currentSlide ? 'opacity-70' : 'opacity-0'
                            }`}
                    >
                        {/*
                          The inner div gets a unique key whenever it becomes active.
                          This forces React to remount it, restarting the CSS animation
                          from scratch on every slide transition.
                        */}
                        <div
                            key={index === currentSlide ? `active-${currentSlide}` : `idle-${index}`}
                            className={`w-full h-full ${index === currentSlide ? 'slide-zoom' : ''}`}
                        >
                            {slide.type === 'video' ? (
                                <SmartVideo
                                    src={slide.src}
                                    poster={slide.poster}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <SmartImage
                                    src={slide.src}
                                    alt={`Slide ${index}`}
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                    </div>
                ))}

                {/* 
                   Gradient overlay coming from the bottom. 
                   Dark at bottom, transparent towards the top.
                */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent z-0 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 right-0 h-[60vh] bg-gradient-to-t from-primary via-primary/80 to-transparent z-0 pointer-events-none"></div>
            </div>

            <div className="relative z-20 text-center px-4 sm:px-6 flex flex-col items-center max-w-5xl w-full mb-12 sm:mb-16 md:mb-20">
                <div className="mb-4">
                    <span className="hero-span block text-accent font-semibold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm md:text-base drop-shadow-md">
                        Trip 2 Island
                    </span>
                </div>
                <div className="mb-8">
                    <h1 className="hero-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-medium text-sand leading-tight drop-shadow-xl">
                        Journeys of a<br /> <span className="italic text-gold">Thousand Lifetimes</span>
                    </h1>
                </div>
                <Link to="/contact" className="hero-button block">
                    <button className="bg-accent text-sand px-8 sm:px-10 py-4 sm:py-5 rounded-full text-base sm:text-lg font-bold hover:bg-accent/90 hover:scale-105 active:scale-95 shadow-2xl shadow-accent/40 border border-accent/10 transition-transform w-[max-content]">
                        Discover Your Island
                    </button>
                </Link>
            </div>

            {/* Scroll indicator - Positioned Left */}
            <div className="absolute bottom-8 left-6 sm:left-12 z-20 flex flex-col items-center gap-2 hero-scroll">
                <span className="text-sand/70 text-[10px] tracking-[0.3em] uppercase [writing-mode:vertical-lr] rotate-180">Scroll</span>
                <div className="w-[1px] h-12 bg-sand/30 overflow-hidden">
                    <div className="w-full h-full bg-sand origin-top animate-scroll-line"></div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes scroll-line {
                    0% { transform: scaleY(0); transform-origin: top; }
                    50% { transform: scaleY(1); transform-origin: top; }
                    51% { transform: scaleY(1); transform-origin: bottom; }
                    100% { transform: scaleY(0); transform-origin: bottom; }
                }
                .animate-scroll-line {
                    animation: scroll-line 2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
                }
            `}} />
        </section>
    );
}
