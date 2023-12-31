import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'theme-black': '#000000',
        'theme-milky-white': '#f8fafc',
        'theme-pink': '#e6398f',
        'theme-orange': '#f88b4b',
        'theme-green': '#41fa56'
      }
    },
  },
  plugins: [],
}
export default config
