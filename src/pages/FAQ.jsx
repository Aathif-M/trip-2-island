import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "When is the best time to visit Sri Lanka?",
            answer: "Sri Lanka is a year-round destination, but generally, the best time to visit the west and south coasts and hill country is between December and March. The east coast is best from April to September."
        },
        {
            question: "Do I need a visa to enter Sri Lanka?",
            answer: "Yes, most nationalities require a visa to enter Sri Lanka. You can easily apply for an Electronic Travel Authorization (ETA) online before your arrival."
        },
        {
            question: "Is it safe to travel in Sri Lanka?",
            answer: "Sri Lanka is generally a safe country for tourists. Locals are very friendly and hospitable. However, like anywhere else, it's advisable to take standard safety precautions."
        },
        {
            question: "What should I pack?",
            answer: "Lightweight, breathable clothing is best for the coastal areas. If you're visiting the central highlands, bring warmer clothes as temperatures can drop significantly. Modest clothing is required when visiting temples."
        },
        {
            question: "Can you customize an itinerary for me?",
            answer: "Absolutely! We specialize in tailor-made travel. Contact us with your preferences, and we will craft an itinerary that perfectly matches your interests and style."
        }
    ];

    const toggleAccordion = (index) => {
        if (openIndex === index) {
            setOpenIndex(null);
        } else {
            setOpenIndex(index);
        }
    };

    return (
        <div className="bg-sand text-primary min-h-screen pt-32 pb-20 px-6 lg:px-12">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-16">
                    <h1 className="font-serif text-5xl lg:text-7xl mb-6">Frequently Asked Questions</h1>
                    <p className="text-primary/70 text-lg">
                        Everything you need to know to prepare for your Sri Lankan adventure.
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-sm border border-primary/5 overflow-hidden transition-all duration-300">
                            <button
                                className="w-full text-left px-6 py-6 flex justify-between items-center focus:outline-none"
                                onClick={() => toggleAccordion(index)}
                            >
                                <span className="font-serif text-xl font-medium pr-8">{faq.question}</span>
                                {openIndex === index ? (
                                    <ChevronUp className="w-6 h-6 text-accent shrink-0" />
                                ) : (
                                    <ChevronDown className="w-6 h-6 text-primary/50 shrink-0" />
                                )}
                            </button>
                            <div
                                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <p className="text-primary/70 leading-relaxed border-t border-primary/5 pt-4">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
