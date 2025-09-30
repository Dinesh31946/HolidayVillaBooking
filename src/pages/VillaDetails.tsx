import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// FIX: Removed the extra closing brace here
import { PortableText, PortableTextComponents } from '@portabletext/react'; 
import { ChevronLeft, ChevronRight, Wifi, Car, Utensils, Waves, Calendar, Bed, Bath, Users, MapPin, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

import { client, urlFor } from '../../sanityClient'; 

// [GROQ Query and customComponents remain the same]
const VILLA_DETAILS_QUERY = `
  *[_type == "villa" && slug.current == $slug][0] {
    _id,
    name,
    location,
    tagline,
    gallery[] { 
      asset->,
      alt
    },
    priceWithFood,
    priceWithoutFood,
    bedrooms,
    bathrooms,
    maxGuests,
    amenities,
    description
  }
`;

const customComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4 text-gray-700 leading-relaxed text-base">{children}</p>,
    h2: ({ children }) => <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-5 border-b pb-3">{children}</h2>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside space-y-2 ml-6 mb-4 text-gray-700 text-base">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside space-y-2 ml-6 mb-4 text-gray-700 text-base">{children}</ol>,
  },
};

const amenityIcons = {
  'Private Pool': Waves,
  'Ocean View': Waves,
  'Wi-Fi': Wifi,
  'Parking': Car,
  'Kitchen': Utensils,
  'Air Conditioning': Wifi,
} as const;


