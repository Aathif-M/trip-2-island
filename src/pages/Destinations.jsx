export default function Destinations() {
    return (
        <div className="bg-sand text-primary min-h-screen pt-32 pb-20 px-6 lg:px-12">
            <div className="container mx-auto max-w-6xl">
                <div className="mb-16 text-center">
                    <h1 className="font-serif text-5xl lg:text-7xl mb-6">Explore Sri Lanka</h1>
                    <p className="text-primary/70 max-w-2xl mx-auto text-lg">
                        From ancient ruins shrouded in jungle to palm-fringed beaches washed by the Indian Ocean.
                    </p>
                </div>

                {/* Map Area */}
                <div className="w-full h-[60vh] bg-primary/20 rounded-3xl overflow-hidden mb-24 relative shadow-2xl">
                    <img
                        src="https://images.unsplash.com/photo-1546708973-2475df18fc73?auto=format&fit=crop&q=80&w=2000"
                        alt="Map of Sri Lanka"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent flex items-end justify-center pb-12">
                        <button className="bg-accent text-sand px-8 py-4 rounded-full font-semibold hover:scale-105 transition shadow-lg shadow-accent/20">
                            Launch Interactive Map
                        </button>
                    </div>
                </div>

                {/* Regions List */}
                <div className="flex flex-col gap-32">
                    {[
                        {
                            id: "south-coast",
                            name: "South Coast",
                            desc: "The sun-drenched southern coastline offers a perfect blend of lively surf towns, pristine golden beaches, and colonial heritage in Galle Fort. Spot blue whales in Mirissa or simply relax under swaying palms.",
                            img: "1577717903315-1691ae25ab3f"
                        },
                        {
                            id: "cultural-triangle",
                            name: "Cultural Triangle",
                            desc: "Step back thousands of years into Sri Lanka's royal past. Climb the majestic Sigiriya Rock Fortress, wander the ancient monastic complex of Polonnaruwa, and discover the cave temples of Dambulla.",
                            img: "1552465011-b4e21bf6e79a"
                        },
                        {
                            id: "hill-country",
                            name: "Hill Country",
                            desc: "The misty peaks from Ella to Nuwara Eliya. Take what is considered one of the most beautiful train rides in the world, hike through emerald tea plantations, and cool off by spectacular waterfalls.",
                            img: "1586227740560-8cf2732c1531"
                        },
                        {
                            id: "northern-explorer",
                            name: "Northern Explorer",
                            desc: "A land of untamed nature and vibrant heritage. Explore the colorful Hindu temples of Jaffna, untouched beaches of the north, and a distinct culinary tradition steeped in history.",
                            img: "1544280590-db5f2fc71fc6"
                        },
                        {
                            id: "east-coast",
                            name: "East Coast",
                            desc: "Unspoiled white-sand beaches stretch endlessly along the east. Perfect for diving around Pigeon Island in Trincomalee or catching world-class surf breaks in Arugam Bay.",
                            img: "1544482590-7db078b5e954"
                        }
                    ].map((region, idx) => (
                        <div key={idx} id={region.id} className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center scroll-mt-32`}>
                            <div className="w-full lg:w-1/2 h-[500px] bg-primary/20 rounded-2xl flex items-center justify-center text-primary/50 relative overflow-hidden">
                                <img
                                    src={`https://images.unsplash.com/photo-${region.img}?auto=format&fit=crop&q=80&w=1000`}
                                    alt={region.name}
                                    className="w-full h-full object-cover mix-blend-overlay opacity-80 hover:opacity-100 hover:mix-blend-normal transition-all duration-700 hover:scale-105"
                                />
                            </div>
                            <div className="w-full lg:w-1/2">
                                <h2 className="font-serif text-4xl mb-6 text-accent">{region.name}</h2>
                                <p className="text-primary/70 text-lg leading-relaxed mb-8">
                                    {region.desc}
                                </p>
                                <button className="bg-primary text-sand px-8 py-3 rounded-full text-sm font-semibold hover:bg-accent transition-colors">
                                    View Itineraries
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
