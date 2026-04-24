export function NowTicker({ items }: { items?: string[] }) {
  if (!items || items.length === 0) return null;

  // double the items so the marquee loop is seamless
  const loop = [...items, ...items];

  return (
    <section className="overflow-hidden border-y border-ink/10 bg-bone py-4">
      <div className="marquee-track flex items-center gap-10 whitespace-nowrap">
        {loop.map((item, i) => (
          <div key={i} className="flex items-center gap-10">
            <span className="spec flex items-center gap-2 text-ink/80">
              <span className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-signal" />
              Now
            </span>
            <span className="font-mono text-sm text-ink/70">{item}</span>
            <span className="text-ink/20">/</span>
          </div>
        ))}
      </div>
    </section>
  );
}
