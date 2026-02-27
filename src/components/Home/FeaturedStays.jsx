import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedStays() {
    const container = useRef();

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.stay-card');

            cards.forEach((card, i) => {
                const img = card.querySelector('img');

                // Image Parallax
                gsap.to(img, {
                    yPercent: 15,
                    ease: "none",
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });

                // Content Fade Up
                gsap.from(card.querySelector('.stay-content'), {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 75%",
                    }
                });
            });
        }, container);

        return () => ctx.revert();
    }, []);

    const stays = [
        {
            type: "Jungle Lodges",
            title: "Wild Coast Tented Lodge",
            location: "Yala National Park",
            desc: "Where the untamed jungle meets the pristine Indian Ocean. Unique cocoon tents offering unparalleled luxury in the wilderness.",
            img: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&q=80&w=1000",
            align: "left"
        },
        {
            type: "Boutique Heritage",
            title: "Amangalla",
            location: "Galle Fort",
            desc: "Step back in time within the ramparts of a 17th-century Dutch fort. Antique furnishings, polished teak, and timeless elegance.",
            img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000",
            align: "right"
        },
        {
            type: "Tea Estates",
            title: "Ceylon Tea Trails",
            location: "Hatton",
            desc: "Restored colonial-era tea planters' bungalows perched above the misty valleys of the central highlands.",
            img: "https://images.unsplash.com/photo-1499696983053-152e9fe11ec7?auto=format&fit=crop&q=80&w=1000",
            align: "left"
        }
    ];

    return (
        <section ref={container} className="py-32 px-6 lg:px-12 bg-primary text-sand">
            <div className="container mx-auto max-w-7xl">
                <div className="text-center mb-24">
                    <h2 className="text-sm font-semibold tracking-[0.2em] text-accent uppercase mb-4">Exceptional Accommodation</h2>
                    <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl">Featured Stays</h3>
                </div>

                <div className="flex flex-col gap-24 lg:gap-32">
                    {stays.map((stay, idx) => (
                        <div key={idx} className={`stay-card flex flex-col ${stay.align === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center`}>

                            {/* Image Container */}
                            <div className="w-full lg:w-3/5 h-[50vh] lg:h-[80vh] overflow-hidden rounded-2xl relative">
                                <img
                                    src={stay.img}
                                    alt={stay.title}
                                    className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="stay-content w-full lg:w-2/5 flex flex-col justify-center">
                                <span className="text-accent font-semibold tracking-widest text-sm uppercase mb-4 block">
                                    {stay.type}
                                </span>
                                <h4 className="font-serif text-4xl md:text-5xl mb-4 text-sand">{stay.title}</h4>
                                <div className="flex items-center gap-2 mb-8 text-sand/50 text-sm tracking-wider uppercase">
                                    <span>📍 {stay.location}</span>
                                </div>
                                <p className="text-sand/70 text-lg leading-relaxed mb-10">
                                    {stay.desc}
                                </p>
                                <div>
                                    <button className="border border-sand/30 px-8 py-3 rounded-full text-sm font-semibold hover:bg-sand hover:text-primary transition-colors">
                                        Explore Property
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
