import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './sanity/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A0A0A',
          950: '#0A0A0A',
          900: '#111111',
          800: '#1A1A1A',
          700: '#262626',
        },
        bone: {
          DEFAULT: '#FFFFFF',
          100: '#FFFFFF',
          200: '#F5F5F5',
          300: '#E5E5E5',
        },
        signal: {
          DEFAULT: '#FF6B1A',
          soft: '#FFB088',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        crushed: '-0.06em',
      },
      fontSize: {
        'mega': ['clamp(4rem, 16vw, 20rem)', { lineHeight: '0.88', letterSpacing: '-0.04em' }],
        'giga': ['clamp(3rem, 10vw, 12rem)', { lineHeight: '0.9', letterSpacing: '-0.03em' }],
      },
    },
  },
  plugins: [],
};

export default config;
