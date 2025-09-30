// src/lib/sanityClient.ts

import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// 1. Load credentials from environment variables (Correct for Vite)
const projectId = process.env.VITE_SANITY_PROJECT_ID;
const dataset = process.env.VITE_SANITY_DATASET;

// Basic check for mandatory environment variables
if (!projectId || !dataset) {
  throw new Error("Sanity client failed to initialize: VITE_SANITY_PROJECT_ID or VITE_SANITY_DATASET is missing.");
}

// ⭐ CRITICAL FIX: Export a basic client for READ operations (for the front-end)
export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: true, // For fast public image and data fetching
  // REMOVED: token: process.env.SANITY_API_WRITE_TOKEN, 
   // The token should ONLY be injected into the server-side logic.
});

// 3. Export the Image URL Builder for displaying images
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// ⭐ NEW EXPORT: Create a function to get the WRITE client (used ONLY by the API route)
// This prevents the token from being loaded on the client-side.
export function getWriteClient() {
    // This function will only be called from the server (Node.js/Next.js/Serverless), 
    // where 'process.env' is defined.
    const writeToken = process.env.SANITY_API_WRITE_TOKEN; 
    if (!writeToken) {
        throw new Error("Server Error: SANITY_API_WRITE_TOKEN environment variable not set.");
    }

    return createClient({
        projectId,
        dataset,
        apiVersion: '2024-01-01',
        useCdn: false, // Use false for writing
        token: writeToken,
    });
}