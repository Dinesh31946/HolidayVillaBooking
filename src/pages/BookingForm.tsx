import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, Users, Mail, Phone, User, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const BookingForm = () => {
  const location = useLocation();
  const villa = location.state?.villa;
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '',
    foodPreference: 'without'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-md mx-4"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Submitted Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your booking request. We'll contact you within 24 hours to confirm your reservation.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-lg transition-all duration-200"
          >
            Make Another Booking
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Complete Your Booking
            </h1>
            {villa && (
              <p className="text-xl text-gray-600">
                Booking for <span className="font-semibold text-sky-500">{villa.name}</span>
              </p>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {villa && (
              <div className="bg-sky-50 p-6 border-b">
                <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                  <img
                    src={villa.image}
                    alt={villa.name}
                    className="w-full md:w-32 h-32 object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{villa.name}</h3>
                    <p className="text-gray-600">{villa.location}</p>
                    <div className="mt-2 flex space-x-4 text-sm">
                      <span className="text-gray-500">With Food: <span className="font-bold text-gray-900">${villa.priceWithFood}/night</span></span>
                      <span className="text-gray-500">Without Food: <span className="font-bold text-gray-900">${villa.priceWithoutFood}/night</span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline h-4 w-4 mr-1" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="inline h-4 w-4 mr-1" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="inline h-4 w-4 mr-1" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="inline h-4 w-4 mr-1" />
                    Number of Guests
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select guests</option>
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="6">6 Guests</option>
                    <option value="8">8+ Guests</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Food Preference
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                    <input
                      type="radio"
                      name="foodPreference"
                      value="with"
                      checked={formData.foodPreference === 'with'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-medium">With Food</div>
                      {villa && <div className="text-sm text-gray-500">${villa.priceWithFood}/night</div>}
                    </div>
                  </label>
                  <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                    <input
                      type="radio"
                      name="foodPreference"
                      value="without"
                      checked={formData.foodPreference === 'without'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-medium">Without Food</div>
                      {villa && <div className="text-sm text-gray-500">${villa.priceWithoutFood}/night</div>}
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-8 bg-sky-500 hover:bg-sky-600 text-white py-4 px-8 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Submit Booking Request
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingForm;