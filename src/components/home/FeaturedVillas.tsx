import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const villas = [
  {
    id: 1,
    name: 'Ocean Breeze Villa',
    image: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg',
    description: 'Luxurious beachfront villa with private pool and stunning ocean views',
    priceWithFood: 450,
    priceWithoutFood: 300,
    location: 'Santorini, Greece'
  },
  {
    id: 2,
    name: 'Tropical Paradise',
    image: 'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg',
    description: 'Secluded villa surrounded by lush gardens and infinity pool',
    priceWithFood: 380,
    priceWithoutFood: 250,
    location: 'Bali, Indonesia'
  },
  {
    id: 3,
    name: 'Mountain Retreat',
    image: 'https://images.pexels.com/photos/1797505/pexels-photo-1797505.jpeg',
    description: 'Elegant villa nestled in rolling hills with panoramic views',
    priceWithFood: 420,
    priceWithoutFood: 280,
    location: 'Tuscany, Italy'
  },
  {
    id: 4,
    name: 'Overwater Haven',
    image: 'https://images.pexels.com/photos/2725675/pexels-photo-2725675.jpeg',
    description: 'Exclusive overwater villa with direct lagoon access',
    priceWithFood: 650,
    priceWithoutFood: 500,
    location: 'Maldives'
  }
];

const FeaturedVillas = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const villasToShow = 3;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (villas.length - villasToShow + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + villas.length - villasToShow + 1) % (villas.length - villasToShow + 1));
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Villas
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hand-picked luxury accommodations for the perfect getaway
          </p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / villasToShow)}%)` }}
            >
              {villas.map((villa) => (
                <div key={villa.id} className="w-full md:w-1/3 flex-shrink-0 px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={villa.image}
                        alt={villa.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-sm font-medium text-gray-700">{villa.location}</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{villa.name}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{villa.description}</p>
                      
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-500">With Food</span>
                          <span className="text-lg font-bold text-gray-900">${villa.priceWithFood}/night</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Without Food</span>
                          <span className="text-lg font-bold text-gray-900">${villa.priceWithoutFood}/night</span>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <Link
                          to={`/villa/${villa.id}`}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
                        >
                          <Eye className="h-4 w-4" />
                          <span>View More</span>
                        </Link>
                        <Link
                          to="/booking"
                          state={{ villa }}
                          className="flex-1 bg-sky-500 hover:bg-sky-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 transform hover:scale-105"
                        >
                          <Calendar className="h-4 w-4" />
                          <span>Book Now</span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all duration-200"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all duration-200"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVillas;