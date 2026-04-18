'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Moment } from '@/lib/types';

export function HorizontalMoments({ moments }: { moments: Moment[] }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  // horizontal translation bound to vertical scroll
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-72%']);

  return (
    <section ref={targetRef} className="relative h-[280vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-6 pl-5 md:gap-10 md:pl-10">
          {/* intro pane */}
          <div className="flex h-[70vh] w-[90vw] flex-shrink-0 flex-col justify-between md:w-[60vw]">
            <p className="spec text-ink/60">Field Notes / 2023 — Present</p>
            <div>
              <h2 className="font-display text-giga italic leading-none tracking-crushed">
                Moments
                <br />
                <span className="not-italic text-ink/30">from three altitudes.</span>
              </h2>
              <p className="mt-8 max-w-md text-base text-ink/70 md:text-lg">
                A running log. The studio, the office, the cockpit. Scroll sideways.
              </p>
            </div>
          </div>

          {moments.map((moment, i) => (
            <MomentCard key={moment._id} moment={moment} index={i} />
          ))}

          {/* ending pane */}
          <div className="flex h-[70vh] w-[60vw] flex-shrink-0 items-end pr-5 md:w-[40vw] md:pr-10">
            <p className="font-display text-6xl italic leading-none text-ink/30 md:text-8xl">
              More coming.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MomentCard({ moment, index }: { moment: Moment; index: number }) {
  // varying heights create the editorial magazine feel
  const heights = ['h-[60vh]', 'h-[75vh]', 'h-[55vh]', 'h-[70vh]', 'h-[65vh]'];
  const widths = ['w-[55vw] md:w-[32vw]', 'w-[70vw] md:w-[45vw]', 'w-[50vw] md:w-[28vw]', 'w-[65vw] md:w-[38vw]'];
  const h = heights[index % heights.length];
  const w = widths[index % widths.length];
  const altColor =
    moment.altitude === 'flight'
      ? 'text-plum'
      : moment.altitude === 'studio'
      ? 'text-signal'
      : moment.altitude === 'ground'
      ? 'text-ink'
      : 'text-ink/60';

  return (
    <figure className={`tile relative flex-shrink-0 ${w} ${h} flex flex-col`}>
      <div className="relative flex-1 overflow-hidden bg-ink/5">
        {moment.image?.url ? (
          <Image
            src={moment.image.url}
            alt={moment.image.alt || moment.location}
            fill
            sizes="(max-width: 768px) 70vw, 45vw"
            placeholder={moment.image.lqip ? 'blur' : 'empty'}
            blurDataURL={moment.image.lqip}
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-ink/30">
            <span className="spec">placeholder</span>
          </div>
        )}
      </div>
      <figcaption className="mt-3 flex items-baseline justify-between">
        <span className={`spec ${altColor}`}>{moment.location}</span>
        <span className="spec text-ink/40">0{index + 1}</span>
      </figcaption>
    </figure>
  );
}
