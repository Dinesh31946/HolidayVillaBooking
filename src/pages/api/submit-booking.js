// src/pages/api/submit-booking.js (or wherever your API route is)

// ⭐ CRITICAL CHANGE: Import getWriteClient instead of client
import { getWriteClient } from '../../lib/sanityClient'; 

export default async function handler(req, res) {
  // Security check: Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed. Use POST.' });
  }
  
  // ⭐ NEW: Initialize the client for WRITING (this uses the token)
  let writeClient;
  try {
      writeClient = getWriteClient();
  } catch (error) {
      // Catch the error thrown if the token is missing on the server
      console.error(error.message);
      return res.status(500).json({ message: error.message });
  }

  const { 
    guestName, guestEmail, guestPhone, checkInDate, checkOutDate, 
    numberOfGuests, foodPreference, villaId, villaName 
  } = req.body;

  // Simple validation
  if (!guestName || !villaId || !checkInDate) {
    return res.status(400).json({ message: 'Missing required booking fields.' });
  }
  
  // 2. Construct the document...
  const bookingDoc = {
    // ... (Your booking document structure remains the same) ...
    _type: 'bookingRequest',
    guestName, guestEmail, guestPhone,
    checkInDate, checkOutDate,
    numberOfGuests, foodPreference,
    status: 'pending', 
    createdAt: new Date().toISOString(),
    villaReference: { _type: 'reference', _ref: villaId },
    villaNameSnapshot: villaName,
  };

  try {
    // 3. ⭐ Use the writeClient to save the document to Sanity
    const result = await writeClient.create(bookingDoc); 

    console.log('Successfully created Sanity document:', result._id);
    
    // 4. Send success response back to the client and RETURN
    return res.status(200).json({ 
        message: 'Booking request created successfully.', 
        bookingId: result._id 
    });
  } catch (error) {
    // 5. Handle any errors during the Sanity write process and RETURN
    console.error('Sanity Write Error:', error);
    return res.status(500).json({ 
        message: 'Failed to submit booking request. Check server logs for details.', 
        error: error.message 
    });
  }
}