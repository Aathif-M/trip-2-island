import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Destinations from './pages/Destinations';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Terms from './pages/Terms';
import Itineraries from './pages/Itineraries';
import PlacesToStay from './pages/PlacesToStay';
import Journal from './pages/Journal';
import ExperiencesPage from './pages/ExperiencesPage';
import LoadingScreen from './components/UI/LoadingScreen';
import PageTransition from './components/UI/PageTransition';

function App() {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <>
            {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
            <Router basename="/trip-2-island">
                    <PageTransition>
                        <Layout>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/destinations/sri-lanka" element={<Destinations />} />
                                <Route path="/contact" element={<Contact />} />
                                <Route path="/itineraries" element={<Itineraries />} />
                                <Route path="/places-to-stay" element={<PlacesToStay />} />
                                <Route path="/journal" element={<Journal />} />
                                <Route path="/faq" element={<FAQ />} />
                                <Route path="/terms" element={<Terms />} />
                                <Route path="/experiences" element={<ExperiencesPage />} />
                            </Routes>
                        </Layout>
                    </PageTransition>
                </Router>
        </>
    );
}

export default App;
