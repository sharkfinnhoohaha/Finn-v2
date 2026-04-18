import { sanityFetch } from '@/sanity/client';
import {
  altitudesQuery,
  featuredProjectsQuery,
  featuredReleasesQuery,
  logbookQuery,
  momentsQuery,
  settingsQuery,
} from '@/sanity/queries';
import type {
  Altitude,
  LogbookEntry,
  Moment,
  Project,
  Release,
  Settings,
} from '@/lib/types';
import {
  FALLBACK_ALTITUDES,
  FALLBACK_LOGBOOK,
  FALLBACK_MOMENTS,
  FALLBACK_PROJECTS,
  FALLBACK_RELEASES,
  FALLBACK_SETTINGS,
} from '@/lib/fallback';

import { Hero } from '@/app/components/hero';
import { HorizontalMoments } from '@/app/components/horizontal-moments';
import { AltitudeSection } from '@/app/components/altitude-section';
import { ProjectGrid } from '@/app/components/project-grid';
import { ReleaseRack } from '@/app/components/release-rack';
import { Logbook } from '@/app/components/logbook';
import { NowTicker } from '@/app/components/now-ticker';
import { Manifesto } from '@/app/components/manifesto';

export const revalidate = 60;

async function getData() {
  const hasSanity = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!hasSanity) {
    return {
      settings: FALLBACK_SETTINGS,
      altitudes: FALLBACK_ALTITUDES,
      moments: FALLBACK_MOMENTS,
      projects: FALLBACK_PROJECTS,
      releases: FALLBACK_RELEASES,
      logbook: FALLBACK_LOGBOOK,
    };
  }

  try {
    const [settings, altitudes, moments, projects, releases, logbook] = await Promise.all([
      sanityFetch<Settings>({ query: settingsQuery }),
      sanityFetch<Altitude[]>({ query: altitudesQuery }),
      sanityFetch<Moment[]>({ query: momentsQuery }),
      sanityFetch<Project[]>({ query: featuredProjectsQuery }),
      sanityFetch<Release[]>({ query: featuredReleasesQuery }),
      sanityFetch<LogbookEntry[]>({ query: logbookQuery }),
    ]);

    return {
      settings: settings ?? FALLBACK_SETTINGS,
      altitudes: altitudes?.length ? altitudes : FALLBACK_ALTITUDES,
      moments: moments?.length ? moments : FALLBACK_MOMENTS,
      projects: projects?.length ? projects : FALLBACK_PROJECTS,
      releases: releases?.length ? releases : FALLBACK_RELEASES,
      logbook: logbook?.length ? logbook : FALLBACK_LOGBOOK,
    };
  } catch (err) {
    console.warn('Sanity fetch failed, using fallback content', err);
    return {
      settings: FALLBACK_SETTINGS,
      altitudes: FALLBACK_ALTITUDES,
      moments: FALLBACK_MOMENTS,
      projects: FALLBACK_PROJECTS,
      releases: FALLBACK_RELEASES,
      logbook: FALLBACK_LOGBOOK,
    };
  }
}

export default async function HomePage() {
  const { settings, altitudes, moments, projects, releases, logbook } = await getData();

  const byLevel = (level: string) => altitudes.find((a) => a.level === level);
  const ground = byLevel('ground');
  const studio = byLevel('studio');
  const flight = byLevel('flight');

  return (
    <>
      <Hero tagline={settings.tagline} location={settings.location} />
      <NowTicker items={settings.now} />
      <HorizontalMoments moments={moments} />
      <Manifesto text={settings.manifesto} />

      {ground && <AltitudeSection altitude={ground} />}
      <ProjectGrid projects={projects} />

      {studio && <AltitudeSection altitude={studio} />}
      <ReleaseRack releases={releases} />

      {flight && <AltitudeSection altitude={flight} />}
      <Logbook entries={logbook} />
    </>
  );
}
