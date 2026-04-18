import { sanityFetch } from '@/sanity/client';
import { settingsQuery } from '@/sanity/queries';
import { FALLBACK_SETTINGS } from '@/lib/fallback';
import type { Settings } from '@/lib/types';

async function getSettings(): Promise<Settings> {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return FALLBACK_SETTINGS;
    const data = await sanityFetch<Settings>({ query: settingsQuery });
    return data ?? FALLBACK_SETTINGS;
  } catch {
    return FALLBACK_SETTINGS;
  }
}

export default async function AboutPage() {
  const s = await getSettings();

  return (
    <article className="bg-bone px-5 pt-32 pb-24 md:px-10 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-[1800px]">
        <p className="spec mb-6 text-ink/30">Colophon</p>
        <h1 className="font-display text-giga font-semibold tracking-crushed" style={{ lineHeight: 0.9 }}>
          About<span className="text-signal">.</span>
        </h1>

        <div className="mt-16 grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <p className="spec mb-4 text-ink/30">Who</p>
            <p className="text-xl leading-relaxed text-ink md:text-2xl">
              Finn Bennett. Twenty-four. Based in Ventura, California. Founder of Overlook Strategy
              and Overlook Audio. Licensed commercial pilot, single-engine land, instrument rated.
              Student at Berklee Online.
            </p>
          </div>

          <div className="md:col-span-5 md:col-start-8">
            <p className="spec mb-4 text-ink/30">What</p>
            <p className="text-xl leading-relaxed text-ink/70 md:text-2xl">{s.manifesto}</p>
          </div>

          <div className="md:col-span-5 md:col-start-1">
            <p className="spec mb-4 text-ink/30">Tools I trust</p>
            <ul className="space-y-0 text-ink/70">
              <li className="border-b border-ink/8 py-3">Next.js, TypeScript, Sanity, Three.js</li>
              <li className="border-b border-ink/8 py-3">Manley Voxbox, Distressor, Pultec</li>
              <li className="border-b border-ink/8 py-3">Logic Pro, Pro Tools, Ableton</li>
              <li className="py-3">Cessna 172, Piper PA-28, a good chart</li>
            </ul>
          </div>

          <div className="md:col-span-5 md:col-start-8">
            <p className="spec mb-4 text-ink/30">Currently studying</p>
            <ul className="space-y-0 text-ink/70">
              <li className="border-b border-ink/8 py-3">Berklee · Music Supervision 1</li>
              <li className="border-b border-ink/8 py-3">Berklee · Script Analysis</li>
              <li className="border-b border-ink/8 py-3">Berklee · Artist Management</li>
              <li className="py-3">ATP Written Prep</li>
            </ul>
          </div>

          <div className="md:col-span-12">
            <p className="spec mb-4 text-ink/30">Colophon</p>
            <p className="text-base text-ink/60 leading-relaxed">
              Built with Next.js 14, Sanity, Framer Motion, and Lenis smooth scroll. Typography:
              Syne (display), DM Sans (body), Space Mono (specs). Hosted on Vercel.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
