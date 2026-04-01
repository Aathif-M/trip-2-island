export default function Terms() {
    return (
        <div className="bg-sand text-primary min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-12">
            <div className="container mx-auto max-w-4xl bg-white p-8 md:p-16 rounded-3xl shadow-xl shadow-primary/5">
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-6xl mb-8 sm:mb-12 text-center text-primary border-b border-primary/10 pb-6 sm:pb-8">Terms & Conditions</h1>

                <div className="prose prose-lg text-primary/80 prose-headings:font-serif prose-headings:text-primary max-w-none">
                    <h2 className="text-2xl font-bold mb-4 mt-8">1. Introduction</h2>
                    <p className="mb-6 leading-relaxed">
                        Welcome to Trip2Island. These terms and conditions outline the rules and regulations for the use of our website and services.
                        By accessing this website and booking our services, we assume you accept these terms and conditions.
                    </p>

                    <h2 className="text-2xl font-bold mb-4 mt-8">2. Booking and Payments</h2>
                    <p className="mb-6 leading-relaxed">
                        To secure a booking, a deposit of 30% of the total tour cost is required. The balance must be paid 30 days prior to the arrival date.
                        If the booking is made within 30 days of arrival, full payment is required at the time of booking.
                    </p>

                    <h2 className="text-2xl font-bold mb-4 mt-8">3. Cancellations and Refunds</h2>
                    <p className="mb-6 leading-relaxed">
                        Cancellations must be made in writing. The following cancellation charges apply:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li>More than 30 days before arrival: Loss of deposit.</li>
                        <li>15 to 30 days before arrival: 50% of total cost.</li>
                        <li>Less than 15 days before arrival: 100% of total cost.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mb-4 mt-8">4. Liability</h2>
                    <p className="mb-6 leading-relaxed">
                        Trip2Island acts only as an agent for the providers of accommodation, transport and other services. We accept no liability for any loss, damage, injury or illness caused by any act or omission of any such provider.
                    </p>

                    <h2 className="text-2xl font-bold mb-4 mt-8">5. Changes to Itinerary</h2>
                    <p className="mb-6 leading-relaxed">
                        While every effort is made to operate all tours as advertised, we reserve the right to change itineraries, accommodations and transport if circumstances demand it.
                    </p>

                    <h2 className="text-2xl font-bold mb-4 mt-8">6. Force Majeure</h2>
                    <p className="mb-6 leading-relaxed">
                        Trip2Island shall not be liable for failure or delay in performance due to events beyond its control, including but not limited to monsoons, floods, natural disasters, pandemics, government restrictions, fuel shortages, strikes or civil disturbances in Sri Lanka.
                    </p>
                    <p>
                        In such cases, alternative arrangements may be offered; however, refunds are not guaranteed.
                    </p>

                    <h2 className="text-2xl font-bold mb-4 mt-8">7. Travel Insurance</h2>
                    <p className="mb-6 leading-relaxed">
                        Clients are strongly advised to obtain comprehensive travel insurance covering medical emergencies, cancellations, accidents and loss of personal belongings.
                    </p>
                    <p>
                        Trip2Island will not be responsible for any expenses arising due to lack of insurance.
                    </p>

                    <h2 className="text-2xl font-bold mb-4 mt-8">8. Visa, Passport & Regulations</h2>
                    <p className="mb-6 leading-relaxed">
                        Travelers must carry a valid passport (minimum 6 months validity) and obtain required visas (e.g., Sri Lanka ETA).
                    </p>
                    <p>
                        Clients must comply with all applicable Sri Lankan laws and regulations.
                    </p>
                    <p>
                        Trip2Island is not responsible for visa issues, entry denials or penalties.
                    </p>

                    <h2 className="text-2xl font-bold mb-4 mt-8">9. Personal Belongings</h2>
                    <p className="mb-6 leading-relaxed">
                        Clients are solely responsible for their luggage, valuables and personal items.
                    </p>
                    <p>
                        Trip2Island shall not be liable for any loss, theft or damage.                    </p>

                    <div className="mt-12 p-6 bg-sand/30 rounded-xl border border-primary/10">
                        <p className="text-sm italic text-center">
                            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
