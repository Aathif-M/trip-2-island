import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';

export default function CustomDropdown({ options, value, onChange, placeholder = "Select an option", className = "" }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const menuRef = useRef(null);
    const chevronRef = useRef(null);

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Animate open/close
    useEffect(() => {
        if (isOpen) {
            gsap.to(chevronRef.current, { rotation: 180, duration: 0.3, ease: 'power2.out' });
            gsap.fromTo(menuRef.current, 
                { opacity: 0, y: -10, display: 'none' },
                { opacity: 1, y: 0, display: 'block', duration: 0.3, ease: 'back.out(1.7)' }
            );
        } else {
            gsap.to(chevronRef.current, { rotation: 0, duration: 0.3, ease: 'power2.out' });
            gsap.to(menuRef.current, { 
                opacity: 0, 
                y: -10, 
                duration: 0.2, 
                ease: 'power2.in',
                onComplete: () => {
                    if (menuRef.current) menuRef.current.style.display = 'none';
                }
            });
        }
    }, [isOpen]);

    return (
        <div ref={dropdownRef} className={`relative w-full ${className}`}>
            <div 
                className="bg-sand/30 border border-primary/10 rounded-lg px-4 py-3 flex justify-between items-center cursor-pointer hover:border-accent transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={value ? "text-primary" : "text-primary/50"}>
                    {value || placeholder}
                </span>
                <ChevronDown ref={chevronRef} className="w-5 h-5 text-primary/70" />
            </div>

            <div 
                ref={menuRef} 
                className="absolute top-full left-0 w-full mt-2 bg-white border border-primary/10 rounded-lg shadow-xl shadow-primary/5 z-50 overflow-hidden"
                style={{ display: 'none' }}
            >
                <div className="max-h-60 overflow-y-auto">
                    {options.map((option, idx) => (
                        <div 
                            key={idx}
                            className={`px-4 py-3 cursor-pointer hover:bg-sand font-sans transition-colors ${value === option ? 'bg-primary/5 text-primary font-medium' : 'text-primary/80'}`}
                            onClick={() => {
                                onChange(option);
                                setIsOpen(false);
                            }}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
