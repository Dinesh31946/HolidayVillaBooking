// src/lib/sanityClient.ts

import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'; 
import { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// =====================================================================
// 1. READ CLIENT (Vite/Browser Safe)
//    - Uses import.meta.env for browser access (which Vite injects).
//    - This code executes immediately on import, ensuring 'client' is defined.
// =====================================================================

// NOTE: We assume VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET are always 
// available in the client bundle via Vite's process.
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET;

if (!projectId || !dataset) {
    // This check runs both during build and runtime.
    console.error("Sanity initialization error: VITE_SANITY_PROJECT_ID or VITE_SANITY_DATASET is missing.");
}

// ⭐ FIX: Initialize the Read-Only Client immediately. This makes the export safe.
export const client = createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    useCdn: true, // For fast public image and data fetching
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

// 3. WRITE CLIENT (Vercel Serverless Safe)
//    - This function uses process.env and is ONLY called by the API route.
// =====================================================================

export function getWriteClient() {
    // Vercel/Node.js environment variables (must be set on Vercel)
    const writeToken = process.env.SANITY_API_WRITE_TOKEN;
    const serverProjectId = process.env.VITE_SANITY_PROJECT_ID; 
    const serverDataset = process.env.VITE_SANITY_DATASET;

    if (!serverProjectId || !serverDataset || !writeToken) {
        // This error check is crucial for catching 500 errors in Vercel logs.
        throw new Error("Server Error: Sanity environment variables (Project ID, Dataset, or Write Token) not set for the serverless function.");
    }

    return createClient({
        projectId: serverProjectId,
        dataset: serverDataset,
        apiVersion: '2024-01-01',
        useCdn: false, // Use false for writing
        token: writeToken,
    });
}