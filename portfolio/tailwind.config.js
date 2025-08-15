/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./client/index.html",             // HTML entry
    "./client/src/**/*.{js,ts,jsx,tsx}" // all JS/TS/React files
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))", 
        foreground: "hsl(var(--foreground))",
      },
      borderColor: {
        border: "hsl(var(--border))",
      },
    },
  },
  plugins: [],
}
