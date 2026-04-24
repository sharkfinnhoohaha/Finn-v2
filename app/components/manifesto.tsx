export function Manifesto({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <section className="border-y border-ink/10 bg-bone px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <p className="spec mb-8 text-ink/50">Manifesto</p>
        <p className="font-display max-w-3xl text-2xl leading-[1.35] tracking-tightish text-ink md:text-4xl md:leading-[1.3]">
          {text}
        </p>
      </div>
    </section>
  );
}
