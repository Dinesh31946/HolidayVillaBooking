// api/submit-booking.js

// 1. Import necessary packages directly (avoiding the problematic '../src/lib' path)
import { createClient } from '@sanity/client';

// Define the function inside the API route handler context
function getWriteClient() {
    // Vercel/Node.js environment variables (must be set on Vercel)
    // NOTE: The access pattern uses process.env which is correct for Vercel.
    const writeToken = process.env.SANITY_API_WRITE_TOKEN;
    const serverProjectId = process.env.SANITY_PROJECT_ID; 
    const serverDataset = process.env.SANITY_DATASET;

    if (!serverProjectId || !serverDataset || !writeToken) {
        // Crucial error message for Vercel logs if variables are missing
        throw new Error("Server Error: Sanity environment variables (Project ID, Dataset, or Write Token) not set in Vercel. Check Vercel settings.");
    }

    return createClient({
        projectId: serverProjectId,
        dataset: serverDataset,
        apiVersion: '2024-01-01',
        useCdn: false, // Use false for writing
        token: writeToken,
    });
}


export default async function handler(req, res) {
  // Security check: Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed. Use POST.' });
  }
  
  // Initialize the client for WRITING (this uses the token)
  let writeClient;
  try {
      // Call the self-contained function
      writeClient = getWriteClient();
  } catch (error) {
      // Catch the error thrown if the token is missing/invalid
      console.error('Client Init Error:', error.message);
      return res.status(500).json({ 
          message: error.message || 'Server error during client initialization.',
      });
  }

  // Get the data from the request body
  const { 
    guestName, guestEmail, guestPhone, checkInDate, checkOutDate, 
    numberOfGuests, foodPreference, villaId, villaName 
  } = req.body;

  // Simple validation
  if (!guestName || !villaId || !checkInDate) {
    return res.status(400).json({ message: 'Missing required booking fields.' });
  }
  
  // Construct the document
  const bookingDoc = {
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
    // Use the writeClient to save the document to Sanity
    const result = await writeClient.create(bookingDoc); 

    console.log('Successfully created Sanity document:', result._id);
    
    // Send success response back to the client
    return res.status(200).json({ 
        message: 'Booking request created successfully.', 
        bookingId: result._id 
    });
  } catch (error) {
    // Handle any errors during the Sanity write process
    console.error('Sanity Write Error:', error);
    return res.status(500).json({ 
        message: 'Failed to submit booking request. Check server logs for details.', 
        error: error.message 
    });
  }
}