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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-bone/90 backdrop-blur-md border-b border-ink/8'
          : ''
      }`}
    >
      <div className="mx-auto flex max-w-[1800px] items-center justify-between px-5 py-5 md:px-10 md:py-6">
        <Link href="/" className="font-display text-base font-semibold tracking-tight text-ink hover:text-signal transition-colors">
          Finn Bennett
        </Link>
        <nav className="hidden items-center gap-10 md:flex">
          {[
            { href: '/#ground', label: 'Ground' },
            { href: '/#studio', label: 'Studio' },
            { href: '/#flight', label: 'Flight' },
            { href: '/about', label: 'About' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-ink/60 hover:text-ink transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>
        <a
          href="mailto:finn@overlook.studio"
          className="inline-flex items-center gap-1.5 rounded-full border border-ink/20 px-4 py-1.5 text-sm font-medium text-ink hover:border-ink/60 hover:bg-ink hover:text-white transition-all duration-200"
        >
          Contact ↗
        </a>
      </div>
    </header>
  );
}
