'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Altitude } from '@/lib/types';

export function AltitudeSection({ altitude }: { altitude: Altitude }) {
  const isFlight = altitude.level === 'flight';
  const isStudio = altitude.level === 'studio';

  return (
    <section
      id={altitude.level}
      className={`relative overflow-hidden ${
        isFlight ? 'bg-ink text-bone' : 'bg-bone text-ink'
      }`}
    >
      <div className="mx-auto grid max-w-[1800px] gap-12 px-5 py-24 md:grid-cols-12 md:gap-10 md:px-10 md:py-40">
        {/* left column — spec + intro */}
        <div className="md:col-span-4 md:col-start-1">
          <div className="sticky top-28 space-y-8">
            <div className="space-y-2">
              <p className={`spec ${isFlight ? 'text-bone/60' : 'text-ink/60'}`}>
                {altitude.callsign}
              </p>
              <p
                className={`spec ${
                  isFlight ? 'text-signal' : 'text-signal'
                }`}
              >
                Altitude {altitude.level === 'ground' ? '01' : altitude.level === 'studio' ? '02' : '03'}
              </p>
            </div>

            {altitude.intro && (
              <p className={`text-lg leading-snug ${isFlight ? 'text-bone/80' : 'text-ink/80'}`}>
                {altitude.intro}
              </p>
            )}

            {altitude.stats && altitude.stats.length > 0 && (
              <dl className="space-y-0">
                {altitude.stats.map((s) => (
                  <div
                    key={s.label}
                    className={`flex items-baseline justify-between border-b py-2 ${
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

        {/* right column — stacked title + image */}
        <div className="md:col-span-8 md:col-start-5">
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className={`font-display text-giga tracking-crushed ${
              isStudio ? 'italic' : ''
            }`}
            style={{ lineHeight: 0.9 }}
          >
            {altitude.title}
            {altitude.subtitle && (
              <span
                className={`mt-2 block text-4xl not-italic leading-tight tracking-tight md:text-6xl ${
                  isFlight ? 'text-bone/40' : 'text-ink/30'
                }`}
              >
                {altitude.subtitle}
              </span>
            )}
          </motion.h2>

          {altitude.heroImage?.url && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="tile relative mt-10 aspect-[16/10] w-full overflow-hidden md:mt-16"
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
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <span className="spec rounded-full bg-ink/80 px-3 py-1 text-bone">
                  {altitude.heroImage.alt || altitude.title}
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
