/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBlack: '#1E2328',
        secondaryBlack: '#3F434B',
        tertiaryBlack: '#575D64',
        primaryYellow: '#F5A302',
        secondaryYellow: '#F4B301',
        tertiaryYellow: '#FCDE70',
      },
    },
  },
  plugins: [],
}

