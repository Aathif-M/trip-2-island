import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
    return (
        <div className="bg-sand text-primary min-h-screen pt-32 pb-20 px-6 lg:px-12">
            <div className="container mx-auto max-w-7xl">

                <div className="text-center mb-16">
                    <h1 className="font-serif text-5xl lg:text-7xl mb-6">Start your journey.</h1>
                    <p className="text-primary/70 text-lg">Let us tailor a Sri Lankan experience entirely around you.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Form */}
                    <div className="w-full lg:w-3/5 bg-white rounded-3xl p-8 lg:p-12 shadow-xl shadow-primary/5">
                        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold uppercase tracking-wider text-primary/70">Full Name</label>
                                    <input type="text" className="bg-sand/30 border border-primary/10 rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors" placeholder="John Doe" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold uppercase tracking-wider text-primary/70">Email Address</label>
                                    <input type="email" className="bg-sand/30 border border-primary/10 rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors" placeholder="john@example.com" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold uppercase tracking-wider text-primary/70">Travel Dates</label>
                                    <input type="date" className="bg-sand/30 border border-primary/10 rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold uppercase tracking-wider text-primary/70">Trip Style</label>
                                    <select className="bg-sand/30 border border-primary/10 rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors">
                                        <option>Honeymoon</option>
                                        <option>Family Adventure</option>
                                        <option>Wildlife & Nature</option>
                                        <option>Culture & Heritage</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 relative">
                                <label className="text-sm font-semibold uppercase tracking-wider text-primary/70">Tell us about your dream trip</label>
                                <textarea rows={6} className="bg-sand/30 border border-primary/10 rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors resize-none" placeholder="I'd love to see elephants, stay in a boutique hotel, and relax on the beach..."></textarea>
                            </div>

                            <button className="bg-accent text-sand py-4 rounded-xl text-lg font-bold hover:bg-accent/90 transition-colors mt-4">
                                Send Inquiry
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
                                    <h4 className="font-semibold text-lg mb-1">Head Office</h4>
                                    <p className="text-sand/70">123 Ocean Drive, Colombo 03<br />Sri Lanka</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Phone className="w-6 h-6 text-accent shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-semibold text-lg mb-1">Phone</h4>
                                    <p className="text-sand/70">Intl: +94 11 234 5678<br />UK: +44 20 7123 4567</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Mail className="w-6 h-6 text-accent shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-semibold text-lg mb-1">Email</h4>
                                    <p className="text-sand/70">hello@trip2island.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex-grow rounded-3xl overflow-hidden relative min-h-[250px] bg-primary/20 flex items-center justify-center text-primary/50">
                            <span className="absolute z-10 font-bold tracking-widest">[PLACEHOLDER: Serene Beach]</span>
                            <img
                                src="https://images.unsplash.com/photo-1544482590-7db078b5e954?auto=format&fit=crop&q=80&w=800"
                                alt="Sri Lanka Beach"
                                className="w-full h-full object-cover mix-blend-overlay opacity-60"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
