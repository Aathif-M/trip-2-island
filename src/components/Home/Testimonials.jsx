import { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Testimonials() {
    const [current, setCurrent] = useState(0);

    const testimonials = [
        {
            quote: "A flawless experience from start to finish. The attention to detail in our honeymoon itinerary was astounding. We truly uncovered the magic of Sri Lanka thanks to our incredible guide.",
            author: "Sarah & Mark Jenkins",
            country: "United Kingdom"
        },
        {
            quote: "Trip2Island didn't just book hotels—they curated an immersion into the culture. The cooking class in a village home and the private wildlife drive in Yala were unforgettable highlights.",
            author: "Elena Rodriguez",
            country: "Spain"
        },
        {
            quote: "The level of luxury combined with authentic local experiences is unmatched. Every accommodation was handpicked and breathtaking. We are already planning our return.",
            author: "James Chen",
            country: "Singapore"
        }
    ];

    const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));
    const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));

    return (
        <section className="py-32 bg-sand text-primary relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[300px] text-primary/[0.03] font-serif pr-20">
                "
            </div>

            <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
                <Quote className="w-12 h-12 text-accent mx-auto mb-12 opacity-50" />

                <div className="min-h-[250px] flex flex-col justify-center">
                    <p className="font-serif text-2xl md:text-4xl leading-relaxed mb-12 transition-opacity duration-500">
                        {testimonials[current].quote}
                    </p>
                    <div>
                        <h4 className="font-bold text-lg tracking-wide uppercase">{testimonials[current].author}</h4>
                        <p className="text-primary/50 text-sm mt-1">{testimonials[current].country}</p>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-6 mt-16">
                    <button onClick={prev} className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-sand transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="flex gap-2">
                        {testimonials.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrent(idx)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${current === idx ? 'bg-accent w-6' : 'bg-primary/20'}`}
                            />
                        ))}
                    </div>

                    <button onClick={next} className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-sand transition-colors">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
}
