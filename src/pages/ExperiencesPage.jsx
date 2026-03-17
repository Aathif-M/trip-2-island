import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mountain, TrainFront, Camera, Droplet, Leaf, Music, Sunrise, Tent, Wind, MapPin, TreePine, Umbrella, Coffee, Ship, Landmark, Map, Fish, Home, Diamond, ArrowRight } from 'lucide-react';
import SmartVideo from '../components/UI/SmartVideo';

gsap.registerPlugin(ScrollTrigger);

const experiencesData = [
  { id: 1, title: 'Climb Sigiriya Lion Rock', description: 'Ancient rock fortress & UNESCO site', icon: Mountain, imagePlaceholder: '[PLACEHOLDER: Majestic view of Sigiriya Lion Rock rising from the jungle]' },
  { id: 2, title: 'Scenic Train Ride from Kandy to Ella', description: 'Through lush tea plantations and misty mountains', icon: TrainFront, imagePlaceholder: '[PLACEHOLDER: Blue train curving through green tea estates]' },
  { id: 3, title: 'Wildlife Safari in Yala National Park', description: 'Spot elusive leopards, elephants, and exotic birds', icon: Camera, imagePlaceholder: '[PLACEHOLDER: Leopard resting on a tree branch in Yala]' },
  { id: 4, title: 'Whale Watching in Mirissa', description: 'Witness majestic blue whales and playful dolphins', icon: Droplet, imagePlaceholder: '[PLACEHOLDER: Tail of a blue whale diving into the deep ocean]' },
  { id: 5, title: 'Visit a Ceylon Tea Plantation', description: 'Walk through historic estates and see the tea-making process', icon: Leaf, imagePlaceholder: '[PLACEHOLDER: Tea pluckers working in beautifully terraced green hills]' },
  { id: 6, title: 'Watch the Kandy Esala Perahera Festival', description: 'Grand procession with elephants and traditional dancers', icon: Music, imagePlaceholder: '[PLACEHOLDER: Illuminated elephants and fire dancers at night]' },
  { id: 7, title: 'Climb Adam’s Peak at Sunrise', description: 'Embark on a spiritual overnight hike for breathtaking dawn views', icon: Sunrise, imagePlaceholder: '[PLACEHOLDER: Spectacular sunrise view from the summit of Adam’s Peak]' },
  { id: 8, title: 'Explore Dambulla Cave Temple', description: 'Marvel at ancient Buddha statues and intricate cave paintings', icon: Tent, imagePlaceholder: '[PLACEHOLDER: Stunning golden statues lining the dimly lit cave]' },
  { id: 9, title: 'Surfing in Arugam Bay', description: 'Ride some of the best and most consistent surfing waves in Asia', icon: Wind, imagePlaceholder: '[PLACEHOLDER: Surfer catching a golden hour wave in Arugam Bay]' },
  { id: 10, title: 'Visit Galle Dutch Fort', description: 'Wander through a colonial fort filled with quaint cafes and ocean views', icon: MapPin, imagePlaceholder: '[PLACEHOLDER: Historic lighthouse of Galle Fort against a blue sky]' },
  { id: 11, title: 'Safari in Udawalawe', description: 'Observe herds of wild elephants up close in their natural habitat', icon: TreePine, imagePlaceholder: '[PLACEHOLDER: Large herd of elephants gathering by a waterhole]' },
  { id: 12, title: 'Swim Under Diyaluma Waterfall', description: 'Take a dip in natural rock pools at Sri Lanka’s second-highest waterfall', icon: Umbrella, imagePlaceholder: '[PLACEHOLDER: Crystal clear natural pools at the edge of Diyaluma Falls]' },
  { id: 13, title: 'Try Authentic Sri Lankan Rice & Curry', description: 'Savor an explosion of local spices and varied small, delicious dishes', icon: Coffee, imagePlaceholder: '[PLACEHOLDER: Spread of vibrant Sri Lankan curries served in traditional clay pots]' },
  { id: 14, title: 'Lagoon Boat Safari', description: 'Glide through Bentota or Negombo mangroves, spotting turtles and birds', icon: Ship, imagePlaceholder: '[PLACEHOLDER: Small boat navigating through a dense green mangrove tunnel]' },
  { id: 15, title: 'Visit the Temple of the Sacred Tooth Relic', description: 'Experience the spiritual heart of Kandy at this highly revered shrine', icon: Landmark, imagePlaceholder: '[PLACEHOLDER: White temple complex of the Tooth Relic reflecting on the lake]' },
  { id: 16, title: 'Explore Horton Plains & World’s End', description: 'Hike across grassy plains to a sheer, dramatic cliff viewpoint', icon: Map, imagePlaceholder: '[PLACEHOLDER: Misty morning view over the dramatic precipice of World’s End]' },
  { id: 17, title: 'Turtle Conservation in Kosgoda', description: 'Learn about marine protection, see baby turtles and hatcheries', icon: Fish, imagePlaceholder: '[PLACEHOLDER: Baby sea turtles making their way to the ocean]' },
  { id: 18, title: 'Village Tour Experience', description: 'Enjoy a rustic bullock cart ride, serene canoe trip, and traditional lunch', icon: Home, imagePlaceholder: '[PLACEHOLDER: Locals cooking a wood-fired meal in a mud-hut village]' },
  { id: 19, title: 'Gem Mining in Ratnapura', description: 'Discover the traditional process behind world-famous sapphires and gems', icon: Diamond, imagePlaceholder: '[PLACEHOLDER: Traditional gem miners washing gravel in wicker baskets]' },
  { id: 20, title: 'Walk on Nine Arches Bridge in Ella', description: 'Admire this colonial-era engineering marvel tucked into the jungle', icon: ArrowRight, imagePlaceholder: '[PLACEHOLDER: The majestic stone arches of the bridge spanning a lush gorge]' }
];

