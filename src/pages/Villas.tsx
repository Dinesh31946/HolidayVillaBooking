import React from 'react';
import VillaCard from '../components/villas/VillaCard';
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
  },
  {
    id: 5,
    name: 'Desert Oasis',
    image: 'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg',
    description: 'Modern villa with panoramic desert views and luxury amenities',
    priceWithFood: 520,
    priceWithoutFood: 350,
    location: 'Dubai, UAE'
  },
  {
    id: 6,
    name: 'Alpine Lodge',
    image: 'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg',
    description: 'Cozy mountain lodge with fireplace and scenic mountain vistas',
    priceWithFood: 380,
    priceWithoutFood: 240,
    location: 'Swiss Alps'
  },
  {
    id: 7,
    name: 'Coastal Sanctuary',
    image: 'https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg',
    description: 'Secluded coastal villa with private beach access',
    priceWithFood: 480,
    priceWithoutFood: 320,
    location: 'Costa Rica'
  },
  {
    id: 8,
    name: 'Urban Penthouse',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
    description: 'Luxury penthouse with city skyline views and rooftop terrace',
    priceWithFood: 600,
    priceWithoutFood: 450,
    location: 'New York, USA'
  },
  {
    id: 9,
    name: 'Garden Villa',
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
    description: 'Charming villa surrounded by botanical gardens and tranquil ponds',
    priceWithFood: 340,
    priceWithoutFood: 220,
    location: 'Kyoto, Japan'
  }
];

const Villas = () => {
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Villa Collection
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of luxury villas around the world
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {villas.map((villa, index) => (
            <VillaCard key={villa.id} villa={villa} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Villas;