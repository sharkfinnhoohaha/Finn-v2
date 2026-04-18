import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'altitude',
  title: 'Altitude',
  type: 'document',
  fields: [
    defineField({
      name: 'level',
      title: 'Level',
      type: 'string',
      options: {
        list: [
          { title: 'Ground — Overlook Strategy', value: 'ground' },
          { title: 'Studio — Overlook Audio', value: 'studio' },
          { title: 'Flight — Aviation', value: 'flight' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'subtitle', type: 'string' }),
    defineField({
      name: 'callsign',
      title: 'Callsign / Spec Label',
      type: 'string',
      description: 'Small mono label e.g. "N-01 / 34.2749°N"',
    }),
    defineField({ name: 'intro', title: 'Intro Paragraph', type: 'text', rows: 4 }),
    defineField({
      name: 'heroImage',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string' }],
    }),
    defineField({
      name: 'heroVideo',
      title: 'Hero Video (optional, overrides image)',
      type: 'file',
      options: { accept: 'video/*' },
    }),
    defineField({
      name: 'stats',
      title: 'Spec Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string' },
            { name: 'value', type: 'string' },
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
          },
        },
      ],
    }),
    defineField({ name: 'order', type: 'number', hidden: true, initialValue: 0 }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'level', media: 'heroImage' },
  },
});
