import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import SmartImage from '../UI/SmartImage';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navRef = useRef(null);
    const logoRef = useRef(null);
    const scrolledRef = useRef(false); // track state to avoid redundant animations

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    useEffect(() => {
        const onScroll = () => {
            const isScrolled = window.scrollY > 60;

            // Only animate if state actually changed
            if (isScrolled === scrolledRef.current) return;
            scrolledRef.current = isScrolled;

            if (isScrolled) {
                // Scrolled DOWN - collapse into full-width solid bar
                gsap.to(navRef.current, {
                    width: '100%',
                    maxWidth: '100%',
                    top: 0,
                    borderRadius: 0,
                    paddingTop: '0.5rem',
                    paddingBottom: '0.5rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 4px 30px rgba(26, 54, 40, 0.10)',
                    duration: 0.55,
                    ease: 'power3.out',
                });
                gsap.to(logoRef.current, {
                    height: '3.5rem',
                    duration: 0.55,
                    ease: 'power3.out',
                });
            } else {
                // Scrolled back UP - restore pill shape
                gsap.to(navRef.current, {
                    width: 'calc(100% - 2rem)',
                    maxWidth: '80rem',
                    top: '1.5rem',
                    borderRadius: '9999px',
                    paddingTop: '0.75rem',
                    paddingBottom: '0.75rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    duration: 0.55,
                    ease: 'power3.out',
                });
                gsap.to(logoRef.current, {
                    height: '5rem',
                    duration: 0.55,
                    ease: 'power3.out',
                });
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const navLinks = [
        { name: 'Destinations', path: '/destinations/sri-lanka' },
        { name: 'Itineraries', path: '/itineraries' },
        { name: 'Places to Stay', path: '/places-to-stay' },
        { name: 'Travel Journal', path: '/journal' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    const menuIconColor = isOpen ? 'text-sand' : 'text-primary';

    return (
        <>
            <nav
                ref={navRef}
                className="fixed z-50 left-0 right-0 mx-auto px-0"
                style={{
                    width: 'calc(100% - 2rem)',
                    maxWidth: '80rem',
                    top: '1.5rem',
                    borderRadius: '9999px',
                    paddingTop: '0.75rem',
                    paddingBottom: '0.75rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                }}
            >
                <div className="container mx-auto px-6 xl:px-8 flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center relative z-50">
                        <SmartImage
                            ref={logoRef}
                            src="/trip-2-island/assets/logo.png"
                            alt="trip2island logo"
                            className="w-auto object-contain hover:scale-105 transition-transform duration-300"
                            style={{ height: '5rem' }}
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-8">
                        <div className="flex gap-6 font-medium text-sm tracking-wide text-primary/80">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="hover:text-accent transition-colors duration-200"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                        <Link
                            to="/contact"
                            className="bg-accent text-sand px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-accent/90 transition-transform hover:scale-105 active:scale-95"
                        >
                            Plan Your Trip
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className={`lg:hidden relative z-50 ${menuIconColor} transition-colors`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-8 h-8 text-emerald-950" /> : <Menu className="w-8 h-8" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-primary flex flex-col items-center justify-center transition-transform duration-500 ease-in-out ${isOpen ? 'translate-y-0' : '-translate-y-full'
                    }`}
            >
                <div className="flex flex-col items-center gap-6 text-2xl font-serif text-sand">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="hover:text-accent transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        to="/contact"
                        className="mt-8 bg-accent text-sand px-8 py-3 rounded-full text-lg font-sans font-semibold"
                    >
                        Plan Your Trip
                    </Link>
                </div>
            </div>
        </>
    );
}
