function optionalValue(v: string | undefined): string {
  return (v ?? '').trim();
}

const linkedProjectId = '3dl9wh1l';
const fallbackProjectId = process.env.NODE_ENV === 'production' ? linkedProjectId : '';

export const projectId =
  optionalValue(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) || fallbackProjectId;
export const dataset = optionalValue(process.env.NEXT_PUBLIC_SANITY_DATASET) || 'production';
export const apiVersion =
  optionalValue(process.env.NEXT_PUBLIC_SANITY_API_VERSION) || '2026-03-01';

export const hasSanityConfig = Boolean(projectId && dataset);
