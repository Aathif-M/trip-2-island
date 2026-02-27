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

                {/* Map Placeholder */}
                <div className="w-full h-[60vh] bg-primary/5 rounded-3xl border border-primary/10 flex flex-col items-center justify-center mb-24 relative overflow-hidden">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-primary/40 z-10 shadow-inner">
                        <span className="text-xl font-bold tracking-widest">[PLACEHOLDER]</span>
                        <span className="text-sm">Interactive SVG/Canvas Map of Sri Lanka</span>
                    </div>
                </div>

                {/* Regions List */}
                <div className="flex flex-col gap-32">
                    {['South Coast', 'Cultural Triangle', 'Hill Country'].map((region, idx) => (
                        <div key={idx} className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center`}>
                            <div className="w-full lg:w-1/2 h-[500px] bg-primary/20 rounded-2xl flex items-center justify-center text-primary/50 relative overflow-hidden">
                                <span className="absolute z-10 font-bold tracking-widest">[PLACEHOLDER IMAGE]</span>
                                <img
                                    src={`https://images.unsplash.com/photo-${idx === 0 ? '1577717903315-1691ae25ab3f' : idx === 1 ? '1552465011-b4e21bf6e79a' : '1625736300986-ca2bc1f4e1f7'}?auto=format&fit=crop&q=80&w=1000`}
                                    alt={region}
                                    className="w-full h-full object-cover mix-blend-overlay opacity-60"
                                />
                            </div>
                            <div className="w-full lg:w-1/2">
                                <h2 className="font-serif text-4xl mb-6 text-accent">{region}</h2>
                                <p className="text-primary/70 text-lg leading-relaxed mb-8">
                                    {idx === 0 && "The sun-drenched southern coastline offers a perfect blend of lively surf towns, pristine golden beaches, and colonial heritage in Galle Fort. Spot blue whales in Mirissa or simply relax under swaying palms."}
                                    {idx === 1 && "Step back thousands of years into Sri Lanka's royal past. Climb the majestic Sigiriya Rock Fortress, wander the ancient monastic complex of Polonnaruwa, and discover the cave temples of Dambulla."}
                                    {idx === 2 && "The misty peaks from Ella to Nuwara Eliya. Take what is considered one of the most beautiful train rides in the world, hike through emerald tea plantations, and cool off by spectacular waterfalls."}
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