const VillaDetails = () => {
  const { slug } = useParams() as { slug: string }; 
  const [villa, setVilla] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!slug) {
      setError("Villa slug is missing from the URL.");
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    setError(null);

    client.fetch(VILLA_DETAILS_QUERY, { slug })
      .then((data) => {
        if (!data) {
          setError(`No villa found with slug: ${slug}`);
        }
        setVilla(data);
        setCurrentImageIndex(0);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Sanity Fetch Error for Villa Details:", err);
        setError("Could not load villa details. Check your network or client configuration.");
        setIsLoading(false);
      });
  }, [slug]);

  const images = villa?.gallery || [];
  const nextImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  if (isLoading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl text-sky-600">Loading your luxury retreat...</p>
      </div>
    );
  }

  if (error || !villa) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-2xl font-bold text-red-600">{error || "Villa not found."}</p>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12"> 
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          
          {/* --- HEADER: Title & Location --- */}
          <header className="mb-6 lg:mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-2 leading-tight">
              {villa.name}
            </h1>
            <div className="flex items-center space-x-2 text-xl md:text-2xl font-semibold text-sky-600">
                <MapPin className="h-5 w-5 md:h-6 md:w-6"/>
                <span>{villa.location}</span>
            </div>
            <p className="mt-2 text-base md:text-lg italic text-gray-500">{villa.tagline}</p>
          </header>

          {/* --- Image Carousel --- */}
          <section className="mb-10 lg:mb-12">
            <div className="relative">
                <div className="relative h-64 sm:h-96 md:h-[400px] lg:h-[500px] rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl lg:shadow-2xl"> 
                    {images.length > 0 && (
                        <img
                          src={urlFor(images[currentImageIndex]).width(1200).height(800).url()}
                          alt={images[currentImageIndex].alt || villa.name}
                          className="w-full h-full object-cover transition duration-500 hover:scale-105"
                        />
                    )}
                    
                    {/* Navigation Buttons - Adjusted positioning and size for mobile */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/30 backdrop-blur-sm hover:bg-white/50 rounded-full p-2 transition-all duration-300"
                        >
                          <ChevronLeft className="h-5 w-5 text-white" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/30 backdrop-blur-sm hover:bg-white/50 rounded-full p-2 transition-all duration-300"
                        >
                          <ChevronRight className="h-5 w-5 text-white" />
                        </button>
                      </>
                    )}
                </div>
                
                {/* Thumbnails below the main image - Improved spacing and scrollability */}
                <div className="flex space-x-2 mt-4 overflow-x-auto justify-start lg:justify-center p-1">
                  {images.map((image: any, index: number) => (
                    <button
                      key={image._key || index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-14 sm:w-20 sm:h-16 lg:w-24 lg:h-20 rounded-lg lg:rounded-xl overflow-hidden border-2 shadow-sm transition-all duration-200 ${
                        index === currentImageIndex ? 'border-sky-500 ring-2 ring-sky-500' : 'border-gray-200'
                      }`}
                    >
                      <img 
                        src={urlFor(image).width(100).height(80).url()} 
                        alt={image.alt || ''} 
                        className="w-full h-full object-cover" 
                      />
                    </button>
                  ))}
                </div>
            </div>
          </section>

          {/* --- MAIN CONTENT LAYOUT --- */}
          <div className="lg:flex lg:space-x-12">
            
            {/* --- LEFT COLUMN: Description & Amenities (70%) --- */}
            <div className="lg:w-2/3">
              
              {/* --- DETAILS/STATS BAR (Prominent) --- */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6 bg-sky-50 rounded-xl shadow-inner mb-10 lg:mb-12 border border-sky-100">
                <div className="flex items-center space-x-2 text-gray-800">
                  <Bed className="h-6 w-6 text-sky-600 p-1 bg-white rounded-full shadow-sm" />
                  <div>
                    <span className="text-lg font-bold">{villa.bedrooms}</span>
                    <p className="text-xs text-gray-600">Bedrooms</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-gray-800">
                  <Bath className="h-6 w-6 text-sky-600 p-1 bg-white rounded-full shadow-sm" />
                  <div>
                    <span className="text-lg font-bold">{villa.bathrooms}</span>
                    <p className="text-xs text-gray-600">Bathrooms</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-gray-800">
                  <Users className="h-6 w-6 text-sky-600 p-1 bg-white rounded-full shadow-sm" />
                  <div>
                    <span className="text-lg font-bold">{villa.maxGuests}</span>
                    <p className="text-xs text-gray-600">Max Guests</p>
                  </div>
                </div>
              </div>
              
              {/* --- Full Description (Rich Text) --- */}
              <section className="bg-white rounded-xl p-6 lg:p-8 shadow-xl mb-10 lg:mb-12 border border-gray-100">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 lg:mb-5 border-b pb-3">Villa Overview</h2>
                  {villa.description && (
                      <PortableText 
                          value={villa.description} 
                          components={customComponents} 
                      />
                  )}
              </section>

              {/* --- Amenities List (More structured) --- */}
              <section className="bg-white rounded-xl p-6 lg:p-8 shadow-xl border border-gray-100">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5 lg:mb-6 border-b pb-3">Key Amenities</h2>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6 lg:gap-y-5 lg:gap-x-8">
                  {villa.amenities?.map((amenity: string, index: number) => {
                    const Icon = amenityIcons[amenity as keyof typeof amenityIcons] || Wifi;
                    return (
                      <div key={index} className="flex items-center space-x-2 text-gray-700">
                        <Icon className="h-5 w-5 text-sky-600 flex-shrink-0" />
                        <span className="text-sm font-medium">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </section>
              
            </div>
            
            {/* --- RIGHT COLUMN: Sticky Booking/Pricing Card (30%) --- */}
            <div className="lg:w-1/3 mt-8 lg:mt-0"> 
              <div className="sticky top-24 bg-white p-6 lg:p-8 rounded-2xl shadow-2xl border border-sky-200">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 border-b pb-3 flex items-center space-x-2">
                    <Tag className="h-5 w-5 md:h-6 md:w-6 text-sky-600"/>
                    <span>Pricing & Booking</span>
                </h3>
                
                {/* Pricing Display - Adjusted text sizes */}
                <div className="space-y-3 mb-6 lg:mb-8">
                  <div className="flex justify-between items-center p-3 bg-sky-50 rounded-lg">
                    <span className="text-base font-medium text-gray-700">Price (Without Food)</span>
                    <span className="text-2xl font-extrabold text-gray-900">${villa.priceWithoutFood}<span className="text-sm text-gray-500 font-normal">/night</span></span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-sky-100 rounded-lg border-2 border-sky-200">
                    <span className="text-base font-medium text-gray-800">Price (With Food)</span>
                    <span className="text-2xl font-extrabold text-sky-700">${villa.priceWithFood}<span className="text-sm text-sky-500 font-normal">/night</span></span>
                  </div>
                </div>

                {/* Booking Button - Adjusted padding */}
                <Link
                  to={`/booking/${slug}`} 
                  state={{ villa }}
                  className="w-full flex items-center justify-center space-x-3 bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 md:py-4 rounded-xl transition-colors duration-300 shadow-xl shadow-sky-300/50"
                >
                  <Calendar className="h-5 w-5 md:h-6 md:w-6" />
                  <span>Reserve Your Stay</span>
                </Link>
              </div>
            </div>
            
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VillaDetails;