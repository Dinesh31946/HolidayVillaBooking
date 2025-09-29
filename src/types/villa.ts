// src/types/villa.ts

// Interface for the image object in Sanity's image array
export interface SanityImage {
    _type: 'image';
    asset: { _ref: string; _type: 'reference' };
    alt?: string;
}

// Interface for the minimal data needed for the Featured Villas Listing
export interface VillaListing {
    _id: string;
    name: string;
    slug: string; // Mapped from slug.current in the query
    tagline: string;
    location: string;
    priceWithFood: number;
    priceWithoutFood: number;
    image: string; // Mapped directly to the URL string
}

// Interface for the full data needed for the Villa Details page
export interface VillaDetails extends VillaListing {
    bedrooms: number;
    bathrooms: number;
    maxGuests: number;
    amenities: string[];
    gallery: SanityImage[]; // The full gallery array
    description: any; // Use 'any' for the Portable Text block array
}