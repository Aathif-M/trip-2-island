import { Users, Heart, ShieldCheck } from 'lucide-react';

export default function About() {
    return (
        <div className="bg-sand text-primary w-full">
            {/* Hero Section */}
            <section className="h-screen flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/2 h-full flex items-center justify-center p-12 lg:p-24 bg-primary text-sand relative z-10">
                    <div>
                        <span className="text-accent uppercase tracking-[0.2em] text-sm font-semibold mb-6 block">Our Story</span>
                        <h1 className="font-serif text-5xl lg:text-7xl leading-tight">
                            We blend local <br />
                            expertise with <br />
                            <span className="italic text-accent">open arms.</span>
                        </h1>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 h-[50vh] lg:h-full relative">
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center z-10 text-sand/60">
                        [PLACEHOLDER: Smiling Local Guide in Tea Plantation]
                    </div>
                    <img
                        src="https://images.unsplash.com/photo-1596422846543-75c6fc197f0a?auto=format&fit=crop&q=80&w=1000"
                        alt="Local guide in Sri Lanka"
                        className="w-full h-full object-cover"
                    />
                </div>
            </section>

            {/* Our Vision */}
            <section className="py-32 px-6 lg:px-12">
                <div className="container mx-auto">
                    <div className="text-center mb-24 max-w-3xl mx-auto">
                        <h2 className="font-serif text-4xl lg:text-5xl mb-6">Our Vision</h2>
                        <p className="text-primary/70 text-lg leading-relaxed">
                            We believe travel should be transformative, not just transactional. Our mission is to show you the real Sri Lanka, away from the crowds, while ensuring our presence benefits the communities we visit.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-6 text-accent">
                                <Users className="w-8 h-8" />
                            </div>
                            <h3 className="font-serif text-2xl mb-4">Local Immersion</h3>
                            <p className="text-primary/70">Connections with local artisans, tea pluckers, and families that you won't find in any guidebook.</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-6 text-accent">
                                <Heart className="w-8 h-8" />
                            </div>
                            <h3 className="font-serif text-2xl mb-4">Laidback Luxury</h3>
                            <p className="text-primary/70">Premium comfort without the pretension. We select boutique properties with soul and exceptional service.</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-6 text-accent">
                                <ShieldCheck className="w-8 h-8" />
                            </div>
                            <h3 className="font-serif text-2xl mb-4">Wildlife Protection</h3>
                            <p className="text-primary/70">Ethical safaris adhering to strict guidelines to protect Sri Lanka's incredible biodiversity.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
