import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { sanityFetch } from '@/sanity/client';
import {
  altitudesQuery,
  allProjectsQuery,
  featuredReleasesQuery,
  logbookQuery,
} from '@/sanity/queries';
import {
  FALLBACK_ALTITUDES,
  FALLBACK_LOGBOOK,
  FALLBACK_PROJECTS,
  FALLBACK_RELEASES,
} from '@/lib/fallback';
import type { Altitude, LogbookEntry, Project, Release } from '@/lib/types';
import { ProjectGrid } from '@/app/components/project-grid';
import { ReleaseRack } from '@/app/components/release-rack';
import { Logbook } from '@/app/components/logbook';

type Params = { slug: 'ground' | 'studio' | 'flight' };

export const revalidate = 60;

export async function generateStaticParams() {
  return [{ slug: 'ground' }, { slug: 'studio' }, { slug: 'flight' }];
}

async function getAltitudeData(slug: string) {
  const hasSanity = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!hasSanity) {
    return {
      altitude: FALLBACK_ALTITUDES.find((a) => a.level === slug),
      projects: FALLBACK_PROJECTS,
      releases: FALLBACK_RELEASES,
      logbook: FALLBACK_LOGBOOK,
    };
  }

  try {
    const [altitudes, projects, releases, logbook] = await Promise.all([
      sanityFetch<Altitude[]>({ query: altitudesQuery }),
      sanityFetch<Project[]>({ query: allProjectsQuery }),
      sanityFetch<Release[]>({ query: featuredReleasesQuery }),
      sanityFetch<LogbookEntry[]>({ query: logbookQuery }),
    ]);
    return {
      altitude: altitudes?.find((a) => a.level === slug),
      projects: projects ?? [],
      releases: releases ?? [],
      logbook: logbook ?? [],
    };
  } catch {
    return {
      altitude: FALLBACK_ALTITUDES.find((a) => a.level === slug),
      projects: [],
      releases: [],
      logbook: [],
    };
  }
}

export default async function AltitudePage({ params }: { params: Params }) {
  if (!['ground', 'studio', 'flight'].includes(params.slug)) return notFound();
  const { altitude, projects, releases, logbook } = await getAltitudeData(params.slug);
  if (!altitude) return notFound();

  const isFlight = altitude.level === 'flight';

  return (
    <div className={isFlight ? 'bg-ink text-bone' : 'bg-bone text-ink'}>
      <section className="px-5 pt-32 pb-20 md:px-8 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-[1400px]">
          <Link
            href="/"
            className={`spec ${isFlight ? 'text-bone/55 hover:text-bone' : 'text-ink/55 hover:text-ink'}`}
          >
            ← Back
          </Link>
          {altitude.callsign && (
            <p className={`spec mt-10 ${isFlight ? 'text-bone/55' : 'text-ink/55'}`}>
              {altitude.callsign}
            </p>
          )}
          <h1 className="font-display mt-4 text-mega tracking-tightest">
            {altitude.title}.
          </h1>
          {altitude.subtitle && (
            <p
              className={`font-sans mt-4 text-lg md:text-xl ${
                isFlight ? 'text-bone/60' : 'text-ink/60'
              }`}
            >
              {altitude.subtitle}
            </p>
          )}

          <div
            className={`mt-14 grid gap-10 border-t pt-10 md:grid-cols-12 ${
              isFlight ? 'border-bone/10' : 'border-ink/10'
            }`}
          >
            <div className="md:col-span-6">
              {altitude.intro && (
                <p
                  className={`font-sans text-base leading-relaxed md:text-lg ${
                    isFlight ? 'text-bone/80' : 'text-ink/75'
                  }`}
                >
                  {altitude.intro}
                </p>
              )}
            </div>
            {altitude.stats && altitude.stats.length > 0 && (
              <dl className="md:col-span-5 md:col-start-8">
                {altitude.stats.map((s) => (
                  <div
                    key={s.label}
                    className={`flex items-baseline justify-between border-b py-2.5 ${
                      isFlight ? 'border-bone/15' : 'border-ink/15'
                    }`}
                  >
                    <dt className={`spec ${isFlight ? 'text-bone/50' : 'text-ink/50'}`}>
                      {s.label}
                    </dt>
                    <dd className="spec">{s.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          {altitude.heroImage?.url && (
            <div className="relative mt-16 aspect-[16/9] w-full overflow-hidden">
              <Image
                src={altitude.heroImage.url}
                alt={altitude.heroImage.alt || altitude.title}
                fill
                sizes="100vw"
                placeholder={altitude.heroImage.lqip ? 'blur' : 'empty'}
                blurDataURL={altitude.heroImage.lqip}
                className="object-cover"
              />
            </div>
          )}
        </div>
      </section>

      {altitude.level === 'ground' && <ProjectGrid projects={projects} />}
      {altitude.level === 'studio' && <ReleaseRack releases={releases} />}
      {altitude.level === 'flight' && <Logbook entries={logbook} />}
    </div>
  );
}
