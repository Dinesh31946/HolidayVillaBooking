// src/lib/sanityClient.ts

import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'; 
import { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'; // Correct type import
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// =====================================================================
// 1. READ CLIENT (Vite/Browser Safe)
//    - This logic executes immediately and is safe for all client pages.
// =====================================================================

// Uses import.meta.env for browser access (Vite requirement)
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET;

if (!projectId || !dataset) {
    console.error("Sanity initialization error: VITE_SANITY_PROJECT_ID or VITE_SANITY_DATASET is missing.");
}

// Initialize the Read-Only Client immediately.
export const client = createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    useCdn: true,
});

// Initialize the Image Builder immediately.
const builder: ImageUrlBuilder = imageUrlBuilder(client);

// =====================================================================
// 2. EXPORTS
// =====================================================================

// Export the image URL builder function
export function urlFor(source: SanityImageSource) {
    return builder.image(source);
}

// NOTE: The getWriteClient function has been removed from here 
// and moved to api/submit-booking.js to fix the build error.