/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        azure: '#459DE9',
        'azure-light': '#6AB0ED',
        'light-lavender': '#FFFAF1',
        'light-beige': '#F1F2FF',
      },
    },
  },
  plugins: [],
};
