import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './sanity/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A0A0A',
          950: '#0A0A0A',
          900: '#131312',
          800: '#1C1C1A',
          700: '#2A2A27',
        },
        bone: {
          DEFAULT: '#F2EFE7',
          100: '#F2EFE7',
          200: '#E7E2D4',
          300: '#C7C1B1',
        },
        signal: {
          DEFAULT: '#FF3B2F',
          soft: '#FFB4AC',
        },
        acid: {
          DEFAULT: '#E6FF48',
          soft: '#F0FF9E',
        },
        plum: {
          DEFAULT: '#3B2DE6',
          soft: '#B7B0FF',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.05em',
        crushed: '-0.08em',
      },
      fontSize: {
        'mega': ['clamp(4rem, 18vw, 22rem)', { lineHeight: '0.82', letterSpacing: '-0.05em' }],
        'giga': ['clamp(3rem, 12vw, 14rem)', { lineHeight: '0.85', letterSpacing: '-0.04em' }],
      },
    },
  },
  plugins: [],
};

export default config;
