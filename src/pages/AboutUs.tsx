import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              About Seven Heaven Stays
            </h1>
            
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Welcome to Seven Heaven Stays, where luxury meets comfort and dreams become reality. 
                Founded in 2018, we have been curating exceptional villa experiences for discerning 
                travelers worldwide.
              </p>
              
              <p>
                Our mission is simple: to provide unparalleled accommodation experiences that create 
                lasting memories. Each villa in our collection is carefully selected and inspected 
                to ensure it meets our high standards of luxury, comfort, and service excellence.
              </p>
              
              <p>
                From breathtaking oceanfront properties to secluded mountain retreats, our diverse 
                portfolio spans across 25 countries and offers something special for every type of 
                traveler. Whether you're planning a romantic getaway, family vacation, or group 
                celebration, we have the perfect villa waiting for you.
              </p>
              
              <p>
                Our dedicated team works around the clock to ensure your stay is nothing short of 
                perfect. From the moment you book until your departure, we're here to make your 
                villa experience truly heavenly.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-sky-500">15,000+</div>
                <div className="text-sm text-gray-600">Happy Guests</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-sky-500">150+</div>
                <div className="text-sm text-gray-600">Luxury Villas</div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <img
              src="https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg"
              alt="Luxury Villa"
              className="w-full h-96 object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;