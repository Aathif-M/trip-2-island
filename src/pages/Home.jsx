import Hero from '../components/Home/Hero';
import Introduction from '../components/Home/Introduction';
import EssenceOfSriLanka from '../components/Home/EssenceOfSriLanka';
import DestinationsGrid from '../components/Home/DestinationsGrid';
import ColomboCityLife from '../components/Home/ColomboCityLife';
import CuratedItineraries from '../components/Home/CuratedItineraries';
import FeaturedStays from '../components/Home/FeaturedStays';
import Testimonials from '../components/Home/Testimonials';
import CTA from '../components/Home/CTA';

export default function Home() {
    return (
        <div className="w-full">
            <Hero />
            <Introduction />
            <EssenceOfSriLanka />
            <DestinationsGrid />
            <ColomboCityLife />
            <CuratedItineraries />
            <FeaturedStays />
            <Testimonials />
            <CTA />
        </div>
    );
}
