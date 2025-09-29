import { ChevronLeft, ChevronRight, Eye, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// 1. Import BOTH client AND urlFor
import { client, urlFor } from '../../lib/sanityClient';

// Define the GROQ Query to fetch listing data
const FEATURED_VILLAS_QUERY = `
  *[_type == "villa"] | order(_createdAt desc) [0..2] {
    _id,
    name,
    "slug": slug.current,
    tagline, 
    location,
    priceWithFood,
    priceWithoutFood,
    
    // Fetch the entire first image object
    "mainImage": gallery[0], 
  }
`;



const FeaturedVillas = () => {
  // Use a proper type if you defined VillaListing, or leave as any[]
  const [villas, setVillas] = useState<any[]>([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const villasToShow = 3; // Number of cards visible at once

  // 2. Data Fetching Effect
  useEffect(() => {
    client.fetch(FEATURED_VILLAS_QUERY)
      .then((data) => {
        setVillas(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Sanity Fetch Error:", error);
        setIsLoading(false);
      });
  }, []); 

  // Carousel Logic updates
  const canSlide = villas.length > villasToShow;
  const slideLimit = villas.length - villasToShow + 1;

  const nextSlide = () => {
    if (canSlide) {
      setCurrentIndex((prev) => (prev + 1) % slideLimit);
    }
  };

  const prevSlide = () => {
    if (canSlide) {
      setCurrentIndex((prev) => (prev - 1 + slideLimit) % slideLimit);
    }
  };

  // 3. Loading and Empty State Handling
  if (isLoading) {
    return (
      <section className="py-20 bg-white text-center">
        <h2 className="text-2xl font-semibold text-sky-600">Loading Featured Villas...</h2>
      </section>
    );
  }
  
  if (villas.length === 0) {
      return (
        <section className="py-20 bg-white text-center">
            <h2 className="text-2xl font-semibold text-gray-500">No Featured Villas Available.</h2>
        </section>
      );
  }

  // 4. Render Dynamic Content
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* ⭐️ MODIFIED HEADING START ⭐️ */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Villas
          </h2>
          {/* ⭐️ MODIFIED HEADING END ⭐️ */}
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / villasToShow)}%)` }}
            >
              {villas.map((villa) => (
                <div key={villa._id} className="w-full md:w-1/3 flex-shrink-0 px-4"> 
                  <motion.div
                    // ... (motion properties) ...
                    className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={villa.mainImage ? urlFor(villa.mainImage).width(800).height(450).url() : 'placeholder-url.jpg'} 
                        alt={villa.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-sm font-medium text-gray-700">{villa.location}</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{villa.name}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{villa.tagline}</p>
                      
                      {/* ... (Pricing and Buttons remain the same) ... */}
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
                          to={`/villa/${villa.slug}`}
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

          {/* Conditional rendering for navigation buttons */}
          {canSlide && (
            <>
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
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedVillas;