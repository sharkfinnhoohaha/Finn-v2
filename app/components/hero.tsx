'use client';

import { motion } from 'framer-motion';

export function Hero({ tagline, location }: { tagline?: string; location?: string }) {
  return (
    <section className="relative min-h-screen pt-28 md:pt-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        {/* top spec row */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 border-b border-ink/10 pb-8 md:grid-cols-4">
          <SpecReadout label="Index" value="001 / Home" />
          <SpecReadout label="Based" value={location || 'Ventura, CA'} />
          <SpecReadout label="Roles" value="Three" />
          <SpecReadout label="Status" value="Available" live />
        </div>

        {/* display type */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display mt-14 text-mega md:mt-20"
        >
          Finn Bennett
        </motion.h1>

        <div className="mt-14 grid gap-10 border-t border-ink/10 pt-10 md:mt-20 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="md:col-span-5 md:col-start-1"
          >
            <p className="spec mb-3 text-ink/50">Intro</p>
            <p className="font-sans text-xl leading-snug text-ink md:text-2xl">
              {tagline || 'Builds at altitude.'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:col-span-5 md:col-start-8"
          >
            <p className="spec mb-3 text-ink/50">Roles</p>
            <ul className="text-sm md:text-base">
              <li className="flex justify-between gap-4 border-t border-ink/10 py-2.5">
                <span>Web / Brand Studio</span>
                <span className="spec text-ink/50">Overlook Strategy</span>
              </li>
              <li className="flex justify-between gap-4 border-t border-ink/10 py-2.5">
                <span>Producer / Engineer</span>
                <span className="spec text-ink/50">Overlook Audio</span>
              </li>
              <li className="flex justify-between gap-4 border-y border-ink/10 py-2.5">
                <span>Commercial Pilot</span>
                <span className="spec text-ink/50">COMM · IFR</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="pointer-events-none absolute bottom-8 left-0 right-0 flex justify-center"
      >
        <span className="spec text-ink/40">Scroll ↓</span>
      </motion.div>
    </section>
  );
}

function SpecReadout({ label, value, live }: { label: string; value: string; live?: boolean }) {
  return (
    <div className="flex flex-col">
      <span className="spec text-ink/40">{label}</span>
      <span className="spec mt-1 flex items-center gap-1.5 text-ink">
        {live && <span className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-signal" />}
        {value}
      </span>
    </div>
  );
}
