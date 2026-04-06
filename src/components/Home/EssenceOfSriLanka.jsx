import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import SmartImage from '../UI/SmartImage';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
    { title: "Gems & Pearls", placeholder: "Close-up of authentic Sri Lankan Sapphires and Pearls", size: "col-span-12 md:col-span-4 row-span-2", img: "/assets/essence-gems.jpg" },
    { title: "Food & Cuisine", placeholder: "Close-up of authentic Sri Lankan Rice & Curry in clay pots", size: "col-span-12 md:col-span-8 row-span-1", img: "/assets/essence-food.jpg" },
    { title: "Culture & Festivals", placeholder: "Traditional Kandy Esala Perahera dancers in vibrant costumes", size: "col-span-12 md:col-span-4 row-span-1", img: "/assets/essence-culture.jpg" },
    { title: "Ayurveda & Wellness", placeholder: "Relaxing Ayurveda spa setup with herbal oils and lotus flowers", size: "col-span-12 md:col-span-4 row-span-1", img: "/assets/essence-ayurveda.jpg" },
    { title: "Friendly People & Hospitality", placeholder: "Smiling locals greeting with traditional Ayubowan gesture", size: "col-span-12 md:col-span-6 row-span-2", img: "/assets/essence-people.jpg" },
];

export default function EssenceOfSriLanka() {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                cardsRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-primary px-6 md:px-12 w-full">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 text-center">
                    <h2 className="text-4xl md:text-5xl font-serif text-sand mb-4">The Essence of Sri Lanka</h2>
                    <p className="font-sans text-sand/60 max-w-2xl mx-auto">Discover the foundational pillars that make the teardrop island a destination unlike any other.</p>
                </div>

                <div className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-[250px]">
                    {pillars.map((pillar, index) => (
                        <div
                            key={index}
                            ref={el => cardsRef.current[index] = el}
                            className={`group cursor-pointer relative overflow-hidden rounded-xl ${pillar.size} bg-sand/10`}
                        >
                            <SmartImage
                                src={pillar.img}
                                alt={pillar.title}
                                className="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-700 ease-out group-hover:scale-100 opacity-80 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent flex flex-col justify-end p-6">
                                <h3 className="text-2xl font-serif text-sand mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{pillar.title}</h3>
                            </div>
                        </div>
                    ))}

                    {/* CTA Card for Experiences */}
                    <Link
                        to="/experiences"
                        ref={el => cardsRef.current[5] = el}
                        className="group flex flex-col items-center justify-center text-center relative overflow-hidden rounded-xl col-span-12 md:col-span-6 row-span-2 bg-sand/10 border border-gold/30 hover:border-gold p-8 decoration-none cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-gold/10 transform hover:-translate-y-1"
                    >
                        <SmartImage
                            src="/assets/exp-nine-arches.jpg"
                            alt="Unique Experiences"
                            className="absolute inset-0 w-full h-full object-cover scale-100 transition-transform duration-700 ease-out group-hover:scale-110 opacity-50 group-hover:opacity-70"
                        />
                        <div className="absolute inset-0 bg-primary/60 group-hover:bg-primary/40 transition-colors duration-700"></div>
                        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMWEzNjI4Ij48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMOCA4Wk04IDBMMCA4WiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] transition-transform duration-700 ease-out group-hover:scale-110"></div>
                        <h3 className="text-3xl md:text-4xl font-serif text-sand mb-4 relative z-10 transform group-hover:scale-105 transition-transform duration-500">Unique Experiences</h3>
                        <p className="font-sans text-sand/80 mb-8 relative z-10 max-w-md transform group-hover:-translate-y-1 transition-transform duration-500">Dive into 20 reasons why Sri Lanka should be your next adventure.</p>
                        <div className="inline-flex items-center justify-center px-8 py-4 border border-gold text-gold font-sans uppercase tracking-widest text-sm group-hover:bg-gold group-hover:text-primary transition-all duration-500 relative z-10 bg-primary/40 backdrop-blur-md rounded-sm gap-3">
                            <span>Explore Experiences</span>
                            <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
