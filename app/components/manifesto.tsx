export function Manifesto({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <section className="bg-bone px-5 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-4xl">
        <p className="spec mb-8 text-ink/30">About</p>
        <p className="font-display text-3xl font-semibold leading-[1.2] tracking-tight text-ink md:text-5xl md:leading-[1.15]">
          {text}
        </p>
      </div>
    </section>
  );
}
