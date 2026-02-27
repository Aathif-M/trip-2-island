import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CTA() {
    return (
        <section className="bg-primary text-sand py-32 px-6 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sand opacity-5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>

            <div className="container mx-auto max-w-4xl text-center relative z-10">
                <h2 className="font-serif text-5xl md:text-7xl mb-8 leading-tight">
                    Ready to write your <br />
                    <span className="italic text-accent">travel journal?</span>
                </h2>
                <p className="text-sand/70 text-lg md:text-xl max-w-2xl mx-auto mb-12">
                    Let's craft your perfect Sri Lankan journey together. Our travel designers are ready to listen, advise, and hand-tailor every detail.
                </p>

                <Link
                    to="/contact"
                    className="inline-flex items-center gap-4 bg-sand text-primary px-10 py-5 rounded-full text-lg font-semibold hover:bg-accent hover:text-sand transition-all duration-300 hover:scale-105 active:scale-95 group"
                >
                    Let's Get Planning
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
            </div>
        </section>
    );
}
