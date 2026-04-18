import type {
  Altitude,
  LogbookEntry,
  Moment,
  Project,
  Release,
  Settings,
} from './types';

// these are used when Sanity env vars aren't set, so the site runs locally
// and deploys to Vercel out of the box. real content flows through Sanity.

export const FALLBACK_SETTINGS: Settings = {
  tagline: 'Builds at altitude.',
  manifesto:
    'I run two studios and fly airplanes. Overlook Strategy builds brands and the web presences that carry them. Overlook Audio writes, produces, and engineers records. The cockpit is where I think about everything else.',
  location: 'Ventura, California',
  email: 'finn@overlook.studio',
  social: [
    { label: 'Instagram', url: 'https://instagram.com' },
    { label: 'SoundCloud', url: 'https://soundcloud.com' },
    { label: 'GitHub', url: 'https://github.com' },
  ],
  now: [
    'Finishing Berklee Music Supervision 1',
    'Mixing alt-pop record / Manley Voxbox → Distressor chain',
    'Current study: ATP written',
    'Building the Overlook Strategy white-label platform',
  ],
};

export const FALLBACK_ALTITUDES: Altitude[] = [
  {
    _id: 'alt-flight',
    level: 'flight',
    title: 'Flight',
    subtitle: 'Commercial Pilot',
    callsign: 'ALT-03 / FL450',
    intro:
      'Licensed commercial pilot. Single-engine land, instrument rated, logging hours toward the ATP. Most of what I know about staying calm under pressure, I learned in a cockpit.',
    heroImage: { url: '/images/placeholder-flight.svg', alt: 'Cockpit view above clouds' },
    stats: [
      { label: 'Rating', value: 'COMM · IFR · SEL' },
      { label: 'Hours', value: '400+' },
      { label: 'Based', value: 'KOXR' },
    ],
  },
  {
    _id: 'alt-studio',
    level: 'studio',
    title: 'Studio',
    subtitle: 'Overlook Audio',
    callsign: 'ALT-02 / +12dB',
    intro:
      'Producing and engineering records in the alt-pop and indie space. Multi-instrumentalist background (drums, guitar, bass, keys) and a deep reverence for analog signal chains. Currently studying Music Supervision and Artist Management at Berklee Online.',
    heroImage: { url: '/images/placeholder-studio.svg', alt: 'Studio console close up' },
    stats: [
      { label: 'Preamp', value: 'Manley Voxbox' },
      { label: 'Comp', value: 'Distressor' },
      { label: 'Focus', value: 'Alt-pop · Indie' },
    ],
  },
  {
    _id: 'alt-ground',
    level: 'ground',
    title: 'Ground',
    subtitle: 'Overlook Strategy',
    callsign: 'ALT-01 / 34.2749°N',
    intro:
      'Branding and web development studio for clients who want the full picture. Clients include Rustler Yachts and Sømliøya. Next.js, Sanity, Three.js, and a lot of opinions about typography.',
    heroImage: { url: '/images/placeholder-ground.svg', alt: 'Desk with laptop and notebook' },
    stats: [
      { label: 'Stack', value: 'Next · Sanity · R3F' },
      { label: 'Clients', value: 'Rustler · Sømliøya' },
      { label: 'Est.', value: '2023' },
    ],
  },
];

export const FALLBACK_MOMENTS: Moment[] = [
  { _id: '1', location: 'Ventura, 2025', altitude: 'off', image: { url: '/images/placeholder-moment-1.svg', alt: 'Ventura coast' } },
  { _id: '2', location: 'Studio B, 2024', altitude: 'studio', image: { url: '/images/placeholder-moment-2.svg', alt: 'Studio session' } },
  { _id: '3', location: 'KOXR, 2024', altitude: 'flight', image: { url: '/images/placeholder-moment-3.svg', alt: 'Airfield' } },
  { _id: '4', location: 'Rustler HQ, 2024', altitude: 'ground', image: { url: '/images/placeholder-moment-4.svg', alt: 'Client work' } },
  { _id: '5', location: 'Sømliøya, 2024', altitude: 'ground', image: { url: '/images/placeholder-moment-5.svg', alt: 'Island project' } },
  { _id: '6', location: 'Sierra Nevada, 2025', altitude: 'flight', image: { url: '/images/placeholder-moment-6.svg', alt: 'Mountain overflight' } },
  { _id: '7', location: 'Berklee, 2025', altitude: 'studio', image: { url: '/images/placeholder-moment-7.svg', alt: 'Berklee coursework' } },
];

