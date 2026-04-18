import type { Settings } from '@/lib/types';

export function NowTicker({ items }: { items?: string[] }) {
  if (!items || items.length === 0) return null;

  // double the items so the marquee loop is seamless
  const loop = [...items, ...items];

  return (
    <section className="overflow-hidden border-t border-b border-ink/15 bg-bone py-5">
      <div className="marquee-track flex items-center gap-16 whitespace-nowrap">
        {loop.map((item, i) => (
          <div key={i} className="flex items-center gap-16">
            <span className="spec text-signal">NOW</span>
            <span className="text-base text-ink">{item}</span>
            <span className="text-ink/30">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
}
