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
    <article className="bg-bone px-5 pt-32 pb-24 md:px-8 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-[1400px]">
        <p className="spec mb-6 text-ink/50">Index · Colophon</p>
        <h1 className="font-display text-mega tracking-tightest">About.</h1>

        <div className="mt-16 grid gap-12 border-t border-ink/10 pt-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <p className="spec mb-4 text-ink/50">Who</p>
            <p className="font-sans text-lg leading-relaxed text-ink md:text-xl">
              Finn Bennett. Twenty-four. Based in Ventura, California. Founder of Overlook Strategy
              and Overlook Audio. Licensed commercial pilot, single-engine land, instrument rated.
              Student at Berklee Online.
            </p>
          </div>

          <div className="md:col-span-5 md:col-start-8">
            <p className="spec mb-4 text-ink/50">What</p>
            <p className="font-sans text-lg leading-relaxed text-ink/80 md:text-xl">
              {s.manifesto}
            </p>
          </div>

          <div className="md:col-span-5 md:col-start-1">
            <p className="spec mb-4 text-ink/50">Tools I trust</p>
            <ul className="font-mono text-sm text-ink/80">
              <li className="border-t border-ink/10 py-2.5">
                Next.js, TypeScript, Sanity, Three.js
              </li>
              <li className="border-t border-ink/10 py-2.5">
                Manley Voxbox, Distressor, Pultec
              </li>
              <li className="border-t border-ink/10 py-2.5">
                Logic Pro, Pro Tools, Ableton
              </li>
              <li className="border-y border-ink/10 py-2.5">
                Cessna 172, Piper PA-28, a good chart
              </li>
            </ul>
          </div>

          <div className="md:col-span-5 md:col-start-8">
            <p className="spec mb-4 text-ink/50">Currently studying</p>
            <ul className="font-mono text-sm text-ink/80">
              <li className="border-t border-ink/10 py-2.5">Berklee · Music Supervision 1</li>
              <li className="border-t border-ink/10 py-2.5">Berklee · Script Analysis</li>
              <li className="border-t border-ink/10 py-2.5">Berklee · Artist Management</li>
              <li className="border-y border-ink/10 py-2.5">ATP Written Prep</li>
            </ul>
          </div>

          <div className="md:col-span-12">
            <p className="spec mb-4 text-ink/50">Colophon</p>
            <p className="font-sans text-sm text-ink/65 md:text-base">
              Built with Next.js 14, Sanity, Framer Motion, and Lenis smooth scroll. Typography:
              JetBrains Mono (display, mono) and Inter (body). Hosted on Vercel.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
