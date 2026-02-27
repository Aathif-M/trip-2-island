import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CuratedItineraries() {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            let mm = gsap.matchMedia();

            mm.add("(min-width: 1024px)", () => {
                const totalWidth = containerRef.current.scrollWidth - window.innerWidth;

                gsap.to(containerRef.current, {
                    x: -totalWidth,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        pin: true,
                        scrub: 1,
                        end: () => `+=${totalWidth}`,
                    }
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const itineraries = [
        {
            title: "Culture & History",
            duration: "10 Days",
            desc: "Walk amidst ancient fortresses, sacred relics, and time-honored traditions in the Cultural Triangle.",
            img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Wildlife Safari",
            duration: "12 Days",
            desc: "Track elusive leopards in Yala and witness the majestic elephant gathering at Minneriya.",
            img: "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Honeymoon Escapes",
            duration: "14 Days",
            desc: "Secluded boutique luxury, private beach dinners, and romantic train rides through the hills.",
            img: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Family Adventures",
            duration: "8 Days",
            desc: "Engaging activities for all ages from gentle river safaris to learning traditional crafts.",
            img: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?auto=format&fit=crop&q=80&w=800"
        }
    ];

    return (
        <section ref={sectionRef} className="bg-sand text-primary overflow-hidden lg:h-screen lg:flex lg:items-center py-20 lg:py-0">
            <div className="container mx-auto px-6 lg:px-12 lg:hidden mb-12">
                <h2 className="text-sm font-semibold tracking-[0.2em] text-accent uppercase mb-4">Curated For You</h2>
                <h3 className="font-serif text-4xl text-primary">Signature Itineraries</h3>
            </div>

            <div ref={containerRef} className="flex flex-col lg:flex-row gap-8 lg:gap-16 px-6 lg:px-[10vw] min-w-max">
                {/* Intro Block (Desktop only) */}
                <div className="hidden lg:flex w-[400px] flex-col justify-center pr-12 shrink-0">
                    <h2 className="text-sm font-semibold tracking-[0.2em] text-accent uppercase mb-4">Curated For You</h2>
                    <h3 className="font-serif text-5xl lg:text-6xl text-primary mb-6">Signature<br />Itineraries</h3>
                    <p className="text-primary/70 leading-relaxed mb-8">
                        Our luxury travel designers have crafted these baseline journeys to inspire you.
                        Every itinerary is fully customizable to your pace and preferences.
                    </p>
                    <div>
                        <button className="bg-primary text-sand px-8 py-3 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors">
                            View All Paths
                        </button>
                    </div>
                </div>

                {/* Cards */}
                {itineraries.map((item, idx) => (
                    <div key={idx} className="w-full lg:w-[500px] shrink-0 group cursor-pointer mb-8 lg:mb-0">
                        <div className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden mb-6">
                            <img
                                src={item.img}
                                alt={item.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute top-6 left-6 bg-sand text-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                                {item.duration}
                            </div>
                        </div>
                        <h4 className="font-serif text-3xl mb-3 group-hover:text-accent transition-colors">{item.title}</h4>
                        <p className="text-primary/70">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
