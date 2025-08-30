import React from 'react';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-8 w-8 text-sky-400" />
              <span className="text-2xl font-bold">Seven Heaven Stays</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Experience luxury and comfort in our carefully curated villas. 
              Your perfect getaway awaits at Seven Heaven Stays.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-sky-400 transition-colors duration-200">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-sky-400 transition-colors duration-200">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-sky-400 transition-colors duration-200">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-sky-400 transition-colors duration-200">Home</Link></li>
              <li><Link to="/villas" className="text-gray-300 hover:text-sky-400 transition-colors duration-200">Our Villas</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-sky-400 transition-colors duration-200">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-sky-400 transition-colors duration-200">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-sky-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-sky-400" />
                <span className="text-gray-300">info@sevenheavenstays.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-sky-400 mt-1" />
                <span className="text-gray-300">123 Paradise Avenue<br />Resort District, Paradise</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Seven Heaven Stays. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;