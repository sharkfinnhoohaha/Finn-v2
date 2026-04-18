import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'logbook',
  title: 'Logbook Entry (Flight)',
  type: 'document',
  fields: [
    defineField({ name: 'date', type: 'date', validation: (r) => r.required() }),
    defineField({ name: 'route', type: 'string', description: 'e.g. "KOXR → KSBA → KOXR"' }),
    defineField({ name: 'aircraft', type: 'string', description: 'e.g. "C172 / N12345"' }),
    defineField({
      name: 'hours',
      type: 'number',
      description: 'Logged hours for this flight',
    }),
    defineField({ name: 'notes', type: 'text', rows: 3 }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string' }],
    }),
    defineField({
      name: 'conditions',
      type: 'string',
      options: {
        list: ['VFR', 'IFR', 'MVFR', 'Night'],
      },
    }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'route', subtitle: 'date', media: 'image' },
  },
  orderings: [
    {
      title: 'Date, newest first',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
});
