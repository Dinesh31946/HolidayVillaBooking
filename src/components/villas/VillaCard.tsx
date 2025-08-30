import React from 'react';
import { Eye, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Villa {
  id: number;
  name: string;
  image: string;
  description: string;
  priceWithFood: number;
  priceWithoutFood: number;
  location: string;
}

interface VillaCardProps {
  villa: Villa;
  index: number;
}

const VillaCard: React.FC<VillaCardProps> = ({ villa, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
    >
      <div className="relative overflow-hidden">
        <img
          src={villa.image}
          alt={villa.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
          <MapPin className="h-3 w-3 text-gray-600" />
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
  );
};

export default VillaCard;