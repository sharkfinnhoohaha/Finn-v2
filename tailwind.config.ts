import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './sanity/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0C0C0B',
          950: '#0C0C0B',
          900: '#141412',
          800: '#1E1E1B',
          700: '#2A2A26',
        },
        bone: {
          DEFAULT: '#F1EDE4',
          100: '#F1EDE4',
          200: '#E8E2D4',
          300: '#C9C2B2',
        },
        signal: {
          DEFAULT: '#FF6B1A',
          soft: '#E8A66B',
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
