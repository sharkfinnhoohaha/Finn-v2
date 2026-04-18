export type ImageField = {
  url?: string;
  lqip?: string;
  alt?: string;
};

export type Altitude = {
  _id: string;
  level: 'ground' | 'studio' | 'flight';
  title: string;
  subtitle?: string;
  callsign?: string;
  intro?: string;
  heroImage?: ImageField;
  heroVideoUrl?: string;
  stats?: Array<{ label: string; value: string }>;
};

export type Moment = {
  _id: string;
  location: string;
  altitude?: 'ground' | 'studio' | 'flight' | 'off';
  image: ImageField;
};

export type Project = {
  _id: string;
  title: string;
  client?: string;
  year?: number;
  role?: string;
  slug: string;
  summary?: string;
  stack?: string[];
  url?: string;
  cover?: ImageField;
};

export type Release = {
  _id: string;
  title: string;
  artist?: string;
  role?: string;
  kind?: string;
  releaseDate?: string;
  listenUrl?: string;
  signalChain?: string[];
  slug?: string;
  notes?: string;
  artwork?: ImageField;
};

export type LogbookEntry = {
  _id: string;
  date: string;
  route?: string;
  aircraft?: string;
  hours?: number;
  conditions?: string;
  notes?: string;
  image?: ImageField;
};

export type Settings = {
  tagline?: string;
  manifesto?: string;
  location?: string;
  email?: string;
  social?: Array<{ label: string; url: string }>;
  now?: string[];
};
