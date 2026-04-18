import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { apiVersion, dataset, hasSanityConfig, projectId } from './env';

// Only create a real client when projectId is present
export const client = hasSanityConfig
  ? createClient({ projectId, dataset, apiVersion, useCdn: true, perspective: 'published' })
  : null;

const builder = hasSanityConfig
  ? imageUrlBuilder({ projectId, dataset })
  : null;

export const urlFor = (source: SanityImageSource) =>
  builder ? builder.image(source) : null;

export const SANITY_TAG = 'sanity';

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [SANITY_TAG],
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
}): Promise<T | null> {
  if (!client) return null;
  return client.fetch<T>(query, params, {
    next: { tags, revalidate: 60 },
  });
}
