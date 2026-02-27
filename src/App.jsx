import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Destinations from './pages/Destinations';
import Contact from './pages/Contact';
import Itineraries from './pages/Itineraries';
import PlacesToStay from './pages/PlacesToStay';
import Journal from './pages/Journal';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/destinations/sri-lanka" element={<Destinations />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/itineraries" element={<Itineraries />} />
                    <Route path="/places-to-stay" element={<PlacesToStay />} />
                    <Route path="/journal" element={<Journal />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
