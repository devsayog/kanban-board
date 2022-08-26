/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: '#2998ff',
      'primary-dark': '#5643fa',
      'gray-light-1': '#f9f7f6',
      'gray-light-2': '#ccc',
      'gray-dark-1': '#333',
      'gray-dark-2': '#999',
      light: '#01050b',
      'slate-light': '#1e293b',
      'slate-dark': '#0f172a',
      secondary: '#FF3366',
      'secondary-dark': '#eb2f64',
      white: '#fff',
      black: '#000',
    },
    fontFamily: {
      inter: 'Inter, sans-serif',
    },
    fontWeight: {
      light: 300,
      base: 400,
      bold: 600,
    },
    extend: {},
  },
  plugins: [],
}
