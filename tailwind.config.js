/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '2sm': '390px',
        '3xl': '1600px', // Customize the pixel value as needed
      },
    },
  },
  plugins: [],
}

