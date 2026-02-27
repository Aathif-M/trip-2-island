import Hero from '../components/Home/Hero';
import Introduction from '../components/Home/Introduction';
import DestinationsGrid from '../components/Home/DestinationsGrid';
import CuratedItineraries from '../components/Home/CuratedItineraries';
import FeaturedStays from '../components/Home/FeaturedStays';
import Testimonials from '../components/Home/Testimonials';
import CTA from '../components/Home/CTA';

export default function Home() {
    return (
        <div className="w-full">
            <Hero />
            <Introduction />
            <DestinationsGrid />
            <CuratedItineraries />
            <FeaturedStays />
            <Testimonials />
            <CTA />
        </div>
    );
}
