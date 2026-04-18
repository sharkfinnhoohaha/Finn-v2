import type { Settings } from '@/lib/types';

export function NowTicker({ items }: { items?: string[] }) {
  if (!items || items.length === 0) return null;

  // double the items so the marquee loop is seamless
  const loop = [...items, ...items];

  return (
    <section className="overflow-hidden border-t border-b border-ink/15 bg-ink py-5 text-bone">
      <div className="marquee-track flex items-center gap-12 whitespace-nowrap">
        {loop.map((item, i) => (
          <div key={i} className="flex items-center gap-12">
            <span className="spec flex items-center gap-2 text-acid">
              <span className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-acid" />
              Now Playing
            </span>
            <span className="text-base text-bone/90">{item}</span>
            <span className="text-bone/30">/</span>
          </div>
        ))}
      </div>
    </section>
  );
}
