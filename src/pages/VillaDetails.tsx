import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Wifi, Car, Utensils, Waves, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const villaData = {
  1: {
    name: 'Ocean Breeze Villa',
    images: [
      'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg',
      'https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg',
      'https://images.pexels.com/photos/2468056/pexels-photo-2468056.jpeg'
    ],
    description: 'Experience the ultimate in luxury at our Ocean Breeze Villa, perched on the cliffs of Santorini. This stunning property offers panoramic views of the Aegean Sea, featuring a private infinity pool, spacious terraces, and elegantly appointed interiors. The villa combines traditional Cycladic architecture with modern amenities, creating a perfect sanctuary for your Mediterranean getaway.',
    amenities: ['Private Pool', 'Ocean View', 'Wi-Fi', 'Parking', 'Kitchen', 'Air Conditioning'],
    priceWithFood: 450,
    priceWithoutFood: 300,
    location: 'Santorini, Greece',
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6
  }
};

const VillaDetails = () => {
  const { id } = useParams();
  const villa = villaData[id as keyof typeof villaData];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!villa) {
    return <div className="pt-16 min-h-screen flex items-center justify-center">Villa not found</div>;
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % villa.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + villa.images.length) % villa.images.length);
  };

  const amenityIcons = {
    'Private Pool': Waves,
    'Ocean View': Waves,
    'Wi-Fi': Wifi,
    'Parking': Car,
    'Kitchen': Utensils,
    'Air Conditioning': Wifi
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="relative mb-8">
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={villa.images[currentImageIndex]}
                    alt={villa.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-all duration-200"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-800" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-all duration-200"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-800" />
                  </button>
                </div>
                
                <div className="flex space-x-2 mt-4">
                  {villa.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        index === currentImageIndex ? 'border-sky-500' : 'border-transparent'
                      }`}
                    >
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{villa.name}</h1>
              <p className="text-lg text-gray-600 mb-6">{villa.location}</p>
              
              <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Pricing</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">With Food</span>
                    <span className="text-2xl font-bold text-gray-900">${villa.priceWithFood}/night</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Without Food</span>
                    <span className="text-2xl font-bold text-gray-900">${villa.priceWithoutFood}/night</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Villa Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Bedrooms:</span>
                    <span className="ml-2 font-medium">{villa.bedrooms}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Bathrooms:</span>
                    <span className="ml-2 font-medium">{villa.bathrooms}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Max Guests:</span>
                    <span className="ml-2 font-medium">{villa.maxGuests}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Amenities</h3>
                <div className="grid grid-cols-2 gap-3">
                  {villa.amenities.map((amenity, index) => {
                    const Icon = amenityIcons[amenity as keyof typeof amenityIcons] || Wifi;
                    return (
                      <div key={index} className="flex items-center space-x-2">
                        <Icon className="h-4 w-4 text-sky-500" />
                        <span className="text-sm text-gray-700">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <p className="text-gray-700 mb-8 leading-relaxed">{villa.description}</p>

              <Link
                to="/booking"
                state={{ villa }}
                className="w-full bg-sky-500 hover:bg-sky-600 text-white py-4 px-8 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <Calendar className="h-5 w-5" />
                <span>Book This Villa</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VillaDetails;