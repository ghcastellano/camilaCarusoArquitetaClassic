import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#161714',
        ivory: '#f2efe8',
        paper: '#f8f6f1',
        brass: '#c89662',
        'brass-dark': '#875a35',
        petrol: '#1c3b43',
        sage: '#9d9482'
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        display: ['var(--font-display)']
      }
    }
  },
  plugins: []
} satisfies Config;
