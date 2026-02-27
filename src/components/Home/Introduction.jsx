import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Introduction() {
    const container = useRef();

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Stagger text lines
            gsap.from('.intro-line', {
                y: 50,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: container.current,
                    start: 'top 75%',
                }
            });
        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="py-32 px-6 lg:px-12 bg-sand text-primary relative z-10">
            <div className="container mx-auto max-w-4xl text-center">
                <p className="font-serif text-3xl md:text-5xl leading-relaxed text-balance">
                    <span className="intro-line block overflow-hidden">We don't just plan trips.</span>
                    <span className="intro-line block overflow-hidden mt-4">We craft <span className="italic text-accent">tailor-made private tours</span></span>
                    <span className="intro-line block overflow-hidden mt-4">for curious minds seeking the</span>
                    <span className="intro-line block overflow-hidden mt-4">authentic soul of Sri Lanka.</span>
                </p>

                <div className="mt-16 intro-line">
                    <p className="text-primary/70 max-w-2xl mx-auto leading-loose text-lg">
                        From the misty peaks of the Hill Country to the sun-drenched shores of the South Coast, our local expertise ensures every moment is drenched in luxury and authentic connection.
                    </p>
                </div>
            </div>
        </section>
    );
}
