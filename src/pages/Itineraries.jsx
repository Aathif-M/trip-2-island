export default function Itineraries() {
    return (
        <div className="bg-sand text-primary min-h-screen pt-32 pb-20 px-6 lg:px-12 flex flex-col items-center justify-center text-center">
            <div className="mb-12">
                <h1 className="font-serif text-5xl lg:text-7xl mb-6">Curated Itineraries</h1>
                <p className="text-primary/70 max-w-2xl mx-auto text-lg leading-relaxed">
                    Every beautiful journey begins with inspiration. Check back soon for immersive travel paths crafted by our luxury designers.
                </p>
            </div>
            <div className="w-full h-[60vh] bg-primary/20 rounded-3xl overflow-hidden relative shadow-2xl max-w-5xl">
                <img
                    src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=2000"
                    alt="Cultural Triangle"
                    className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-sand z-10 bg-primary/10">
                    <span className="text-xl font-bold tracking-widest bg-primary/60 backdrop-blur-md px-8 py-4 rounded-full uppercase border border-sand/20 shadow-xl">
                        Coming Soon
                    </span>
                </div>
            </div>
        </div>
    );
}
