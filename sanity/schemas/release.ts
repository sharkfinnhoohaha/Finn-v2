import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'release',
  title: 'Release (Studio)',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'artist', type: 'string' }),
    defineField({
      name: 'role',
      type: 'string',
      description: 'Produced, Mixed, Engineered, Written…',
    }),
    defineField({
      name: 'kind',
      type: 'string',
      options: {
        list: [
          { title: 'Single', value: 'single' },
          { title: 'EP', value: 'ep' },
          { title: 'Album', value: 'album' },
          { title: 'Sync / Score', value: 'sync' },
        ],
      },
    }),
    defineField({ name: 'releaseDate', type: 'date' }),
    defineField({
      name: 'artwork',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string' }],
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({ name: 'notes', type: 'text', rows: 3 }),
    defineField({ name: 'listenUrl', title: 'Listen URL (Spotify / Apple)', type: 'url' }),
    defineField({
      name: 'signalChain',
      title: 'Signal Chain Notes',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'e.g. "Manley Voxbox", "Distressor 4:1"',
    }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', type: 'number', initialValue: 0 }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'artist', media: 'artwork' },
  },
});
