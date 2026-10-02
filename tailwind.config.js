/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand (constant across themes — pulled from the logo)
        coral: { DEFAULT: '#EE8C6E', light: '#F4A487', deep: '#E0744F' },
        violet: { DEFAULT: '#8B4FB0', light: '#A974C8', deep: '#5E2B86' },
        // Semantic (driven by CSS variables → flips with the theme)
        bg: 'var(--bg)',
        'bg-2': 'var(--bg-2)',
        panel: 'var(--panel)',
        'panel-solid': 'var(--panel-solid)',
        line: 'var(--line)',
        fg: 'var(--fg)',
        'fg-muted': 'var(--fg-muted)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { tightest: '-0.045em' },
      maxWidth: { '8xl': '88rem' },
      boxShadow: {
        glow: '0 0 60px -12px var(--glow)',
        'glow-lg': '0 0 120px -20px var(--glow)',
        card: '0 24px 60px -24px rgba(0,0,0,0.5)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(120deg, #EE8C6E 0%, #C766A0 48%, #7B3FA0 100%)',
        'brand-radial': 'radial-gradient(60% 60% at 50% 0%, rgba(238,140,110,0.22), transparent 70%)',
        grid: 'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)',
      },
      keyframes: {
        'blob-1': {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '33%': { transform: 'translate3d(6%,-8%,0) scale(1.12)' },
          '66%': { transform: 'translate3d(-5%,5%,0) scale(0.94)' },
        },
        'blob-2': {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '33%': { transform: 'translate3d(-7%,6%,0) scale(0.92)' },
          '66%': { transform: 'translate3d(5%,-6%,0) scale(1.1)' },
        },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
        'gradient-pan': {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        'blob-1': 'blob-1 22s ease-in-out infinite',
        'blob-2': 'blob-2 26s ease-in-out infinite',
        marquee: 'marquee 38s linear infinite',
        'gradient-pan': 'gradient-pan 8s ease infinite',
      },
    },
  },
  plugins: [],
}
