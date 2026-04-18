export function Manifesto({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <section className="bg-bone px-5 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-4xl">
        <p className="spec mb-6 text-ink/50">MSN / Manifesto</p>
        <p className="font-display text-3xl leading-[1.15] tracking-tight md:text-5xl md:leading-[1.1]">
          {text.split(' ').map((word, i) => {
            // italicize a few key verbs for emphasis
            const emphasized = ['build', 'builds', 'build.', 'fly', 'flies', 'think', 'records', 'cockpit'];
            const clean = word.toLowerCase().replace(/[.,;:]/, '');
            if (emphasized.includes(clean)) {
              return <span key={i} className="italic text-signal">{word} </span>;
            }
            // secondary emphasis on nouns — acid highlight marker
            const highlighted = ['altitude', 'altitudes', 'studio', 'studio.', 'ground', 'ground.', 'air', 'air.'];
            if (highlighted.includes(clean)) {
              return <span key={i} className="hl-acid">{word} </span>;
            }
            return <span key={i}>{word} </span>;
          })}
        </p>
      </div>
    </section>
  );
}
