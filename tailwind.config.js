/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBlack: '#1E2328',
        secondaryBlack: '#3F434B',
        tertiaryBlack: '#575D64',
        primaryYellow: '#ac70cf',
        secondaryYellow: '#ac70cf',
        tertiaryYellow: '#ac70cf',
      },
    },
  },
  plugins: [],
}

