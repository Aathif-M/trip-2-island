import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Leaf } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-primary text-sand pt-20 pb-10">
            <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {/* Brand & Newsletter */}
                <div className="flex flex-col gap-6">
                    <Link to="/" className="flex items-center gap-2">
                        <Leaf className="w-8 h-8 text-accent" />
                        <span className="font-serif text-2xl font-bold tracking-tight">trip<span className="text-accent">2</span>island</span>
                    </Link>
                    <p className="text-sand/70 text-sm leading-relaxed">
                        Journeys of a thousand lifetimes. Tailor-made, luxury, and experiential travel across the beautiful island of Sri Lanka.
                    </p>
                    <div className="flex flex-col gap-2">
                        <h4 className="font-semibold text-sm tracking-widest uppercase text-sand/50">Travel Inspiration</h4>
                        <div className="flex gap-2">
                            <input type="email" placeholder="Your email address" className="bg-sand/10 border border-sand/20 rounded-l-md px-4 py-2 w-full text-sm focus:outline-none focus:border-accent" />
                            <button className="bg-accent px-4 py-2 rounded-r-md text-sm font-semibold hover:bg-accent/90 transition-colors">Subscribe</button>
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-serif text-xl font-medium mb-2">Quick Links</h4>
                    <Link to="/about" className="text-sand/70 hover:text-accent transition-colors text-sm">About Us</Link>
                    <Link to="/contact" className="text-sand/70 hover:text-accent transition-colors text-sm">Contact Us</Link>
                    <Link to="#" className="text-sand/70 hover:text-accent transition-colors text-sm">Travel Journal</Link>
                    <Link to="#" className="text-sand/70 hover:text-accent transition-colors text-sm">FAQs</Link>
                    <Link to="#" className="text-sand/70 hover:text-accent transition-colors text-sm">Terms & Conditions</Link>
                </div>

                {/* Destinations */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-serif text-xl font-medium mb-2">Destinations</h4>
                    <Link to="/destinations/sri-lanka" className="text-sand/70 hover:text-accent transition-colors text-sm">South Coast</Link>
                    <Link to="/destinations/sri-lanka" className="text-sand/70 hover:text-accent transition-colors text-sm">Cultural Triangle</Link>
                    <Link to="/destinations/sri-lanka" className="text-sand/70 hover:text-accent transition-colors text-sm">Hill Country</Link>
                    <Link to="/destinations/sri-lanka" className="text-sand/70 hover:text-accent transition-colors text-sm">Northern Explorer</Link>
                    <Link to="/destinations/sri-lanka" className="text-sand/70 hover:text-accent transition-colors text-sm">East Coast</Link>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-serif text-xl font-medium mb-2">Get in Touch</h4>
                    <div className="flex items-start gap-3 text-sand/70 text-sm">
                        <MapPin className="w-5 h-5 shrink-0 text-accent" />
                        <p>123 Ocean Drive,<br />Colombo 03, Sri Lanka</p>
                    </div>
                    <div className="flex items-center gap-3 text-sand/70 text-sm">
                        <Phone className="w-5 h-5 shrink-0 text-accent" />
                        <p>+94 11 234 5678</p>
                    </div>
                    <div className="flex items-center gap-3 text-sand/70 text-sm">
                        <Mail className="w-5 h-5 shrink-0 text-accent" />
                        <p>hello@trip2island.com</p>
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-sand/10 flex items-center justify-center hover:bg-accent transition-colors"><Instagram className="w-5 h-5" /></a>
                        <a href="#" className="w-10 h-10 rounded-full bg-sand/10 flex items-center justify-center hover:bg-accent transition-colors"><Facebook className="w-5 h-5" /></a>
                        <a href="#" className="w-10 h-10 rounded-full bg-sand/10 flex items-center justify-center hover:bg-accent transition-colors"><Twitter className="w-5 h-5" /></a>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 lg:px-12 mt-16 pt-8 border-t border-sand/10 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sand/50 text-xs text-center md:text-left">
                    &copy; {new Date().getFullYear()} Trip2Island. All rights reserved. Built with ❤️ in Sri Lanka.
                </p>
                <div className="flex items-center gap-2 bg-sand/10 px-4 py-2 rounded-full border border-sand/20">
                    <Leaf className="w-4 h-4 text-green-400" />
                    <span className="text-xs font-semibold text-sand/90 tracking-wider">RESPONSIBLE TRAVEL PARTNER</span>
                </div>
            </div>
        </footer>
    );
}
