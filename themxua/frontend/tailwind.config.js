/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: '#D4A373', // Warm earthy tone
        secondary: '#6B8E23', // Muted green
        accent: '#FF7F50', // Muted orange
        neutral: '#F5F5DC', // Beige
        light: '#FAF3E0', // Off-white
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
