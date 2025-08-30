import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Wifi, Car, Utensils, Waves, Calendar, MapPin, Users, Bed, Bath, Star, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const villaData = {
  1: {
    name: 'Ocean Breeze Villa',
    images: [
      'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg',
      'https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg',
      'https://images.pexels.com/photos/2468056/pexels-photo-2468056.jpeg',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg'
    ],
    description: 'Experience the ultimate in luxury at our Ocean Breeze Villa, perched on the cliffs of Santorini. This stunning property offers panoramic views of the Aegean Sea, featuring a private infinity pool, spacious terraces, and elegantly appointed interiors. The villa combines traditional Cycladic architecture with modern amenities, creating a perfect sanctuary for your Mediterranean getaway. Wake up to breathtaking sunrises and end your days with spectacular sunsets over the caldera.',
    amenities: [
      { name: 'Private Pool', icon: Waves },
      { name: 'Ocean View', icon: Eye },
      { name: 'Wi-Fi', icon: Wifi },
      { name: 'Parking', icon: Car },
      { name: 'Full Kitchen', icon: Utensils },
      { name: 'Air Conditioning', icon: Star },
      { name: 'Terrace', icon: MapPin },
      { name: 'BBQ Area', icon: Utensils }
    ],
    priceWithFood: 450,
    priceWithoutFood: 300,
    location: 'Santorini, Greece',
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    rating: 4.9,
    reviews: 127
  },
  2: {
    name: 'Tropical Paradise',
    images: [
      'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg',
      'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg',
      'https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg'
    ],
    description: 'Immerse yourself in tropical luxury at our Bali paradise villa. Surrounded by lush rice terraces and tropical gardens, this villa offers the perfect blend of traditional Balinese architecture and modern comfort.',
    amenities: [
      { name: 'Private Pool', icon: Waves },
      { name: 'Garden View', icon: Eye },
      { name: 'Wi-Fi', icon: Wifi },
      { name: 'Parking', icon: Car },
      { name: 'Full Kitchen', icon: Utensils },
      { name: 'Air Conditioning', icon: Star }
    ],
    priceWithFood: 380,
    priceWithoutFood: 250,
    location: 'Bali, Indonesia',
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    rating: 4.8,
    reviews: 89
  }
};

const similarVillas = [
  {
    id: 2,
    name: 'Tropical Paradise',
    image: 'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg',
    priceWithoutFood: 250,
    location: 'Bali, Indonesia',
    rating: 4.8
  },
  {
    id: 3,
    name: 'Mountain Retreat',
    image: 'https://images.pexels.com/photos/1797505/pexels-photo-1797505.jpeg',
    priceWithoutFood: 280,
    location: 'Tuscany, Italy',
    rating: 4.7
  },
  {
    id: 4,
    name: 'Overwater Haven',
    image: 'https://images.pexels.com/photos/2725675/pexels-photo-2725675.jpeg',
    priceWithoutFood: 500,
    location: 'Maldives',
    rating: 4.9
  },
  {
    id: 5,
    name: 'Desert Oasis',
    image: 'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg',
    priceWithoutFood: 350,
    location: 'Dubai, UAE',
    rating: 4.6
  }
];