export const FALLBACK_PROJECTS: Project[] = [
  {
    _id: 'p1',
    title: 'Rustler Yachts',
    client: 'Rustler Yachts',
    year: 2024,
    role: 'Design · Development',
    slug: 'rustler-yachts',
    summary: 'Complete brand and web redesign with a Three.js 3D yacht viewer on Next.js 14.',
    stack: ['Next.js', 'React Three Fiber', 'Sanity', 'TypeScript'],
    cover: { url: '/images/placeholder-project-1.svg', alt: 'Rustler Yachts site' },
  },
  {
    _id: 'p2',
    title: 'Sømliøya',
    client: 'Sømliøya',
    year: 2024,
    role: 'Brand · Full Stack',
    slug: 'somlioya',
    summary: 'Nordic editorial rental site with photorealistic 3D island map and aviation HUD overlay.',
    stack: ['Next.js', 'Google Photorealistic 3D Tiles', 'R3F', 'TinaCMS'],
    cover: { url: '/images/placeholder-project-2.svg', alt: 'Sømliøya site' },
  },
  {
    _id: 'p3',
    title: 'Three Altitudes',
    client: 'Self',
    year: 2024,
    role: 'Design · Development',
    slug: 'three-altitudes',
    summary: 'Personal portfolio exploring the altitude metaphor through five schema-driven sections.',
    stack: ['Next.js App Router', 'Sanity v5', 'Framer Motion'],
    cover: { url: '/images/placeholder-project-3.svg', alt: 'Three Altitudes' },
  },
];

export const FALLBACK_RELEASES: Release[] = [
  {
    _id: 'r1',
    title: 'Lower Frequencies',
    artist: 'TBD',
    role: 'Produced · Mixed',
    kind: 'ep',
    releaseDate: '2025-03-01',
    notes: 'Six-track EP. Recorded at home, mixed on analog summing.',
    signalChain: ['Manley Voxbox', 'Distressor 4:1', 'Pultec EQP-1A'],
    slug: 'lower-frequencies',
    artwork: { url: '/images/placeholder-release-1.svg', alt: 'EP artwork' },
  },
  {
    _id: 'r2',
    title: 'Coastal',
    artist: 'TBD',
    role: 'Written · Produced',
    kind: 'single',
    releaseDate: '2024-09-12',
    notes: 'Single cut from a longer session. Drums, guitars, and bass all tracked live.',
    signalChain: ['Neumann U87', 'API 512c', '1176 Rev A'],
    slug: 'coastal',
    artwork: { url: '/images/placeholder-release-2.svg', alt: 'Single artwork' },
  },
  {
    _id: 'r3',
    title: 'Alchemy (Score)',
    artist: 'TV Movie',
    role: 'Score · Supervision',
    kind: 'sync',
    releaseDate: '2025-06-01',
    notes: 'Supervision and original cues for the TV movie Alchemy (Berklee capstone).',
    signalChain: ['Kontakt', 'Spitfire', 'Valhalla VintageVerb'],
    slug: 'alchemy-score',
    artwork: { url: '/images/placeholder-release-3.svg', alt: 'Score artwork' },
  },
];

export const FALLBACK_LOGBOOK: LogbookEntry[] = [
  {
    _id: 'l1',
    date: '2025-03-22',
    route: 'KOXR → KSBA → KOXR',
    aircraft: 'C172 / N12345',
    hours: 1.8,
    conditions: 'VFR',
    notes: 'Clear day. Practice approaches at SBA.',
    image: { url: '/images/placeholder-log-1.svg', alt: 'Flight' },
  },
  {
    _id: 'l2',
    date: '2025-02-14',
    route: 'KOXR → KMMH',
    aircraft: 'PA-28 / N54321',
    hours: 2.4,
    conditions: 'IFR',
    notes: 'Mammoth run through the Sierra. Light chop over the pass.',
    image: { url: '/images/placeholder-log-2.svg', alt: 'Sierra crossing' },
  },
  {
    _id: 'l3',
    date: '2025-01-08',
    route: 'KOXR → KCMA → KOXR',
    aircraft: 'C172',
    hours: 1.2,
    conditions: 'Night',
    notes: 'Currency night hops. Full moon over the channel.',
    image: { url: '/images/placeholder-log-3.svg', alt: 'Night flight' },
  },
];
