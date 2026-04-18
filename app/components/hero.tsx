'use client';

import { motion } from 'framer-motion';

export function Hero({ tagline, location }: { tagline?: string; location?: string }) {
  return (
    <section className="relative min-h-screen overflow-hidden pt-28 md:pt-36">
      {/* top meta row */}
      <div className="mx-auto flex max-w-[1800px] items-start justify-between px-5 pb-8 md:px-10">
        <div className="flex gap-8">
          <SpecReadout label="Based" value={location || 'Ventura, CA'} />
          <SpecReadout label="Year" value="2026" />
        </div>
        <SpecReadout label="Altitude" value="Three" />
      </div>

      {/* main heading */}
      <div className="relative mx-auto max-w-[1800px] px-5 md:px-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-mega tracking-crushed"
          style={{ lineHeight: 0.88 }}
        >
          Finn
          <br />
          <span>Bennett</span><span className="text-signal">.</span>
        </motion.h1>

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="md:col-span-5 md:col-start-1"
          >
            <p className="text-xl leading-relaxed text-ink/70 md:text-2xl">
              {tagline || 'Builds at altitude.'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45 }}
            className="md:col-span-4 md:col-start-8"
          >
            <ul className="space-y-0 text-base text-ink/70 md:text-lg">
              <li className="flex items-center justify-between gap-4 border-b border-ink/10 py-3">
                <span>Web / Brand Studio</span>
                <span className="spec text-ink/40">Overlook Strategy</span>
              </li>
              <li className="flex items-center justify-between gap-4 border-b border-ink/10 py-3">
                <span>Producer / Engineer</span>
                <span className="spec text-ink/40">Overlook Audio</span>
              </li>
              <li className="flex items-center justify-between gap-4 py-3">
                <span>Commercial Pilot</span>
                <span className="spec text-ink/40">COMM · IFR</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-0 right-0 flex justify-center"
      >
        <span className="spec text-ink/30">Scroll ↓</span>
      </motion.div>
    </section>
  );
}

function SpecReadout({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="spec text-ink/30">{label}</span>
      <span className="spec text-ink/70">{value}</span>
    </div>
  );
}