const VillaDetails = () => {
  const { id } = useParams();
  const villa = villaData[id as keyof typeof villaData];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [similarVillaIndex, setSimilarVillaIndex] = useState(0);

  if (!villa) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Villa not found</h2>
          <Link to="/villas" className="text-sky-500 hover:text-sky-600">
            Back to Villas
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % villa.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + villa.images.length) % villa.images.length);
  };

  const nextSimilarVilla = () => {
    setSimilarVillaIndex((prev) => (prev + 1) % (similarVillas.length - 2));
  };

  const prevSimilarVilla = () => {
    setSimilarVillaIndex((prev) => (prev - 1 + similarVillas.length - 2) % (similarVillas.length - 2));
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-8">
            <Link to="/villas" className="text-sky-500 hover:text-sky-600 mb-4 inline-flex items-center">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Villas
            </Link>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{villa.name}</h1>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{villa.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{villa.rating} ({villa.reviews} reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Image Carousel */}
            <div className="lg:col-span-2">
              <div className="relative mb-6">
                <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={villa.images[currentImageIndex]}
                    alt={villa.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 transition-all duration-200 shadow-lg"
                  >
                    <ChevronLeft className="h-6 w-6 text-gray-800" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 transition-all duration-200 shadow-lg"
                  >
                    <ChevronRight className="h-6 w-6 text-gray-800" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {villa.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Thumbnail Gallery */}
                <div className="flex space-x-3 mt-4 overflow-x-auto pb-2">
                  {villa.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        index === currentImageIndex ? 'border-sky-500' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Villa</h2>
                <p className="text-gray-700 leading-relaxed text-lg">{villa.description}</p>
              </div>

              {/* Amenities */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {villa.amenities.map((amenity, index) => {
                    const Icon = amenity.icon;
                    return (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                        <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                          <Icon className="h-5 w-5 text-sky-500" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{amenity.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Pricing</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-sky-50 rounded-lg">
                        <div>
                          <span className="text-gray-600">With Food</span>
                          <div className="text-sm text-gray-500">Includes all meals</div>
                        </div>
                        <span className="text-2xl font-bold text-gray-900">${villa.priceWithFood}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <div>
                          <span className="text-gray-600">Without Food</span>
                          <div className="text-sm text-gray-500">Self-catering</div>
                        </div>
                        <span className="text-2xl font-bold text-gray-900">${villa.priceWithoutFood}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">Villa Details</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Bed className="h-4 w-4 text-gray-500" />
                        <span>{villa.bedrooms} Bedrooms</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Bath className="h-4 w-4 text-gray-500" />
                        <span>{villa.bathrooms} Bathrooms</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span>Up to {villa.maxGuests} Guests</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span>{villa.rating} Rating</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/booking"
                    state={{ villa }}
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white py-4 px-8 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  >
                    <Calendar className="h-5 w-5" />
                    <span>Book This Villa</span>
                  </Link>

                  <div className="mt-4 text-center text-sm text-gray-500">
                    Free cancellation up to 48 hours before check-in
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Villas Section */}
          <div className="mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Similar Villas</h2>
              <p className="text-gray-600">Discover other amazing properties you might love</p>
            </motion.div>

            <div className="relative">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${similarVillaIndex * 50}%)` }}
                >
                  {similarVillas.map((similarVilla) => (
                    <div key={similarVilla.id} className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                      >
                        <div className="relative overflow-hidden">
                          <img
                            src={similarVilla.image}
                            alt={similarVilla.name}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium text-gray-700">{similarVilla.rating}</span>
                          </div>
                        </div>

                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{similarVilla.name}</h3>
                          <div className="flex items-center space-x-1 text-gray-600 mb-4">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">{similarVilla.location}</span>
                          </div>
                          
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-sm text-gray-500">Starting from</span>
                            <span className="text-xl font-bold text-gray-900">${similarVilla.priceWithoutFood}/night</span>
                          </div>

                          <div className="flex space-x-3">
                            <Link
                              to={`/villa/${similarVilla.id}`}
                              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 text-sm"
                            >
                              <Eye className="h-4 w-4" />
                              <span>View</span>
                            </Link>
                            <Link
                              to="/booking"
                              state={{ villa: similarVilla }}
                              className="flex-1 bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 transform hover:scale-105 text-sm"
                            >
                              <Calendar className="h-4 w-4" />
                              <span>Book</span>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={prevSimilarVilla}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all duration-200"
              >
                <ChevronLeft className="h-6 w-6 text-gray-600" />
              </button>

              <button
                onClick={nextSimilarVilla}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all duration-200"
              >
                <ChevronRight className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VillaDetails;