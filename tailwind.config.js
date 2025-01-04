module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Ensure Tailwind processes all your React files
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F97316', // Custom orange-500 color (Tailwind orange base)
      },
    },
  },
  plugins: [],
};
