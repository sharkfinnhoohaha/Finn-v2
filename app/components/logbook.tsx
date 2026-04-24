import Image from 'next/image';
import type { LogbookEntry } from '@/lib/types';

export function Logbook({ entries }: { entries: LogbookEntry[] }) {
  if (!entries || entries.length === 0) return null;

  const totalHours = entries.reduce((sum, e) => sum + (e.hours || 0), 0);

  return (
    <section className="bg-bone px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex items-end justify-between border-b border-ink/10 pb-4 md:mb-16">
          <div>
            <p className="spec mb-2 text-ink/50">03 / Recent Logbook</p>
            <h3 className="font-display text-giga tracking-tightest">From the air.</h3>
          </div>
          <div className="hidden gap-8 text-right md:flex">
            <div>
              <p className="spec text-ink/50">Entries</p>
              <p className="font-display mt-1 text-2xl">{entries.length}</p>
            </div>
            <div>
              <p className="spec text-ink/50">Hours</p>
              <p className="font-display mt-1 text-2xl">{totalHours.toFixed(1)}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-12">
          {entries[0] && (
            <article className="md:col-span-7">
              <div className="tile relative aspect-[4/3] overflow-hidden bg-ink/[0.04]">
                {entries[0].image?.url ? (
                  <Image
                    src={entries[0].image.url}
                    alt={entries[0].image.alt || entries[0].route || ''}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="spec text-ink/30">No image</span>
                  </div>
                )}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 border-t border-ink/10 pt-4 md:grid-cols-4">
                <Stat label="Date" value={formatDate(entries[0].date)} />
                <Stat label="Route" value={entries[0].route} />
                <Stat label="Aircraft" value={entries[0].aircraft} />
                <Stat
                  label="Hours"
                  value={entries[0].hours ? entries[0].hours.toFixed(1) : undefined}
                />
              </div>
              {entries[0].notes && (
                <p className="font-sans mt-4 text-sm text-ink/65">{entries[0].notes}</p>
              )}
            </article>
          )}

          <div className="md:col-span-5">
            <ul className="divide-y divide-ink/10 border-y border-ink/10">
              {entries.slice(1).map((entry) => (
                <li
                  key={entry._id}
                  className="grid grid-cols-12 items-baseline gap-2 py-3"
                >
                  <span className="spec col-span-3 text-ink/55">
                    {formatDate(entry.date)}
                  </span>
                  <span className="col-span-6 font-mono text-xs text-ink/85 md:text-sm">
                    {entry.route}
                  </span>
                  <span className="spec col-span-2 text-right text-ink/55">
                    {entry.conditions}
                  </span>
                  <span className="spec col-span-1 text-right text-ink">
                    {entry.hours?.toFixed(1)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="spec text-ink/45">{label}</p>
      <p className="font-mono mt-1 text-xs text-ink md:text-sm">{value || '—'}</p>
    </div>
  );
}

function formatDate(iso?: string) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
}
