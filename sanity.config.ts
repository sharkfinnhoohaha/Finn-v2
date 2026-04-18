"use client";

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';
import { apiVersion, dataset, projectId } from './sanity/env';

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Settings is a singleton — only one document ever exists
            S.listItem()
              .title('Site Settings')
              .id('settings')
              .child(
                S.document()
                  .schemaType('settings')
                  .documentId('siteSettings')
                  .title('Site Settings'),
              ),
            S.divider(),
            // All other document types get the default list view
            ...S.documentTypeListItems().filter(
              (item) => item.getId() !== 'settings',
            ),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
