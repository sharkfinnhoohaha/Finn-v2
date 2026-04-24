'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Altitude } from '@/lib/types';

export function AltitudeSection({ altitude }: { altitude: Altitude }) {
  const isFlight = altitude.level === 'flight';
  const altitudeIndex =
    altitude.level === 'ground' ? '01' : altitude.level === 'studio' ? '02' : '03';

  return (
    <section
      id={altitude.level}
      className={`relative ${isFlight ? 'bg-ink text-bone' : 'bg-bone text-ink'}`}
    >
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-24 md:grid-cols-12 md:gap-10 md:px-8 md:py-32">
        {/* left column — spec + intro */}
        <div className="md:col-span-4 md:col-start-1">
          <div className="sticky top-28 space-y-8">
            <div className="space-y-2">
              <p className={`spec ${isFlight ? 'text-bone/50' : 'text-ink/50'}`}>
                Altitude {altitudeIndex}
                {altitude.callsign ? ` / ${altitude.callsign}` : ''}
              </p>
            </div>

            {altitude.intro && (
              <p className={`font-sans text-base leading-relaxed ${isFlight ? 'text-bone/80' : 'text-ink/75'}`}>
                {altitude.intro}
              </p>
            )}

            {altitude.stats && altitude.stats.length > 0 && (
              <dl>
                {altitude.stats.map((s) => (
                  <div
                    key={s.label}
                    className={`flex items-baseline justify-between border-b py-2.5 ${
                      isFlight ? 'border-bone/15' : 'border-ink/15'
                    }`}
                  >
                    <dt className={`spec ${isFlight ? 'text-bone/50' : 'text-ink/50'}`}>
                      {s.label}
                    </dt>
                    <dd className="spec">{s.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>

        {/* right column — title + image */}
        <div className="md:col-span-8 md:col-start-5">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-giga tracking-tightest"
          >
            {altitude.title}
            {altitude.subtitle && (
              <span
                className={`mt-3 block text-lg font-normal tracking-normal md:text-xl ${
                  isFlight ? 'text-bone/50' : 'text-ink/50'
                }`}
              >
                {altitude.subtitle}
              </span>
            )}
          </motion.h2>

          {altitude.heroImage?.url && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="tile relative mt-10 aspect-[16/10] w-full overflow-hidden md:mt-14"
            >
              <Image
                src={altitude.heroImage.url}
                alt={altitude.heroImage.alt || altitude.title}
                fill
                sizes="(max-width: 768px) 100vw, 70vw"
                placeholder={altitude.heroImage.lqip ? 'blur' : 'empty'}
                blurDataURL={altitude.heroImage.lqip}
                className="object-cover"
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
