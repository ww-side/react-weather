/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        azure: '#459DE9',
        'azure-light': '#6AB0ED',
        'light-lavender': '#F1F2FF',
        'light-beige': '#FFFAF1',
      },
      colors: {
        'light-gray': '#C5C5C5',
        'apricot-orange': '#FFA25B',
        azure: '#459DE9',
      },
    },
  },
  plugins: [],
};
