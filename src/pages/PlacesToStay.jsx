import SmartImage from '../components/UI/SmartImage';

export default function PlacesToStay() {
    return (
        <div className="bg-sand text-primary min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-12 flex flex-col items-center justify-center text-center">
            <div className="mb-12">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl mb-4 sm:mb-6">Places To Stay</h1>
                <p className="text-primary/70 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                    From jungle lodges to coastal boutique villas. Discover the hand-picked sanctuaries we’ve curated for your soul.
                </p>
            </div>
            <div className="w-full h-[60vh] bg-primary/20 rounded-3xl overflow-hidden relative shadow-2xl max-w-5xl">
                <SmartImage
                    src="/assets/page-places-to-stay.jpg"
                    alt="Tea Estate Bungalow"
                    className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-sand z-10 bg-primary/10">
                    <span className="text-base sm:text-xl font-bold tracking-widest bg-primary/60 backdrop-blur-md px-6 sm:px-8 py-3 sm:py-4 rounded-full uppercase border border-sand/20 shadow-xl">
                        Coming Soon
                    </span>
                </div>
            </div>
        </div>
    );
}