export default function ExperiencesPage() {
    const listRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const items = gsap.utils.toArray('.experience-card');

            ScrollTrigger.batch(items, {
                onEnter: elements => {
                    gsap.fromTo(elements,
                        { autoAlpha: 0, y: 100 },
                        { autoAlpha: 1, y: 0, stagger: 0.15, ease: "power3.out", duration: 1, overwrite: true }
                    );
                },
                start: "top 85%",
            });
        }, listRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="w-full bg-sand min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden bg-primary">
                <div className="absolute inset-0 bg-[#1C4130] opacity-80 z-10"></div>
                <SmartVideo
                    src="/trip-2-island/assets/page-experiences.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />

                <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-serif text-sand mb-6">20 Reasons to Choose Sri Lanka</h1>
                    <p className="text-lg md:text-xl font-sans text-sand/80 font-light">
                        From majestic peaks and untouched wildlife to golden sands and ancient cities.
                    </p>
                </div>
            </section>

            {/* List Section */}
            <section ref={listRef} className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="flex flex-col gap-24">
                    {experiencesData.map((exp, index) => {
                        const Icon = exp.icon;
                        const isEven = index % 2 === 0;

                        return (
                            <div key={exp.id} className={`experience-card flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center opacity-0`}>
                                {/* Image Half */}
                                <div className="w-full md:w-1/2">
                                    <div className="relative w-full aspect-[4/3] bg-[#E6E9E3] rounded-2xl overflow-hidden group shadow-lg">
                                        <div className="absolute inset-0 bg-slate-200 scale-105 transition-transform duration-1000 group-hover:scale-100 flex items-center justify-center p-8 text-center text-slate-500 font-sans text-sm">
                                            {exp.imagePlaceholder}
                                        </div>
                                        {/* Subtle overlay */}
                                        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500"></div>
                                        {/* Number Badge */}
                                        <div className="absolute top-6 left-6 w-12 h-12 bg-sand text-primary rounded-full flex items-center justify-center font-serif text-xl font-bold shadow-md z-10">
                                            {exp.id}
                                        </div>
                                    </div>
                                </div>

                                {/* Text Half */}
                                <div className="w-full md:w-1/2 flex flex-col justify-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-accent mb-6">
                                        <Icon size={32} strokeWidth={1.5} />
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4 leading-tight">
                                        {exp.title}
                                    </h2>
                                    <p className="text-lg font-sans text-slate-600 leading-relaxed border-l-2 border-gold pl-6 py-2">
                                        {exp.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
