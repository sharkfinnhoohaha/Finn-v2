import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { sanityFetch } from '@/sanity/client';
import { altitudesQuery, allProjectsQuery, featuredReleasesQuery, logbookQuery } from '@/sanity/queries';
import {
  FALLBACK_ALTITUDES,
  FALLBACK_LOGBOOK,
  FALLBACK_PROJECTS,
  FALLBACK_RELEASES,
} from '@/lib/fallback';
import type { Altitude, LogbookEntry, Project, Release } from '@/lib/types';
import { ProjectGrid } from '../../../components/project-grid';
import { ReleaseRack } from '../../../components/release-rack';
import { Logbook } from '../../../components/logbook';

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
      altitude: altitudes?.find((a) => a.level === slug) ?? FALLBACK_ALTITUDES.find((a) => a.level === slug),
      projects: projects?.length ? projects : FALLBACK_PROJECTS,
      releases: releases?.length ? releases : FALLBACK_RELEASES,
      logbook: logbook?.length ? logbook : FALLBACK_LOGBOOK,
    };
  } catch {
    return {
      altitude: FALLBACK_ALTITUDES.find((a) => a.level === slug),
      projects: FALLBACK_PROJECTS,
      releases: FALLBACK_RELEASES,
      logbook: FALLBACK_LOGBOOK,
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
      {/* Hero */}
      <section className="px-5 pt-32 pb-20 md:px-10 md:pt-40 md:pb-28">
        <div className="mx-auto max-w-[1800px]">
          <Link href="/" className={`spec ${isFlight ? 'text-bone/60' : 'text-ink/60'} hover:text-signal`}>
            ← Back
          </Link>
          <p className={`spec mt-8 ${isFlight ? 'text-bone/60' : 'text-ink/60'}`}>
            {altitude.callsign}
          </p>
          <h1 className={`mt-4 font-display text-mega leading-[0.82] tracking-crushed ${altitude.level === 'studio' ? 'italic' : ''}`}>
            {altitude.title}
            <span className="text-signal">.</span>
          </h1>
          {altitude.subtitle && (
            <p className={`mt-4 text-xl md:text-2xl ${isFlight ? 'text-bone/60' : 'text-ink/60'}`}>
              {altitude.subtitle}
            </p>
          )}

          <div className="mt-12 grid gap-10 md:grid-cols-12">
            <div className="md:col-span-6">
              {altitude.intro && (
                <p className={`text-lg leading-snug md:text-xl ${isFlight ? 'text-bone/80' : 'text-ink/80'}`}>
                  {altitude.intro}
                </p>
              )}
            </div>
            {altitude.stats && altitude.stats.length > 0 && (
              <dl className="md:col-span-5 md:col-start-8">
                {altitude.stats.map((s) => (
                  <div
                    key={s.label}
                    className={`flex items-baseline justify-between border-b py-2 ${
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

      {/* Content by altitude */}
      {altitude.level === 'ground' && <ProjectGrid projects={projects} />}
      {altitude.level === 'studio' && <ReleaseRack releases={releases} />}
      {altitude.level === 'flight' && <Logbook entries={logbook} />}
    </div>
  );
}
