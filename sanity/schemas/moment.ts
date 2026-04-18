import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'moment',
  title: 'Moment',
  type: 'document',
  description: 'Captioned image in the "Field Notes" horizontal scroll gallery on the home page.',
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string' }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location / Caption',
      type: 'string',
      description: 'e.g. "Ventura, 2025" or "Studio B, 2024"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'altitude',
      type: 'string',
      options: {
        list: [
          { title: 'Ground', value: 'ground' },
          { title: 'Studio', value: 'studio' },
          { title: 'Flight', value: 'flight' },
          { title: 'Off-duty', value: 'off' },
        ],
      },
    }),
    defineField({ name: 'order', type: 'number', initialValue: 0 }),
  ],
  preview: {
    select: { title: 'location', subtitle: 'altitude', media: 'image' },
  },
});
