import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Villas from './pages/Villas';
import VillaDetails from './pages/VillaDetails';
import BookingForm from './pages/BookingForm';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/villas" element={<Villas />} />
          
          {/* 🛑 CRITICAL FIX HERE: Change the parameter name from :id to :slug */}
          <Route path="/villa/:slug" element={<VillaDetails />} /> 
          
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;