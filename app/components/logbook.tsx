import Image from 'next/image';
import type { LogbookEntry } from '@/lib/types';

export function Logbook({ entries }: { entries: LogbookEntry[] }) {
  const totalHours = entries.reduce((sum, e) => sum + (e.hours || 0), 0);

  return (
    <section className="bg-bone px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1800px]">
        <div className="mb-10 flex items-end justify-between md:mb-16">
          <div>
            <p className="spec mb-3 text-ink/30">Recent Logbook</p>
            <h3 className="font-display text-5xl font-semibold tracking-tightest md:text-7xl" style={{ lineHeight: 0.95 }}>
              From the air.
            </h3>
          </div>
          <div className="hidden text-right md:block">
            <p className="spec text-ink/30">Entries</p>
            <p className="font-display text-3xl font-semibold">{entries.length}</p>
            <p className="spec mt-3 text-ink/30">Hours</p>
            <p className="font-display text-3xl font-semibold">{totalHours.toFixed(1)}</p>
          </div>
        </div>

        {/* feature entry + stacked list */}
        <div className="grid gap-10 md:grid-cols-12">
          {entries[0] && (
            <article className="md:col-span-7">
              <div className="tile relative aspect-[4/3] overflow-hidden bg-ink/5">
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
                    <span className="spec text-ink/30">placeholder</span>
                  </div>
                )}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                <Stat label="Date" value={formatDate(entries[0].date)} />
                <Stat label="Route" value={entries[0].route} />
                <Stat label="Aircraft" value={entries[0].aircraft} />
                <Stat label="Hours" value={entries[0].hours ? `${entries[0].hours.toFixed(1)}` : undefined} />
              </div>
              {entries[0].notes && (
                <p className="mt-4 text-ink/70">{entries[0].notes}</p>
              )}
            </article>
          )}

          <div className="md:col-span-5">
            <ul className="divide-y divide-ink/10 border-t border-ink/10">
              {entries.slice(1).map((entry) => (
                <li key={entry._id} className="grid grid-cols-12 items-baseline gap-2 py-4">
                  <span className="spec col-span-3 text-ink/60">{formatDate(entry.date)}</span>
                  <span className="col-span-6 text-sm">{entry.route}</span>
                  <span className="spec col-span-2 text-right text-ink/60">
                    {entry.conditions}
                  </span>
                  <span className="spec col-span-1 text-right">
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
    <div className="border-l border-ink/15 pl-3">
      <p className="spec text-ink/50">{label}</p>
      <p className="mt-0.5 text-sm text-ink">{value || '—'}</p>
    </div>
  );
}

function formatDate(iso?: string) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
}
