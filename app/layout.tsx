import type { Metadata } from 'next';
import { Syne, DM_Sans, Space_Mono } from 'next/font/google';
import './globals.css';

// Syne is a variable font — all weights (400–800) load by default; no explicit weight needed
const display = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const sans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Finn Bennett — Builds at altitude.',
  description:
    'Founder of Overlook Strategy and Overlook Audio. Commercial pilot. Based in Ventura, California.',
  metadataBase: new URL('https://finnbennett.com'),
  openGraph: {
    title: 'Finn Bennett',
    description: 'Builds at altitude.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
