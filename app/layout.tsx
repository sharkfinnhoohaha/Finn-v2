import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
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
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="font-mono antialiased">{children}</body>
    </html>
  );
}
