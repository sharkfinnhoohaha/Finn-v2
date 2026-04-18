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
      {/* CTA block */}
      <section className="relative border-b border-bone/10 px-5 pt-20 pb-14 md:px-10 md:pt-28">
        <div className="mx-auto max-w-[1800px]">
          <p className="spec mb-6 text-bone/40">Get in touch</p>
          <h2 className="font-display text-mega text-bone" style={{ lineHeight: 0.88 }}>
            Let&rsquo;s<br />
            <span className="text-signal">fly.</span>
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div>
              <p className="spec mb-2 text-bone/40">Email</p>
              <a
                href={`mailto:${s.email}`}
                className="text-lg font-medium text-bone hover:text-signal transition-colors"
              >
                {s.email}
              </a>
            </div>
            <div>
              <p className="spec mb-2 text-bone/40">Based</p>
              <p className="text-lg text-bone/80">{s.location}</p>
            </div>
            <div>
              <p className="spec mb-2 text-bone/40">Links</p>
              <ul className="space-y-1">
                {s.social?.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-lg text-bone/70 hover:text-signal transition-colors"
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

      <div className="mx-auto flex max-w-[1800px] flex-col gap-3 px-5 py-6 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="spec text-bone/40">© {year} Finn Bennett / Overlook Studio</p>
        <p className="spec text-bone/25">Next.js + Sanity · Deployed on Vercel</p>
      </div>
    </footer>
  );
}
