import Image from 'next/image';
import type { Release } from '@/lib/types';

export function ReleaseRack({ releases }: { releases: Release[] }) {
  if (!releases || releases.length === 0) return null;

  return (
    <section className="bg-ink px-5 py-20 text-bone md:px-8 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex items-end justify-between border-b border-bone/15 pb-4 md:mb-16">
          <div>
            <p className="spec mb-2 text-bone/50">02 / Recent Releases</p>
            <h3 className="font-display text-giga tracking-tightest">From the studio.</h3>
          </div>
        </div>

        <ol className="divide-y divide-bone/15">
          {releases.map((r, i) => (
            <ReleaseRow key={r._id} release={r} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function ReleaseRow({ release, index }: { release: Release; index: number }) {
  const idx = String(index + 1).padStart(2, '0');
  return (
    <li className="group grid items-center gap-6 py-6 md:grid-cols-12 md:gap-8 md:py-8">
      <span className="spec text-bone/40 md:col-span-1">{idx}</span>

      <div className="relative aspect-square w-20 overflow-hidden bg-bone/5 md:col-span-2 md:w-full md:max-w-[140px]">
        {release.artwork?.url ? (
          <Image
            src={release.artwork.url}
            alt={release.artwork.alt || release.title}
            fill
            sizes="(max-width: 768px) 80px, 140px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="spec text-bone/30">No art</span>
          </div>
        )}
      </div>

      <div className="md:col-span-5">
        <h4 className="font-display text-xl tracking-tightish md:text-2xl">
          {release.title}
        </h4>
        <p className="spec mt-2 text-bone/55">
          {release.role}
          {release.kind ? ` · ${release.kind.toUpperCase()}` : ''}
        </p>
      </div>

      <div className="md:col-span-3">
        {release.signalChain && release.signalChain.length > 0 && (
          <div>
            <p className="spec text-bone/40">Signal Chain</p>
            <p className="font-mono mt-1 text-xs text-bone/75 md:text-sm">
              {release.signalChain.join(' → ')}
            </p>
          </div>
        )}
      </div>

      <div className="md:col-span-1 md:text-right">
        {release.listenUrl ? (
          <a
            href={release.listenUrl}
            target="_blank"
            rel="noreferrer"
            className="spec text-bone/80 hover:text-bone"
          >
            Listen ↗
          </a>
        ) : (
          <span className="spec text-bone/35">Soon</span>
        )}
      </div>
    </li>
  );
}
