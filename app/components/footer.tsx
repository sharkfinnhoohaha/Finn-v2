import Link from 'next/link';
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

export async function Footer() {
  const s = await getSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-bone">
      {/* giant final mark */}
      <section className="relative border-b border-bone/10 px-5 pt-20 pb-12 md:px-10 md:pt-28">
        <div className="mx-auto max-w-[1800px]">
          <p className="spec mb-6 text-bone/60">Contact / 34.2749°N 119.2290°W</p>
          <h2 className="font-display text-mega text-bone">
            Let&rsquo;s<br />
            <span className="italic text-signal">fly.</span>
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <div>
              <p className="spec text-bone/50">Email</p>
              <a href={`mailto:${s.email}`} className="mt-1 block text-lg hover:text-signal">
                {s.email}
              </a>
            </div>
            <div>
              <p className="spec text-bone/50">Based</p>
              <p className="mt-1 text-lg">{s.location}</p>
            </div>
            <div>
              <p className="spec text-bone/50">Elsewhere</p>
              <ul className="mt-1 space-y-1">
                {s.social?.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-lg hover:text-signal"
                    >
                      {link.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-[1800px] flex-col gap-4 px-5 py-6 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="spec text-bone/60">© {year} Finn Bennett / Overlook Studio</p>
        <p className="spec text-bone/40">Built with Next.js + Sanity. Deployed on Vercel.</p>
      </div>
    </footer>
  );
}
