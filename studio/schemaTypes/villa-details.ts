// studio/schemaTypes/villa.ts

import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'villa',
  title: 'Villa Details',
  type: 'document',
  fields: [
    // --- BASIC IDENTIFIERS (MANDATORY) ---
    defineField({
      name: 'name',
      title: '1. Villa Name (Used for Title/H1)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: '2. URL Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      description: 'The URL-friendly path (e.g., ocean-breeze-villa)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: '3. Location (e.g., Santorini, Greece)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    // --- NEW FIELD FOR CARD COMPONENT ---
    defineField({
      name: 'tagline',
      title: '4. Listing Card Tagline', // New Field
      type: 'string',
      description: 'Short, punchy text for the villa listing card (max 60 characters).',
      validation: (Rule) => Rule.required().max(60).warning('Tagline should be brief!'),
    }),
    // ------------------------------------

    // --- IMAGES (MAPPED TO villa.images) ---
    defineField({
      name: 'gallery',
      title: '5. Image Gallery', // Number updated from 4 to 5
      type: 'array',
      of: [
        { 
          type: 'image', 
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string', title: 'Alternative Text' }]
        }
      ],
      description: 'Upload all images used for the main carousel and thumbnails.',
      validation: (Rule) => Rule.min(1).error('You must include at least one image.'),
    }),

    // --- PRICING (MAPPED TO priceWithFood, priceWithoutFood) ---
    defineField({
      name: 'priceWithFood',
      title: '6. Price Per Night (With Food)', // Number updated from 5 to 6
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'priceWithoutFood',
      title: '7. Price Per Night (Without Food)', // Number updated from 6 to 7
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),

    // --- VILLA STATS (MAPPED TO bedrooms, bathrooms, maxGuests) ---
    defineField({
      name: 'bedrooms',
      title: '8. Bedrooms', // Number updated from 7 to 8
      type: 'number',
      initialValue: 1,
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'bathrooms',
      title: '9. Bathrooms', // Number updated from 8 to 9
      type: 'number',
      initialValue: 1,
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'maxGuests',
      title: '10. Max Guests', // Number updated from 9 to 10
      type: 'number',
      initialValue: 2,
      validation: (Rule) => Rule.required().min(1),
    }),

    // --- AMENITIES (MAPPED TO villa.amenities) ---
    defineField({
      name: 'amenities',
      title: '11. Key Amenities', // Number updated from 10 to 11
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags', 
      },
      description: 'Enter each amenity exactly as it appears in your code (e.g., "Private Pool", "Wi-Fi").',
      validation: (Rule) => Rule.min(1).error('Must list at least one amenity.'),
    }),

    // --- DESCRIPTION (MAPPED TO villa.description) ---
    defineField({
      name: 'description',
      title: '12. Full Description', // Number updated from 11 to 12
      type: 'array',
      of: [{ type: 'block' }], // Allows rich text editing (bold, lists, paragraphs)
      description: 'The detailed description of the villa.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'location',
      media: 'gallery.0',
    },
    prepare({ title, subtitle, media }) {
        return {
            title: title || 'Untitled Villa',
            subtitle: subtitle ? `Location: ${subtitle}` : 'No Location Set',
            media: media,
        };
    },
  },
});