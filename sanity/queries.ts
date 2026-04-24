import { groq } from 'next-sanity';

export const settingsQuery = groq`*[_type == "settings"][0]{
  tagline, manifesto, location, email, social, now
}`;

export const altitudesQuery = groq`*[_type == "altitude"] | order(order asc){
  _id, level, title, subtitle, callsign, intro, stats,
  heroImage{..., "url": asset->url, "lqip": asset->metadata.lqip},
  "heroVideoUrl": heroVideo.asset->url
}`;

export const momentsQuery = groq`*[_type == "moment"] | order(order asc){
  _id, location, altitude,
  image{..., "url": asset->url, "lqip": asset->metadata.lqip, "alt": alt}
}`;

// Featured projects surface first, then everything else. No hard filter — every
// project you create in Sanity will show up in the home grid (capped at 6).
export const featuredProjectsQuery = groq`*[_type == "project"] | order(featured desc, order asc, year desc)[0...6]{
  _id, title, client, year, role, "slug": slug.current, summary, stack, url,
  cover{..., "url": asset->url, "lqip": asset->metadata.lqip, "alt": alt}
}`;

export const allProjectsQuery = groq`*[_type == "project"] | order(year desc, order asc){
  _id, title, client, year, role, "slug": slug.current, summary, stack, url,
  cover{..., "url": asset->url, "lqip": asset->metadata.lqip, "alt": alt}
}`;

// Same approach for releases — featured first, then everything, capped at 6.
export const featuredReleasesQuery = groq`*[_type == "release"] | order(featured desc, releaseDate desc)[0...6]{
  _id, title, artist, role, kind, releaseDate, listenUrl, signalChain,
  "slug": slug.current, notes,
  artwork{..., "url": asset->url, "lqip": asset->metadata.lqip, "alt": alt}
}`;

export const logbookQuery = groq`*[_type == "logbook"] | order(date desc)[0...12]{
  _id, date, route, aircraft, hours, conditions, notes,
  image{..., "url": asset->url, "lqip": asset->metadata.lqip, "alt": alt}
}`;
