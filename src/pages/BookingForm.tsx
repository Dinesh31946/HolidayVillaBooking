import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, Users, Mail, Phone, User, Check, Utensils } from 'lucide-react'; // Added Utensils
import { motion } from 'framer-motion';

// 1. ⭐ ADD SANITY CLIENT IMPORT
import { urlFor } from '../../sanityClient'; 

const BookingForm = () => {
  const location = useLocation();
  const villa = location.state?.villa;
  const [isSubmitted, setIsSubmitted] = useState(false);
  // ⭐ NEW STATE: To disable the button while submitting
  const [isSubmitting, setIsSubmitting] = useState(false); 
  // ⭐ NEW STATE: To show error messages
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '',
    foodPreference: 'without'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ⭐ CRITICAL CHANGE: Making handleSubmit async and adding fetch logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!villa) {
        setSubmissionError("Error: Villa data is missing. Please return to the details page.");
        return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    const bookingPayload = {
      // Data matching the Sanity schema fields
      guestName: formData.name,
      guestEmail: formData.email,
      guestPhone: formData.phone,
      checkInDate: formData.checkIn,
      checkOutDate: formData.checkOut,
      numberOfGuests: parseInt(formData.guests), // Convert to number
      foodPreference: formData.foodPreference,
      
      // Data needed for Sanity reference
      villaId: villa._id, 
      villaName: villa.name,
    };

    try {
      // Step 1: Send data to your API endpoint
      const response = await fetch('/api/submit-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload),
      });

      // Step 2: Check if the API call was successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Server error during booking submission.');
      }

      // Step 3: Success
      setIsSubmitted(true);
      setFormData({ // Optional: clear form data on success
        name: '', email: '', phone: '', checkIn: '', checkOut: '', guests: '', foodPreference: 'without'
      });
    } catch (error: any) {
      console.error("Booking Submission Error:", error);
      setSubmissionError(error.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Submission Success View ---
  if (isSubmitted) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-md mx-4 border-t-4 border-sky-500"
        >
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Reservation Sent!</h2>
          <p className="text-gray-600 mb-8">
            Thank you for requesting to book <span className="font-semibold text-sky-600">{villa?.name || 'the villa'}</span>. A specialist will contact you within 24 hours to finalize details and payment.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg"
          >
            Start a New Booking
          </button>
        </motion.div>
      </div>
    );
  }

  // --- Main Form View ---
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
              Confirm Your Stay
            </h1>
            {villa && (
              <p className="text-xl text-gray-600">
                Booking for <span className="font-bold text-sky-600">{villa.name}</span> in {villa.location}
              </p>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            
            {/* Villa Summary Banner */}
            {villa ? (
              <div className="bg-sky-50 p-6 border-b border-sky-100">
                <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                  
                  {/* 2. ⭐ FIXED IMAGE SOURCE LOGIC */}
                  <img
                    src={
                      villa.gallery && villa.gallery.length > 0
                        ? urlFor(villa.gallery[0]).width(128).height(128).url()
                        : 'https://via.placeholder.com/128x128.png?text=Villa+Image'
                    }
                    alt={villa.name}
                    className="w-full md:w-32 h-32 object-cover rounded-xl shadow-md flex-shrink-0"
                  />
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900">{villa.name}</h3>
                    <p className="text-gray-600 mb-2">{villa.location}</p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                      <div className="text-gray-500 flex items-center">
                        <span className="font-medium">Guests: </span>
                        <span className="font-bold text-gray-900 ml-1">{villa.maxGuests}+</span>
                      </div>
                      <div className="text-gray-500 flex items-center">
                        <span className="font-medium">Beds: </span>
                        <span className="font-bold text-gray-900 ml-1">{villa.bedrooms}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Handle case where villa data is missing (direct access to /booking)
              <div className="bg-red-50 p-4 text-center text-red-700 font-semibold">
                ⚠️ Villa details are missing. Please book from the Villa Details page.
              </div>
            )}

            {/* --- BOOKING FORM --- */}
            <form onSubmit={handleSubmit} className="p-8 lg:p-10">
              {/* ⭐ Display error message if submissionError is set */}
                {submissionError && (
                    <div className="p-4 mb-4 bg-red-100 text-red-700 border border-red-300 rounded-lg font-medium">
                        Error: {submissionError}
                    </div>
                )}
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3">Guest Information</h2>
              
              {/* Personal Details Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <User className="h-4 w-4 mr-2 text-sky-500" /> Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-sky-500 focus:border-sky-500 transition-shadow duration-200 shadow-sm"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-sky-500" /> Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-sky-500 focus:border-sky-500 transition-shadow duration-200 shadow-sm"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-sky-500" /> Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-sky-500 focus:border-sky-500 transition-shadow duration-200 shadow-sm"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3 mt-10">Reservation Details</h2>

              {/* Date and Guests Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-sky-500" /> Check-in Date
                  </label>
                  <input
                    type="date"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleInputChange}
                    required
                    // Added appearance-none to prevent default iOS/Chrome date picker styling from breaking padding
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-sky-500 focus:border-sky-500 transition-shadow duration-200 shadow-sm appearance-none" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-sky-500" /> Check-out Date
                  </label>
                  <input
                    type="date"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-sky-500 focus:border-sky-500 transition-shadow duration-200 shadow-sm appearance-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Users className="h-4 w-4 mr-2 text-sky-500" /> Number of Guests
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-sky-500 focus:border-sky-500 transition-shadow duration-200 shadow-sm"
                  >
                    <option value="">Select guests</option>
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="4">3-4 Guests</option>
                    <option value="6">5-6 Guests</option>
                    <option value="8">7+ Guests</option>
                  </select>
                </div>
              </div>

              {/* Food Preference (Radio Buttons) */}
              <div className="mt-8">
                <label className=" text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <Utensils className="h-5 w-5 mr-2 text-sky-500" /> Choose Your Catering
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Option: With Food */}
                  <label 
                    className={`flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      formData.foodPreference === 'with' ? 'border-sky-500 bg-sky-50 shadow-md' : 'border-gray-200 hover:border-sky-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="foodPreference"
                      value="with"
                      checked={formData.foodPreference === 'with'}
                      onChange={handleInputChange}
                      className="mt-1 mr-3 h-5 w-5 text-sky-600 border-gray-300 focus:ring-sky-500"
                    />
                    <div>
                      <div className="font-semibold text-gray-900 text-lg">Catered Service</div>
                      {villa && <div className="text-base text-gray-600">Price: <span className="font-bold text-sky-600">${villa.priceWithFood}/night</span></div>}
                      <p className="text-sm text-gray-500 mt-1">Includes daily breakfast and dinner prepared by a private chef.</p>
                    </div>
                  </label>

                  {/* Option: Without Food */}
                  <label 
                    className={`flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      formData.foodPreference === 'without' ? 'border-sky-500 bg-sky-50 shadow-md' : 'border-gray-200 hover:border-sky-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="foodPreference"
                      value="without"
                      checked={formData.foodPreference === 'without'}
                      onChange={handleInputChange}
                      className="mt-1 mr-3 h-5 w-5 text-sky-600 border-gray-300 focus:ring-sky-500"
                    />
                    <div>
                      <div className="font-semibold text-gray-900 text-lg">Self-Catering</div>
                      {villa && <div className="text-base text-gray-600">Price: <span className="font-bold text-gray-900">${villa.priceWithoutFood}/night</span></div>}
                      <p className="text-sm text-gray-500 mt-1">Full access to the kitchen. No scheduled catering services.</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                  type="submit"
                  disabled={isSubmitting || !villa} 
                  className={`w-full mt-10 text-white py-4 px-8 rounded-xl font-bold transition-all duration-300 shadow-xl ${
                      isSubmitting 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-sky-600 hover:bg-sky-700 transform hover:scale-[1.01] shadow-sky-300/50'
                  }`}
              >
                  {isSubmitting ? 'Submitting Request...' : 'Submit Booking Request'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingForm;