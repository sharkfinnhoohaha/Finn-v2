'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-ink/10 bg-bone/85 backdrop-blur-md' : ''
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-8 md:py-5">
        <Link href="/" className="spec flex items-center gap-2 text-ink">
          <span className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-signal" />
          Finn Bennett
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/#ground" className="spec text-ink/60 hover:text-ink">
            Ground
          </Link>
          <Link href="/#studio" className="spec text-ink/60 hover:text-ink">
            Studio
          </Link>
          <Link href="/#flight" className="spec text-ink/60 hover:text-ink">
            Flight
          </Link>
          <Link href="/about" className="spec text-ink/60 hover:text-ink">
            About
          </Link>
        </nav>
        <a href="mailto:finn@overlook.studio" className="spec text-ink">
          Contact <span aria-hidden>↗</span>
        </a>
      </div>
    </header>
  );
}
