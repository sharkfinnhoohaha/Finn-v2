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
      <section className="border-b border-bone/10 px-5 pt-24 pb-16 md:px-8 md:pt-32">
        <div className="mx-auto max-w-[1400px]">
          <p className="spec mb-6 text-bone/55">Contact · 34.2749°N 119.2290°W</p>
          <h2 className="font-display text-mega">Let&rsquo;s make something.</h2>

          <div className="mt-14 grid gap-10 border-t border-bone/10 pt-10 md:grid-cols-3">
            <div>
              <p className="spec text-bone/45">Email</p>
              <a
                href={`mailto:${s.email}`}
                className="font-mono mt-2 block text-base hover:text-signal md:text-lg"
              >
                {s.email}
              </a>
            </div>
            <div>
              <p className="spec text-bone/45">Based</p>
              <p className="font-mono mt-2 text-base md:text-lg">{s.location}</p>
            </div>
            <div>
              <p className="spec text-bone/45">Elsewhere</p>
              <ul className="mt-2 space-y-1">
                {s.social?.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-base hover:text-signal md:text-lg"
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

      <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-5 py-6 md:flex-row md:items-center md:justify-between md:px-8">
        <p className="spec text-bone/55">© {year} Finn Bennett / Overlook Studio</p>
        <p className="spec text-bone/35">Next.js · Sanity · Vercel</p>
      </div>
    </footer>
  );
}
