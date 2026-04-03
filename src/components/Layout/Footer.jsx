import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Leaf } from 'lucide-react';
import SmartImage from '../UI/SmartImage';

export default function Footer() {
    return (
        <footer className="bg-primary text-sand pt-20 pb-10">
            <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {/* Brand & Newsletter */}
                <div className="flex flex-col gap-6">
                    <Link to="/" className="flex items-center">
                        <SmartImage
                            src="/trip-2-island/assets/logo-light.png"
                            alt="Trip2Island Logo"
                            className="lg:h-13 h-13 w-auto object-contain mb-2"
                        />
                    </Link>
                    <p className="text-sand/70 text-sm leading-relaxed">
                        Journeys of a thousand lifetimes. Tailor-made, luxury and experiential travel across the beautiful island of Sri Lanka.
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
                    <Link to="/journal" className="text-sand/70 hover:text-accent transition-colors text-sm">Travel Journal</Link>
                    <Link to="/faq" className="text-sand/70 hover:text-accent transition-colors text-sm">FAQs</Link>
                    <Link to="/terms" className="text-sand/70 hover:text-accent transition-colors text-sm">Terms & Conditions</Link>
                </div>

                {/* Destinations */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-serif text-xl font-medium mb-2">Destinations</h4>
                    <Link to="/destinations/sri-lanka#south-coast" className="text-sand/70 hover:text-accent transition-colors text-sm">South Coast</Link>
                    <Link to="/destinations/sri-lanka#cultural-triangle" className="text-sand/70 hover:text-accent transition-colors text-sm">Cultural Triangle</Link>
                    <Link to="/destinations/sri-lanka#hill-country" className="text-sand/70 hover:text-accent transition-colors text-sm">Hill Country</Link>
                    <Link to="/destinations/sri-lanka#northern-explorer" className="text-sand/70 hover:text-accent transition-colors text-sm">Northern Explorer</Link>
                    <Link to="/destinations/sri-lanka#east-coast" className="text-sand/70 hover:text-accent transition-colors text-sm">East Coast</Link>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-serif text-xl font-medium mb-2">Get in Touch</h4>
                    <div className="flex items-start gap-3 text-sand/70 text-sm">
                        <MapPin className="w-5 h-5 shrink-0 text-accent" />
                        <p>124 Ocean Drive,<br />Colombo 03, Sri Lanka</p>
                    </div>
                    <div className="flex items-center gap-3 text-sand/70 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-5 h-5 shrink-0 text-accent">
                            <path d="M12.01 2.014c-5.46 0-9.894 4.435-9.894 9.898 0 1.745.454 3.447 1.32 4.945L2 22l5.312-1.393a9.88 9.88 0 0 0 4.698 1.18h.004c5.46 0 9.89-4.437 9.89-9.9 0-2.65-1.03-5.138-2.905-7.01-1.874-1.872-4.364-2.903-7.016-2.903l.027.04zM12.01 20.15h-.002c-1.478 0-2.926-.396-4.195-1.15l-.3-.178-3.12.82.833-3.04-.195-.31c-.825-1.31-1.26-2.825-1.26-4.382 0-4.57 3.717-8.29 8.286-8.29 2.215 0 4.298.863 5.864 2.428 1.564 1.566 2.426 3.652 2.426 5.865-.002 4.57-3.718 8.287-8.286 8.287l-.05-.05zm4.542-6.198c-.25-.125-1.475-.728-1.704-.813-.23-.083-.396-.125-.562.125-.166.25-.644.813-.79.98-.146.166-.29.187-.54.062-.25-.125-1.053-.388-2.006-1.24-.74-.66-1.24-1.474-1.385-1.724-.145-.25-.015-.386.11-.51.11-.11.25-.29.375-.436.125-.145.166-.25.25-.416.083-.166.04-.312-.02-.437-.063-.125-.563-1.353-.77-1.85-.2-.486-.405-.42-.562-.428-.146-.007-.312-.007-.478-.007s-.436.062-.665.312c-.23.25-.873.853-.873 2.08 0 1.228.894 2.416 1.02 2.583.125.166 1.76 2.686 4.266 3.766 2.056.885 2.544.75 2.98.667.436-.083 1.474-.604 1.682-1.187.208-.583.208-1.082.146-1.187-.063-.105-.23-.167-.48-.292h.002z" />
                        </svg>
                        <a href="https://wa.me/94768822188?text=Hello%20Trip2Island%2C%20I%20would%20like%20to%20inquire%20about%20a%20tour." target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">+94 76 882 2188 (WhatsApp)</a>
                    </div>
                    <div className="flex items-center gap-3 text-sand/70 text-sm">
                        <Mail className="w-5 h-5 shrink-0 text-accent" />
                        <a href="mailto:info@trip2island.com" className="hover:text-accent transition-colors">info@trip2island.com</a>
                    </div>

                    {/* Social Links - Replace hrefs with your Instagram and Facebook links */}
                    <div className="flex items-center gap-4 mt-4">
                        <a href="https://www.instagram.com/trip2island?igsh=aXkzMjFmMmQ5Nm0x" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-sand/10 flex items-center justify-center hover:bg-accent transition-colors"><Instagram className="w-5 h-5" /></a>
                        <a href="https://www.facebook.com/share/18LFA6Ugg2/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-sand/10 flex items-center justify-center hover:bg-accent transition-colors"><Facebook className="w-5 h-5" /></a>
                        <a
                            href="https://wa.me/94768822188?text=Hello%20Trip2Island%2C%20I%20would%20like%20to%20inquire%20about%20a%20tour."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-sand/10 flex items-center justify-center hover:bg-accent transition-colors"
                            aria-label="WhatsApp"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-5 h-5">
                                <path d="M12.01 2.014c-5.46 0-9.894 4.435-9.894 9.898 0 1.745.454 3.447 1.32 4.945L2 22l5.312-1.393a9.88 9.88 0 0 0 4.698 1.18h.004c5.46 0 9.89-4.437 9.89-9.9 0-2.65-1.03-5.138-2.905-7.01-1.874-1.872-4.364-2.903-7.016-2.903l.027.04zM12.01 20.15h-.002c-1.478 0-2.926-.396-4.195-1.15l-.3-.178-3.12.82.833-3.04-.195-.31c-.825-1.31-1.26-2.825-1.26-4.382 0-4.57 3.717-8.29 8.286-8.29 2.215 0 4.298.863 5.864 2.428 1.564 1.566 2.426 3.652 2.426 5.865-.002 4.57-3.718 8.287-8.286 8.287l-.05-.05zm4.542-6.198c-.25-.125-1.475-.728-1.704-.813-.23-.083-.396-.125-.562.125-.166.25-.644.813-.79.98-.146.166-.29.187-.54.062-.25-.125-1.053-.388-2.006-1.24-.74-.66-1.24-1.474-1.385-1.724-.145-.25-.015-.386.11-.51.11-.11.25-.29.375-.436.125-.145.166-.25.25-.416.083-.166.04-.312-.02-.437-.063-.125-.563-1.353-.77-1.85-.2-.486-.405-.42-.562-.428-.146-.007-.312-.007-.478-.007s-.436.062-.665.312c-.23.25-.873.853-.873 2.08 0 1.228.894 2.416 1.02 2.583.125.166 1.76 2.686 4.266 3.766 2.056.885 2.544.75 2.98.667.436-.083 1.474-.604 1.682-1.187.208-.583.208-1.082.146-1.187-.063-.105-.23-.167-.48-.292h.002z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 lg:px-12 mt-16 pt-8 border-t border-sand/10 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left">
                    <p className="text-sand/50 text-xs">
                        &copy; {new Date().getFullYear()} Trip2Island. All rights reserved. Built with ❤️ in Sri Lanka.
                    </p>
                    {/* <span className="text-sand/30 text-[10px] mt-1 inline-block">
                        Site by TeeBeeU
                    </span> */}
                </div>
                <div className="flex items-center gap-2 bg-sand/10 px-4 py-2 rounded-full border border-sand/20">
                    <Leaf className="w-4 h-4 text-green-400" />
                    <span className="text-xs font-semibold text-sand/90 tracking-wider">RESPONSIBLE TRAVEL PARTNER</span>
                </div>
            </div>
        </footer>
    );
}
