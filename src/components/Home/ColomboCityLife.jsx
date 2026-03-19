import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SmartImage from '../UI/SmartImage';

gsap.registerPlugin(ScrollTrigger);

const pillarsData = [
    {
        title: "Luxury City Hotels",
        description: "Experience the epitome of metropolitan luxury. From historic colonial landmarks that have hosted royalty to soaring modern high-rises with sweeping views of the Indian Ocean, Colombo’s hospitality blends old-world charm with contemporary elegance. Unwind in ocean-facing suites or sip evening cocktails by aglow infinity pools as the sun dips below the horizon.",
        image: "/trip-2-island/assets/colombo-hotels.jpg",
        reverse: false
    },
    {
        title: "The Port City",
        description: "Step into the future of Sri Lanka. Built on reclaimed land, the Port City represents a daring architectural leap. Stroll along modern marinas, expansive walkways, and lush urban parks that frame a growing skyline. As night falls, the metropolis glows, casting futuristic reflections across the bay.",
        image: "/trip-2-island/assets/colombo-port.jpg",
        reverse: true
    },
    {
        title: "Entertainment & Lifestyle",
        description: "When the island sun sets, Colombo comes alive. Indulge in designer retail therapy at luxury hubs like One Galle Face, or explore a thriving culinary and cafe culture that weaves through the city's arteries. Crown your evening at exclusive rooftop bars, gazing out at the illuminated Lotus Tower piercing the night sky.",
        image: "/trip-2-island/assets/colombo-lifestyle.jpg",
        reverse: false
    },
    {
        title: "Spiritual Sanctuaries",
        description: "Amidst the metropolitan rush lies profound serenity. Architectural marvels like the iconic Gangaramaya Temple sit peacefully on the waters of Beira Lake. Ornate carvings, golden stupas, and glowing lanterns reflect perfectly in the calm waters—a reminder of the deep spiritual roots that anchor this ever-evolving city.",
        image: "/trip-2-island/assets/colombo-spiritual.jpg",
        reverse: true
    }
];

const ColomboCityLife = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Text Revealer: Targets each container to stagger the text inside
            gsap.utils.toArray('.pillar-text-container').forEach((container) => {
                const texts = container.querySelectorAll('.reveal-text');
                gsap.fromTo(texts, 
                    { y: '100%', opacity: 0 },
                    { 
                        y: '0%', 
                        opacity: 1, 
                        duration: 1.2, 
                        ease: 'power3.out',
                        stagger: 0.2,
                        scrollTrigger: {
                            trigger: container,
                            start: 'top 85%',
                        }
                    }
                );
            });

            // Image Reveal + Parallax Effect
            gsap.utils.toArray('.image-container').forEach((container) => {
                const img = container.querySelector('.parallax-image');
                
                // Cinematic clip-path reveal
                gsap.fromTo(container,
                    { clipPath: 'inset(100% 0 0 0)' },
                    {
                        clipPath: 'inset(0% 0 0 0)',
                        duration: 1.5,
                        ease: 'power3.inOut',
                        scrollTrigger: {
                            trigger: container,
                            start: 'top 85%',
                        }
                    }
                );

                // Scrubbed Parallax for the actual image
                gsap.fromTo(img,
                    { yPercent: -15, scale: 1.1 },
                    {
                        yPercent: 15,
                        scale: 1,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: container,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true,
                        }
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const headingFont = { fontFamily: "'Playfair Display', serif" };
    const bodyFont = { fontFamily: "'Inter', sans-serif" };

    return (
        <section ref={sectionRef} className="bg-[#1C4130] py-24 lg:py-40 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 lg:space-y-48">
                
                {/* 1. Section Header Pillar */}
                <div className="pillar-text-container text-center max-w-4xl mx-auto">
                    <div className="overflow-hidden mb-6">
                        <h2 style={headingFont} className="reveal-text pb-2 text-4xl md:text-6xl lg:text-7xl text-[#C8AC5F] leading-tight">
                            The Heartbeat of the Island:<br />Discover Colombo
                        </h2>
                    </div>
                    <div className="overflow-hidden">
                        <p style={bodyFont} className="reveal-text text-xl md:text-2xl text-[#FAF8F3] font-light">
                            Where colonial heritage meets a futuristic skyline.
                        </p>
                    </div>
                    {/* Subtle dividing line */}
                    <div className="overflow-hidden mt-12 flex justify-center">
                        <div className="reveal-text w-24 h-1 bg-[#B05B40] rounded-full" />
                    </div>
                </div>

                {/* The 4 Additional Pillars */}
                {pillarsData.map((pillar, index) => (
                    <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                        
                        {/* Text Content Column */}
                        <div className={`pillar-text-container flex flex-col justify-center ${pillar.reverse ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}`}>
                            {/* Decorative Subheading / Sequence (optional minimal accent) */}
                            <div className="overflow-hidden mb-4">
                                <span style={bodyFont} className="reveal-text text-[#B05B40] tracking-[0.2em] text-sm uppercase font-bold">
                                    0{index + 1} // Colombo City
                                </span>
                            </div>
                            
                            <div className="overflow-hidden mb-6 pb-2">
                                <h3 style={headingFont} className="reveal-text text-4xl md:text-5xl text-[#C8AC5F] leading-snug">
                                    {pillar.title}
                                </h3>
                            </div>
                            
                            <div className="overflow-hidden">
                                <p style={bodyFont} className="reveal-text text-[#FAF8F3] text-lg md:text-xl font-light leading-relaxed">
                                    {pillar.description}
                                </p>
                            </div>
                            
                            {/* Optional small terracotta accent dash */}
                            <div className="overflow-hidden mt-10">
                                <div className="reveal-text w-12 h-0.5 bg-[#B05B40]"></div>
                            </div>
                        </div>

                        {/* Image Column */}
                        <div className={`image-container relative w-full aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-2xl bg-[#143023] shadow-2xl ${pillar.reverse ? 'order-1 lg:order-1' : 'order-1 lg:order-2'} will-change-transform`}>
                            {/* Inner element is larger to allow parallax */}
                            <div className="absolute inset-0 w-full h-[130%] -top-[15%]">
                                <SmartImage
                                    src={pillar.image}
                                    alt={pillar.title}
                                    className="parallax-image object-cover w-full h-full will-change-transform"
                                />
                            </div>
                            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply pointer-events-none"></div>
                        </div>
                        
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ColomboCityLife;
