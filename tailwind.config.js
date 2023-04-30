/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        GRAY_1: '#343541',
        GRAY_2: '#444654',
        GRAY_3: '#434654',
        DARK_1: '#202123',
        DARK_2: '#40414f',

      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
