import type { Config } from 'tailwindcss'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        // background colors
        background: 'var(--background)',
        'background-1': 'var(--background-1)',
        'background-2': 'var(--background-1)',
        // foreground colors
        foreground: 'var(--foreground)',
        'foreground-1': 'var(--foreground-1)',
        'foreground-2': 'var(--foreground-2)',
        // accent colors
        accent: 'var(--accent)',
        'accent-1': 'var(--accent-1)',
        'accent-2': 'var(--accent-2)'
      }
    }
  },
  plugins: []
} satisfies Config
