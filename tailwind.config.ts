import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base colors
        'deep-obsidian': '#0A0A0A',
        'cloud-dancer': '#F0EEE9',
        'warm-sand': {
          DEFAULT: '#C9A46B',
          hover: '#B8935A',
          light: '#D4B482',
        },
        // Archival neutrals for light mode
        'stone': {
          50: '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
        },
        // Admin panel UI gray
        'slate-ui': '#4B5563',
        // Dark mode grays
        'neutral': {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0A0A0A',
        },
      },
      fontFamily: {
        // Original branding (keep for reference)
        unbounded: ['var(--font-unbounded)', 'sans-serif'],
        hanken: ['var(--font-hanken-grotesk)', 'sans-serif'],
        // New 2026 typography system
        jetbrains: ['var(--font-jetbrains-mono)', 'monospace'],
        geist: ['var(--font-geist)', 'sans-serif'],
        space: ['var(--font-space-mono)', 'monospace'],
      },
      spacing: {
        '80': '20rem', // 320px for section spacing
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '20px',
        'glass-md': '40px',
        'glass-lg': '60px',
      },
      animation: {
        'blur-in': 'blur-in 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-in': 'scale-in 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up-fade': 'slide-up-fade 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        'magnetic': 'magnetic 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        'blur-in': {
          '0%': { filter: 'blur(10px)', opacity: '0' },
          '100%': { filter: 'blur(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'slide-up-fade': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'magnetic': {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(var(--tx), var(--ty))' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
