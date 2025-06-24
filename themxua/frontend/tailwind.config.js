/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['var(--font-roboto)', 'Roboto', 'sans-serif'],
        sans: ['var(--font-roboto)', 'Roboto', 'sans-serif'],
      },
      colors: {
        themxua: {
          primary: '#6E3B27',
          secondary: '#662811',
          accent: '#E8CFB8',
          background: '#FAF3E8',
          dark: '#5A2310',
          cream: '#FBF3E8',
          'cream-light': '#FBF4EC',
          'cream-darker': '#F0E1CD',
          'cream-darkest': '#EFE4D3',
          gray: '#867C76',
          orange: '#AC5634',
          'footer-bg': '#CFD3C1',
          white: '#FFFFFF',
          black: '#000000',
        },
      },
      screens: {
        xs: '475px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-up': 'scaleUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(135deg, #F0E1CD 39.9%, rgba(240, 225, 205, 0.57) 63%, rgba(240, 225, 205, 0.48) 82.2%, rgba(240, 225, 205, 0.37) 100%)',
      },
    },
  },
  plugins: [],
};
