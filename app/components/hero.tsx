'use client';

import { motion } from 'framer-motion';

export function Hero({ tagline, location }: { tagline?: string; location?: string }) {
  return (
    <section className="relative min-h-screen overflow-hidden pt-24 md:pt-32">
      {/* top spec row */}
      <div className="mx-auto flex max-w-[1800px] items-start justify-between px-5 pb-10 md:px-10">
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 md:grid-cols-4">
          <SpecReadout label="v" value="2026.1" />
          <SpecReadout label="Based" value={location || 'Ventura, CA'} />
          <SpecReadout label="Altitude" value="Three" />
          <SpecReadout label="Status" value="Online" live />
        </div>
      </div>

      {/* massive type */}
      <div className="relative mx-auto max-w-[1800px] px-5 md:px-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-mega leading-[0.82] tracking-crushed"
        >
          Finn
          <br />
          <span className="italic">Bennett</span><span className="text-signal">.</span>
        </motion.h1>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="md:col-span-5 md:col-start-1"
          >
            <p className="spec mb-3 text-ink/60">index/001 — intro</p>
            <p className="text-xl leading-snug text-ink md:text-2xl">
              {tagline || 'Builds at altitude.'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45 }}
            className="md:col-span-4 md:col-start-8"
          >
            <p className="spec mb-3 text-ink/60">Three Roles</p>
            <ul className="space-y-1 text-base text-ink/80 md:text-lg">
              <li className="flex justify-between gap-4 border-b border-ink/10 py-2">
                <span>Web / Brand Studio</span>
                <span className="spec text-ink/50">Overlook Strategy</span>
              </li>
              <li className="flex justify-between gap-4 border-b border-ink/10 py-2">
                <span>Producer / Engineer</span>
                <span className="spec text-ink/50">Overlook Audio</span>
              </li>
              <li className="flex justify-between gap-4 py-2">
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
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-0 right-0 flex justify-center"
      >
        <span className="spec text-ink/40">Scroll to begin ↓</span>
      </motion.div>
    </section>
  );
}

function SpecReadout({ label, value, live }: { label: string; value: string; live?: boolean }) {
  return (
    <div className="flex flex-col border-l border-ink/15 pl-3">
      <span className="spec text-ink/40">{label}</span>
      <span className="spec mt-0.5 flex items-center gap-1.5 text-ink">
        {live && <span className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-signal" />}
        {value}
      </span>
    </div>
  );
}
