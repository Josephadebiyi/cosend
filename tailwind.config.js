/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/react-app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1364FF',
        'primary-hover': '#0052E6', 
        'primary-active': '#0041CC',
        accent: '#C6FE1E',
        'accent-hover': '#B8F005',
        secondary: '#000000',
        background: '#FFFFFF',
        'background-light': '#F5F5F5',
        'text-primary': '#000000',
        'text-secondary': '#666666',
        'text-muted': '#999999',
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'pill': '25px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
};
