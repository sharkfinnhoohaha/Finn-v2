import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './sanity/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#111111',
          950: '#0A0A0A',
          900: '#111111',
          800: '#1F1F1F',
          700: '#2A2A2A',
        },
        bone: {
          DEFAULT: '#F5F4F1',
          100: '#F5F4F1',
          200: '#EBE9E3',
          300: '#D4D2CB',
        },
        signal: {
          DEFAULT: '#D93025',
          soft: '#F2B8B3',
        },
      },
      fontFamily: {
        display: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tightish: '-0.02em',
      },
      fontSize: {
        'mega': ['clamp(2.75rem, 9vw, 8rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'giga': ['clamp(2.25rem, 6vw, 5.5rem)', { lineHeight: '1', letterSpacing: '-0.03em' }],
      },
    },
  },
  plugins: [],
};

export default config;
