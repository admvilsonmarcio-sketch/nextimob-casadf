import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './client/index.html',
    './client/src/**/*.{ts,tsx,html}',
    './server/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        copper: {
          50: '#fdf8f3',
          100: '#f7ebdd',
          200: '#ecd0b1',
          300: '#dfb085',
          400: '#d0935f',
          500: '#b8753f',
          600: '#965832',
          700: '#724227',
          800: '#4b2a1a',
          900: '#2d180f',
          950: '#170c07',
        },
        midnight: '#1f1b16',
        porcelain: '#f4efe8',
        dune: '#3a332b',
        fog: '#a89f95',
      },
      fontFamily: {
        display: ['"Playfair Display"', ...fontFamily.serif],
        sans: ['Inter', ...fontFamily.sans],
      },
      boxShadow: {
        copper: '0 30px 60px -15px rgba(184, 117, 63, 0.25)',
      },
      borderRadius: {
        xl: '1.25rem',
      },
      spacing: {
        18: '4.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
