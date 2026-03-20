import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqData = [
  { question: "Do I need an ETA to visit Sri Lanka?", answer: "Yes, most travelers require an Electronic Travel Authorization (ETA) to visit Sri Lanka. You can easily apply for this online before your journey." },
  { question: "What is the best time to visit?", answer: "Sri Lanka is a year-round destination. The south and west coasts are best from December to March, while the east coast is ideal from April to September." },
  { question: "Is Sri Lanka a safe destination for tourists?", answer: "Yes! Sri Lanka is known for its warm hospitality and is considered very safe for tourists. As with any travel destination, standard precautions apply." },
  { question: "What should I pack?", answer: "Light, breathable cotton clothing is perfect for the coastal areas. If you're visiting the Hill Country, bring a light jacket or sweater as evenings can get chilly. Modest clothing covering shoulders and knees is required when visiting temples." },
  { question: "Can you customize an itinerary for me?", answer: "Absolutely. We specialize in tailor-made journeys. Simply reach out via our Contact page or Chat interface with your preferences, travel dates, and trip style, and we will craft a bespoke itinerary." },
  { question: "What is the local currency?", answer: "The local currency is the Sri Lankan Rupee (LKR). While credit cards are widely accepted in hotels, restaurants, and larger shops, having cash on hand is useful for small purchases, tuk-tuks, and tipping." }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(0); // First item open by default

    return (
        <div className="bg-sand text-primary min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-12">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-16">
                    <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl mb-6">Frequently Asked Questions</h1>
                    <p className="text-primary/80 text-lg">Everything you need to know to prepare for your bespoke journey to Sri Lanka.</p>
                </div>
                
                <div className="space-y-4">
                    {faqData.map((item, index) => (
                        <div key={index} className="bg-white rounded-2xl border border-primary/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <button 
                                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                                className="w-full text-left px-6 py-5 sm:p-8 flex justify-between items-center focus:outline-none"
                            >
                                <h3 className="font-serif text-xl sm:text-2xl font-medium pr-8">{item.question}</h3>
                                <div className={`w-8 h-8 rounded-full bg-sand flex items-center justify-center shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                                    {openIndex === index ? <Minus size={18} className="text-accent"/> : <Plus size={18} className="text-primary/70"/>}
                                </div>
                            </button>
                            
                            <div className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="px-6 pb-6 sm:px-8 sm:pb-8 text-primary/80 leading-relaxed font-sans -mt-2">
                                    {item.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
