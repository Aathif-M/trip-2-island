import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import SmartImage from '../components/UI/SmartImage';
import CustomDropdown from '../components/UI/CustomDropdown';
import CustomDatePicker from '../components/UI/CustomDatePicker';

export default function Contact() {
    const [travelDates, setTravelDates] = useState({ startDate: null, endDate: null });
    const [tripStyle, setTripStyle] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [referralCode, setReferralCode] = useState("");
    const [status, setStatus] = useState("idle"); // idle, submitting, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email) {
            alert("Please provide at least your name and email address so we can get back to you!");
            return;
        }

        setStatus("submitting");

        const startStr = travelDates.startDate ? travelDates.startDate.toLocaleDateString() : '';
        const endStr = travelDates.endDate ? travelDates.endDate.toLocaleDateString() : '';
        const dateStr = startStr && endStr ? `${startStr} to ${endStr}` : startStr ? `${startStr} (End date not specified)` : "Not specified";
        const styleStr = tripStyle || "Not specified";

        // Prepare the payload for Web3Forms
        const payload = {
            access_key: "4d190aa3-dfb4-4b81-95fe-51a5d5ac35c3", // Replace with your Web3Forms Access Key
            subject: `New Trip Inquiry from ${name}`,
            from_name: name,
            email: email,
            message: `Dream Trip Details:\n${message}\n\ntravel_dates: ${dateStr}\ntrip_style: ${styleStr}\nreferral_code: ${referralCode || "Not provided"}`
        };

        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(payload)
            });
            const data = await res.json();

            if (data.success) {
                setStatus("success");
                setName("");
                setEmail("");
                setMessage("");
                setReferralCode("");
                setTravelDates({ startDate: null, endDate: null });
                setTripStyle("");
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    return (
        <div className="bg-sand text-primary min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-12">
            <div className="container mx-auto max-w-7xl">

                <div className="text-center mb-16">
                    <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl mb-4 sm:mb-6">Start your journey.</h1>
                    <p className="text-primary/70 text-base sm:text-lg">Let us tailor a Sri Lankan experience entirely around you.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Form */}
                    <div className="w-full lg:w-3/5 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl shadow-primary/5">
                        <form className="flex flex-col gap-4 sm:gap-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold uppercase tracking-wider text-primary/70">Full Name</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="bg-sand/30 border border-primary/10 rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors" placeholder="John Doe" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold uppercase tracking-wider text-primary/70">Email Address</label>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-sand/30 border border-primary/10 rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors" placeholder="john@example.com" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2 relative z-20">
                                    <label className="text-sm font-semibold uppercase tracking-wider text-primary/70">Travel Dates</label>
                                    <CustomDatePicker value={travelDates} onChange={setTravelDates} placeholder="Select Dates" />
                                </div>
                                <div className="flex flex-col gap-2 relative z-10">
                                    <label className="text-sm font-semibold uppercase tracking-wider text-primary/70">Trip Style</label>
                                    <CustomDropdown
                                        options={['Honeymoon', 'Family Adventure', 'Wildlife & Nature', 'Culture & Heritage']}
                                        value={tripStyle}
                                        onChange={setTripStyle}
                                        placeholder="Select Trip Style"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold uppercase tracking-wider text-primary/70">Referral Code (Optional)</label>
                                <input type="text" value={referralCode} onChange={(e) => setReferralCode(e.target.value)} className="bg-sand/30 border border-primary/10 rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors" placeholder="e.g. SUMMER2026" />
                            </div>

                            <div className="flex flex-col gap-2 relative">
                                <label className="text-sm font-semibold uppercase tracking-wider text-primary/70">Tell us about your dream trip</label>
                                <textarea rows={6} value={message} onChange={(e) => setMessage(e.target.value)} className="bg-sand/30 border border-primary/10 rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors resize-none" placeholder="I'd love to see elephants, stay in a boutique hotel and relax on the beach..."></textarea>
                            </div>

                            {status === "success" && (
                                <div className="bg-[#1C4130]/10 border border-[#1C4130]/30 text-[#1C4130] px-4 py-3 rounded-lg mt-4 text-center font-medium">
                                    Thank you! Your inquiry has been sent successfully. We will get back to you shortly.
                                </div>
                            )}

                            {status === "error" && (
                                <div className="bg-red-500/10 border border-red-500/30 text-red-600 px-4 py-3 rounded-lg mt-4 text-center font-medium">
                                    Something went wrong. Please try again later.
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status === "submitting" || status === "success"}
                                className="bg-accent text-sand py-4 rounded-xl text-lg font-bold hover:bg-accent/90 transition-colors mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {status === "submitting" ? "Sending..." : status === "success" ? "Sent Successfully!" : "Send Inquiry"}
                            </button>
                        </form>
                    </div>

                    {/* Contact Info & Image */}
                    <div className="w-full lg:w-2/5 flex flex-col gap-8">
                        <div className="bg-primary text-sand p-8 rounded-3xl flex flex-col gap-8">
                            <h3 className="font-serif text-3xl">Get in Touch</h3>

                            <div className="flex items-start gap-4">
                                <MapPin className="w-6 h-6 text-accent shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-semibold text-base sm:text-lg mb-1">Head Office</h4>
                                    <p className="text-sand/70 text-sm sm:text-base">124 Ocean Drive, Colombo 03<br />Sri Lanka</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Phone className="w-6 h-6 text-accent shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-semibold text-lg mb-1">WhatsApp & Phone</h4>
                                    <a href="tel:+94768822188" className="text-sand/70">+94 76 882 2188</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Mail className="w-6 h-6 text-accent shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-semibold text-lg mb-1">Email</h4>
                                    <a href="mailto:info@trip2island.com" className="text-sand/70">info@trip2island.com</a>
                                </div>
                            </div>
                        </div>

                        <div className="flex-grow rounded-3xl overflow-hidden relative min-h-[250px] bg-primary/20 flex items-center justify-center text-primary/50 shadow-inner">
                            <SmartImage
                                src="/assets/page-contact.jpg"
                                alt="Sri Lanka Beach"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
