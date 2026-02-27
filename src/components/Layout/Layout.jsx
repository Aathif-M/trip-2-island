import Navbar from './Navbar';
import Footer from './Footer';
import SmoothScroll from './SmoothScroll';

export default function Layout({ children }) {
    return (
        <SmoothScroll>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
            </div>
        </SmoothScroll>
    );
}
