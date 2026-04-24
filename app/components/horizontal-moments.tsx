'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Moment } from '@/lib/types';

export function HorizontalMoments({ moments }: { moments: Moment[] }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-72%']);

  if (!moments || moments.length === 0) return null;

  return (
    <section ref={targetRef} className="relative h-[280vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-bone">
        <motion.div style={{ x }} className="flex items-stretch gap-6 pl-5 md:gap-8 md:pl-8">
          {/* intro pane */}
          <div className="flex h-[68vh] w-[85vw] flex-shrink-0 flex-col justify-between md:w-[50vw]">
            <p className="spec text-ink/50">Field Notes · 2023 — Present</p>
            <div>
              <h2 className="font-display text-giga tracking-tightest">
                Moments.
              </h2>
              <p className="font-sans mt-6 max-w-md text-base text-ink/65 md:text-lg">
                A running log across three altitudes — studio, ground, flight. Scroll sideways.
              </p>
            </div>
          </div>

          {moments.map((moment, i) => (
            <MomentCard key={moment._id} moment={moment} index={i} />
          ))}

          {/* ending pane */}
          <div className="flex h-[68vh] w-[50vw] flex-shrink-0 items-end pr-5 md:w-[30vw] md:pr-8">
            <p className="font-display text-4xl text-ink/30 md:text-6xl">More soon.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MomentCard({ moment, index }: { moment: Moment; index: number }) {
  const heights = ['h-[62vh]', 'h-[70vh]', 'h-[56vh]', 'h-[66vh]', 'h-[60vh]'];
  const widths = [
    'w-[55vw] md:w-[30vw]',
    'w-[70vw] md:w-[38vw]',
    'w-[50vw] md:w-[26vw]',
    'w-[60vw] md:w-[32vw]',
  ];
  const h = heights[index % heights.length];
  const w = widths[index % widths.length];
  const idx = String(index + 1).padStart(2, '0');

  return (
    <figure className={`tile relative flex-shrink-0 ${w} ${h} flex flex-col`}>
      <div className="relative flex-1 overflow-hidden bg-ink/[0.04]">
        {moment.image?.url ? (
          <Image
            src={moment.image.url}
            alt={moment.image.alt || moment.location}
            fill
            sizes="(max-width: 768px) 70vw, 38vw"
            placeholder={moment.image.lqip ? 'blur' : 'empty'}
            blurDataURL={moment.image.lqip}
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-ink/25">
            <span className="spec">No image</span>
          </div>
        )}
      </div>
      <figcaption className="mt-3 flex items-baseline justify-between">
        <span className="spec text-ink/70">{moment.location}</span>
        <span className="spec text-ink/35">{idx}</span>
      </figcaption>
    </figure>
  );
}
