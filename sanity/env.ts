function optionalValue(v: string | undefined): string {
  return (v ?? '').trim();
}

export const projectId = optionalValue(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
export const dataset = optionalValue(process.env.NEXT_PUBLIC_SANITY_DATASET) || 'production';
export const apiVersion =
  optionalValue(process.env.NEXT_PUBLIC_SANITY_API_VERSION) || '2026-03-01';

export const hasSanityConfig = Boolean(projectId && dataset);
