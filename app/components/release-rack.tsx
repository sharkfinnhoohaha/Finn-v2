import Image from 'next/image';
import type { Release } from '@/lib/types';

export function ReleaseRack({ releases }: { releases: Release[] }) {
  return (
    <section className="bg-ink px-5 py-20 text-bone md:px-10 md:py-28">
      <div className="mx-auto max-w-[1800px]">
        <div className="mb-10 flex items-end justify-between md:mb-16">
          <div>
            <p className="spec mb-3 text-bone/50">ALT-02 / Recent Releases</p>
            <h3 className="font-display text-5xl leading-[0.9] tracking-tightest md:text-7xl">
              From the <span className="italic text-signal">studio</span>.
            </h3>
          </div>
        </div>

        {/* releases list, not grid — feels like liner notes */}
        <ol className="divide-y divide-bone/15 border-t border-bone/15">
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
    <li className="group relative grid items-center gap-6 py-6 md:grid-cols-12 md:gap-10 md:py-8">
      <span className="spec text-bone/40 md:col-span-1">0{idx}</span>

      <div className="relative aspect-square w-24 overflow-hidden bg-bone/5 md:col-span-2 md:w-full">
        {release.artwork?.url ? (
          <Image
            src={release.artwork.url}
            alt={release.artwork.alt || release.title}
            fill
            sizes="(max-width: 768px) 96px, 180px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="spec text-bone/30">artwork</span>
          </div>
        )}
      </div>

      <div className="md:col-span-5">
        <h4 className="font-display text-3xl leading-tight md:text-5xl">
          {release.title}
        </h4>
        <p className="spec mt-2 text-bone/60">
          {release.role}
          {release.kind ? ` · ${release.kind.toUpperCase()}` : ''}
        </p>
      </div>

      <div className="md:col-span-3">
        {release.signalChain && release.signalChain.length > 0 && (
          <div>
            <p className="spec text-bone/40">Signal Chain</p>
            <p className="mt-1 text-sm text-bone/80">{release.signalChain.join(' → ')}</p>
          </div>
        )}
      </div>

      <div className="md:col-span-1 md:text-right">
        {release.listenUrl ? (
          <a
            href={release.listenUrl}
            target="_blank"
            rel="noreferrer"
            className="spec inline-flex items-center gap-1 text-bone/80 hover:text-signal"
          >
            Listen ↗
          </a>
        ) : (
          <span className="spec text-bone/40">Soon</span>
        )}
      </div>
    </li>
  );
}
