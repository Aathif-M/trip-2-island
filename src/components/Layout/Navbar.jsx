import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Destinations', path: '/destinations/sri-lanka' },
        { name: 'Itineraries', path: '/itineraries' },
        { name: 'Places to Stay', path: '/places-to-stay' },
        { name: 'Travel Journal', path: '/journal' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    const isDarkHero = ['/', '/about'].includes(location.pathname);
    const logoColor = scrolled ? 'text-primary' : (isDarkHero ? 'text-sand' : 'text-primary');
    const linkColor = scrolled ? 'text-primary/80' : (isDarkHero ? 'text-sand/90' : 'text-primary/80');
    const menuIconColor = isOpen ? 'text-sand' : (scrolled ? 'text-primary' : (isDarkHero ? 'text-sand' : 'text-primary'));

    return (
        <>
            <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
                <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 relative z-50">
                        <Leaf className="w-8 h-8 text-accent" />
                        <span className={`font-serif text-2xl font-bold tracking-tight ${logoColor}`}>
                            trip<span className="text-accent">2</span>island
                        </span>
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
