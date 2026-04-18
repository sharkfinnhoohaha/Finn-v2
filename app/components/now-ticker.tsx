import type { Settings } from '@/lib/types';

export function NowTicker({ items }: { items?: string[] }) {
  if (!items || items.length === 0) return null;

  const loop = [...items, ...items];

  return (
    <section className="overflow-hidden border-t border-b border-ink/8 py-4">
      <div className="marquee-track flex items-center gap-16 whitespace-nowrap">
        {loop.map((item, i) => (
          <div key={i} className="flex items-center gap-12">
            <span className="spec text-signal">Now</span>
            <span className="text-sm text-ink/70">{item}</span>
            <span className="text-ink/20">·</span>
          </div>
        ))}
      </div>
    </section>
  );
}
