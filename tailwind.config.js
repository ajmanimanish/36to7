/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          ivory: '#F8F5EF',
          paper: '#FFFDF9',
          surface: '#F1ECE4',
          border: '#E6E0D6',
        },
        ink: {
          DEFAULT: '#20201D',
          muted: '#69665F',
          quiet: '#929087',
        },
        plum: {
          DEFAULT: '#4B3344',
          hover: '#3D2837',
          light: '#F4EFF3',
        },
        terracotta: {
          DEFAULT: '#B86A55',
          hover: '#A25946',
          light: '#FAF0ED',
        },
        sage: {
          DEFAULT: '#617565',
          light: '#EFF3F0',
        },
        amber: {
          DEFAULT: '#B58A45',
          light: '#FAF5EC',
        },
        brick: {
          DEFAULT: '#9B4B48',
          light: '#F8EFEF',
        },
        deepred: {
          DEFAULT: '#8A3131',
          light: '#F9ECEC',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(32, 32, 29, 0.05)',
        journal: '0 2px 12px 0 rgba(75, 51, 68, 0.04)',
      },
      borderRadius: {
        card: '16px',
      },
    },
  },
  plugins: [],
};
