/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./client/index.html",             // your HTML
    "./client/src/**/*.{js,ts,jsx,tsx}" // all React/JS files
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
      },
    },
  },
  plugins: [],
}
