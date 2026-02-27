import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DestinationsGrid() {
    const container = useRef();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.bento-item', {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: container.current,
                    start: 'top 80%',
                }
            });
        }, container);
        return () => ctx.revert();
    }, []);

    const regions = [
        {
            name: "South Coast",
            id: "south-coast",
            desc: "Palm-fringed golden beaches & surf towns",
            img: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&q=80&w=1000",
            colSpan: "col-span-1 md:col-span-2",
            rowSpan: "row-span-2",
            aspect: "aspect-square md:aspect-auto"
        },
        {
            name: "Cultural Triangle",
            id: "cultural-triangle",
            desc: "Ancient ruins & sacred temples",
            img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=800",
            colSpan: "col-span-1 md:col-span-1",
            rowSpan: "row-span-1",
            aspect: "aspect-[4/3]"
        },
        {
            name: "Hill Country",
            id: "hill-country",
            desc: "Misty tea estates & waterfalls",
            img: "https://images.unsplash.com/photo-1586227740560-8cf2732c1531?auto=format&fit=crop&q=80&w=800",
            colSpan: "col-span-1 md:col-span-1",
            rowSpan: "row-span-1",
            aspect: "aspect-[4/3]"
        },
        {
            name: "Northern Explorer",
            id: "northern-explorer",
            desc: "Untamed nature & vibrant heritage",
            img: "https://images.unsplash.com/photo-1544280590-db5f2fc71fc6?auto=format&fit=crop&q=80&w=1200",
            colSpan: "col-span-1 md:col-span-2",
            rowSpan: "row-span-1",
            aspect: "aspect-[21/9]"
        }
    ];

    return (
        <section ref={container} className="py-24 px-6 lg:px-12 bg-primary text-sand">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <div>
                        <h2 className="text-sm font-semibold tracking-[0.2em] text-accent uppercase mb-4">Discover the Island</h2>
                        <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-sand">Regions of Wonder</h3>
                    </div>
                    <Link to="/destinations/sri-lanka" className="hidden md:flex items-center gap-2 hover:text-accent transition-colors border-b border-sand/30 hover:border-accent pb-1">
                        View All Destinations <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[minmax(0,1fr)]">
                    {regions.map((region, idx) => (
                        <Link
                            to={`/destinations/sri-lanka#${region.id}`}
                            key={idx}
                            className={`bento-item group relative overflow-hidden rounded-2xl cursor-pointer bg-sand/5 block ${region.colSpan} ${region.rowSpan} ${region.aspect}`}
                        >
                            <img
                                src={region.img}
                                alt={region.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent"></div>

                            <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full flex justify-between items-end">
                                <div>
                                    <h4 className="font-serif text-2xl md:text-3xl text-sand mb-2">{region.name}</h4>
                                    <p className="text-sand/70 text-sm md:text-base">{region.desc}</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-sand/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                                    <ArrowUpRight className="w-5 h-5 text-sand" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <Link to="/destinations/sri-lanka" className="md:hidden mt-10 w-full flex justify-center items-center gap-2 hover:text-accent transition-colors border-b border-sand/30 hover:border-accent pb-2">
                    View All Destinations <ArrowUpRight className="w-4 h-4" />
                </Link>
            </div>
        </section>
    );
}
