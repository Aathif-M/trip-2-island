import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navRef = useRef(null);
    const logoRef = useRef(null);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(navRef.current, {
                width: "100%",
                maxWidth: "100%",
                top: 0,
                borderRadius: 0,
                borderColor: "transparent",
                backgroundColor: "rgba(255, 255, 255, 1)",
                duration: 0.4,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: document.body,
                    start: "top -50px",
                    toggleActions: "play none none reverse",
                }
            });

            gsap.to(logoRef.current, {
                height: "4rem", // equivalent to h-16
                duration: 0.4,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: document.body,
                    start: "top -50px",
                    toggleActions: "play none none reverse",
                }
            });
        });

        return () => ctx.revert();
    }, []);

    const navLinks = [
        { name: 'Destinations', path: '/destinations/sri-lanka' },
        { name: 'Itineraries', path: '/itineraries' },
        { name: 'Places to Stay', path: '/places-to-stay' },
        { name: 'Travel Journal', path: '/journal' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    // Static initial classes; GSAP handles the animation on scroll
    const initialNavClasses = 'w-[calc(100%-2rem)] max-w-7xl mx-auto top-6 left-0 right-0 bg-white/90 backdrop-blur-md py-3 rounded-full shadow-lg border border-white/20';

    const linkColor = 'text-primary/80';
    const menuIconColor = isOpen ? 'text-sand' : 'text-primary';

    return (
        <>
            <nav ref={navRef} className={`fixed z-50 ${initialNavClasses}`}>
                <div className="container mx-auto px-6 xl:px-8 flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center relative z-50">
                        <img
                            ref={logoRef}
                            src="/trip-2-island/assets/logo.png"
                            alt="trip2island logo"
                            className="h-20 w-auto object-contain transition-transform duration-300 hover:scale-105"
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-8">
                        <div className={`flex gap-6 font-medium text-sm tracking-wide ${linkColor}`}>
                            {navLinks.map((link) => (
                                <Link key={link.name} to={link.path} className="hover:text-accent transition-colors">
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                        <Link to="/contact" className="bg-accent text-sand px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-accent/90 transition-transform hover:scale-105 active:scale-95">
                            Plan Your Trip
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className={`lg:hidden relative z-50 ${menuIconColor} transition-colors`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-40 bg-primary flex flex-col items-center justify-center transition-transform duration-500 ease-in-out ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="flex flex-col items-center gap-6 text-2xl font-serif text-sand">
                    {navLinks.map((link) => (
                        <Link key={link.name} to={link.path} className="hover:text-accent transition-colors">
                            {link.name}
                        </Link>
                    ))}
                    <Link to="/contact" className="mt-8 bg-accent text-sand px-8 py-3 rounded-full text-lg font-sans font-semibold">
                        Plan Your Trip
                    </Link>
                </div>
            </div>
        </>
    );
}
